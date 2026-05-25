import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Stem Plus LLC" },
      { name: "description", content: "Terms of Service and Medical Disclaimer for Stem Plus LLC." },
      { property: "og:title", content: "Terms of Service — Stem Plus LLC" },
      { property: "og:description", content: "Terms of Service and Medical Disclaimer for Stem Plus LLC." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-400">
      <div className="max-w-3xl mx-auto px-6 py-20 leading-relaxed tracking-wide text-[15px]">
        <Link to="/" className="text-xs uppercase tracking-wider text-slate-500 hover:text-[#02C39A] transition-colors">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold text-slate-100">Terms of Service</h1>
        <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">Last updated: 2026</p>

        <section className="mt-10 space-y-5">
          <p>
            These Terms of Service ("Terms") govern your access to and use of the website and
            services provided by Stem Plus LLC ("we", "us", "our"). By using our website or
            submitting a consultation request, you agree to these Terms.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">1. Eligibility</h2>
          <p>
            You must be at least 18 years of age, or have the consent of a parent or legal guardian,
            to submit information through this site.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">2. Use of the Website</h2>
          <p>
            You agree to use the site only for lawful purposes and to provide accurate, current,
            and complete information when contacting us. You must not interfere with the operation
            of the site or attempt unauthorized access.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">3. Consultations & Scheduling</h2>
          <p>
            Submitting a consultation request does not create a doctor-patient relationship. A
            formal relationship is established only after we accept your request, confirm a
            scheduled appointment, and complete any required intake.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">4. Intellectual Property</h2>
          <p>
            All content on this site, including text, graphics, and logos, is the property of Stem
            Plus LLC or its licensors and is protected by intellectual property laws.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Stem Plus LLC shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of the
            site.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">6. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Georgia. Any disputes will be resolved in the
            courts of Tbilisi, Georgia.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8" id="medical-disclaimer">
            7. Medical Disclaimer
          </h2>
          <p>
            The content on this website is provided for general informational purposes only and is
            not a substitute for professional medical advice, diagnosis, or treatment. Always seek
            the advice of a qualified healthcare provider with any questions you may have regarding
            a medical condition. Never disregard professional medical advice or delay seeking it
            because of something you have read on this website. Outcomes from regenerative and
            stem-cell-related therapies vary between individuals; no specific result is guaranteed.
            In a medical emergency, contact your local emergency services immediately.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">8. Contact</h2>
          <p>
            Stem Plus LLC, 21 Nodar Bokhua I Ln, Tbilisi 0159, Georgia.{" "}
            <a href="mailto:stemcellplus@gmail.com" className="text-slate-300 hover:text-[#02C39A] transition-colors">
              stemcellplus@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
