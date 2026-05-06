import { createFileRoute } from "@tanstack/react-router";
import { Moon, Heart, Activity, Phone } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getBpmRange,
  getSpo2Thresholds,
  updateProfile,
  useHealth,
  type ActivityLevel,
  type StressLevel,
} from "@/lib/health-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Omiros" },
      { name: "description", content: "Manage your Omiros profile and personalized health parameters." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile } = useHealth();
  const bpm = getBpmRange(profile);
  const spo2 = getSpo2Thresholds(profile);
  const bmi = profile.height > 0 ? profile.weight / Math.pow(profile.height / 100, 2) : 0;

  return (
    <AppShell>
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Profile</h2>
          <p className="text-sm text-muted-foreground">Personalize your health profile</p>
        </div>

        <div className="rounded-3xl bg-card border border-border/50 p-5 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center text-primary-foreground text-xl font-semibold">
            {profile.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-muted-foreground">
              {profile.age} yrs · {profile.weight} kg · {profile.height} cm
              {bmi > 0 && <span> · BMI {bmi.toFixed(1)}</span>}
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border/50 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Personal</h3>
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" min={1} max={120} value={profile.age}
                onChange={(e) => updateProfile({ age: Number(e.target.value) || 0 })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" min={1} max={400} value={profile.weight}
                onChange={(e) => updateProfile({ weight: Number(e.target.value) || 0 })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" min={1} max={250} value={profile.height}
                onChange={(e) => updateProfile({ height: Number(e.target.value) || 0 })} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border/50 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Lifestyle</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Activity</Label>
              <Select value={profile.activity}
                onValueChange={(v) => updateProfile({ activity: v as ActivityLevel })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Stress</Label>
              <Select value={profile.stress}
                onValueChange={(v) => updateProfile({ stress: v as StressLevel })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="conditions">Health conditions (optional)</Label>
            <Textarea id="conditions" rows={2} placeholder="e.g. Asthma, Hypertension"
              value={profile.conditions}
              onChange={(e) => updateProfile({ conditions: e.target.value })} />
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border/50 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Personalized thresholds</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-primary/10 p-3 flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">BPM range</p>
                <p className="font-semibold">{bpm.min}–{bpm.warn}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-success/10 p-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">SpO₂ alert</p>
                <p className="font-semibold">&lt; {spo2.warn}%</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Tuned to your age, activity and stress level. High stress increases alert sensitivity.
          </p>
        </div>

        <div className="rounded-3xl bg-card border border-border/50 p-5 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Emergency</h3>
          <div className="space-y-1.5">
            <Label htmlFor="emer" className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> Emergency number
            </Label>
            <Input id="emer" type="tel" value={profile.emergencyNumber}
              onChange={(e) => updateProfile({ emergencyNumber: e.target.value })} />
            <p className="text-xs text-muted-foreground">Default: 112 (EU). Use 911 (US) or your local number.</p>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border/50 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
              <Moon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Dark mode</p>
              <p className="text-xs text-muted-foreground">Reduce eye strain at night</p>
            </div>
          </div>
          <Switch checked={profile.darkMode}
            onCheckedChange={(v) => updateProfile({ darkMode: v })} />
        </div>
      </div>
    </AppShell>
  );
}
