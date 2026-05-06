import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Fingerprint, Heart, Droplet, Loader2, RotateCcw, Check, FileText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { getStatus, recordReading, type Reading } from "@/lib/health-store";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Finger Scan — Omiros Health AI" },
      { name: "description", content: "AI finger scan to estimate SpO2 and heart rate." },
    ],
  }),
  component: ScanPage,
});

type Phase = "idle" | "scanning" | "done";

function ScanPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(4000);
  const [result, setResult] = useState<Reading | null>(null);
  const [livePulse, setLivePulse] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const start = () => {
    setResult(null);
    setProgress(0);
    setLivePulse(null);
    const dur = 3000 + Math.random() * 2000; // 3–5s
    setDuration(dur);
    setPhase("scanning");
    const startedAt = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - startedAt) / dur);
      setProgress(p);
      // Fake "detected" pulse mid-scan
      if (p > 0.35) {
        setLivePulse(Math.round(70 + Math.sin(now / 300) * 8 + Math.random() * 4));
      }
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        const spo2 = Math.round((92 + Math.random() * 8) * 10) / 10;
        const bpm = Math.round(65 + Math.random() * 45);
        const reading: Reading = { t: Date.now(), spo2, bpm };
        setResult(reading);
        recordReading(reading);
        setPhase("done");
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPhase("idle");
    setProgress(0);
    setResult(null);
    setLivePulse(null);
  };

  const pct = Math.round(progress * 100);
  const status = result ? getStatus(result) : "normal";

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">AI Scan</p>
          <h2 className="text-2xl font-semibold tracking-tight">Finger Scan</h2>
        </div>

        <div className="glass rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden">
          {/* Scan sweep effect */}
          {phase === "scanning" && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan-sweep" />
            </div>
          )}

          <div className="relative h-48 w-48 flex items-center justify-center">
            {phase === "scanning" && (
              <>
                <span className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
                <span className="absolute inset-4 rounded-full bg-primary/15 animate-pulse-soft" />
              </>
            )}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" className="fill-none stroke-muted" strokeWidth="3" />
              <circle
                cx="50"
                cy="50"
                r="46"
                className={`fill-none transition-[stroke-dashoffset] ${
                  phase === "done" ? "stroke-success" : "stroke-primary"
                }`}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - progress)}
              />
            </svg>
            <div
              className={`relative h-28 w-28 rounded-full flex items-center justify-center transition-colors ${
                phase === "scanning"
                  ? "bg-primary/15 text-primary animate-pulse-soft"
                  : phase === "done"
                  ? "bg-success/15 text-success"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {phase === "done" ? (
                <Check className="h-12 w-12" />
              ) : (
                <Fingerprint className="h-14 w-14" />
              )}
            </div>
          </div>

          <div className="mt-5 min-h-[4rem] relative">
            {phase === "idle" && (
              <>
                <p className="font-medium">Ready to scan</p>
                <p className="text-sm text-muted-foreground">
                  Tap start, then place your finger on the camera.
                </p>
              </>
            )}
            {phase === "scanning" && (
              <>
                <p className="font-medium flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Place your finger on the camera
                </p>
                <p className="text-sm text-muted-foreground tabular-nums">
                  Analyzing… {pct}% {livePulse ? `· detected ~${livePulse} bpm` : ""}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Duration ~{(duration / 1000).toFixed(1)}s
                </p>
              </>
            )}
            {phase === "done" && (
              <>
                <p className="font-medium">Scan complete</p>
                <div className="mt-1 flex justify-center"><StatusBadge status={status} /></div>
              </>
            )}
          </div>
        </div>

        {phase === "done" && result && (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">SpO₂</span>
                <div className="h-9 w-9 rounded-2xl flex items-center justify-center bg-primary/15 text-primary">
                  <Droplet className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tabular-nums">{result.spo2.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Heart rate</span>
                <div className="h-9 w-9 rounded-2xl flex items-center justify-center bg-success/15 text-success">
                  <Heart className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tabular-nums">{result.bpm}</span>
                <span className="text-sm text-muted-foreground">BPM</span>
              </div>
            </div>
          </div>
        )}

        {phase !== "scanning" && (
          <Button
            onClick={phase === "done" ? reset : start}
            size="lg"
            className={`w-full rounded-2xl ${phase === "idle" ? "animate-glow" : ""}`}
          >
            {phase === "done" ? (
              <><RotateCcw className="mr-2 h-4 w-4" /> Scan again</>
            ) : (
              <><Fingerprint className="mr-2 h-4 w-4" /> Start Finger Scan</>
            )}
          </Button>
        )}

        {phase === "done" && (
          <Button
            variant="outline"
            size="lg"
            className="w-full rounded-2xl"
            onClick={() => navigate({ to: "/report" })}
          >
            <FileText className="mr-2 h-4 w-4" />
            View AI medical report
          </Button>
        )}

        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wider">
          Simulated demo — not a medical device
        </p>
      </div>
    </AppShell>
  );
}
