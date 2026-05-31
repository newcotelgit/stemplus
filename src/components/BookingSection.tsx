export default function BookingSection() {
  return (
    <section id="admissions" className="py-28 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "#03045E", lineHeight: "1.15" }}
          >
            Schedule a 30-Minute Medical Consultation
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            Speak directly with our clinical team in Tbilisi. Pick a time that works for you.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <iframe
            src="https://cal.com/justin-malka-5e6dx5/30-minute-medical-consultation"
            width="100%"
            height="700"
            frameBorder="0"
            title="Book a consultation"
            style={{ display: "block", minHeight: 700 }}
          />
        </div>
      </div>
    </section>
  );
}
