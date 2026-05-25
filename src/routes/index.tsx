import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Infinity as InfinityIcon, Flame, CalendarDays, Moon, Bell, BarChart3, CloudUpload,
  CheckCircle2, TrendingUp, Sparkles, ArrowRight, ArrowUpRight, Star, Quote,
  ClipboardList, Syringe, Activity, Stethoscope, ShieldCheck, ShieldPlus,
  Brain, Heart, ShieldAlert, Baby, Bone, Droplet, Zap, Sparkle, Dna, Pill, HeartPulse, Leaf,
  ChevronLeft, ChevronRight, Calendar,
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
            The StemPlus Legacy: Bridging Decades of Cellular Science
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
          className="absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-right pointer-events-none select-none"
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

function Reviews() {
  const [index, setIndex] = useState(0);
  const total = successStories.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const story = successStories[index];

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white">
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
          <div className="grid md:grid-cols-2 gap-5 md:gap-8 items-stretch">
            {/* Left: image OR typographic data graphic */}
            <div
              className="relative rounded-3xl overflow-hidden flex items-center justify-center h-[360px] md:h-[500px] transition-colors duration-500"
              style={{ backgroundColor: story.kind === "graphic" ? story.graphic.bg : "#0f172a" }}
            >
              {/* Preload + stack all image slides so switching is instant (no re-fetch/decode) */}
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

              {/* Bottom overlay strip — readable over both images and graphic blocks */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between text-white text-xs font-medium">
                <span>StemPlus Tbilisi</span>
                <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
              </div>
            </div>


            {/* Right: white quote card */}
            <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] p-6 sm:p-8 md:p-10 flex flex-col h-[420px] md:h-[500px] overflow-y-auto">
              <Quote className="absolute top-6 right-6 w-14 h-14 sm:w-20 sm:h-20 text-[#FDAA3E]/15" />

              <span className="inline-block self-start rounded-full bg-[#FDAA3E]/10 text-[#B86A12] border border-[#FDAA3E]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1.5 mb-5 sm:mb-6 max-w-full">
                {story.badge}
              </span>

              <p className="relative text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed flex-1" style={{ textWrap: "pretty" }}>
                "{story.text}"
              </p>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100">
                <p className="text-sm sm:text-base font-semibold text-slate-900">{story.author}</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{story.location}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 sm:mt-10 flex items-center justify-between gap-4">
            <button
              onClick={prev}
              aria-label="Previous story"
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FDAA3E] text-white hover:bg-[#fdb95e] active:scale-95 transition-all shadow-md shadow-[#FDAA3E]/30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
              {successStories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to story ${i + 1}`}
                  className={`transition-all rounded-full ${
                    i === index
                      ? "w-6 h-2 bg-[#FDAA3E]"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next story"
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FDAA3E] text-white hover:bg-[#fdb95e] active:scale-95 transition-all shadow-md shadow-[#FDAA3E]/30"
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
  { img: doctor1, name: "Dr. Yaroslav Myroshnykov, MD", role: "CHIEF MEDICAL OFFICER & REGENERATIVE CELL THERAPIST", bio: "Pioneer in clinical cell transplantation, directing advanced embryonic cell protocols and customized bio-therapeutic pathways for complex international cases." },
  { img: doctor2, name: "Dr. Nini Kandelaki, PhD", role: "DERMATOLOGIST & SPECIALIST IN COSMETOLOGY", bio: "Leading advanced cellular skin rejuvenation treatments, aesthetic exosome therapies, and custom anti-aging dermal protocols." },
  { img: doctor3, name: "Dr. Mikhail Tsverava", role: "DIAGNOSTIC ULTRASOUND SPECIALIST", bio: "Providing precision high-resolution sonographic diagnostics and targeted ultrasound-guided localization for localized tissue infusions." },
  { img: doctor4, name: "Dr. Eleonora Fiodorova", role: "ENDOCRINOLOGIST & NUTRITIONIST", bio: "Specializing in comprehensive metabolic stabilization, weight optimization tracking, and advanced endocrine system compensation plans." },
  { img: doctor7, name: "Dr. Natia Alania", role: "NEUROLOGIST", bio: "Specializing in neurodevelopmental tracking, localized cellular applications, and targeted recovery protocols for Autism and neurological cases." },
  { img: doctor8, name: "Dr. Giorgi Archaia", role: "NEUROSURGEON, NEUROLOGIST & VERTEBROLOGIST", bio: "Directing advanced clinical neuro-recovery pathways, complex spinal system diagnostics, and targeted neural regeneration protocols." },
  { img: doctor5, name: "Lili Martashvili", role: "HEAD NURSE", bio: "Directing the clinical nursing department, patient intake procedures, and ensuring flawless medical compliance safety across all departments." },
  { img: doctor6, name: "Mako Khachidze", role: "CLINICAL INFUSION NURSE", bio: "Managing therapeutic patient care monitoring, daily coordinate tracking, and professional execution of advanced cellular intravenous protocols." },
];

function MedicalTeam() {
  return (
    <section id="team" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            The Minds Behind the Medicine
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Meet the elite clinical faculty and cellular bio-therapeutic pioneers directing your recovery protocols at StemPlus Tbilisi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="group bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
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
    </section>
  );
}


/* ─── Premium CTA ─── */
function PremiumCTA() {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7 flex flex-col justify-center space-y-6 z-10 bg-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03045E]/5 text-[#03045E] text-xs font-semibold tracking-wide uppercase self-start">
              <ShieldCheck className="w-3.5 h-3.5 text-[#02C39A]" /> Global Patient Intake
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#03045E] tracking-tight leading-none">
              Begin Your Cellular <br className="hidden sm:inline" />
              Recovery Protocol.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Connect directly with our admissions team to evaluate your medical history, discuss targeted cell deployment strategies, and schedule your treatment at StemPlus Tbilisi.
            </p>
            <hr className="border-slate-100 my-2" />
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#booking" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#02C39A] hover:bg-[#00A896] text-white font-semibold rounded-xl shadow-lg shadow-[#02C39A]/20 transition-all duration-300 hover:-translate-y-0.5">
                <Calendar className="w-4 h-4" /> Schedule Clinical Consultation
              </a>
              <a href="#booking" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#03045E] font-semibold rounded-xl border border-slate-200 transition-all duration-300">
                Speak with a Case Manager <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
            <p className="text-xs text-slate-400 pt-2">
              No referral required. Direct international medical travel coordination provided.
            </p>
          </div>
          <div className="relative lg:col-span-5 h-72 sm:h-96 lg:h-auto min-h-[350px] bg-slate-100">
            <img
              src={patient13}
              alt="Patient recovery success portrait"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center lg:object-[25%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-slate-200/50 text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinic Location</p>
              <p className="text-xs font-semibold text-[#03045E]">Tbilisi, Georgia</p>
            </div>
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
