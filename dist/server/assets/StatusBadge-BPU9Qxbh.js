import { W as jsxRuntimeExports } from "./worker-entry-CPkCnwxb.js";
const map = {
  normal: { label: "Normal", cls: "bg-success/15 text-success", dot: "bg-success" },
  warning: { label: "Warning", cls: "bg-warning/20 text-warning-foreground", dot: "bg-warning" },
  critical: { label: "Critical", cls: "bg-destructive/15 text-destructive", dot: "bg-destructive" }
};
function StatusBadge({ status }) {
  const s = map[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${s.cls}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${s.dot} ${status !== "normal" ? "animate-pulse-soft" : ""}` }),
    s.label
  ] });
}
export {
  StatusBadge as S
};
