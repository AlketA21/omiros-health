import { Brain, TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { RiskAnalysis } from "@/lib/health-store";

const riskMap = {
  low: { label: "Low risk", cls: "text-success", bar: "bg-success", ring: "ring-success/40" },
  medium: { label: "Medium risk", cls: "text-warning-foreground", bar: "bg-warning", ring: "ring-warning/40" },
  high: { label: "High risk", cls: "text-destructive", bar: "bg-destructive", ring: "ring-destructive/40" },
} as const;

export function RiskCard({ analysis }: { analysis: RiskAnalysis }) {
  const r = riskMap[analysis.risk];
  const TrendIcon =
    analysis.trend === "improving" ? TrendingUp : analysis.trend === "worsening" ? TrendingDown : Minus;
  const trendColor =
    analysis.trend === "improving" ? "text-success" : analysis.trend === "worsening" ? "text-destructive" : "text-muted-foreground";

  return (
    <div className={`glass rounded-3xl p-5 ring-1 ${r.ring} animate-fade-in`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">AI Risk Analysis</p>
            <p className={`text-base font-semibold ${r.cls}`}>{r.label}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span className="capitalize">{analysis.trend}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Risk score</span>
          <span className="tabular-nums">{analysis.score}/100</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full ${r.bar} transition-all duration-700 ease-out`}
            style={{ width: `${analysis.score}%` }}
          />
        </div>
      </div>

      <ul className="text-xs text-muted-foreground space-y-1">
        {analysis.factors.slice(0, 3).map((f) => (
          <li key={f} className="flex gap-1.5">
            <span className="text-primary">›</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
