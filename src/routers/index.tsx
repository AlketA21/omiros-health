import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Droplet, Play, Fingerprint, Activity } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { RiskCard } from "@/components/RiskCard";
import { Button } from "@/components/ui/button";
import { analyzeRisk, getStatus, startMonitoring, useHealth } from "@/lib/health-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omiros Health AI — Intelligent Vitals Monitor" },
      { name: "description", content: "AI-powered SpO2 and heart rate monitoring with real-time risk analysis." },
    ],
  }),
  component: Dashboard,
});

function VitalCard({
  label, value, unit, icon, color, pulse,
}: { label: string; value: string; unit: string; icon: React.ReactNode; color: string; pulse?: boolean }) {
  return (
    <div className="glass rounded-3xl p-5 transition-transform hover:-translate-y-0.5 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-2xl pointer-events-none" style={{ background: "var(--primary)" }} />
      <div className="flex items-center justify-between mb-3 relative">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.18em]">{label}</span>
        <div className={`h-9 w-9 rounded-2xl flex items-center justify-center ${color} ${pulse ? "animate-pulse-soft" : ""}`}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-1 relative">
        <span className="text-4xl font-semibold tabular-nums tracking-tight">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

function Dashboard() {
  const { current, monitoring, series, history } = useHealth();
  const navigate = useNavigate();
  const status = getStatus(current);
  const analysis = analyzeRisk(series.length ? series : history.slice(0, 10));

  const handleStart = () => {
    if (!monitoring) startMonitoring();
    navigate({ to: "/monitor" });
  };

  return (
    <AppShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Welcome back</p>
            <h2 className="text-2xl font-semibold tracking-tight">Vitals overview</h2>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <VitalCard
            label="SpO₂"
            value={current.spo2.toFixed(1)}
            unit="%"
            color="bg-primary/15 text-primary"
            icon={<Droplet className="h-5 w-5" />}
          />
          <VitalCard
            label="Heart rate"
            value={String(current.bpm)}
            unit="BPM"
            color="bg-success/15 text-success"
            pulse={monitoring}
            icon={<Heart className="h-5 w-5" />}
          />
        </div>

        <RiskCard analysis={analysis} />

        <div className="rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-success p-6 text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4" />
              <h3 className="text-lg font-semibold">Begin AI session</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Live monitoring with intelligent risk analysis based on behavioral patterns.
            </p>
            <Button
              onClick={handleStart}
              size="lg"
              className="w-full bg-card text-foreground hover:bg-card/90 rounded-2xl"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Live Monitoring
            </Button>
            <Link
              to="/scan"
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-card/20 hover:bg-card/30 transition-colors py-2.5 text-sm font-medium backdrop-blur"
            >
              <Fingerprint className="h-4 w-4" />
              Quick Finger Scan
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link to="/report" className="glass rounded-2xl p-4 hover:border-primary/40 transition-colors">
            <p className="text-xs text-muted-foreground">Latest</p>
            <p className="text-sm font-semibold mt-1">Medical report</p>
          </Link>
          <Link to="/history" className="glass rounded-2xl p-4 hover:border-primary/40 transition-colors">
            <p className="text-xs text-muted-foreground">Trends</p>
            <p className="text-sm font-semibold mt-1">{history.length} sessions</p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
