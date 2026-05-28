import { c as reactExports, q as jsxRuntimeExports } from "./worker-entry-CEjtRfNm.js";
import { u as useNavigate, t as toast } from "./router-BKHqUSMs.js";
import { u as useAuth, B as Bell, a as BottomNav, A as AddHabitSheet, g as getHabits, b as getLogs, s as saveHabits, c as saveLogs } from "./use-auth-DXYbUCVQ.js";
import { g as getNotificationPermission, i as isNotificationSupported, T as Trash2, L as Leaf, r as requestNotificationPermission, a as rescheduleAllReminders } from "./notifications-FdIQGryn.js";
import { c as createLucideIcon } from "./createLucideIcon-CtNVnmO7.js";
import { C as ChevronRight } from "./chevron-right-BR6YlDTg.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./x-D2Mqqfik.js";
const __iconNode$7 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$7);
const __iconNode$6 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$4);
const __iconNode$3 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
];
const Moon = createLucideIcon("moon", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const THEME_KEY = "continuum_theme";
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}
function useTheme() {
  const [theme, setThemeState] = reactExports.useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem(THEME_KEY) || "light";
  });
  const setTheme = reactExports.useCallback((t) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }, []);
  reactExports.useEffect(() => {
    applyTheme(theme);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);
  const resolved = theme === "system" ? getSystemTheme() : theme;
  return { theme, resolved, setTheme };
}
function SettingsPage() {
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [notifPermission, setNotifPermission] = reactExports.useState(getNotificationPermission());
  const handleExport = () => {
    const data = {
      habits: getHabits(),
      logs: getLogs(),
      exportedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `continuum-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result);
        if (data.habits && Array.isArray(data.habits)) {
          saveHabits(data.habits);
        }
        if (data.logs && Array.isArray(data.logs)) {
          saveLogs(data.logs);
        }
        toast.success("Data imported successfully");
      } catch {
        toast.error("Invalid backup file");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleClear = async () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    saveHabits([]);
    saveLogs([]);
    if (user) {
      try {
        const {
          supabase
        } = await import("./client-CWeVlm3m.js");
        await supabase.from("habit_logs").delete().eq("user_id", user.id);
        await supabase.from("habits").delete().eq("user_id", user.id);
      } catch (err) {
        console.error("Failed to clear cloud data:", err);
        toast.error("Failed to clear cloud data");
        setConfirmClear(false);
        return;
      }
    }
    setConfirmClear(false);
    toast.success("All data cleared");
  };
  const handleAdd = (habit) => {
    const updated = [...getHabits(), habit];
    saveHabits(updated);
  };
  const handleNotificationToggle = async () => {
    if (notifPermission === "granted") {
      toast("To disable notifications, use your browser settings");
      return;
    }
    const result = await requestNotificationPermission();
    setNotifPermission(result);
    if (result === "granted") {
      toast.success("Notifications enabled");
      rescheduleAllReminders(getHabits());
    } else if (result === "denied") {
      toast.error("Notifications blocked by browser");
    }
  };
  const handleSignOut = async () => {
    await signOut();
    navigate({
      to: "/login"
    });
    toast.success("Signed out");
  };
  const themeOptions = [{
    value: "light",
    icon: Sun,
    label: "Light"
  }, {
    value: "dark",
    icon: Moon,
    label: "Dark"
  }, {
    value: "system",
    icon: Monitor,
    label: "Auto"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-5 pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground font-medium", children: "Preferences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground mt-0.5 tracking-tight", style: {
          lineHeight: "1.2"
        }, children: "Settings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "40ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: user.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Syncing to cloud" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors active:scale-95", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
              "Sign out"
            ] })
          ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
            to: "/login"
          }), className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sign in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Sync your habits across devices" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "60ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Appearance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] p-1.5 flex gap-1", children: themeOptions.map(({
            value,
            icon: Icon,
            label
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTheme(value), className: `flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 active:scale-[0.97] ${theme === value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 transition-transform duration-300 ${theme === value ? "rotate-0" : ""}` }),
            label
          ] }, value)) })
        ] }),
        isNotificationSupported() && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "90ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleNotificationToggle, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
            notifPermission === "granted" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: notifPermission === "granted" ? "Notifications enabled" : "Enable notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: notifPermission === "granted" ? "Reminders will fire at scheduled times" : notifPermission === "denied" ? "Blocked — update in browser settings" : "Get reminded to complete your habits" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-6 rounded-full transition-colors ${notifPermission === "granted" ? "bg-primary" : "bg-muted"} flex items-center px-0.5`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifPermission === "granted" ? "translate-x-4" : "translate-x-0"}` }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "120ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "Data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] divide-y divide-border/50 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExport, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Export data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Download your habits as JSON" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => fileInputRef.current?.click(), className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Import data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Restore from a JSON backup" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: ".json", className: "hidden", onChange: handleImport }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleClear, className: "w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-destructive/5 transition-colors active:scale-[0.99]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-destructive flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: confirmClear ? "Tap again to confirm" : "Clear all data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: confirmClear ? "This cannot be undone" : "Remove all habits and logs" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up-blur", style: {
          animationDelay: "180ms"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-medium text-muted-foreground mb-2.5 uppercase tracking-wider", children: "About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Continuum" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Version 1.0.0 · Built with care" })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { onAddClick: () => setSheetOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHabitSheet, { open: sheetOpen, onClose: () => setSheetOpen(false), onAdd: handleAdd })
  ] });
}
export {
  SettingsPage as component
};
