import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowLeft, Check, ChevronLeft, ChevronRight, Mail, X, Calendar as CalendarIcon, Clock } from "lucide-react";

const INDIGO = "#03045E";
const TEAL = "#02C39A";

// Zoho Bookings portal base URL — prefilled params are appended at runtime.
const ZOHO_BASE_URL = "https://newcoteltradeltd.zohobookings.com/portal-embed#/4944664000000040045";
const ZOHO_EMBED_SCRIPT = "https://bookings.nimbuspop.com/assets/embed.js";

const CONCERNS = [
  "Erectile Dysfunction & Urological Recovery",
  "Neurology & Stroke Rehabilitation",
  "Autism Spectrum Protocols",
  "Autoimmune & Systemic Renewal",
  "Cellular Rejuvenation & Longevity",
  "Diabetes & Metabolic Repair",
  "Orthopedic Spine & Joint Regeneration",
  "Other / Not Listed",
];

const TIMELINES = [
  "As soon as possible (Within 30 days)",
  "Next 2–3 months",
  "Just gathering information for future travel",
];

const DIAGNOSIS = ["Yes", "No", "In Progress"] as const;

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada",
  "Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia",
  "Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia",
  "Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
  "Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau",
  "Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal",
  "Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
  "Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabwe",
];

// Common country dial codes
const DIAL_CODES: { code: string; name: string; dial: string }[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "GE", name: "Georgia", dial: "+995" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "UA", name: "Ukraine", dial: "+380" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "KE", name: "Kenya", dial: "+254" },
];

const TIMEZONES = [
  "Pacific/Honolulu","America/Anchorage","America/Los_Angeles","America/Denver","America/Chicago","America/New_York",
  "America/Toronto","America/Mexico_City","America/Bogota","America/Sao_Paulo","America/Buenos_Aires",
  "Atlantic/Azores","Europe/London","Europe/Lisbon","Europe/Madrid","Europe/Paris","Europe/Berlin","Europe/Rome",
  "Europe/Amsterdam","Europe/Stockholm","Europe/Warsaw","Europe/Athens","Europe/Istanbul","Europe/Moscow",
  "Asia/Tbilisi","Asia/Dubai","Asia/Tehran","Asia/Karachi","Asia/Kolkata","Asia/Dhaka","Asia/Bangkok",
  "Asia/Singapore","Asia/Hong_Kong","Asia/Shanghai","Asia/Tokyo","Asia/Seoul","Australia/Perth",
  "Australia/Sydney","Pacific/Auckland",
];

const CLINIC_START_HOUR = 9;
const CLINIC_END_HOUR = 18;

