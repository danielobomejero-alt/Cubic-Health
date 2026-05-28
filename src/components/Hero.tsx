import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-20 pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(23,130,130,0.14),transparent_34%),radial-gradient(circle_at_15%_15%,rgba(245,158,11,0.15),transparent_28%)]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <Sparkles size={14} />
            Premium Healthcare Concierge
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-slate-900 lg:text-7xl">
            Modern healthcare access in Lagos with a{" "}
            <span className="text-gradient-brand">trusted concierge team</span>.
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
            Skip long wait times and uncertainty. We coordinate medical, dental,
            and cosmetic care with global standards for diaspora families and
            busy professionals.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="w-full rounded-xl bg-brand-cta px-8 py-4 text-center text-lg font-bold text-white shadow-lg shadow-orange-200/70 transition-all hover:-translate-y-1 hover:bg-orange-600 sm:w-auto"
            >
              Book a Free Consultation
            </a>
            <a
              href="#how-it-works"
              className="flex w-full items-center justify-center gap-2 px-8 py-4 font-semibold text-slate-700 transition-colors hover:text-brand-primary sm:w-auto"
            >
              Learn How It Works <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2.3rem] border border-white/60 shadow-2xl shadow-brand-primary/20">
            <img
              src="/images/hero.png"
              alt="Doctor consulting patient in modern clinic"
              className="h-[620px] w-full object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/50 bg-white/80 p-5 backdrop-blur-md">
              <p className="text-sm font-semibold text-brand-primary">
                Trusted, private, and efficient
              </p>
              <p className="text-sm text-slate-700">
                "From request to treatment plan in under 48 hours."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

