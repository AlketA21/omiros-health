import type { Status } from "@/lib/health-store";

const map: Record<Status, { label: string; cls: string; dot: string }> = {
  normal: { label: "Normal", cls: "bg-success/15 text-success", dot: "bg-success" },
  warning: { label: "Warning", cls: "bg-warning/20 text-warning-foreground", dot: "bg-warning" },
  critical: { label: "Critical", cls: "bg-destructive/15 text-destructive", dot: "bg-destructive" },
};

export function StatusBadge({ status }: { status: Status }) {
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${s.cls}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot} ${status !== "normal" ? "animate-pulse-soft" : ""}`} />
      {s.label}
    </span>
  );
}
