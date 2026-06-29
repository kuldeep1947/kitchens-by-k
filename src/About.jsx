import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Clock, Sparkles } from "lucide-react";
import Reveal, { fadeUp, scaleIn } from "./components/shared/Reveal";
import AuroraBackground from "./components/ui/aurora-background";
import SmartImage from "./components/ui/smart-image";

/* HERO */
function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <AuroraBackground intensity="subtle" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-[13px] text-slate-400 hover:text-slate-600 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[12px] font-semibold tracking-[0.15em] uppercase text-saffron mb-6">
          About Us
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold leading-[0.95] tracking-tighter text-slate-900 dark:text-white">
          Built by professionals,
          <br />
          <span className="text-aurora text-glow">for professionals.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-7 text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Behind every meal is a team that understands the demands of corporate life &mdash; because we&rsquo;ve lived it.
        </motion.p>
      </div>
    </section>
  );
}

/* FOUNDER PROFILE — ASYMMETRICAL BENTO LAYOUT */
function FounderProfile() {
  const founders = [
    {
      name: "Daddy",
      title: "Tech Architect",
      image: "/images/daddy-profile.png",
      credentials: ["AWS Cloud Architect", "DevOps Expert", "Full-Stack Developer"],
      storyTitle: "From Cloud to Kitchen",
      storyIcon: <span className="text-xl">🌊</span>,
      quote: "Great food deserves great technology. Every line of code behind Kitchens by K is optimized for speed, reliability, and a delightful user experience — because your lunch break shouldn't come with loading screens.",
      bio: "Combining expertise in cloud infrastructure, DevOps automation, and full-stack development, I architected the entire digital experience of Kitchens by K. From the PWA you're using right now to the backend systems ensuring every order is tracked and delivered flawlessly — technology meets taste, built with the same rigor I apply to enterprise cloud solutions.",
      footer: "Today, the platform serves 50+ corporate clients with a modern PWA built on React, AWS infrastructure, and enterprise-grade DevOps practices — ensuring every click, every order, and every delivery is as smooth as the meals we serve.",
    },
    // {
    //   name: "CA Kanak Maheshwari",
    //   title: "Founder",
    //   image: "/images/kanak-profile.png",
    //   credentials: ["Chartered Accountant", "EY (Big Four)", "ICAI Member"],
    //   storyTitle: "From Big Four to Better Food",
    //   storyIcon: <Sparkles size={18} className="text-saffron" />,
    //   quote: null,
    //   story: "As a Chartered Accountant navigating high-pressure audit seasons at EY, I experienced firsthand the daily struggle of finding fresh, high-quality, and reliable meals in the corporate world. Mumbai's busiest professionals shouldn't have to compromise their health or time for a good lunch.",
    //   bio: "Combining her deep understanding of corporate rigor, uncompromising standards, and a passion for excellence, Kanak co-founded Kitchens by K. Her mission? To bring the same level of precision and quality she applies to financial audits directly to your desk — ensuring that every meal delivered is nutritious, punctual, and crafted to perfection.",
    //   footer: "Today, Kitchens by K serves 50+ corporate clients across Mumbai, trusted by HR directors, executives, and founders who demand the best for their teams. Every process — from sourcing ingredients to final delivery — reflects Kanak's audit-trained eye for quality and consistency.",
    // },
  ];

  return (
    <section className="py-20 md:py-32 px-6 relative">
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[700px] h-[500px] bg-saffron/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-saffron mb-4">Meet the Founders</p>
        </Reveal>
        <Reveal custom={1}>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-16">
            The minds behind<br /><span className="text-aurora">the menu.</span>
          </h2>
        </Reveal>

        <div className="space-y-16">
          {founders.map((founder, index) => (
            <div key={founder.name} className="grid md:grid-cols-5 gap-6 items-stretch">
              {/* Left — Profile Image */}
              <Reveal variants={scaleIn} custom={index * 2} className="md:col-span-2">
                <div className="glass rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-black/30 transition-all duration-500 h-full flex flex-col items-center justify-center p-8 md:p-10">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-saffron/20 shadow-lg mb-6">
                    <SmartImage
                      src={founder.image}
                      alt={`${founder.name} — ${founder.title} of Kitchens by K`}
                      className="w-full h-full"
                      imgClassName="object-top"
                    />
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white text-lg">{founder.name}</p>
                  <p className="text-[13px] text-slate-400 mt-1">{founder.title}</p>
                </div>
              </Reveal>

              {/* Right — Bio + Story */}
              <Reveal variants={fadeUp} custom={index * 2 + 1} className="md:col-span-3">
                <div className="glass rounded-3xl p-8 md:p-10 shadow-sm h-full flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center">
                      {founder.storyIcon}
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-slate-300 dark:text-slate-500 tracking-wider">The Story</p>
                      <p className="text-[14px] font-semibold text-slate-900 dark:text-white">{founder.storyTitle}</p>
                    </div>
                  </div>

                  <blockquote className="border-l-2 border-saffron/30 pl-5 mb-8">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px] italic">
                      &ldquo;{founder.quote ?? founder.story}&rdquo;
                    </p>
                  </blockquote>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px] mb-6">
                    {founder.bio}
                  </p>

                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[14px]">
                    {founder.footer}
                  </p>

                  {/* Credentials */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {founder.credentials.map((cred) => (
                      <span key={cred} className="text-[12px] font-semibold text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* WHY US — GLASSMORPHIC BADGE CARDS */
function WhyUs() {
  const badges = [
    {
      icon: Shield,
      title: "Uncompromising Quality",
      desc: "Every ingredient is audited for freshness. Every meal is quality-checked before dispatch — the same rigour a chartered accountant applies to financial statements, now applied to your lunch.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Clock,
      title: "Punctual Delivery",
      desc: "In auditing, deadlines are non-negotiable. We bring that same discipline to delivery — your meals arrive hot and on time, every single day.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Sparkles,
      title: "Corporate-Grade Hygiene",
      desc: "Our kitchen meets the highest hygiene standards with regular third-party audits. Cleanliness isn't a goal — it's a prerequisite.",
      color: "text-saffron",
      bg: "bg-saffron/10",
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 relative">
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-emerald-100/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-saffron mb-4 text-center">Our Ethos</p>
        </Reveal>
        <Reveal custom={1}>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white text-center mb-16">
            Why teams trust us.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {badges.map((b, i) => (
            <Reveal key={b.title} variants={scaleIn} custom={i}>
              <div className="group h-full glass rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-black/30 transition-all duration-500">
                <span className={`inline-flex w-11 h-11 items-center justify-center rounded-xl ${b.bg} mb-6`}>
                  <b.icon size={20} className={b.color} />
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{b.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ABOUT PAGE */
export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden antialiased transition-colors duration-300">
      <AboutHero />
      <FounderProfile />
      <WhyUs />
    </div>
  );
}
