import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Infinity as InfinityIcon, Flame, CalendarDays, Moon, Bell, BarChart3, CloudUpload,
  CheckCircle2, TrendingUp, Sparkles, ArrowRight, Star, Quote,
  ClipboardList, Syringe, Activity, Stethoscope, ShieldCheck,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import shadowBg from "@/assets/shadow-bg.jpg";
import logo from "@/assets/logo.png";
import testimonialPoster from "@/assets/testimonial-poster.jpg";
import testimonialVideo from "@/assets/testimonial.mp4.asset.json";


export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Continuum — The Future of Healing and Rejuvenation in Tbilisi, Georgia" },
      { name: "description", content: "A calm, focused habit tracker. Track streaks, visualize progress, and build your daily ritual. Free, ad-free, distraction-free." },
    ],
  }),
});

function LandingPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    import("@/integrations/supabase/client").then(({ supabase }) => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          navigate({ to: "/app" });
        } else {
          setChecked(true);
        }
      });
    }).catch(() => setChecked(true));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <VideoTestimonial />
      <Features />
      <HowItWorks />
      <Reviews />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ─── Video Testimonial ─── */
function VideoTestimonial() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Testimonial</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ lineHeight: "1.15" }}>
            Hear it from our patients
          </h2>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/[0.06] bg-black aspect-video">
          <video
            className="w-full h-full object-cover"
            src={testimonialVideo.url}
            poster={testimonialPoster}
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Sticky Header ─── */
function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#050d0a]/90 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Continuum" className="h-14 w-auto object-contain" />
        </Link>

        <div className="hidden sm:flex items-center gap-8 text-sm text-white">
          <a href="#features" className="hover:text-white/70 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white/70 transition-colors">How it works</a>
          <a href="#reviews" className="hover:text-white/70 transition-colors">Reviews</a>
        </div>

        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/10 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/20 backdrop-blur-sm transition-all duration-200 active:scale-[0.97]"
        >
          Get started
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </nav>
    </header>
  );
}

