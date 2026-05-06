import { r as reactExports, W as jsxRuntimeExports } from "./worker-entry-CPkCnwxb.js";
import { u as useHealth, A as AppShell, g as getStatus } from "./AppShell-DGzH2ThH.js";
import { B as Button } from "./button-ycKCa52k.js";
import { S as StatusBadge } from "./StatusBadge-BPU9Qxbh.js";
import { D as Droplet } from "./droplet-CR9p8I_5.js";
import { H as Heart } from "./heart-BzgQ75hc.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-BWwmhB5p.js";
import "./utils-Dks2Iv1j.js";
function HistoryPage() {
  const {
    history
  } = useHealth();
  const [filter, setFilter] = reactExports.useState("all");
  const now = Date.now();
  const cutoff = filter === "day" ? now - 864e5 : filter === "week" ? now - 7 * 864e5 : 0;
  const items = history.filter((r) => r.t >= cutoff);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold", children: "History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Past sessions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["day", "week", "all"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: filter === f ? "default" : "secondary", size: "sm", className: "rounded-full capitalize", onClick: () => setFilter(f), children: f === "all" ? "All" : `Last ${f}` }, f)) }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-card border border-border/50 p-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "No measurements yet.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "Start a monitoring session to record one."
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: items.map((r) => {
      const d = new Date(r.t);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-2xl bg-card border border-border/50 p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
            d.toLocaleDateString([], {
              month: "short",
              day: "numeric"
            }),
            " · ",
            d.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "h-3.5 w-3.5 text-primary" }),
              " ",
              r.spo2.toFixed(1),
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5 text-success" }),
              " ",
              r.bpm,
              " bpm"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: getStatus(r) })
      ] }, r.t);
    }) })
  ] }) });
}
export {
  HistoryPage as component
};
