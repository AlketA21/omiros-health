import { O as useRouter, r as reactExports, W as jsxRuntimeExports } from "./worker-entry-CPkCnwxb.js";
import { L as Link } from "./router-BWwmhB5p.js";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$6 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const FingerprintPattern = createLucideIcon("fingerprint-pattern", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const PROFILE_KEY = "omiros_profile";
const HISTORY_KEY = "omiros_history";
const defaultProfile = () => ({
  name: "Alex Doe",
  age: 30,
  weight: 70,
  height: 175,
  activity: "medium",
  stress: "low",
  conditions: "",
  emergencyNumber: "112",
  darkMode: true
});
const loadProfile = () => {
  if (typeof window === "undefined") return defaultProfile();
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return { ...defaultProfile(), ...JSON.parse(raw) };
  } catch {
  }
  return defaultProfile();
};
const loadHistory = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
};
const initial = {
  current: { t: Date.now(), spo2: 98, bpm: 75 },
  series: [],
  history: [],
  monitoring: false,
  profile: defaultProfile(),
  mode: "rest"
};
let state = initial;
const listeners = /* @__PURE__ */ new Set();
const setState = (patch) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};
const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const targetFor = (mode) => {
  switch (mode) {
    case "stress":
      return { spo2: 94 + Math.random() * 2, bpm: 100 + Math.random() * 18 };
    case "recovery":
      return { spo2: 97 + Math.random() * 2, bpm: 70 + Math.random() * 8 };
    default:
      return { spo2: 97 + Math.random() * 2.5, bpm: 72 + Math.random() * 10 };
  }
};
const driftTo = (prev, target, rate, jitter) => {
  const next = prev + (target - prev) * rate + (Math.random() - 0.5) * jitter;
  return next;
};
let timer = null;
let modeTicksLeft = 6;
const pickMode = () => {
  const r = Math.random();
  if (r < 0.55) return "rest";
  if (r < 0.85) return "stress";
  return "recovery";
};
const tick = () => {
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
  spo2 = Math.max(90, Math.min(100, spo2));
  bpm = Math.max(60, Math.min(120, bpm));
  const reading = {
    t: Date.now(),
    spo2: Math.round(spo2 * 10) / 10,
    bpm: Math.round(bpm)
  };
  const series = [...state.series, reading].slice(-40);
  setState({ current: reading, series, mode });
};
const startMonitoring = () => {
  if (timer) return;
  modeTicksLeft = 4;
  setState({ monitoring: true, series: [state.current], mode: "rest" });
  tick();
  timer = setInterval(tick, 2e3);
};
const stopMonitoring = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (state.series.length > 0) {
    const avg = state.series.reduce(
      (a, r) => ({ spo2: a.spo2 + r.spo2, bpm: a.bpm + r.bpm }),
      { spo2: 0, bpm: 0 }
    );
    const n = state.series.length;
    const entry = {
      t: Date.now(),
      spo2: Math.round(avg.spo2 / n * 10) / 10,
      bpm: Math.round(avg.bpm / n)
    };
    const history = [entry, ...state.history].slice(0, 200);
    persistHistory(history);
    setState({ monitoring: false, history });
  } else {
    setState({ monitoring: false });
  }
};
const recordReading = (r) => {
  const history = [r, ...state.history].slice(0, 200);
  persistHistory(history);
  setState({ history });
};
const persistHistory = (h) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
    } catch {
    }
  }
};
const updateProfile = (patch) => {
  const profile = { ...state.profile, ...patch };
  setState({ profile });
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
    }
    document.documentElement.classList.toggle("dark", profile.darkMode);
  }
};
const hydrate = () => {
  setState({ profile: loadProfile(), history: loadHistory() });
  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("dark", state.profile.darkMode);
  }
};
const getSnap = () => state;
const getServerSnap = () => initial;
const useHealth = () => reactExports.useSyncExternalStore(subscribe, getSnap, getServerSnap);
const useHydrated = () => {
  const [done, setDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    hydrate();
    setDone(true);
  }, []);
  return done;
};
const getBpmRange = (p) => {
  const maxHr = 220 - p.age;
  const activityFloor = p.activity === "high" ? 50 : p.activity === "medium" ? 58 : 62;
  const stressFactor = p.stress === "high" ? 0.92 : p.stress === "medium" ? 0.97 : 1;
  const warn = Math.round(maxHr * 0.6 * stressFactor);
  const crit = Math.round(maxHr * 0.7 * stressFactor);
  return { min: activityFloor, warn, crit };
};
const getSpo2Thresholds = (p) => {
  if (p.stress === "high") return { warn: 94, crit: 91 };
  if (p.stress === "medium") return { warn: 93, crit: 90 };
  return { warn: 92, crit: 90 };
};
const getStatus = (r, p) => {
  const profile = p ?? state.profile;
  const bpmR = getBpmRange(profile);
  const spo2R = getSpo2Thresholds(profile);
  if (r.spo2 < spo2R.crit || r.bpm > bpmR.crit) return "critical";
  const lowBpm = profile.activity === "high" ? 45 : profile.activity === "medium" ? 50 : 54;
  if (r.spo2 < spo2R.warn || r.bpm > bpmR.warn || r.bpm < lowBpm) return "warning";
  return "normal";
};
const analyzeRisk = (readings) => {
  if (readings.length === 0) {
    return { risk: "low", score: 10, factors: ["No data yet"], trend: "stable" };
  }
  const recent = readings.slice(-10);
  const avgSpo2 = recent.reduce((a, r) => a + r.spo2, 0) / recent.length;
  const avgBpm = recent.reduce((a, r) => a + r.bpm, 0) / recent.length;
  const maxBpm = Math.max(...recent.map((r) => r.bpm));
  const minSpo2 = Math.min(...recent.map((r) => r.spo2));
  let score = 0;
  const factors = [];
  if (minSpo2 < 90) {
    score += 45;
    factors.push(`SpO₂ dropped to ${minSpo2.toFixed(1)}%`);
  } else if (minSpo2 < 92) {
    score += 30;
    factors.push(`SpO₂ low: ${minSpo2.toFixed(1)}%`);
  } else if (avgSpo2 < 95) {
    score += 12;
    factors.push(`Average SpO₂ ${avgSpo2.toFixed(1)}%`);
  }
  if (maxBpm > 115) {
    score += 35;
    factors.push(`Heart rate peaked at ${maxBpm} bpm`);
  } else if (maxBpm > 105) {
    score += 18;
    factors.push(`Elevated heart rate (${maxBpm} bpm)`);
  }
  if (avgBpm > 95) {
    score += 10;
    factors.push(`Average BPM ${Math.round(avgBpm)}`);
  }
  let trend = "stable";
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
  const risk = score >= 50 ? "high" : score >= 25 ? "medium" : "low";
  return { risk, score, factors, trend };
};
const tabs = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/scan", label: "Scan", icon: FingerprintPattern },
  { to: "/monitor", label: "Live", icon: Activity },
  { to: "/history", label: "History", icon: History },
  { to: "/report", label: "Report", icon: FileText },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/profile", label: "Profile", icon: User }
];
function AppShell({ children }) {
  useHydrated();
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md min-h-screen flex flex-col relative pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-5 pt-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center shadow-lg shadow-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-base font-semibold leading-tight tracking-tight", children: [
          "Omiros ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Health AI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground leading-tight", children: "Intelligent monitoring" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 px-5 py-3 animate-fade-in", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-0 left-0 right-0 mx-auto max-w-md glass border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-7", children: tabs.map(({ to, label, icon: Icon2 }) => {
      const active = pathname === to;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to,
          className: `flex flex-col items-center gap-1 py-3 text-[10px] transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: `h-[18px] w-[18px] ${active ? "scale-110" : ""} transition-transform` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
          ]
        }
      ) }, to);
    }) }) })
  ] }) });
}
export {
  AppShell as A,
  FingerprintPattern as F,
  FileText as a,
  analyzeRisk as b,
  createLucideIcon as c,
  Activity as d,
  getBpmRange as e,
  getSpo2Thresholds as f,
  getStatus as g,
  updateProfile as h,
  startMonitoring as i,
  recordReading as r,
  stopMonitoring as s,
  useHealth as u
};
