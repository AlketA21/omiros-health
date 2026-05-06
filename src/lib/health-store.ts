import { useEffect, useState, useSyncExternalStore } from "react";

export type Reading = {
  t: number;
  spo2: number;
  bpm: number;
};

export type ActivityLevel = "low" | "medium" | "high";
export type StressLevel = "low" | "medium" | "high";

export type Profile = {
  name: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  activity: ActivityLevel;
  stress: StressLevel;
  conditions: string;
  emergencyNumber: string;
  darkMode: boolean;
};

export type Mode = "rest" | "stress" | "recovery";

type State = {
  current: Reading;
  series: Reading[];
  history: Reading[];
  monitoring: boolean;
  profile: Profile;
  mode: Mode;
};

const PROFILE_KEY = "omiros_profile";
const HISTORY_KEY = "omiros_history";

const defaultProfile = (): Profile => ({
  name: "Alex Doe",
  age: 30,
  weight: 70,
  height: 175,
  activity: "medium",
  stress: "low",
  conditions: "",
  emergencyNumber: "112",
  darkMode: true,
});

const loadProfile = (): Profile => {
  if (typeof window === "undefined") return defaultProfile();
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return { ...defaultProfile(), ...JSON.parse(raw) };
  } catch {}
  return defaultProfile();
};

const loadHistory = (): Reading[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

const initial: State = {
  current: { t: Date.now(), spo2: 98, bpm: 75 },
  series: [],
  history: [],
  monitoring: false,
  profile: defaultProfile(),
  mode: "rest",
};

let state: State = initial;
const listeners = new Set<() => void>();

const setState = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

// Behavioral simulation: smoothly drift toward a target dictated by current mode.
// Mode changes occasionally to simulate stress / recovery cycles.
const targetFor = (mode: Mode): { spo2: number; bpm: number } => {
  switch (mode) {
    case "stress":
      return { spo2: 94 + Math.random() * 2, bpm: 100 + Math.random() * 18 };
    case "recovery":
      return { spo2: 97 + Math.random() * 2, bpm: 70 + Math.random() * 8 };
    default:
      return { spo2: 97 + Math.random() * 2.5, bpm: 72 + Math.random() * 10 };
  }
};

const driftTo = (prev: number, target: number, rate: number, jitter: number) => {
  const next = prev + (target - prev) * rate + (Math.random() - 0.5) * jitter;
  return next;
};

let timer: ReturnType<typeof setInterval> | null = null;
let tickCount = 0;
let modeTicksLeft = 6;

const pickMode = (): Mode => {
  const r = Math.random();
  if (r < 0.55) return "rest";
  if (r < 0.85) return "stress";
  return "recovery";
};

const tick = () => {
  tickCount++;
  modeTicksLeft--;
  let mode = state.mode;
  if (modeTicksLeft <= 0) {
    mode = pickMode();
    modeTicksLeft = 5 + Math.floor(Math.random() * 6);
  }
  const target = targetFor(mode);
  const prev = state.current;

  let spo2 = driftTo(prev.spo2, target.spo2, 0.25, 0.4);
  let bpm = driftTo(prev.bpm, target.bpm, 0.3, 2);

  // Clamp to physiological bounds
  spo2 = Math.max(90, Math.min(100, spo2));
  bpm = Math.max(60, Math.min(120, bpm));

  const reading: Reading = {
    t: Date.now(),
    spo2: Math.round(spo2 * 10) / 10,
    bpm: Math.round(bpm),
  };
  const series = [...state.series, reading].slice(-40);
  setState({ current: reading, series, mode });
};

export const startMonitoring = () => {
  if (timer) return;
  tickCount = 0;
  modeTicksLeft = 4;
  setState({ monitoring: true, series: [state.current], mode: "rest" });
  tick();
  timer = setInterval(tick, 2000);
};

export const stopMonitoring = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (state.series.length > 0) {
    const avg = state.series.reduce(
      (a, r) => ({ spo2: a.spo2 + r.spo2, bpm: a.bpm + r.bpm }),
      { spo2: 0, bpm: 0 },
    );
    const n = state.series.length;
    const entry: Reading = {
      t: Date.now(),
      spo2: Math.round((avg.spo2 / n) * 10) / 10,
      bpm: Math.round(avg.bpm / n),
    };
    const history = [entry, ...state.history].slice(0, 200);
    persistHistory(history);
    setState({ monitoring: false, history });
  } else {
    setState({ monitoring: false });
  }
};

export const recordReading = (r: Reading) => {
  const history = [r, ...state.history].slice(0, 200);
  persistHistory(history);
  setState({ history });
};

const persistHistory = (h: Reading[]) => {
  if (typeof window !== "undefined") {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch {}
  }
};

export const updateProfile = (patch: Partial<Profile>) => {
  const profile = { ...state.profile, ...patch };
  setState({ profile });
  if (typeof window !== "undefined") {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch {}
    document.documentElement.classList.toggle("dark", profile.darkMode);
  }
};

