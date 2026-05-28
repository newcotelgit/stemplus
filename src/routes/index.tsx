import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Infinity as InfinityIcon, Flame, CalendarDays, Moon, Bell, BarChart3, CloudUpload,
  CheckCircle2, TrendingUp, Sparkles, ArrowRight, ArrowUpRight, Star, Quote,
  ClipboardList, Syringe, Activity, Stethoscope, ShieldCheck, ShieldPlus,
  Brain, Heart, ShieldAlert, Baby, Bone, Droplet, Zap, Sparkle, Dna, Pill, HeartPulse, Leaf,
  ChevronLeft, ChevronRight, Calendar, RefreshCw,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import shadowBg from "@/assets/shadow-bg.jpg";
import logo from "@/assets/logo.png";
import testimonialPoster from "@/assets/testimonial-poster.jpg";
import testimonialVideo from "@/assets/testimonial.mp4.asset.json";
import patient2 from "@/assets/patient-2.jpg";
import patient3 from "@/assets/patient-3.jpg";
import patient4 from "@/assets/patient-4.jpg";
import patient5 from "@/assets/patient-5.jpg";
import patient6 from "@/assets/patient-6.jpg";
import patient7 from "@/assets/patient-7.jpg";
import patient8 from "@/assets/patient-8.jpg";
import patient9 from "@/assets/patient-9.jpg";
import patient10 from "@/assets/patient-10.jpg";
import patient13 from "@/assets/patient-13.jpg";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";
import doctor5 from "@/assets/doctor-5.jpg";
import doctor6 from "@/assets/doctor-6.jpg";
import doctor7 from "@/assets/doctor-7.jpg";
import doctor8 from "@/assets/doctor-8.jpg";
import BookingSection from "@/components/BookingSection";



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
      <Reviews />
      <MedicalTeam />
      <Heritage />
      <HowItWorks />
      <FinalCTA />
      <BookingSection />
      <Footer />
    </div>
  );
}

/* ─── Video Testimonial Hub ─── */
type VideoItem = {
  id: string;
  src: string;
  poster: string;
  name: string;
  treatment: string;
  country: string;
  flag: string;
};

const VIDEO_TESTIMONIALS: VideoItem[] = [
  {
    id: "v1",
    src: testimonialVideo.url,
    poster: testimonialPoster,
    name: "Anna K.",
    treatment: "Stem Cell Therapy",
    country: "Germany",
    flag: "🇩🇪",
  },
  {
    id: "v2",
    src: testimonialVideo.url,
    poster: patient2,
    name: "James R.",
    treatment: "Joint Regeneration",
    country: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    id: "v3",
    src: testimonialVideo.url,
    poster: patient3,
    name: "Sofia M.",
    treatment: "Anti-Aging Protocol",
    country: "Italy",
    flag: "🇮🇹",
  },
  {
    id: "v4",
    src: testimonialVideo.url,
    poster: patient4,
    name: "David L.",
    treatment: "Neurological Recovery",
    country: "United States",
    flag: "🇺🇸",
  },
];

