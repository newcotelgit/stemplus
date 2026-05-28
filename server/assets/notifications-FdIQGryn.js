import { c as createLucideIcon } from "./createLucideIcon-CtNVnmO7.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const activeTimers = /* @__PURE__ */ new Map();
function isNotificationSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}
function getNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
}
async function requestNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";
  const result = await Notification.requestPermission();
  return result;
}
function scheduleReminder(habit) {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;
  if (!habit.reminderTime) return;
  cancelReminder(habit.id);
  const [hours, minutes] = habit.reminderTime.split(":").map(Number);
  const now = /* @__PURE__ */ new Date();
  const target = /* @__PURE__ */ new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) return;
  const ms = target.getTime() - now.getTime();
  const timer = setTimeout(() => {
    new Notification("Continuum reminder", {
      body: `Time to ${habit.name.toLowerCase()}`,
      icon: "/favicon.ico",
      tag: `habit-${habit.id}`
    });
    activeTimers.delete(habit.id);
  }, ms);
  activeTimers.set(habit.id, timer);
}
function cancelReminder(habitId) {
  const timer = activeTimers.get(habitId);
  if (timer) {
    clearTimeout(timer);
    activeTimers.delete(habitId);
  }
}
function rescheduleAllReminders(habits) {
  for (const [id] of activeTimers) {
    cancelReminder(id);
  }
  for (const habit of habits) {
    scheduleReminder(habit);
  }
}
export {
  Leaf as L,
  Trash2 as T,
  rescheduleAllReminders as a,
  getNotificationPermission as g,
  isNotificationSupported as i,
  requestNotificationPermission as r,
  scheduleReminder as s
};
