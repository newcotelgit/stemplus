import { Brain, Activity, RefreshCw, Flame, ShieldAlert, Heart } from 'lucide-react';

export default function WhatWeTreatSection() {
  const specialties = [
    {
      icon: <Brain className="w-6 h-6 text-[#03045E]" />,
      title: "Neurology & Neuro-Regeneration",
      description: "Advanced cell deployment protocols for Stroke recovery, Neurological optimization, and cognitive restoration.",
      tag: "Faculty Led"
    },
    {
      icon: <Activity className="w-6 h-6 text-[#02C39A]" />,
      title: "Developmental Protocols",
      description: "Targeted, specialized therapeutic interventions focusing on Autism spectrum support and neuro-developmental scaling.",
      tag: "Pediatric Care"
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#00A896]" />,
      title: "Autoimmune & GI Disorders",
      description: "Systemic immune modulation therapies addressing complex conditions such as Crohn's Disease and chronic inflammation.",
      tag: "Systemic Renewal"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#03045E]" />,
      title: "Metabolic & Endocrine Optimization",
      description: "Comprehensive bio-therapeutic routing for advanced Diabetes management and systematic metabolic repair.",
      tag: "-60% Glucose Drop"
    },
    {
      icon: <Heart className="w-6 h-6 text-[#02C39A]" />,
      title: "Cellular Rejuvenation & Anti-Aging",
      description: "Advanced tissue longevity and preventative systemic repair designed for international health tourists.",
      tag: "Longevity"
    },
    {
      icon: <Flame className="w-6 h-6 text-[#00A896]" />,
      title: "Orthopedic & Joint Regeneration",
      description: "Non-surgical biomaterial targeting for severe joint deterioration and complex spinal mobility restoration.",
      tag: "Mobility Restored"
    }
  ];

  return (
    <section id="features" className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <h2 className="text-base font-bold text-[#02C39A] uppercase tracking-wider mb-3">
            Clinical Focus Areas
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-[#03045E] tracking-tight leading-none mb-4">
            Targeted Cellular Bio-Therapeutics.
          </p>
          <p className="text-slate-500 text-lg">
            Our elite medical faculty deploys rigorous, evidence-backed cellular protocols optimized for complex systemic, neurological, and structural recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {specialties.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100/50 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 transition-colors group-hover:bg-white">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#03045E] tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>
              <div className="inline-flex items-center text-[11px] font-bold tracking-wide uppercase text-slate-400 group-hover:text-[#00A896] transition-colors">
                <span>{item.tag}</span>
                <span className="ml-1 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