function VideoCard({ item, onPlay, className = "", isMain = false }: {
  item: VideoItem;
  onPlay: (v: VideoItem) => void;
  className?: string;
  isMain?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onPlay(item)}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-black border border-black/[0.06] shadow-lg text-left ${className}`}
      aria-label={`Play video testimonial from ${item.name}`}
    >
      <img
        src={item.poster}
        alt={`${item.name} — ${item.treatment}`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex items-center justify-center rounded-full shadow-2xl shadow-black/40 ring-1 ring-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 ${isMain ? "w-20 h-20" : "w-12 h-12"}`}
          style={{ backgroundColor: "#02C39A" }}
        >
          <svg viewBox="0 0 24 24" fill="white" className={isMain ? "w-8 h-8 ml-1" : "w-5 h-5 ml-0.5"}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      {/* Bottom typography */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4 sm:p-5">
        <p className={`font-semibold text-white leading-tight ${isMain ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}>
          {item.name}
        </p>
        <p className={`text-white/85 ${isMain ? "text-sm mt-1" : "text-xs mt-0.5"}`}>
          {item.treatment}
        </p>
        <p className={`text-white/70 flex items-center gap-1.5 ${isMain ? "text-sm mt-1" : "text-xs mt-1"}`}>
          <span aria-hidden>{item.flag}</span>
          <span>{item.country}</span>
        </p>
      </div>
    </button>
  );
}

function VideoTestimonial() {
  const [active, setActive] = useState<VideoItem | null>(null);
  const [main, ...rest] = VIDEO_TESTIMONIALS;

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground" style={{ lineHeight: "1.15" }}>
            Hear it from our patients
          </h2>
        </div>

        {/* Main showcase */}
        <div className="aspect-video">
          <VideoCard item={main} onPlay={setActive} isMain className="h-full" />
        </div>

        {/* Sub-grid: desktop row */}
        <div className="hidden md:grid grid-cols-3 gap-5 mt-5">
          {rest.map((v) => (
            <div key={v.id} className="aspect-video">
              <VideoCard item={v} onPlay={setActive} />
            </div>
          ))}
        </div>

        {/* Sub-grid: mobile peek-swipe */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory mt-5 px-1 -mx-1 pb-4 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollPaddingLeft: "0.25rem",
          }}
        >
          {rest.map((v) => (
            <div
              key={v.id}
              className="snap-start shrink-0 basis-[78%] aspect-video"
            >
              <VideoCard item={v} onPlay={setActive} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            aria-label="Close video"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={active.id}
              className="w-full h-full object-contain bg-black"
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Heritage / About ─── */
const milestones = [
  {
    year: "1972",
    title: "The Foundation of Cellular Therapy",
    body: "Our scientific heritage begins in Kharkiv, Ukraine, with the establishment of the historic Institute for Problems of Cryobiology and Cryomedicine under the leadership of Academician V.I. Gryshchenko, pioneering global research into the safety and application of stem cells.",
  },
  {
    year: "2006",
    title: "Clinical Expansion & Leadership",
    body: "Building upon these foundational academic breakthroughs, Dr. Yaroslav Myroshnykov serves as the founder and head of the prominent Kyiv branch network, later transitioning to serve as a leading researcher at the Transplant Coordination Center of the Ministry of Health of Ukraine.",
  },
  {
    year: "2022–2024",
    title: "European Relocation & Adaptation",
    body: "Due to military actions in Ukraine, our elite medical team successfully relocated clinical operations internationally—deploying specialized cellular therapy projects across premium medical clinics in Batumi, Georgia and Plovdiv, Bulgaria.",
  },
  {
    year: "Present Day",
    title: "The Launch of StemPlus Tbilisi",
    body: "Today, this fruitful Georgian-Ukrainian cooperation comes together permanently in the heart of Georgia. Led by Dr. Myroshnykov, our staff operates exclusively out of the modern, multidisciplinary Leadermed Hospital in Tbilisi, utilizing the newest diagnostic and therapeutic equipment available in modern regenerative medicine.",
  },
];

function Heritage() {
  return (
    <section id="heritage" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center lg:text-left mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FDAA3E] mb-3">Our Heritage</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl" style={{ lineHeight: "1.1" }}>
            The StemPlus Legacy:<br />Bridging Decades of Cellular Science
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Credo */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative">
              <span className="absolute -left-3 top-0 h-full w-[3px] bg-[#FDAA3E] rounded-full hidden lg:block" />
              <p className="text-xl sm:text-2xl font-medium text-slate-900 leading-relaxed lg:pl-6" style={{ textWrap: "pretty" }}>
                StemPlus is not just a modern treatment center; it is the culmination of over{" "}
                <span className="text-[#FDAA3E] font-semibold">50 years of pioneering research</span>{" "}
                in cryobiology and cellular medicine.
              </p>
              <p className="mt-5 text-base text-slate-600 leading-relaxed lg:pl-6">
                By combining historic Ukrainian scientific breakthroughs with a state-of-the-art multidisciplinary hospital environment in Tbilisi, Georgia, we provide patients with an unmatched gateway to elite, evidence-based regenerative recovery.
              </p>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="lg:col-span-7 relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#FDAA3E]/40 via-[#FDAA3E]/60 to-[#FDAA3E]/20" />
            <ol className="space-y-10">
              {milestones.map((m) => (
                <li key={m.year} className="relative pl-10">
                  <span className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#FDAA3E] ring-4 ring-white shadow-md shadow-[#FDAA3E]/30 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FDAA3E] mb-1">{m.year}</p>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-snug">{m.title}</h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed">{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}


const NAV_LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Medical Team", href: "#medical-team" },
  { label: "Our Heritage", href: "#heritage" },
  { label: "Process", href: "#process" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.style.scrollBehavior = "smooth";
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40"
    >
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="Continuum" className="h-[52px] w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-9 text-sm font-semibold tracking-wide text-slate-200">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors duration-200 hover:text-[#00A896]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#admissions"
            className="hidden sm:inline-flex items-center rounded-xl bg-[#02C39A] text-white px-5 py-2.5 text-sm font-semibold tracking-wide shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#02C39A]/20 transition-all duration-200"
          >
            Book consultation
          </a>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-[82%] max-w-sm backdrop-blur-md border-l border-slate-800/60 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "rgba(2, 6, 23, 0.92)" }}
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800/60">
            <img src={logo} alt="Continuum" className="h-9 w-auto object-contain" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold tracking-tight text-white py-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)] hover:text-[#00A896] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#admissions"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#02C39A] text-white px-6 py-4 text-base font-semibold tracking-wide hover:bg-[#02C39A]/90 transition-colors"
            >
              Book consultation
            </a>
          </nav>
        </div>
      </div>
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
          className="absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-right pointer-events-none select-none"
          aria-hidden="true"
        />
        {/* Left-side gradient for text legibility */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to right, rgba(5,13,10,0.5), rgba(5,13,10,0.13), transparent)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.26), transparent, rgba(5,13,10,0))` }} />




        {/* Hero content — left aligned */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 pt-[55vh] pb-12 sm:pt-24">
          <div className="max-w-xl">
            <ScrollReveal delay={80}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-left" style={{ lineHeight: "1.08" }}>
                The Future of Healing and Rejuvenation in Tbilisi, Georgia
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p className="hidden sm:block mt-6 text-lg text-white text-left" style={{ textWrap: "pretty", lineHeight: "1.6" }}>
                ​
              </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <div className="mt-5 sm:mt-10 flex flex-col sm:flex-row items-start gap-3">
                <a
                  href="#admissions"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-7 py-3.5 text-sm font-bold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/25"
                >
                  Book consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
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

const treatCards = [
  { title: "Erectile Dysfunction & Urological Recovery", desc: "Advanced cellular therapies targeted at restoring vascular integrity, improving blood flow, and optimizing sexual health function.", Icon: ShieldCheck, color: "#03045E" },
  { title: "Neurology & Stroke Recovery", desc: "Cellular protocols designed for structural neurological support, cognitive optimization, and post-stroke rehabilitation.", Icon: Brain, color: "#03045E" },
  { title: "Autism Spectrum Protocols", desc: "Specialized bio-therapeutic routing focused on pediatric neuro-developmental support and childhood cellular optimization.", Icon: Activity, color: "#02C39A" },
  { title: "Autoimmune & Systemic Renewal Protocols", desc: "Targeted immune-modulation and post-traumatic recovery therapies addressing complex inflammation, Crohn's disease, and full-body tissue repair.", Icon: ShieldAlert, color: "#00A896" },
  { title: "Cellular Rejuvenation & Longevity", desc: "Advanced tissue renewal and systemic anti-aging protocols engineered for international health tourists.", Icon: Heart, color: "#02C39A" },
  { title: "Diabetes & Metabolic Repair", desc: "Comprehensive metabolic routing focused on advanced glucose regulation and systematic endocrine support.", Icon: RefreshCw, color: "#03045E" },
  { title: "Orthopedic Spine & Joint Regeneration", desc: "Advanced biomaterial targeting aimed at restoring joint mobility and supporting complex spinal recovery.", Icon: Flame, color: "#00A896" },
];

function Features() {
  return (
    <section id="treatments" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <ScrollReveal>
          <div className="mb-14 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#03045E]" style={{ lineHeight: "1.15" }}>
              What we treat
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Targeted regenerative therapies for cellular optimization, chronic recovery, and functional vitality.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {treatCards.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 60}>
              <div className="group relative h-full rounded-2xl border border-slate-200/80 bg-white p-7 pb-14 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100/50">
                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center mb-5">
                  <c.Icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <h3 className="text-lg font-semibold text-[#03045E] tracking-tight mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                <span className="absolute bottom-5 right-6 text-xs font-medium text-slate-400 transition-all duration-300 group-hover:text-[#02C39A] group-hover:translate-x-1">
                  Learn more →
                </span>
              </div>
            </ScrollReveal>
          ))}
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
    <section id="process" className="py-28 bg-white border-y border-border/30">
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

/* ─── Clinical Success Stories Carousel ─── */
const successStories = [
  { kind: "image" as const, image: patient10, badge: "NEUROLOGICAL STABILIZATION & RECOVERY", text: "I highly value the absolute therapeutic transparency and comprehensive approach provided by the medical staff. Every action, step, and diagnostic verification was detailed to me with total clarity. I felt notable structural benefits and an energetic surge within just 4 days of cellular care.", author: "Female Patient", location: "Eastern Europe" },
  { kind: "image" as const, image: patient2, badge: "PEDIATRIC AUTISM NEUROREHABILITATION", text: "We traveled from Al Ain for my son Muhammad's Autism care. The clinic handled everything seamlessly, from airport arrival to daily transport. Over a targeted 3-day cellular infusion program, we witnessed immediate behavioral breakthroughs—Muhammad's severe sleep irregularity has completely resolved, and he is now sleeping deeply and calmly.", author: "Muhammad's Father", location: "United Arab Emirates" },
  { kind: "image" as const, image: patient3, badge: "POST-STROKE HEMIPLEGIA RECOVERY", text: "Three and a half years ago, a stroke left me with severe hemiplegia and motor paralysis across half of my body. After arriving at StemPlus Tbilisi, I received targeted intravenous, intrathecal, and endonasal embryonic stem cell and placental infusions. The clinical results have been profound—I am experiencing a step-by-step return of physical motor control and tactile sensation.", author: "Kamil Kamshad", location: "Iraq" },
  { kind: "image" as const, image: patient4, badge: "CHRONIC CROHN'S DISEASE PROTOCOL", text: "As a Crohn's disease patient for over 20 years, I spent the last five years in absolute agony, undergoing two unsuccessful operations. After a friend recommended this team, I traveled to the clinic for specialized stem cell therapy. Within just the first five days of my personalized biological care, my localized pain began to drastically subside and my baseline physical energy levels surged.", author: "Mustafa", location: "Chronic Crohn's Patient" },
  { kind: "image" as const, image: patient5, badge: "MULTI-TARGET SYSTEMIC REJUVENATION", text: "I came to Tbilisi for a multi-target therapy focused on systematic anti-aging and rejuvenation. The medical staff explained every diagnostic action with total transparency, removing all my anxiety. Over a 5-day custom treatment plan covering my face, neck, and abdomen, my physical vitality skyrocketed, my skin looks noticeably regenerated, and my chronic back and waist soreness completely vanished.", author: "International Patient", location: "China" },
  { kind: "image" as const, image: patient6, badge: "AUTISM SPECTRUM COGNITIVE DEVELOPMENT", text: "This is our second time trusting this elite medical team with my son Seif's neurorehabilitation for Autism. The custom cellular therapy, combined with the clinic's exceptionally organized, clean, and deeply supportive multidisciplinary hospital environment in Tbilisi, gives us immense confidence in his continuous cognitive progress.", author: "Seif's Father", location: "Saudi Arabia" },
  { kind: "image" as const, image: patient7, badge: "CHRONIC ORGAN REPAIR & METABOLIC SYSTEMS", text: "The clinic's medical coordination work is beautiful and highly authoritative. I have been following this specific medical team since their initial practice back in Ukraine, and now in Tbilisi, their execution is flawless. For anyone looking for cutting-edge solutions for complex internal organs or advanced metabolic conditions, I can verify their protocols are elite.", author: "Verified Clinic Reviewer", location: "Gulf Region" },
  { kind: "image" as const, image: patient8, badge: "SYSTEMIC ANTI-AGING & CELL VITALIZATION", text: "I traveled from Mersin for a multi-day cellular anti-aging and total system vitalization plan. Within 6 to 7 days of precise cellular care under Dr. Yaroslav, I feel completely transformed. I am experiencing a massive surge in physical energy, youthful skin regeneration, and total systemic optimization. The clinical execution here is perfect.", author: "Anti-Aging Patient", location: "Turkey" },
  { kind: "image" as const, image: patient9, badge: "AUTISM SPECTRUM COORDINATED RECOVERY", text: "The care and absolute clarity of the consultation process here is remarkable. From the moment we touched down at the airport, the coordination team handled every logistic with incredible support. This thorough care has given us immense hope and security regarding our young son's continuous cognitive and socialization tracking plans.", author: "Pediatric Care Parent", location: "United Arab Emirates" },
  {
    kind: "graphic" as const,
    graphic: { bg: "#03045E", title: "-60%", subtitle: "Glucose Drop by Day 2", titleColor: "#FDAA3E" },
    badge: "TYPE 2 DIABETES PROTOCOL",
    text: "I struggled to control my Type 2 Diabetes with high doses of insulin and pills for 14 years. Following an intensive 5-day custom embryonic stem cell and exosome program under Dr. Yaroslav, my blood glucose levels dropped by a remarkable 60% by Day 2. By Day 5, my leg numbness and severe sciatic nerve pain were reduced by nearly 90%.",
    author: "Fawaz", location: "Kuwait",
  },

  {
    kind: "graphic" as const,
    graphic: { bg: "#02C39A", icon: Bone, label: "Mobility Restored" },
    badge: "SPINAL DISC & NERVE MOBILE REHABILITATION",
    text: "I suffered from severe spinal disc herniation and localized radiating nerve pain that restricted my movement. The targeted cell and exosome therapy plan completely eliminated my localized joint inflammation and accelerated my recovery without any surgical risks. I have fully regained my physical mobility and comfort.",
    author: "Orthopedic Patient", location: "Gulf Region",
  },
  {
    kind: "graphic" as const,
    graphic: { bg: "#03045E", icon: Dna, label: "Joint Regeneration" },
    badge: "COMPLEX TISSUE & ORTHOPEDIC REPAIR",
    text: "The positive energy, attentiveness, and continuous support from the clinical coordinators made my treatment incredibly comforting. Every staff member is highly professional, ensuring a flawless therapeutic process that has completely revitalized my joint movement and general physical capacity.",
    author: "International Patient", location: "Middle East",
  },
  { kind: "image" as const, image: patient13, badge: "METABOLIC COMPENSATION & VITALITY", text: "The dynamic bodily changes and energy optimization I experienced by Day 5 were incredible. This multi-potent embryonic cell protocol has completely restored my physical activity levels, balanced my metabolic metrics, and provided deep, restorative sleep quality that I haven't had in years.", author: "Healthcare Tourist", location: "Saudi Arabia" },
  {
    kind: "graphic" as const,
    graphic: { bg: "#00A896", icon: ShieldPlus, label: "Systemic Renewal" },
    badge: "POST-TRAUMATIC SYSTEMIC RENEWAL",
    text: "A highly sophisticated medical alliance. The combination of specialized embryonic Muse cells with target peptides completely eliminated my chronic pain, optimized my internal organ tracking metrics, and allowed me to transition toward a completely drug-independent lifestyle. I highly praise this team's work.",
    author: "Systemic Therapy Patient", location: "Iraq",
  },
];

function locationFlag(loc: string): string {
  const l = loc.toLowerCase();
  if (l.includes("united arab") || l.includes("uae")) return "🇦🇪";
  if (l.includes("saudi")) return "🇸🇦";
  if (l.includes("iraq")) return "🇮🇶";
  if (l.includes("turkey") || l.includes("türkiye")) return "🇹🇷";
  if (l.includes("china")) return "🇨🇳";
  if (l.includes("eastern europe")) return "🇪🇺";
  if (l.includes("gulf")) return "🇦🇪";
  if (l.includes("middle east")) return "🌍";
  return "🌍";
}

function Reviews() {
  const [index, setIndex] = useState(0);
  const total = successStories.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const story = successStories[index];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FDAA3E] mb-3">Patient Outcomes</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900" style={{ lineHeight: "1.15" }}>
              Clinical Success Stories
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Authentic recovery journeys from international patients treated at our Tbilisi clinic.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* Mobile: native scroll-snap swipe carousel with peek */}
          <div className="md:hidden -mx-5">
            <div
              className="flex overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollPaddingLeft: "1.25rem", WebkitOverflowScrolling: "touch" }}
            >
              {successStories.map((s, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0 basis-[87%] pl-5 last:pr-5"
                  style={{ transform: "translateZ(0)" }}
                >
                  <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)]">
                    <div
                      className="relative h-[300px] sm:h-[360px] flex items-center justify-center"
                      style={{ backgroundColor: s.kind === "graphic" ? s.graphic.bg : "#0f172a" }}
                    >
                      {s.kind === "image" ? (
                        <img
                          src={s.image}
                          alt={s.author}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : "title" in s.graphic ? (
                        <div className="relative px-6 text-center">
                          <div
                            className="text-6xl sm:text-7xl font-extrabold tracking-tight leading-none"
                            style={{ color: s.graphic.titleColor }}
                          >
                            {s.graphic.title}
                          </div>
                          <div className="mt-4 text-white text-base sm:text-lg font-semibold uppercase tracking-wider">
                            {s.graphic.subtitle}
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center text-center px-6">
                          {(() => { const I = s.graphic.icon; return <I className="w-24 h-24 sm:w-28 sm:h-28 text-white" strokeWidth={1.25} />; })()}
                          <div className="mt-4 text-white text-xl sm:text-2xl font-bold tracking-tight">
                            {s.graphic.label}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-5 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#FDC987]/90 mb-1.5">
                          {s.badge}
                        </p>
                        <div className="flex items-end justify-between gap-3">
                          <p className="text-white text-lg font-bold tracking-tight leading-tight">
                            {s.author}
                          </p>
                          <span className="shrink-0 inline-flex items-center gap-1.5 text-white/90 text-xs font-medium">
                            <span className="text-base leading-none">{locationFlag(s.location)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative p-6">
                      <Quote className="absolute top-4 right-4 w-12 h-12 text-[#FDAA3E]/15" />
                      <p className="relative text-slate-700 text-base leading-relaxed" style={{ textWrap: "pretty" }}>
                        "{s.text}"
                      </p>
                      <p className="relative mt-4 text-xs text-slate-400 font-medium">
                        {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop / tablet: 2-card view with side arrows */}
          <div className="relative hidden md:block">
            <div className="grid md:grid-cols-2 gap-5 md:gap-8 items-stretch">
              {/* Left: image OR typographic data graphic with overlayed metadata */}
              <div
                className="relative rounded-3xl overflow-hidden flex items-center justify-center h-[320px] sm:h-[380px] md:h-[460px] transition-colors duration-500"
                style={{ backgroundColor: story.kind === "graphic" ? story.graphic.bg : "#0f172a" }}
              >
                {successStories.map((s, i) =>
                  s.kind === "image" ? (
                    <img
                      key={i}
                      src={s.image}
                      alt={s.author}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        i === index ? "opacity-100" : "opacity-0"
                      }`}
                      loading="eager"
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "low"}
                      aria-hidden={i !== index}
                    />
                  ) : null
                )}

                {story.kind === "graphic" && ("title" in story.graphic ? (
                  <div className="relative px-8 text-center">
                    <div
                      className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none"
                      style={{ color: story.graphic.titleColor }}
                    >
                      {story.graphic.title}
                    </div>
                    <div className="mt-4 text-white text-base sm:text-lg md:text-xl font-semibold uppercase tracking-wider">
                      {story.graphic.subtitle}
                    </div>
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center text-center px-8">
                    {(() => { const I = story.graphic.icon; return <I className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 text-white" strokeWidth={1.25} />; })()}
                    <div className="mt-5 text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                      {story.graphic.label}
                    </div>
                  </div>
                ))}

                {/* Overlay: Name, Treatment, Country */}
                <div className="absolute inset-x-0 bottom-0 pt-16 pb-5 px-5 sm:px-6 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#FDC987]/90 mb-1.5">
                    {story.badge}
                  </p>
                  <div className="flex items-end justify-between gap-3">
                    <p className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-tight">
                      {story.author}
                    </p>
                    <span className="shrink-0 inline-flex items-center gap-1.5 text-white/90 text-xs sm:text-sm font-medium">
                      <span className="text-base sm:text-lg leading-none">{locationFlag(story.location)}</span>
                      <span className="hidden sm:inline">{story.location}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: white quote card */}
              <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] p-6 sm:p-8 md:p-10 flex flex-col justify-center min-h-[260px] md:min-h-[460px]">
                <Quote className="absolute top-6 right-6 w-14 h-14 sm:w-20 sm:h-20 text-[#FDAA3E]/15" />
                <p className="relative text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed" style={{ textWrap: "pretty" }}>
                  "{story.text}"
                </p>
                <p className="relative mt-5 text-xs text-slate-400 font-medium">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
              </div>
            </div>

            {/* Absolute-positioned nav arrows on the carousel edges (desktop only) */}
            <button
              onClick={prev}
              aria-label="Previous story"
              className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 text-white backdrop-blur-sm opacity-70 hover:opacity-100 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next story"
              className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-slate-950/40 hover:bg-slate-950/70 text-white backdrop-blur-sm opacity-70 hover:opacity-100 active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Medical Team ─── */
const TEAM = [
  { img: doctor1, name: "Dr. Yaroslav Myroshnykov, MD, PhD", role: "Chief Physician | Andrologist & Urologist", bio: "Over 25 years of specialized clinical practice and stem cell research. Author of 50+ publications and holder of 7 invention patents in cellular rejuvenation and metabolic treatments." },
  { img: doctor2, name: "Dr. Nini Kandelaki, PhD", role: "Dermatologist & Specialist in Cosmetology", bio: "Doctor of Philosophy (PhD) in Medicine and member of EADV. Expert in advanced aesthetic exome therapies, cellular skin rejuvenation, and anti-aging treatments." },
  { img: doctor3, name: "Dr. Mikhail Tsverava, MD, PhD", role: "Senior Radiologist & Diagnostic Specialist", bio: "MD and PhD holder with extensive practice in functional diagnostic mapping and advanced ultrasound-guided precision cellular targeting." },
  { img: doctor4, name: "Dr. Eleonora Fiodorova, MD", role: "Clinical Endocrinologist & Nutritionist", bio: "Specialist in advanced endocrine systems, hormonal balance alignment, and targeted metabolic stabilization for regenerative therapies." },
  { img: doctor7, name: "Dr. Natia Alania, MD", role: "Clinical Neurologist & Neurodevelopmental Specialist", bio: "Expert in neuro-recovery pathways, functional brain mapping, and dedicated cellular protocols for Autism Spectrum Disorders." },
  { img: doctor8, name: "Dr. Giorgi Archaia, MD", role: "Neurosurgeon, Neurologist & Vertebrologist", bio: "Triple-specialist managing complex neuro-recovery tracking, orthopedic spinal systems, and advanced joint regeneration." },
  { img: doctor5, name: "Lili Martashvili", role: "Director of Clinical Nursing & Compliance", bio: "Commands the patient clinical safety apparatus, triage protocols, and strict execution of outpatient healthcare standards." },
  { img: doctor6, name: "Mako Khachidze", role: "Clinical Infusion Nurse", bio: "Specialist in the precision execution, administration, and monitoring of advanced intravenous (IV) cellular protocols." },
];

function MedicalTeam() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-team-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="medical-team" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            The Minds Behind the Medicine
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Meet the elite clinical faculty and cellular bio-therapeutic pioneers directing your recovery protocols at StemPlus Tbilisi.
          </p>
        </div>

        <div className="relative">
          {/* Desktop nav arrows */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByDir(-1)}
            className="hidden md:flex absolute left-0 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border shadow-md text-foreground hover:bg-accent transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByDir(1)}
            className="hidden md:flex absolute right-0 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-border shadow-md text-foreground hover:bg-accent transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-6 md:px-5 scroll-smooth [scroll-padding-left:1.5rem] md:[scroll-padding-left:1.25rem]"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}

          >
            {TEAM.map((m) => (
              <article
                key={m.name}
                data-team-card
                className="snap-start shrink-0 basis-[85%] sm:basis-[60%] md:basis-[calc((100%-3rem)/3)] lg:basis-[calc((100%-4.5rem)/4)] bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col"
              >
                {/* Mobile: image with overlay text */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted md:hidden">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-5 pt-16">
                    <span className="inline-block text-[10px] font-semibold tracking-wider text-white/90 uppercase leading-tight">
                      {m.role}
                    </span>
                    <h3 className="mt-1.5 text-lg font-bold text-white leading-snug">{m.name}</h3>
                  </div>
                </div>
                {/* Mobile bio */}
                <div className="p-5 md:hidden">
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="hidden md:flex p-6 flex-col gap-3 flex-1">
                  <span className="inline-block self-start text-[10px] font-semibold tracking-wider text-accent-foreground bg-accent/60 px-2.5 py-1 rounded-full uppercase leading-tight">
                    {m.role}
                  </span>
                  <h3 className="text-lg font-bold text-foreground leading-snug">{m.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
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
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" style={{ lineHeight: "1.15" }}>
            Begin Your Cellular Recovery Protocol.
          </h2>
          <p className="mt-4 text-white max-w-md mx-auto" style={{ textWrap: "pretty" }}>
            Consult with our elite clinical faculty to design a targeted, personalized treatment plan.
          </p>
          <a
            href="#admissions"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FDAA3E] text-[#1a1a1a] px-8 py-4 text-sm font-semibold hover:bg-[#fdb95e] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FDAA3E]/25"
          >
            Book consultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const mapSrc =
    "https://www.google.com/maps?q=" +
    encodeURIComponent("21 Nodar Bokhua I Ln, Tbilisi 0159, Georgia") +
    "&output=embed";
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 text-slate-400">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: HQ */}
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 mb-3 block">
              Corporate Headquarters
            </span>
            <address className="not-italic text-sm leading-relaxed tracking-wide">
              <div className="font-semibold text-slate-100">Stem Plus LLC</div>
              <div>21 Nodar Bokhua I Ln</div>
              <div>Tbilisi, 0159</div>
              <div>Georgia</div>
            </address>
          </div>

          {/* Column 2: Map */}
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 mb-3 block">
              Spatial Location
            </span>
            <div className="rounded-xl overflow-hidden border border-slate-800" style={{ height: 180 }}>
              <iframe
                title="Stem Plus LLC location"
                src={mapSrc}
                width="100%"
                height="180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
            </div>
          </div>

          {/* Column 3: Contacts */}
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 mb-3 block">
              Clinical Contacts
            </span>
            <ul className="text-sm space-y-2">
              <li><span className="text-slate-100 font-medium">GE:</span> +995 [Click to add number]</li>
              <li><span className="text-slate-100 font-medium">US:</span> +1 [Click to add number]</li>
              <li><span className="text-slate-100 font-medium">UK:</span> +44 [Click to add number]</li>
              <li><span className="text-slate-100 font-medium">DE:</span> +49 [Click to add number]</li>
              <li>
                <span className="text-slate-100 font-medium">Email:</span>{" "}
                <a
                  href="mailto:stemcellplus@gmail.com"
                  className="text-slate-300 transition-colors duration-200 hover:text-[#02C39A]"
                >
                  stemcellplus@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2026 Stem Plus LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-slate-400 transition-colors duration-200 hover:text-[#02C39A]">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-slate-400 transition-colors duration-200 hover:text-[#02C39A]">Terms of Service</Link>
            <Link to="/terms" className="text-xs text-slate-400 transition-colors duration-200 hover:text-[#02C39A]">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Scroll reveal wrapper (animations removed) ─── */
function ScrollReveal({ children }: { children: React.ReactNode; delay?: number }) {
  return <>{children}</>;
}
