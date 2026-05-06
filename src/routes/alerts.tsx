import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Phone, PhoneCall } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getBpmRange,
  getSpo2Thresholds,
  getStatus,
  useHealth,
} from "@/lib/health-store";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — Omiros" },
      { name: "description", content: "Real-time vital sign alerts and emergency call." },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const { current, history, profile } = useHealth();
  const status = getStatus(current, profile);
  const bpm = getBpmRange(profile);
  const spo2 = getSpo2Thresholds(profile);
  const [confirm, setConfirm] = useState(false);

  const issues: string[] = [];
  if (current.spo2 < spo2.warn) issues.push(`Low oxygen saturation: ${current.spo2.toFixed(1)}% (threshold ${spo2.warn}%)`);
  if (current.bpm > bpm.warn) issues.push(`Elevated heart rate: ${current.bpm} BPM (threshold ${bpm.warn})`);

  const flagged = history.filter((r) => r.spo2 < spo2.warn || r.bpm > bpm.warn).slice(0, 10);

  const callEmergency = () => {
    const num = (profile.emergencyNumber || "112").replace(/\s/g, "");
    window.location.href = `tel:${num}`;
  };

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Alerts</h2>
          <p className="text-sm text-muted-foreground">Personalized live thresholds</p>
        </div>

        {status === "normal" ? (
          <div className="rounded-3xl bg-success/10 border border-success/30 p-5 flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-success mt-0.5" />
            <div>
              <p className="font-medium text-success">All vitals normal</p>
              <p className="text-sm text-muted-foreground">No alerts at the moment.</p>
            </div>
          </div>
        ) : (
          <div className={`rounded-3xl border p-5 flex items-start gap-3 animate-pulse-soft ${status === "critical" ? "bg-destructive/10 border-destructive/40" : "bg-warning/15 border-warning/40"}`}>
            <AlertTriangle className={`h-6 w-6 mt-0.5 ${status === "critical" ? "text-destructive" : "text-warning-foreground"}`} />
            <div>
              <p className={`font-semibold ${status === "critical" ? "text-destructive" : "text-warning-foreground"}`}>
                {status === "critical" ? "Critical alert" : "Warning"}
              </p>
              <ul className="text-sm mt-1 space-y-0.5 text-foreground/80">
                {issues.map((m) => <li key={m}>• {m}</li>)}
              </ul>
            </div>
          </div>
        )}

        {/* Emergency call */}
        <div className="rounded-3xl border-2 border-destructive/40 bg-destructive/5 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-destructive" />
            <h3 className="font-semibold text-destructive">Emergency</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Call your configured emergency number ({profile.emergencyNumber || "112"}) immediately.
          </p>
          <Button
            onClick={() => setConfirm(true)}
            className="w-full h-14 text-base font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl shadow-lg shadow-destructive/30"
          >
            <Phone className="h-5 w-5" />
            Emergency Call · {profile.emergencyNumber || "112"}
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Recent flagged readings</h3>
          {flagged.length === 0 ? (
            <p className="text-sm text-muted-foreground">No flagged history yet.</p>
          ) : (
            <ul className="space-y-2">
              {flagged.map((r) => (
                <li key={r.t} className="rounded-2xl bg-card border border-border/50 p-3 text-sm flex justify-between">
                  <span>{new Date(r.t).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  <span className="text-muted-foreground">SpO₂ {r.spo2.toFixed(1)}% · {r.bpm} bpm</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Call emergency services?</AlertDialogTitle>
            <AlertDialogDescription>
              This will open your phone dialer and call <strong>{profile.emergencyNumber || "112"}</strong>. Only proceed in a real emergency.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={callEmergency}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              <Phone className="h-4 w-4" /> Call now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}
