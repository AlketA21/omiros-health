import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Droplet, Heart } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { getStatus, useHealth } from "@/lib/health-store";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — Omiros" },
      { name: "description", content: "Past SpO2 and heart rate measurements." },
    ],
  }),
  component: HistoryPage,
});

type Filter = "day" | "week" | "all";

function HistoryPage() {
  const { history } = useHealth();
  const [filter, setFilter] = useState<Filter>("all");

  const now = Date.now();
  const cutoff = filter === "day" ? now - 86400000 : filter === "week" ? now - 7 * 86400000 : 0;
  const items = history.filter((r) => r.t >= cutoff);

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">History</h2>
          <p className="text-sm text-muted-foreground">Past sessions</p>
        </div>

        <div className="flex gap-2">
          {(["day", "week", "all"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "secondary"}
              size="sm"
              className="rounded-full capitalize"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : `Last ${f}`}
            </Button>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-card border border-border/50 p-10 text-center">
            <p className="text-sm text-muted-foreground">No measurements yet.<br/>Start a monitoring session to record one.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((r) => {
              const d = new Date(r.t);
              return (
                <li key={r.t} className="rounded-2xl bg-card border border-border/50 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {d.toLocaleDateString([], { month: "short", day: "numeric" })} · {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Droplet className="h-3.5 w-3.5 text-primary" /> {r.spo2.toFixed(1)}%</span>
                      <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-success" /> {r.bpm} bpm</span>
                    </div>
                  </div>
                  <StatusBadge status={getStatus(r)} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
