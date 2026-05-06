import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Activity, Heart, Droplet, Brain, Calendar } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { analyzeRisk, useHealth } from "@/lib/health-store";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Medical Report — Omiros Health AI" },
      { name: "description", content: "AI-generated medical summary of your latest scan." },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const { history, series, profile } = useHealth();
  const source = series.length > 1 ? series : history.slice(0, 20);
  const analysis = analyzeRisk(source);

  if (source.length === 0) {
    return (
      <AppShell>
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Medical Report</h2>
            <p className="text-sm text-muted-foreground">AI-generated summary</p>
          </div>
          <div className="glass rounded-3xl p-10 text-center">
            <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              No data yet. Run a scan or live session to generate a report.
            </p>
            <Link to="/scan" className="text-primary text-sm font-medium underline">
              Start a Finger Scan →
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const avgSpo2 = source.reduce((s, r) => s + r.spo2, 0) / source.length;
  const avgBpm = source.reduce((s, r) => s + r.bpm, 0) / source.length;
  const minSpo2 = Math.min(...source.map((r) => r.spo2));
  const maxSpo2 = Math.max(...source.map((r) => r.spo2));
  const minBpm = Math.min(...source.map((r) => r.bpm));
  const maxBpm = Math.max(...source.map((r) => r.bpm));
  const latest = source[source.length - 1] ?? source[0];

  const riskColor = analysis.risk === "low" ? "text-success" : analysis.risk === "medium" ? "text-warning-foreground" : "text-destructive";
  const summary =
    analysis.risk === "low"
      ? "Vital signs are within healthy physiological ranges. No intervention recommended at this time."
      : analysis.risk === "medium"
      ? "Some vital readings show mild deviation. Continue monitoring and consider rest, hydration, and breathing exercises."
      : "Vitals indicate elevated physiological stress. Pause activity, rest, and consult a healthcare provider if symptoms persist.";

  return (
    <AppShell>
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">AI generated</p>
            <h2 className="text-2xl font-semibold tracking-tight">Medical Report</h2>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(latest.t).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>
          </div>
          <p className="text-sm font-semibold">{profile.name} · {profile.age}y</p>
          <p className="text-xs text-muted-foreground mt-1">Patient ID OMR-{Math.abs(latest.t).toString().slice(-6)}</p>
        </div>

        <div className="glass rounded-3xl p-5 space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> Latest scan
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Droplet className="h-3 w-3 text-primary" /> SpO₂</p>
              <p className="text-2xl font-semibold tabular-nums">{latest.spo2.toFixed(1)}<span className="text-sm text-muted-foreground ml-1">%</span></p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Heart className="h-3 w-3 text-success" /> Heart rate</p>
              <p className="text-2xl font-semibold tabular-nums">{latest.bpm}<span className="text-sm text-muted-foreground ml-1">bpm</span></p>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-5 space-y-3">
          <h3 className="text-sm font-semibold">Statistics ({source.length} readings)</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Stat label="Avg SpO₂" value={`${avgSpo2.toFixed(1)}%`} />
            <Stat label="Avg BPM" value={`${Math.round(avgBpm)}`} />
            <Stat label="SpO₂ range" value={`${minSpo2.toFixed(1)} – ${maxSpo2.toFixed(1)}%`} />
            <Stat label="BPM range" value={`${minBpm} – ${maxBpm}`} />
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-primary" /> AI evaluation
          </h3>
          <p className={`text-base font-semibold capitalize ${riskColor}`}>
            {analysis.risk} risk · score {analysis.score}/100
          </p>
          <p className="text-sm text-muted-foreground mt-2">{summary}</p>
          <ul className="text-xs text-muted-foreground space-y-1 mt-3">
            {analysis.factors.map((f) => (
              <li key={f} className="flex gap-1.5">
                <span className="text-primary">›</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wider">
          Simulated demo — not a medical device
        </p>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold tabular-nums mt-0.5">{value}</p>
    </div>
  );
}