export const hydrate = () => {
  setState({ profile: loadProfile(), history: loadHistory() });
  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("dark", state.profile.darkMode);
  }
};

const getSnap = () => state;
const getServerSnap = () => initial;

export const useHealth = () => useSyncExternalStore(subscribe, getSnap, getServerSnap);

export const useHydrated = () => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    hydrate();
    setDone(true);
  }, []);
  return done;
};

export type Status = "normal" | "warning" | "critical";

// Personalized BPM range based on age & activity (resting HR-ish guidance).
// Lower bound drops with higher activity (athletes have lower RHR).
// Upper bound = warning threshold; scaled by ~ (220-age) and stress sensitivity.
export const getBpmRange = (p: Profile): { min: number; warn: number; crit: number } => {
  const maxHr = 220 - p.age;
  const activityFloor = p.activity === "high" ? 50 : p.activity === "medium" ? 58 : 62;
  // Warning at ~60% of HRmax baseline, tightened for high stress
  const stressFactor = p.stress === "high" ? 0.92 : p.stress === "medium" ? 0.97 : 1;
  const warn = Math.round(maxHr * 0.6 * stressFactor);
  const crit = Math.round(maxHr * 0.7 * stressFactor);
  return { min: activityFloor, warn, crit };
};

export const getSpo2Thresholds = (p: Profile): { warn: number; crit: number } => {
  // High stress users get more sensitive alerting
  if (p.stress === "high") return { warn: 94, crit: 91 };
  if (p.stress === "medium") return { warn: 93, crit: 90 };
  return { warn: 92, crit: 90 };
};

export const getStatus = (r: Reading, p?: Profile): Status => {
  const profile = p ?? state.profile;
  const bpmR = getBpmRange(profile);
  const spo2R = getSpo2Thresholds(profile);
  if (r.spo2 < spo2R.crit || r.bpm > bpmR.crit) return "critical";
  const lowBpm = profile.activity === "high" ? 45 : profile.activity === "medium" ? 50 : 54;
  if (r.spo2 < spo2R.warn || r.bpm > bpmR.warn || r.bpm < lowBpm) return "warning";
  return "normal";
};

export type Risk = "low" | "medium" | "high";

export type RiskAnalysis = {
  risk: Risk;
  score: number; // 0-100
  factors: string[];
  trend: "improving" | "stable" | "worsening";
};

export const analyzeRisk = (readings: Reading[]): RiskAnalysis => {
  if (readings.length === 0) {
    return { risk: "low", score: 10, factors: ["No data yet"], trend: "stable" };
  }
  const recent = readings.slice(-10);
  const avgSpo2 = recent.reduce((a, r) => a + r.spo2, 0) / recent.length;
  const avgBpm = recent.reduce((a, r) => a + r.bpm, 0) / recent.length;
  const maxBpm = Math.max(...recent.map((r) => r.bpm));
  const minSpo2 = Math.min(...recent.map((r) => r.spo2));

  let score = 0;
  const factors: string[] = [];

  if (minSpo2 < 90) { score += 45; factors.push(`SpO₂ dropped to ${minSpo2.toFixed(1)}%`); }
  else if (minSpo2 < 92) { score += 30; factors.push(`SpO₂ low: ${minSpo2.toFixed(1)}%`); }
  else if (avgSpo2 < 95) { score += 12; factors.push(`Average SpO₂ ${avgSpo2.toFixed(1)}%`); }

  if (maxBpm > 115) { score += 35; factors.push(`Heart rate peaked at ${maxBpm} bpm`); }
  else if (maxBpm > 105) { score += 18; factors.push(`Elevated heart rate (${maxBpm} bpm)`); }
  if (avgBpm > 95) { score += 10; factors.push(`Average BPM ${Math.round(avgBpm)}`); }

  // Trend
  let trend: RiskAnalysis["trend"] = "stable";
  if (recent.length >= 6) {
    const half = Math.floor(recent.length / 2);
    const a = recent.slice(0, half);
    const b = recent.slice(half);
    const aSpo2 = a.reduce((s, r) => s + r.spo2, 0) / a.length;
    const bSpo2 = b.reduce((s, r) => s + r.spo2, 0) / b.length;
    const aBpm = a.reduce((s, r) => s + r.bpm, 0) / a.length;
    const bBpm = b.reduce((s, r) => s + r.bpm, 0) / b.length;
    const delta = (bSpo2 - aSpo2) * 5 - (bBpm - aBpm) * 0.5;
    if (delta > 1.5) trend = "improving";
    else if (delta < -1.5) trend = "worsening";
  }
  if (trend === "worsening") score += 8;
  if (trend === "improving") score = Math.max(0, score - 6);

  if (factors.length === 0) factors.push("Vitals within healthy range");

  score = Math.min(100, Math.max(0, score));
  const risk: Risk = score >= 50 ? "high" : score >= 25 ? "medium" : "low";
  return { risk, score, factors, trend };
};
