import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const TEAL = "#02C39A";
const INDIGO = "#03045E";

const CONCERNS = [
  "Erectile Dysfunction & Urological Recovery",
  "Neurological Recovery & Rehabilitation",
  "Autism Spectrum Disorder",
  "Type 1 or Type 2 Diabetes",
  "Autoimmune Disease",
  "Orthopedic & Joint Conditions",
  "Liver Disease",
  "Cardiac Rehabilitation",
  "Anti-Aging & Cellular Rejuvenation",
  "Testosterone & Hormonal Optimisation",
  "Facial Rejuvenation & Aesthetic Medicine",
  "Female Infertility",
  "Male Infertility",
  "Other / Not Listed",
];

type Step = 1 | 2 | 3;

const STEPS = [
  { n: 1 as Step, label: "Your Details" },
  { n: 2 as Step, label: "Choose Time" },
  { n: 3 as Step, label: "Confirmed" },
];

export default function BookingSection() {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [concern, setConcern] = useState("");
  const calLoaded = useRef(false);

  const step1Valid =
    name.trim().length > 1 &&
    /.+@.+\..+/.test(email) &&
    concern !== "";

  useEffect(() => {
    if (step !== 2) return;

    const win = window as any;

    const embedCal = () => {
      try {
        const el = document.getElementById("cal-booking-embed");
        if (!el) return;
        el.innerHTML = "";

        win.Cal("init", "30-minute-medical-consultation", { origin: "https://cal.com" });
        win.Cal.ns["30-minute-medical-consultation"]("inline", {
          elementOrSelector: "#cal-booking-embed",
          calLink: "justin-malka-5e6dx5/30-minute-medical-consultation",
          config: {
            layout: "column_view",
            useSlotsViewOnSmallScreen: "true",
            prefill: {
              name,
              email,
            },
          },
        });
        win.Cal.ns["30-minute-medical-consultation"]("ui", {
          hideEventTypeDetails: false,
          layout: "column_view",
          useSlotsViewOnSmallScreen: "true",
        });
      } catch (e) {
        console.error("Cal.com embed error:", e);
      }
    };

    if (!calLoaded.current) {
      calLoaded.current = true;
      const script = document.createElement("script");
      script.id = "cal-embed-loader";
      // Cal.com queue loader only — init/inline/ui called via embedCal() below
      script.innerHTML = `(function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["-s",namespace])}else p(cal,ar);return}p(cal,ar)}})(window,"https://app.cal.com/embed/embed.js","init");`;
      document.body.appendChild(script);
    }
    // Called in both paths — queued on first load, immediate on re-entry
    embedCal();

    const onMessage = (e: MessageEvent) => {
      const t = e.data?.type;
      if (t === "bookingSuccessful" || t === "CAL:bookingSuccessful") {
        setStep(3);
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [step]);

  const firstName = name.split(" ")[0];

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#02C39A] focus:border-[#02C39A] transition";
  const labelClass =
    "block text-xs font-semibold uppercase tracking-wider text-[#03045E] mb-2";

  return (
    <section id="admissions" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-5">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#03045E]"
            style={{ lineHeight: "1.15" }}
          >
            Book Your Free 30-Minute Consultation
          </h2>
          {step < 3 && (
            <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
              {step === 1
                ? "Tell us a little about yourself first — it takes less than a minute."
                : "All times shown in your local timezone. The consultation is via Google Meet."}
            </p>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          {STEPS.map((s, i) => {
            const isActive = step === s.n;
            const isDone = step > s.n;
            return (
              <div key={s.n} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shrink-0"
                    style={{
                      background: isDone ? TEAL : isActive ? INDIGO : "#fff",
                      borderColor: isDone ? TEAL : isActive ? INDIGO : "#e2e8f0",
                      color: isDone || isActive ? "#fff" : "#94a3b8",
                    }}
                  >
                    {isDone ? "✓" : s.n}
                  </div>
                  <span
                    className="text-sm font-semibold hidden sm:inline"
                    style={{ color: isActive ? INDIGO : isDone ? TEAL : "#94a3b8" }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="w-8 h-px"
                    style={{ background: step > s.n ? TEAL : "#e2e8f0" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 shadow-sm p-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Primary Area of Concern</label>
                  <select
                    className={inputClass}
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                  >
                    <option value="">Select your primary concern</option>
                    {CONCERNS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  disabled={!step1Valid}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.97] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{
                    background: TEAL,
                    boxShadow: step1Valid ? `0 10px 25px -10px ${TEAL}` : undefined,
                  }}
                >
                  Check Availability
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div id="cal-booking-embed" className="w-full min-h-[600px]" />
              <div className="mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="text-center py-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: `${TEAL}22` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}
                >
                  <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#03045E] mb-3">
                You're all set{firstName ? `, ${firstName}` : ""}!
              </h3>
              <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                Your consultation is confirmed. Check your email for the Google Meet link and calendar invitation. Our clinical team looks forward to speaking with you.
              </p>
              <p className="text-sm text-slate-400 mt-4">
                Need to reschedule? Use the link in your confirmation email.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
