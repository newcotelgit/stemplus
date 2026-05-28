import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy — Stem Plus LLC";
  }, []);
  return (
    <main className="min-h-screen bg-slate-950 text-slate-400">
      <div className="max-w-3xl mx-auto px-6 py-20 leading-relaxed tracking-wide text-[15px]">
        <Link to="/" className="text-xs uppercase tracking-wider text-slate-500 hover:text-[#02C39A] transition-colors">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold text-slate-100">Privacy Policy</h1>
        <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">Last updated: 2026</p>

        <section className="mt-10 space-y-5">
          <p>
            Stem Plus LLC ("we", "us", "our") respects your privacy and is committed to protecting
            the personal and medical information you share with us. This Privacy Policy explains
            what information we collect, how we use it, and the choices you have.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">1. Information We Collect</h2>
          <p>
            We collect information you voluntarily provide through our consultation forms, including
            your name, email, contact number, primary area of concern, treatment timeline, formal
            clinical diagnosis, and case notes. We may also collect technical data such as IP
            address, browser type, and pages visited for analytics and security purposes.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">2. How We Use Your Information</h2>
          <p>
            Information is used solely to evaluate your inquiry, schedule consultations, deliver
            requested clinical services, communicate with you about your care, comply with legal
            obligations, and improve our website. We do not sell personal data.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">3. Sharing</h2>
          <p>
            We share information only with our clinical staff, our scheduling provider (Zoho
            Bookings), and trusted service providers under confidentiality obligations, or where
            required by law.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">4. Data Security</h2>
          <p>
            We apply administrative, technical, and physical safeguards to protect your data.
            However, no transmission over the internet is fully secure, and we cannot guarantee
            absolute security.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">5. Your Rights</h2>
          <p>
            Subject to applicable law, you may request access, correction, deletion, or restriction
            of your personal data by contacting us at stemcellplus@gmail.com.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">6. International Transfers</h2>
          <p>
            We are headquartered in Tbilisi, Georgia. If you contact us from outside Georgia, your
            data will be transferred to and processed in Georgia under applicable safeguards.
          </p>

          <h2 className="text-slate-100 text-xl font-semibold mt-8">7. Contact</h2>
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