function detectTimezone() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tbilisi"; }
  catch { return "Asia/Tbilisi"; }
}
function formatTzLabel(tz: string) {
  try {
    const dtf = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" });
    const off = dtf.formatToParts(new Date()).find((p) => p.type === "timeZoneName")?.value ?? "";
    return `${tz.replace(/_/g, " ")} (${off})`;
  } catch { return tz; }
}
function tbilisiDateToUTC(y: number, m: number, d: number, h: number, min: number) {
  return new Date(Date.UTC(y, m, d, h - 4, min));
}
function formatInTz(date: Date, tz: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}
function formatDateLong(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

type Step = 1 | 2 | 3 | 4;

export default function BookingSection() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Page 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dialCode, setDialCode] = useState("+995");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  // Page 2
  const [concern, setConcern] = useState("");
  const [timeline, setTimeline] = useState("");
  const [diagnosis, setDiagnosis] = useState<typeof DIAGNOSIS[number] | "">("");
  const [notes, setNotes] = useState("");

  // Page 3
  const [userTz, setUserTz] = useState<string>("Asia/Tbilisi");
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const n = new Date(); return { y: n.getFullYear(), m: n.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => { setUserTz(detectTimezone()); }, []);

  // Load Zoho Bookings embed script and mount the inline widget once Step 3 is reached.
  useEffect(() => {
    if (step !== 3) return;

    const params = new URLSearchParams({
      Name: fullName,
      Email: email,
      Phone: `${dialCode} ${phone}`.trim(),
      "Primary Area of Concern": concern,
      "Timeline for Treatment": timeline,
      "Formal Clinical Diagnosis": diagnosis,
      "Brief Case Notes": notes || "",
    });
    const dynamicZohoUrl = `${ZOHO_BASE_URL}?${params.toString()}`;

    let cancelled = false;

    const mountWidget = () => {
      const Bookings = (window as any).Bookings;
      const container = document.getElementById("inline-container");
      if (cancelled || !Bookings || !container) return;
      container.innerHTML = "";
      try {
        Bookings.inlineEmbed({
          parent: container,
          url: dynamicZohoUrl,
          height: "650px",
          width: "100%",
        });
        setCalendarLoaded(true);
      } catch (e) {
        console.error("Zoho Bookings inlineEmbed error:", e);
      }
    };

    const existing = document.querySelector(`script[src="${ZOHO_EMBED_SCRIPT}"]`) as HTMLScriptElement | null;
    if (existing && (window as any).Bookings) {
      mountWidget();
    } else if (existing) {
      existing.addEventListener("load", mountWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = ZOHO_EMBED_SCRIPT;
      script.async = true;
      script.onload = mountWidget;
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      const container = document.getElementById("inline-container");
      if (container) container.innerHTML = "";
    };
  }, [step, fullName, email, dialCode, phone, concern, timeline, diagnosis, notes]);

  const page1Valid = fullName.trim().length > 1 && /.+@.+\..+/.test(email) && phone.trim().length >= 4 && country;
  const page2Valid = concern && timeline && diagnosis;

  const goNext = (to: Step) => { setDirection(1); setStep(to); };
  const goBack = (to: Step) => { setDirection(-1); setStep(to); };

  const calendar = useMemo(() => {
    const first = new Date(viewMonth.y, viewMonth.m, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(viewMonth.y, viewMonth.m + 1, 0).getDate();
    const cells: Array<Date | null> = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewMonth.y, viewMonth.m, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewMonth]);

  const today = new Date(); today.setHours(0, 0, 0, 0);

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    const out: Date[] = [];
    for (let h = CLINIC_START_HOUR; h < CLINIC_END_HOUR; h++) {
      for (const m of [0, 30]) {
        out.push(tbilisiDateToUTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), h, m));
      }
    }
    return out.filter((d) => d.getTime() > Date.now());
  }, [selectedDate]);

  const monthLabel = new Date(viewMonth.y, viewMonth.m, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const input = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition";
  const inputStyle = { boxShadow: "none" } as const;
  const focusRing = `focus:ring-[${TEAL}] focus:border-[${TEAL}]`;
  const label = "block text-xs font-semibold uppercase tracking-wider mb-2";
  const labelStyle = { color: INDIGO };

  const steps: { n: 1 | 2 | 3; label: string }[] = [
    { n: 1, label: "Information" },
    { n: 2, label: "Medical Briefing" },
    { n: 3, label: "Calendar" },
  ];

  const slideClass = direction === 1 ? "animate-[slideInRight_.35s_ease-out]" : "animate-[slideInLeft_.35s_ease-out]";

  return (
    <section id="admissions" className="py-28 bg-white border-t border-slate-100">
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(24px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-24px) } to { opacity: 1; transform: translateX(0) } }
      `}</style>

      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: INDIGO, lineHeight: "1.15" }}>
            Schedule a 30-Minute Medical Consultation
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            Speak directly with our clinical team in Tbilisi. Complete your intake and reserve your preferred time.
          </p>
        </div>

        {/* Step tracker */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {steps.map((s, i) => {
              const isActive = step === s.n;
              const isDone = step > s.n;
              return (
                <div key={s.n} className="flex items-center gap-2 sm:gap-4 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border transition-all shrink-0"
                      style={{
                        background: isDone ? TEAL : isActive ? INDIGO : "#fff",
                        borderColor: isDone ? TEAL : isActive ? INDIGO : "#e2e8f0",
                        color: isDone || isActive ? "#fff" : "#94a3b8",
                      }}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : String(s.n).padStart(2, "0")}
                    </div>
                    <div className="hidden sm:flex flex-col leading-tight min-w-0">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                        {String(s.n).padStart(2, "0")}
                      </span>
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: isActive ? INDIGO : isDone ? INDIGO : "#94a3b8" }}
                      >
                        {s.label}
                      </span>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px bg-slate-200 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 transition-all duration-500"
                        style={{ width: isDone ? "100%" : "0%", background: TEAL }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10 overflow-hidden">
          {/* STEP 1 */}
          {step === 1 && (
            <div key="s1" className={slideClass}>
              <h3 className="text-xl font-semibold mb-1" style={{ color: INDIGO }}>Contact Information</h3>
              <p className="text-sm text-slate-500 mb-8">Tell us a bit about you so we can match you with the right specialist.</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={label} style={labelStyle}>Full Name</label>
                  <input className={`${input} ${focusRing}`} style={inputStyle} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} style={labelStyle}>Email Address</label>
                  <input type="email" className={`${input} ${focusRing}`} style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} style={labelStyle}>Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      className={`rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 ${focusRing} transition w-32 shrink-0`}
                      value={dialCode}
                      onChange={(e) => setDialCode(e.target.value)}
                    >
                      {DIAL_CODES.map((c) => (
                        <option key={c.code} value={c.dial}>{c.dial} {c.code}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      className={`${input} ${focusRing} flex-1`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ""))}
                      placeholder="555 123 4567"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className={label} style={labelStyle}>Country of Residence</label>
                  <select className={`${input} ${focusRing}`} style={inputStyle} value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">Select your country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  disabled={!page1Valid}
                  onClick={() => goNext(2)}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}
                >
                  Continue to Medical Briefing
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div key="s2" className={slideClass}>
              <h3 className="text-xl font-semibold mb-1" style={{ color: INDIGO }}>Medical Briefing</h3>
              <p className="text-sm text-slate-500 mb-8">Help our clinical team prepare for your consultation.</p>

              <div className="space-y-7">
                {/* Concern */}
                <div>
                  <label className={label} style={labelStyle}>Primary Area of Concern</label>
                  <select className={`${input} ${focusRing}`} style={inputStyle} value={concern} onChange={(e) => setConcern(e.target.value)}>
                    <option value="">Select an area</option>
                    {CONCERNS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label className={label} style={labelStyle}>Timeline for Treatment</label>
                  <div className="grid gap-2.5">
                    {TIMELINES.map((t) => {
                      const sel = timeline === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTimeline(t)}
                          className="flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all"
                          style={{
                            borderColor: sel ? TEAL : "#e2e8f0",
                            background: sel ? `${TEAL}0d` : "#fff",
                            color: INDIGO,
                          }}
                        >
                          <span
                            className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                            style={{ borderColor: sel ? TEAL : "#cbd5e1" }}
                          >
                            {sel && <span className="w-2 h-2 rounded-full" style={{ background: TEAL }} />}
                          </span>
                          <span className="font-medium">{t}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Diagnosis */}
                <div>
                  <label className={label} style={labelStyle}>Have you received a formal clinical diagnosis for this condition?</label>
                  <div className="flex flex-wrap gap-2.5">
                    {DIAGNOSIS.map((d) => {
                      const sel = diagnosis === d;
                      return (
                        <button
                          type="button"
                          key={d}
                          onClick={() => setDiagnosis(d)}
                          className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all"
                          style={{
                            borderColor: sel ? TEAL : "#e2e8f0",
                            background: sel ? TEAL : "#fff",
                            color: sel ? "#fff" : INDIGO,
                          }}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className={label} style={labelStyle}>Brief Case Notes (Optional)</label>
                  <textarea
                    maxLength={300}
                    rows={4}
                    className={`${input} ${focusRing} resize-none`}
                    style={inputStyle}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Please share any specific symptoms or goals you wish to address during your consultation..."
                  />
                  <div className="mt-1.5 text-right text-[11px] text-slate-400">{notes.length}/300</div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={() => goBack(1)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  disabled={!page2Valid}
                  onClick={() => goNext(3)}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}
                >
                  Proceed to Scheduling
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div key="s3" className={slideClass}>
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{ color: INDIGO }}>Choose Your Date & Time</h3>
                  <p className="text-sm text-slate-500">Pick a 30-minute slot. Availability is synced live with our medical team's calendar.</p>
                </div>
              </div>

              <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-white">
                {!calendarLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-slate-200 animate-spin"
                      style={{ borderTopColor: "#64748b" }}
                      aria-label="Loading calendar"
                    />
                    <p className="text-sm text-slate-500">Loading availability…</p>
                  </div>
                )}
                <div
                  className="calendly-inline-widget w-full"
                  data-url={CALENDAR_URL}
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button onClick={() => goBack(2)} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => goNext(4)}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-lg"
                  style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}
                >
                  I've Booked My Slot
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — confirmation */}
          {step === 4 && (
            <div key="s4" className={`${slideClass} text-center py-6`}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${TEAL}1f` }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}>
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: INDIGO }}>Consultation Request Received</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Thank you{fullName ? `, ${fullName.split(" ")[0]}` : ""}. Your clinical intake has been submitted and your scheduled time is locked in our medical team's calendar.
              </p>
              <p className="text-sm text-slate-500 mt-3">A confirmation email with your meeting link has been sent to {email}.</p>


              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => setShowEmail(true)} className="inline-flex items-center gap-2 rounded-xl text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition active:scale-[0.97]" style={{ background: INDIGO }}>
                  <Mail className="w-4 h-4" /> Preview confirmation email
                </button>
                <button
                  onClick={() => {
                    setStep(1); setDirection(1);
                    setFullName(""); setEmail(""); setPhone(""); setCountry("");
                    setConcern(""); setTimeline(""); setDiagnosis(""); setNotes("");
                    setSelectedDate(null); setSelectedSlot(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Book another consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email preview modal */}
      {showEmail && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowEmail(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Mail className="w-4 h-4" style={{ color: TEAL }} /> Email preview
              </div>
              <button onClick={() => setShowEmail(false)} className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-slate-700 leading-relaxed">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <p className="text-xs text-slate-400 mb-1">To: {email}</p>
                <p className="font-semibold" style={{ color: INDIGO }}>Subject: Confirmed: Your 30-Minute StemPlus Consultation</p>
              </div>
              <p className="mb-3">Dear {fullName.split(" ")[0]},</p>
              <p className="mb-3">Thank you for requesting a consultation with StemPlus Clinic in Tbilisi, Georgia. We have successfully received your clinical details and look forward to discussing your personalized regenerative treatment plan.</p>
              <p className="mb-3">Your 30-minute medical consultation is confirmed at the time you selected in our scheduling calendar. You will receive a separate calendar invitation with the exact date, time, and meeting link.</p>

              <p className="mb-3">Please join your clinical consultant at the scheduled time using our secure Google Meets link:<br />
                <a href="https://meet.google.com/stemplus-clinic-consultation" className="font-medium underline break-all" style={{ color: TEAL }}>https://meet.google.com/stemplus-clinic-consultation</a></p>
              <p className="mb-3">In the meantime, if you need to submit any medical records or laboratory diagnostics ahead of our call, please reply directly to this email at <a className="underline" style={{ color: TEAL }} href="mailto:stemplusclinic@gmail.com">stemplusclinic@gmail.com</a>.</p>
              <p className="mb-1">Warm regards,</p>
              <p className="font-semibold" style={{ color: INDIGO }}>The StemPlus Medical Coordination Team</p>
              <p>Tbilisi, Georgia</p>
              <p>+995 595 92 28 92</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
