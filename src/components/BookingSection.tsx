import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowLeft, Check, ChevronLeft, ChevronRight, Mail, X, Calendar as CalendarIcon, Clock } from "lucide-react";

const TREATMENTS = [
  "Regenerative Orthopedics & Joint Reconstruction",
  "Advanced Metabolic Care & Diabetes Management",
  "Precision Neurorehabilitation & Autism Therapy",
  "Cellular Aesthetic Medicine & Trichology",
  "Systemic Biologics for Complex Chronic Conditions",
];

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

// Common IANA time zones for the dropdown
const TIMEZONES = [
  "Pacific/Honolulu","America/Anchorage","America/Los_Angeles","America/Denver","America/Chicago","America/New_York",
  "America/Toronto","America/Mexico_City","America/Bogota","America/Sao_Paulo","America/Buenos_Aires",
  "Atlantic/Azores","Europe/London","Europe/Lisbon","Europe/Madrid","Europe/Paris","Europe/Berlin","Europe/Rome",
  "Europe/Amsterdam","Europe/Stockholm","Europe/Warsaw","Europe/Athens","Europe/Istanbul","Europe/Moscow",
  "Asia/Tbilisi","Asia/Dubai","Asia/Tehran","Asia/Karachi","Asia/Kolkata","Asia/Dhaka","Asia/Bangkok",
  "Asia/Singapore","Asia/Hong_Kong","Asia/Shanghai","Asia/Tokyo","Asia/Seoul","Australia/Perth",
  "Australia/Sydney","Pacific/Auckland",
];

// Clinic hours: 09:00 – 18:00 Tbilisi time, 30-min slots
const CLINIC_TZ = "Asia/Tbilisi";
const CLINIC_START_HOUR = 9;
const CLINIC_END_HOUR = 18;

function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tbilisi";
  } catch {
    return "Asia/Tbilisi";
  }
}

function formatTzLabel(tz: string) {
  try {
    const dtf = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" });
    const parts = dtf.formatToParts(new Date());
    const off = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    return `${tz.replace(/_/g, " ")} (${off})`;
  } catch {
    return tz;
  }
}

// Build a UTC Date from a Tbilisi local Y/M/D/H/M
function tbilisiDateToUTC(y: number, m: number, d: number, h: number, min: number) {
  // Tbilisi is UTC+4 year-round (no DST)
  return new Date(Date.UTC(y, m, d, h - 4, min));
}

function formatInTz(date: Date, tz: string) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false,
  });
  return dtf.format(date);
}

