import { Link, useLocation } from "@tanstack/react-router";
import { Activity, Bell, FileText, Fingerprint, History, LayoutDashboard, User } from "lucide-react";
import { useHydrated } from "@/lib/health-store";

const tabs = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/scan", label: "Scan", icon: Fingerprint },
  { to: "/monitor", label: "Live", icon: Activity },
  { to: "/history", label: "History", icon: History },
  { to: "/report", label: "Report", icon: FileText },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  useHydrated();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative pb-24">
        <header className="px-5 pt-6 pb-2">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center shadow-lg shadow-primary/30">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight tracking-tight">
                Omiros <span className="text-gradient">Health AI</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground leading-tight">
                Intelligent monitoring
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1 px-5 py-3 animate-fade-in">{children}</main>

        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md glass border-t border-border">
          <ul className="grid grid-cols-7">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active = pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex flex-col items-center gap-1 py-3 text-[10px] transition-colors ${
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] ${active ? "scale-110" : ""} transition-transform`} />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
