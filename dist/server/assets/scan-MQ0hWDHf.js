import { r as reactExports, W as jsxRuntimeExports } from "./worker-entry-CPkCnwxb.js";
import { u as useNavigate } from "./router-BWwmhB5p.js";
import { c as createLucideIcon, g as getStatus, A as AppShell, F as FingerprintPattern, a as FileText, r as recordReading } from "./AppShell-DGzH2ThH.js";
import { S as StatusBadge } from "./StatusBadge-BPU9Qxbh.js";
import { B as Button } from "./button-ycKCa52k.js";
import { C as Check } from "./check-MDEJM92z.js";
import { D as Droplet } from "./droplet-CR9p8I_5.js";
import { H as Heart } from "./heart-BzgQ75hc.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Dks2Iv1j.js";
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function ScanPage() {
  const [phase, setPhase] = reactExports.useState("idle");
  const [progress, setProgress] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(4e3);
  const [result, setResult] = reactExports.useState(null);
  const [livePulse, setLivePulse] = reactExports.useState(null);
  const rafRef = reactExports.useRef(null);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  const start = () => {
    setResult(null);
    setProgress(0);
    setLivePulse(null);
    const dur = 3e3 + Math.random() * 2e3;
    setDuration(dur);
    setPhase("scanning");
    const startedAt = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - startedAt) / dur);
      setProgress(p);
      if (p > 0.35) {
        setLivePulse(Math.round(70 + Math.sin(now / 300) * 8 + Math.random() * 4));
      }
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        const spo2 = Math.round((92 + Math.random() * 8) * 10) / 10;
        const bpm = Math.round(65 + Math.random() * 45);
        const reading = {
          t: Date.now(),
          spo2,
          bpm
        };
        setResult(reading);
        recordReading(reading);
        setPhase("done");
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };
  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPhase("idle");
    setProgress(0);
    setResult(null);
    setLivePulse(null);
  };
  const pct = Math.round(progress * 100);
  const status = result ? getStatus(result) : "normal";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: "AI Scan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Finger Scan" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden", children: [
      phase === "scanning" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan-sweep" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 w-48 flex items-center justify-center", children: [
        phase === "scanning" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-primary/10 animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-4 rounded-full bg-primary/15 animate-pulse-soft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 -rotate-90", viewBox: "0 0 100 100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "46", className: "fill-none stroke-muted", strokeWidth: "3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "46", className: `fill-none transition-[stroke-dashoffset] ${phase === "done" ? "stroke-success" : "stroke-primary"}`, strokeWidth: "3", strokeLinecap: "round", strokeDasharray: 2 * Math.PI * 46, strokeDashoffset: 2 * Math.PI * 46 * (1 - progress) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative h-28 w-28 rounded-full flex items-center justify-center transition-colors ${phase === "scanning" ? "bg-primary/15 text-primary animate-pulse-soft" : phase === "done" ? "bg-success/15 text-success" : "bg-primary/10 text-primary"}`, children: phase === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-12 w-12" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, { className: "h-14 w-14" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 min-h-[4rem] relative", children: [
        phase === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Ready to scan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tap start, then place your finger on the camera." })
        ] }),
        phase === "scanning" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Place your finger on the camera"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground tabular-nums", children: [
            "Analyzing… ",
            pct,
            "% ",
            livePulse ? `· detected ~${livePulse} bpm` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mt-1", children: [
            "Duration ~",
            (duration / 1e3).toFixed(1),
            "s"
          ] })
        ] }),
        phase === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Scan complete" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status }) })
        ] })
      ] })
    ] }),
    phase === "done" && result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "SpO₂" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-2xl flex items-center justify-center bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "h-5 w-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tabular-nums", children: result.spo2.toFixed(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "%" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "Heart rate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-2xl flex items-center justify-center bg-success/15 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tabular-nums", children: result.bpm }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "BPM" })
        ] })
      ] })
    ] }),
    phase !== "scanning" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: phase === "done" ? reset : start, size: "lg", className: `w-full rounded-2xl ${phase === "idle" ? "animate-glow" : ""}`, children: phase === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-2 h-4 w-4" }),
      " Scan again"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, { className: "mr-2 h-4 w-4" }),
      " Start Finger Scan"
    ] }) }),
    phase === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "lg", className: "w-full rounded-2xl", onClick: () => navigate({
      to: "/report"
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4" }),
      "View AI medical report"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-center text-muted-foreground uppercase tracking-wider", children: "Simulated demo — not a medical device" })
  ] }) });
}
export {
  ScanPage as component
};