function formatDateLong(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export default function BookingSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", country: "", treatment: "",
  });
  const [userTz, setUserTz] = useState<string>("Asia/Tbilisi");
  const [viewMonth, setViewMonth] = useState<{ y: number; m: number }>(() => {
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => { setUserTz(detectTimezone()); }, []);

  const formValid = form.firstName && form.lastName && /.+@.+\..+/.test(form.email) && form.country && form.treatment;

  const calendar = useMemo(() => {
    const first = new Date(viewMonth.y, viewMonth.m, 1);
    const startWeekday = first.getDay(); // 0 Sun
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

  const input = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FDAA3E] focus:border-[#FDAA3E] transition";
  const label = "block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2";

  return (
    <section id="admissions" className="py-28 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900" style={{ lineHeight: "1.15" }}>
            Schedule a 30-Minute Medical Consultation
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            Speak directly with our clinical team in Tbilisi. Complete your intake and reserve your preferred time.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step >= n ? "bg-[#FDAA3E] text-white shadow-md shadow-[#FDAA3E]/30" : "bg-slate-100 text-slate-400"}`}>
                {step > n ? <Check className="w-4 h-4" /> : n}
              </div>
              {n < 3 && <div className={`w-12 h-[2px] ${step > n ? "bg-[#FDAA3E]" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <div className="relative rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Contact & Clinical Intake</h3>
              <p className="text-sm text-slate-500 mb-8">Tell us a bit about you so we can match you with the right specialist.</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={label}>First Name</label>
                  <input className={input} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Jane" />
                </div>
                <div>
                  <label className={label}>Last Name</label>
                  <input className={input} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Email Address</label>
                  <input type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                </div>
                <div>
                  <label className={label}>Country</label>
                  <select className={input} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                    <option value="">Select your country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>Treatment of Interest</label>
                  <select className={input} value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })}>
                    <option value="">Select a treatment direction</option>
                    {TREATMENTS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  disabled={!formValid}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-7 py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Select Consultation Time
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Choose Your Date & Time</h3>
                  <p className="text-sm text-slate-500">Clinic hours: 09:00–18:00 (Tbilisi). Slots auto-convert to your local time.</p>
                </div>
                <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>

              <div className="mb-6">
                <label className={label}>Your Local Time Zone</label>
                <select className={input} value={userTz} onChange={(e) => { setUserTz(e.target.value); setSelectedSlot(null); }}>
                  {(TIMEZONES.includes(userTz) ? TIMEZONES : [userTz, ...TIMEZONES]).map((tz) => (
                    <option key={tz} value={tz}>{formatTzLabel(tz)}</option>
                  ))}
                </select>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setViewMonth((v) => ({ y: v.m === 0 ? v.y - 1 : v.y, m: v.m === 0 ? 11 : v.m - 1 }))}
                      className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600"
                    ><ChevronLeft className="w-4 h-4" /></button>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <CalendarIcon className="w-4 h-4 text-[#FDAA3E]" /> {monthLabel}
                    </div>
                    <button
                      onClick={() => setViewMonth((v) => ({ y: v.m === 11 ? v.y + 1 : v.y, m: v.m === 11 ? 0 : v.m + 1 }))}
                      className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600"
                    ><ChevronRight className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
                    {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d}>{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendar.map((d, i) => {
                      if (!d) return <div key={i} />;
                      const past = d < today;
                      const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
                      const isToday = d.toDateString() === new Date().toDateString();
                      return (
                        <button
                          key={i}
                          disabled={past}
                          onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                          className={`aspect-square rounded-lg text-sm font-medium transition-all
                            ${isSelected ? "bg-[#FDAA3E] text-white shadow-md shadow-[#FDAA3E]/30"
                              : past ? "text-slate-300 cursor-not-allowed"
                              : isToday ? "bg-slate-100 text-slate-900 hover:bg-[#FDAA3E]/20"
                              : "text-slate-700 hover:bg-[#FDAA3E]/15"}`}
                        >{d.getDate()}</button>
                      );
                    })}
                  </div>
                </div>

                {/* Slots */}
                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
                    <Clock className="w-4 h-4 text-[#FDAA3E]" />
                    {selectedDate ? formatDateLong(selectedDate) : "Pick a date"}
                  </div>
                  {!selectedDate && (
                    <p className="text-sm text-slate-500">Select a date on the calendar to view available 30-minute slots.</p>
                  )}
                  {selectedDate && slots.length === 0 && (
                    <p className="text-sm text-slate-500">No remaining slots on this date. Please choose another day.</p>
                  )}
                  {selectedDate && slots.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-1">
                      {slots.map((s) => {
                        const isSel = selectedSlot?.getTime() === s.getTime();
                        return (
                          <button
                            key={s.toISOString()}
                            onClick={() => setSelectedSlot(s)}
                            className={`rounded-xl px-3 py-2.5 text-sm font-medium border transition-all
                              ${isSel ? "bg-[#FDAA3E] text-white border-[#FDAA3E] shadow-md shadow-[#FDAA3E]/30"
                                : "bg-white text-slate-700 border-slate-200 hover:border-[#FDAA3E] hover:text-[#FDAA3E]"}`}
                          >{formatInTz(s, userTz)}</button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-7 py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Confirm Booking
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && selectedSlot && (
            <div className="animate-fade-in text-center py-6">
              <div className="w-20 h-20 rounded-full bg-[#FDAA3E]/15 flex items-center justify-center mx-auto mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FDAA3E] flex items-center justify-center shadow-lg shadow-[#FDAA3E]/30">
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Consultation Confirmed</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Thank you, {form.firstName}. Your 30-minute consultation is booked for{" "}
                <span className="font-semibold text-slate-900">{formatDateLong(selectedSlot)}</span> at{" "}
                <span className="font-semibold text-slate-900">{formatInTz(selectedSlot, userTz)}</span>{" "}
                ({userTz.replace(/_/g, " ")}).
              </p>
              <p className="text-sm text-slate-500 mt-3">A confirmation email has been sent to {form.email}.</p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => setShowEmail(true)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-6 py-3 text-sm font-semibold hover:bg-slate-800 transition active:scale-[0.97]">
                  <Mail className="w-4 h-4" /> Preview confirmation email
                </button>
                <button onClick={() => { setStep(1); setForm({ firstName: "", lastName: "", email: "", country: "", treatment: "" }); setSelectedDate(null); setSelectedSlot(null); }} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                  Book another consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email preview modal */}
      {showEmail && selectedSlot && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowEmail(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Mail className="w-4 h-4 text-[#FDAA3E]" /> Email preview
              </div>
              <button onClick={() => setShowEmail(false)} className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-slate-700 leading-relaxed">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <p className="text-xs text-slate-400 mb-1">To: {form.email}</p>
                <p className="font-semibold text-slate-900">Subject: Confirmed: Your 30-Minute StemPlus Consultation</p>
              </div>
              <p className="mb-3">Dear {form.firstName},</p>
              <p className="mb-3">Thank you for requesting a consultation with StemPlus Clinic in Tbilisi, Georgia. We have successfully received your clinical details and look forward to discussing your personalized regenerative treatment plan.</p>
              <p className="mb-1">Your 30-minute medical consultation is officially confirmed for:</p>
              <p className="mb-3"><span className="font-semibold text-slate-900">Date:</span> {formatDateLong(selectedSlot)}<br />
                <span className="font-semibold text-slate-900">Time:</span> {formatInTz(selectedSlot, userTz)} ({userTz.replace(/_/g, " ")})</p>
              <p className="mb-3">Please join your clinical consultant at the scheduled time using our secure Google Meets link:<br />
                <a href="https://meet.google.com/stemplus-clinic-consultation" className="text-[#FDAA3E] font-medium underline break-all">https://meet.google.com/stemplus-clinic-consultation</a></p>
              <p className="mb-3">In the meantime, if you need to submit any medical records or laboratory diagnostics ahead of our call, please reply directly to this email at <a className="text-[#FDAA3E] underline" href="mailto:stemplusclinic@gmail.com">stemplusclinic@gmail.com</a>.</p>
              <p className="mb-1">Warm regards,</p>
              <p className="font-semibold text-slate-900">The StemPlus Medical Coordination Team</p>
              <p>Tbilisi, Georgia</p>
              <p>+995 595 92 28 92</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
