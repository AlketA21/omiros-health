import { c as createLucideIcon } from "./AppShell-DGzH2ThH.js";
import { W as jsxRuntimeExports } from "./worker-entry-CPkCnwxb.js";
import { B as Brain } from "./brain-CAlCTI80.js";
const __iconNode$3 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const riskMap = {
  low: { label: "Low risk", cls: "text-success", bar: "bg-success", ring: "ring-success/40" },
  medium: { label: "Medium risk", cls: "text-warning-foreground", bar: "bg-warning", ring: "ring-warning/40" },
  high: { label: "High risk", cls: "text-destructive", bar: "bg-destructive", ring: "ring-destructive/40" }
};
function RiskCard({ analysis }) {
  const r = riskMap[analysis.risk];
  const TrendIcon = analysis.trend === "improving" ? TrendingUp : analysis.trend === "worsening" ? TrendingDown : Minus;
  const trendColor = analysis.trend === "improving" ? "text-success" : analysis.trend === "worsening" ? "text-destructive" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `glass rounded-3xl p-5 ring-1 ${r.ring} animate-fade-in`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-2xl bg-primary/15 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "AI Risk Analysis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-base font-semibold ${r.cls}`, children: r.label })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 text-xs font-medium ${trendColor}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: analysis.trend })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Risk score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
          analysis.score,
          "/100"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full ${r.bar} transition-all duration-700 ease-out`,
          style: { width: `${analysis.score}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs text-muted-foreground space-y-1", children: analysis.factors.slice(0, 3).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "›" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
    ] }, f)) })
  ] });
}
export {
  Play as P,
  RiskCard as R
};