/* ─── Hero (dark, full-bleed, with navbar) ─── */
function Hero() {
  return (
    <>
      <section className="relative pb-24 pt-0 lg:pb-32 lg:pt-8 xl:pb-40 xl:pt-12" style={{ background: "#050d0a" }}>
        {/* Background image — weighted to the right */}
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-right pointer-events-none select-none"
          aria-hidden="true"
        />
        {/* Left-side gradient for text legibility */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to right, rgba(5,13,10,0.5), rgba(5,13,10,0.13), transparent)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.26), transparent, rgba(5,13,10,0))` }} />




        {/* Hero content — left aligned */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 pt-24 pb-12">
          <div className="max-w-xl">
            <ScrollReveal delay={80}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-left" style={{ lineHeight: "1.08" }}>
                The Future of Healing and Rejuvenation in Tbilisi, Georgia
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p className="mt-6 text-lg text-white text-left" style={{ textWrap: "pretty", lineHeight: "1.6" }}>
                Book Your Consultation
              </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-7 py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/25"
                >
                  Get started free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Features ─── */
const features = [
  { icon: Flame, title: "Streak tracking", desc: "Watch your momentum build day by day. Never break the chain." },
  { icon: CalendarDays, title: "Calendar heatmap", desc: "See your consistency at a glance with a beautiful 30-day view." },
  { icon: BarChart3, title: "Smart insights", desc: "Current streak, longest streak, completion rate — all the stats that matter." },
  { icon: Bell, title: "Gentle reminders", desc: "Set custom reminder times so you never forget your daily rituals." },
  { icon: Moon, title: "Dark mode", desc: "Easy on the eyes, day or night. Follows your system or your choice." },
  { icon: CloudUpload, title: "Cloud sync", desc: "Sign in to sync your habits across devices. Your data, always safe." },
];

function Features() {
  return (
    <section id="features" className="py-28 relative bg-white">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url(${shadowBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.75 }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative">
        <div className="flex flex-col items-start gap-12">
          {/* Right: Features content */}
          <div className="flex-1">
            <ScrollReveal>
              <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Features</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ lineHeight: "1.15" }}>
                  What We Treat
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 70}>
                  <div className="group rounded-2xl border border-black/[0.04] bg-black/[0.03] p-5 hover:bg-black/[0.05] hover:border-black/[0.08] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── 5-Day Treatment Process Timeline ─── */
const treatmentDays = [
  {
    day: "Day 1",
    icon: ClipboardList,
    title: "Comprehensive Diagnostics & Intake",
    points: [
      "Multi-specialty clinical physician consultation and detailed medical history mapping",
      "Baseline clinical diagnostic blood draw and targeted ultrasound mapping",
      "Individualized cellular therapeutic plan formulation matching patient metrics",
    ],
  },
  {
    day: "Day 2",
    icon: Syringe,
    title: "Primary Laboratory Infusion Phase",
    points: [
      "Initiation of primary laboratory-certified embryonic stem cell and exosome infusion (3-4 hour duration)",
      "Administration of specialized regulatory peptides to target and optimize metabolic function",
      "Implementation of baseline bioidentical protocols",
    ],
  },
  {
    day: "Day 3",
    icon: Sparkles,
    title: "Secondary Administration & Targeted Aesthetics",
    points: [
      "Secondary targeted cell and exosome booster infusion procedures",
      "Optional integration of localized cosmetic cell injectables or tissue therapies",
      "Optional medical massage therapy to maximize global circulatory uptake",
    ],
  },
  {
    day: "Day 4",
    icon: Activity,
    title: "Dynamic Evaluation & Sensitivity Mapping",
    points: [
      "Comprehensive assessment of early dynamic changes in nervous system signaling",
      "Precise pallesthesiometry testing to map changes in nerve conduction and localized sensitivity",
      "Precision clinical data capture to cross-reference baseline metrics",
    ],
  },
  {
    day: "Day 5",
    icon: ShieldCheck,
    title: "Discharge Summary & Follow-Up Milestone Layout",
    points: [
      "Final multi-specialty clinical team panel evaluation and recovery summary",
      "Prescription formulation for long-term supportive home care, peptides, or bioidentical tools",
      "Structured layout of post-discharge remote monitoring checkpoints and follow-up milestones",
    ],
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-white border-y border-border/30">
      <div className="max-w-6xl mx-auto px-5">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FDAA3E] mb-3">Treatment Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900" style={{ lineHeight: "1.15" }}>
              Five Steps to Your Recovery
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
              A precision-guided 5-day clinical protocol — engineered for measurable regeneration and lasting recovery.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden lg:block relative">
          {/* Connector line */}
          <div className="absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#FDAA3E]/30 via-[#FDAA3E] to-[#FDAA3E]/30" />
          <div className="grid grid-cols-5 gap-5 relative">
            {treatmentDays.map((d, i) => (
              <ScrollReveal key={d.day} delay={i * 90}>
                <div className="flex flex-col items-center">
                  {/* Day marker */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[#FDAA3E] text-white flex items-center justify-center shadow-lg shadow-[#FDAA3E]/30 ring-4 ring-white mb-5">
                    <d.icon className="w-6 h-6" strokeWidth={2.25} />
                  </div>
                  <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#FDAA3E]/40 transition-all duration-300 h-full">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FDAA3E] mb-1.5">{d.day}</p>
                    <h3 className="font-semibold text-slate-900 text-base mb-3 leading-snug">{d.title}</h3>
                    <ul className="space-y-2">
                      {d.points.map((p, j) => (
                        <li key={j} className="flex gap-2 text-[13px] text-slate-600 leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#FDAA3E] shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: vertical timeline */}
        <div className="lg:hidden relative space-y-6">
          <div className="absolute left-7 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#FDAA3E]/30 via-[#FDAA3E] to-[#FDAA3E]/30" />
          {treatmentDays.map((d, i) => (
            <ScrollReveal key={d.day} delay={i * 70}>
              <div className="relative flex gap-5 items-start">
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#FDAA3E] text-white flex items-center justify-center shadow-lg shadow-[#FDAA3E]/30 ring-4 ring-white shrink-0">
                  <d.icon className="w-6 h-6" strokeWidth={2.25} />
                </div>
                <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#FDAA3E] mb-1.5">{d.day}</p>
                  <h3 className="font-semibold text-slate-900 text-base mb-3 leading-snug">{d.title}</h3>
                  <ul className="space-y-2">
                    {d.points.map((p, j) => (
                      <li key={j} className="flex gap-2 text-[13px] text-slate-600 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#FDAA3E] shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ─── */
const reviews = [
  { name: "Daniel Cooper", role: "Product designer", avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/e20b66f6-e7e9-4c00-93d3-506c78cb66c2/avatar-19.jpg", quote: "Finally a habit app that doesn't try to be a social network. Just me and my habits.", rating: 5 },
  { name: "Emma Lindström", role: "Software engineer", avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/307e7512-1637-4ea2-a5cd-875afeb1002b/avatar-21.jpg", quote: "The streak tracking is addictive in the best way. I've been consistent for 47 days now.", rating: 5 },
  { name: "Ryan Mitchell", role: "Grad student", avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/6b77ccde-dbfd-4c23-8c9f-ce748683068a/avatar-16.jpg", quote: "Love the heatmap. Seeing my progress visually keeps me motivated more than any badge system.", rating: 5 },
  { name: "Mei Lin", role: "Freelance writer", avatar: "https://trovdwfeqyzlxzrtfbjv.supabase.co/storage/v1/object/public/assets/avatars/b706d9a7-3a45-4fdd-ab47-c7023d4d0cfa/avatar-20.jpg", quote: "Simple, clean, no ads. This is what every habit tracker should be. Dark mode is gorgeous too.", rating: 5 },
];

function Reviews() {
  return (
    <section id="reviews" className="py-28">
      <div className="max-w-5xl mx-auto px-5">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ lineHeight: "1.15" }}>
              Loved by habit builders
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <ScrollReveal key={r.name} delay={i * 80}>
              <div className="relative rounded-2xl border border-border/50 bg-card p-6 overflow-hidden">
                {/* Decorative quote mark */}
                <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/[0.06] rotate-180" />

                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5 relative">"{r.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={r.avatar} alt={r.name} className="w-[4.5rem] h-[4.5rem] rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28" style={{ background: "#050d0a" }}>
      {/* Reuse hero bg for visual cohesion */}
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none select-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d0a] via-transparent to-[#050d0a] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-5 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white" style={{ lineHeight: "1.15" }}>
            Ready to build better habits?
          </h2>
          <p className="mt-4 text-white max-w-md mx-auto" style={{ textWrap: "pretty" }}>
            Join thousands of people using Continuum to build consistency, one day at a time.
          </p>
          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-8 py-4 text-sm font-semibold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/25"
          >
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Continuum" className="h-28 w-auto" />
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a>
            <Link to="/login" className="hover:text-foreground transition-colors">Sign in</Link>
            <Link to="/login" className="hover:text-foreground transition-colors">Get started</Link>
          </div>

          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Continuum</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Scroll reveal wrapper (animations removed) ─── */
function ScrollReveal({ children }: { children: React.ReactNode; delay?: number }) {
  return <>{children}</>;
}
