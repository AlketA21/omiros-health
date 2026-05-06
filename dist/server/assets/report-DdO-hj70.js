import { W as jsxRuntimeExports } from "./worker-entry-CPkCnwxb.js";
import { L as Link } from "./router-BWwmhB5p.js";
import { c as createLucideIcon, u as useHealth, b as analyzeRisk, A as AppShell, a as FileText, d as Activity } from "./AppShell-DGzH2ThH.js";
import { D as Droplet } from "./droplet-CR9p8I_5.js";
import { H as Heart } from "./heart-BzgQ75hc.js";
import { B as Brain } from "./brain-CAlCTI80.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function ReportPage() {
  const {
    history,
    series,
    profile
  } = useHealth();
  const source = series.length > 1 ? series : history.slice(0, 20);
  const analysis = analyzeRisk(source);
  if (source.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Medical Report" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "AI-generated summary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-10 w-10 mx-auto text-muted-foreground mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "No data yet. Run a scan or live session to generate a report." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/scan", className: "text-primary text-sm font-medium underline", children: "Start a Finger Scan →" })
      ] })
    ] }) });
  }
  const avgSpo2 = source.reduce((s, r) => s + r.spo2, 0) / source.length;
  const avgBpm = source.reduce((s, r) => s + r.bpm, 0) / source.length;
  const minSpo2 = Math.min(...source.map((r) => r.spo2));
  const maxSpo2 = Math.max(...source.map((r) => r.spo2));
  const minBpm = Math.min(...source.map((r) => r.bpm));
  const maxBpm = Math.max(...source.map((r) => r.bpm));
  const latest = source[source.length - 1] ?? source[0];
  const riskColor = analysis.risk === "low" ? "text-success" : analysis.risk === "medium" ? "text-warning-foreground" : "text-destructive";
  const summary = analysis.risk === "low" ? "Vital signs are within healthy physiological ranges. No intervention recommended at this time." : analysis.risk === "medium" ? "Some vital readings show mild deviation. Continue monitoring and consider rest, hydration, and breathing exercises." : "Vitals indicate elevated physiological stress. Pause activity, rest, and consult a healthcare provider if symptoms persist.";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "AI generated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Medical Report" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(latest.t).toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
        profile.name,
        " · ",
        profile.age,
        "y"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
        "Patient ID OMR-",
        Math.abs(latest.t).toString().slice(-6)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-primary" }),
        " Latest scan"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "h-3 w-3 text-primary" }),
            " SpO₂"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-semibold tabular-nums", children: [
            latest.spo2.toFixed(1),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground ml-1", children: "%" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3 w-3 text-success" }),
            " Heart rate"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-semibold tabular-nums", children: [
            latest.bpm,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground ml-1", children: "bpm" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold", children: [
        "Statistics (",
        source.length,
        " readings)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Avg SpO₂", value: `${avgSpo2.toFixed(1)}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Avg BPM", value: `${Math.round(avgBpm)}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "SpO₂ range", value: `${minSpo2.toFixed(1)} – ${maxSpo2.toFixed(1)}%` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "BPM range", value: `${minBpm} – ${maxBpm}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-primary" }),
        " AI evaluation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-base font-semibold capitalize ${riskColor}`, children: [
        analysis.risk,
        " risk · score ",
        analysis.score,
        "/100"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs text-muted-foreground space-y-1 mt-3", children: analysis.factors.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "›" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
      ] }, f)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-center text-muted-foreground uppercase tracking-wider", children: "Simulated demo — not a medical device" })
  ] }) });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold tabular-nums mt-0.5", children: value })
  ] });
}
export {
  ReportPage as component
};
