import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, Activity } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { RiskCard } from "@/components/RiskCard";
import { Button } from "@/components/ui/button";
import { analyzeRisk, getStatus, startMonitoring, stopMonitoring, useHealth } from "@/lib/health-store";

export const Route = createFileRoute("/monitor")({
  head: () => ({
    meta: [
      { title: "Live Monitoring — Omiros Health AI" },
      { name: "description", content: "Real-time SpO2 and heart rate tracking with AI analysis." },
    ],
  }),
  component: Monitor,
});

function Monitor() {
  const { series, current, monitoring, mode } = useHealth();
  const status = getStatus(current);
  const analysis = analyzeRisk(series);

  const data = series.map((r, i) => ({
    i,
    time: new Date(r.t).toLocaleTimeString([], { minute: "2-digit", second: "2-digit" }),
    spo2: r.spo2,
    bpm: r.bpm,
  }));

  const modeLabel = { rest: "Resting", stress: "Stress detected", recovery: "Recovering" }[mode];

  return (
    <AppShell>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Live · 2s interval</p>
            <h2 className="text-2xl font-semibold tracking-tight">Live Monitoring</h2>
          </div>
          <StatusBadge status={status} />
        </div>

        {monitoring && (
          <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-muted-foreground">Behavioral pattern:</span>
            <span className="font-medium">{modeLabel}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-3xl p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">SpO₂</p>
            <p className="text-3xl font-semibold text-primary tabular-nums mt-1">
              {current.spo2.toFixed(1)}<span className="text-sm text-muted-foreground ml-1">%</span>
            </p>
          </div>
          <div className="glass rounded-3xl p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Heart rate</p>
            <p className="text-3xl font-semibold text-success tabular-nums mt-1">
              {current.bpm}<span className="text-sm text-muted-foreground ml-1">bpm</span>
            </p>
          </div>
        </div>

        <ChartCard title="SpO₂ %" color="var(--spo2)" data={data} dataKey="spo2" domain={[88, 100]} />
        <ChartCard title="Heart rate (BPM)" color="var(--bpm)" data={data} dataKey="bpm" domain={[55, 130]} />

        <RiskCard analysis={analysis} />

        <Button
          size="lg"
          onClick={() => (monitoring ? stopMonitoring() : startMonitoring())}
          className={`w-full rounded-2xl ${monitoring ? "bg-destructive hover:bg-destructive/90" : "animate-glow"}`}
        >
          {monitoring ? <><Pause className="mr-2 h-4 w-4" /> Stop Monitoring</> : <><Play className="mr-2 h-4 w-4" /> Start Monitoring</>}
        </Button>
      </div>
    </AppShell>
  );
}

function ChartCard({
  title, color, data, dataKey, domain,
}: { title: string; color: string; data: any[]; dataKey: "spo2" | "bpm"; domain: [number, number] }) {
  const gradId = `grad-${dataKey}`;
  return (
    <div className="glass rounded-3xl p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5" style={{ color }} />
          {title}
        </p>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="i" hide />
            <YAxis domain={domain} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
              labelFormatter={(_, p) => p?.[0]?.payload?.time ?? ""}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#${gradId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
