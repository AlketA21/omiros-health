import { W as jsxRuntimeExports } from "./worker-entry-CPkCnwxb.js";
import { u as useNavigate, L as Link } from "./router-BWwmhB5p.js";
import { u as useHealth, g as getStatus, b as analyzeRisk, A as AppShell, d as Activity, F as FingerprintPattern, i as startMonitoring } from "./AppShell-DGzH2ThH.js";
import { S as StatusBadge } from "./StatusBadge-BPU9Qxbh.js";
import { R as RiskCard, P as Play } from "./RiskCard-DqxOiqaS.js";
import { B as Button } from "./button-ycKCa52k.js";
import { D as Droplet } from "./droplet-CR9p8I_5.js";
import { H as Heart } from "./heart-BzgQ75hc.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./brain-CAlCTI80.js";
import "./utils-Dks2Iv1j.js";
function VitalCard({
  label,
  value,
  unit,
  icon,
  color,
  pulse
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5 transition-transform hover:-translate-y-0.5 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-2xl pointer-events-none", style: {
      background: "var(--primary)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground uppercase tracking-[0.18em]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-2xl flex items-center justify-center ${color} ${pulse ? "animate-pulse-soft" : ""}`, children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tabular-nums tracking-tight", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: unit })
    ] })
  ] });
}
function Dashboard() {
  const {
    current,
    monitoring,
    series,
    history
  } = useHealth();
  const navigate = useNavigate();
  const status = getStatus(current);
  const analysis = analyzeRisk(series.length ? series : history.slice(0, 10));
  const handleStart = () => {
    if (!monitoring) startMonitoring();
    navigate({
      to: "/monitor"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Vitals overview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(VitalCard, { label: "SpO₂", value: current.spo2.toFixed(1), unit: "%", color: "bg-primary/15 text-primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(VitalCard, { label: "Heart rate", value: String(current.bpm), unit: "BPM", color: "bg-success/15 text-success", pulse: monitoring, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RiskCard, { analysis }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-success p-6 text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20", style: {
        backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Begin AI session" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 mb-4", children: "Live monitoring with intelligent risk analysis based on behavioral patterns." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleStart, size: "lg", className: "w-full bg-card text-foreground hover:bg-card/90 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "mr-2 h-4 w-4" }),
          "Start Live Monitoring"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/scan", className: "mt-3 flex items-center justify-center gap-2 rounded-2xl bg-card/20 hover:bg-card/30 transition-colors py-2.5 text-sm font-medium backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, { className: "h-4 w-4" }),
          "Quick Finger Scan"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/report", className: "glass rounded-2xl p-4 hover:border-primary/40 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Latest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mt-1", children: "Medical report" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/history", className: "glass rounded-2xl p-4 hover:border-primary/40 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Trends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold mt-1", children: [
          history.length,
          " sessions"
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Dashboard as component
};
