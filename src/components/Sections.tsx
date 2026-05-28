import React, { useState } from 'react';
import { motion } from 'motion/react';
import { logEvent } from '../services/analytics';
import {
  Puzzle,
  Heart,
  Activity,
  Users,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Utensils,
  Dumbbell,
  ChevronRight,
  Quote,
  Plus
} from 'lucide-react';

export const Hero = () => {

  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-[#F4F8F5]">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold mb-6 uppercase tracking-widest">
              solve your health puzzle
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 leading-tight mb-6">
              Silent risk is the <br />
              <span className="text-emerald-700">most dangerous risk.</span>
            </h1>
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 mb-8 max-w-xl">
              <p className="text-emerald-900 font-medium italic">
                "80% of cardiovascular events like stroke and heart attack are preventable, yet most people don't see them coming."
              </p>
              <p className="text-emerald-700 text-xs font-bold mt-1 uppercase tracking-wider">— American Heart Association</p>
            </div>
            <p className="text-xl text-neutral-600 mb-10 max-w-xl leading-relaxed">
              Assess your health today with Cubik Health. We help you stay ahead of chronic diseases through targeted screening and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#risk-assessment"
                onClick={() => logEvent('Hero', 'Click', 'Check My Risk Now')}
                className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-2"
              >
                <span>Check My Risk Now</span>
                <ArrowRight size={20} />
              </a>
              <a
                href="#pathway"
                onClick={() => logEvent('Hero', 'Click', 'Learn More')}
                className="px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-12 lg:mt-0"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white max-w-lg mx-auto lg:max-w-none bg-white">
              <img
                src="/images/black_doctor_nurses.png"
                alt="Cubik Health Medical Team"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 bg-emerald-100 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-emerald-600/10 rounded-full -z-10 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Pathway = () => {
  const steps = [
    {
      icon: <Heart className="text-emerald-600" />,
      title: "Check Your Risk",
      desc: "Understand your silent health risks through our assessment tools."
    },
    {
      icon: <Activity className="text-emerald-600" />,
      title: "Track Your Metrics",
      desc: "Monitor blood pressure, cholesterol, weight, and daily activity."
    },
    {
      icon: <Users className="text-emerald-600" />,
      title: "Take Action with Experts",
      desc: "Consult nutritionists, fitness coaches, and healthcare providers."
    }
  ];

  return (
    <section id="pathway" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">How Cubik Helps You Stay Ahead</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Our 3-step approach to proactive health management.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{idx + 1}. {step.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

type LabDetail = {
  title: string;
  why: string;
  who: string;
  freq: string;
  badge: string;
  detail: {
    intro: string;
    measured?: { name: string; desc: string }[];
    ranges?: { label: string; value: string }[];
    prep?: string;
    note?: string;
  };
};

const LAB_DATA: LabDetail[] = [
  {
    title: "Lipid Profile", why: "Measures cholesterol levels to assess heart disease risk.", who: "Adults 20+", freq: "Every 4–6 years", badge: "Heart Health",
    detail: {
      intro: "A lipid profile measures cholesterol and triglycerides in your blood. High LDL and triglycerides, or low HDL, can cause plaque buildup in arteries—raising your risk of heart attack and stroke.",
      measured: [
        { name: "LDL (\"bad\" cholesterol)", desc: "Primary contributor to arterial plaque." },
        { name: "HDL (\"good\" cholesterol)", desc: "Helps remove excess cholesterol from the blood." },
        { name: "Triglycerides", desc: "A type of fat linked to diet and heart risk." },
        { name: "Total Cholesterol", desc: "Overall picture of cardiovascular lipid health." },
      ],
      prep: "Usually requires fasting for 9–12 hours (water only). Non-fasting samples may be acceptable for some screenings—follow your clinician's instructions.",
      note: "Test more often (every 1–2 years) if you have elevated cholesterol, are on medication, or have other cardiovascular risks.",
    }
  },
  {
    title: "HbA1c", why: "Reflects your average blood sugar over the past 3 months.", who: "Adults 45+ or at risk", freq: "Every 1–3 years", badge: "Diabetes Screen",
    detail: {
      intro: "HbA1c shows long-term glucose control and is key for diagnosing prediabetes and type 2 diabetes. Unlike a daily finger-stick test, it reflects a weighted average over 3 months as glucose attaches to hemoglobin in red blood cells.",
      ranges: [
        { label: "Normal", value: "Below 5.7%" },
        { label: "Prediabetes", value: "5.7% – 6.4%" },
        { label: "Diabetes", value: "6.5% or higher" },
      ],
      note: "Adults under 45 who are overweight with risk factors (family history, high BP, sedentary lifestyle, PCOS) should also test. Those with diabetes should test 2–4× per year.",
    }
  },
  {
    title: "Blood Pressure", why: "Detects hypertension — the silent killer.", who: "Everyone", freq: "Every visit or monthly", badge: "Silent Killer",
    detail: {
      intro: "Hypertension rarely causes symptoms but silently damages arteries, heart, brain, and kidneys over years. It is the single most modifiable risk factor for stroke and heart failure.",
      ranges: [
        { label: "Normal", value: "< 120/80 mm Hg" },
        { label: "Elevated", value: "120–129 / < 80" },
        { label: "Stage 1 Hypertension", value: "130–139 or 80–89" },
        { label: "Stage 2 Hypertension", value: "≥ 140 or ≥ 90" },
        { label: "Hypertensive Crisis", value: "> 180 / > 120 — seek care immediately" },
      ],
      prep: "Use an upper-arm validated cuff. Take readings twice daily (morning before medications, and evening) for 5–7 days before a visit for an accurate average.",
      note: "There is no lower age limit. Everyone — including children and young adults — should have their blood pressure checked.",
    }
  },
  {
    title: "BMI / Waist", why: "Assesses body composition and metabolic risk.", who: "Everyone", freq: "Every 6 months", badge: "Metabolic Risk",
    detail: {
      intro: "BMI estimates body fat from height and weight. Waist circumference measures central (abdominal) obesity, which is a stronger predictor of metabolic syndrome, type 2 diabetes, and heart disease than BMI alone.",
      ranges: [
        { label: "Underweight", value: "BMI < 18.5" },
        { label: "Healthy Weight", value: "BMI 18.5 – 24.9" },
        { label: "Overweight", value: "BMI 25 – 29.9" },
        { label: "Obesity", value: "BMI ≥ 30" },
        { label: "High Risk Waist (Men)", value: "≥ 40 inches (102 cm)" },
        { label: "High Risk Waist (Women)", value: "≥ 35 inches (88 cm)" },
      ],
      note: "BMI may overestimate fat in very muscular individuals. Waist circumference adds critical context. Thin individuals can still have metabolically unhealthy visceral fat.",
    }
  },
  {
    title: "Liver Function", why: "Checks for liver injury, inflammation, or fatty liver.", who: "Adults with risk factors", freq: "Annually or as advised", badge: "Liver Health",
    detail: {
      intro: "Liver function tests (LFTs) measure enzymes and proteins to detect liver injury or inflammation. The most common cause of mildly elevated LFTs is non-alcoholic fatty liver disease (NAFLD), linked to obesity and insulin resistance.",
      measured: [
        { name: "ALT", desc: "Most specific marker of liver cell injury." },
        { name: "AST", desc: "Less specific; also elevated with heart or muscle damage." },
        { name: "GGT", desc: "Sensitive to alcohol use and bile duct issues." },
        { name: "Albumin", desc: "Protein produced by the liver; low levels indicate reduced liver function." },
      ],
      note: "Mild ALT elevation (1–2× upper normal) is common and often reversible with weight loss, exercise, and reduced alcohol/sugar. Also recommended for those on medications that affect the liver (statins, methotrexate).",
    }
  },
  {
    title: "Kidney Function", why: "Ensures kidneys filter blood properly.", who: "Adults with BP or Diabetes", freq: "Annually", badge: "Kidney Health",
    detail: {
      intro: "Chronic kidney disease (CKD) is often silent until significant damage has occurred. Early detection can slow or stop progression through lifestyle changes and medication.",
      measured: [
        { name: "Serum Creatinine", desc: "Waste product from muscle. High levels suggest poor filtration." },
        { name: "eGFR", desc: "Estimates filtration rate. Normal is ≥ 90 mL/min/1.73m²." },
        { name: "UACR (Urine Albumin)", desc: "The earliest sign of kidney damage — detects tiny amounts of protein in urine." },
      ],
      note: "True CKD is defined as eGFR < 60 for > 3 months OR any albumin in urine regardless of eGFR. Adults over 60 with any vascular risk factor should also test annually.",
    }
  },
];

export const Labs = () => {
  const [selected, setSelected] = React.useState<LabDetail | null>(null);

  return (
    <section className="py-24 bg-[#F4F8F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Targeted Lab Recommendations</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Click any card to learn more about each screening test.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_DATA.map((lab, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(6,78,59,0.10)' }}
              onClick={() => setSelected(lab)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 cursor-pointer group transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-emerald-800">{lab.title}</h3>
                <span className="ml-2 shrink-0 text-xs font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-100">{lab.badge}</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-neutral-600"><span className="font-bold text-neutral-800">Why:</span> {lab.why}</p>
                <p className="text-sm text-neutral-600"><span className="font-bold text-neutral-800">Who:</span> {lab.who}</p>
                <div className="pt-2 flex items-center text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  <Activity size={14} className="mr-1" />
                  {lab.freq}
                </div>
              </div>
              <div className="mt-4 flex items-center text-emerald-700 text-xs font-bold group-hover:gap-2 transition-all">
                <ChevronRight size={14} className="mr-1 group-hover:translate-x-1 transition-transform" /> Learn more
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="bg-emerald-900 text-white p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-2 block">{selected.badge}</span>
                  <h2 className="text-3xl font-bold">{selected.title}</h2>
                </div>
                <button onClick={() => setSelected(null)} className="text-emerald-300 hover:text-white text-2xl font-bold leading-none">✕</button>
              </div>
              <div className="mt-4 flex gap-4 flex-wrap">
                <span className="bg-emerald-800 px-3 py-1 rounded-full text-sm"><span className="text-emerald-300 font-bold">Who: </span>{selected.who}</span>
                <span className="bg-emerald-800 px-3 py-1 rounded-full text-sm"><span className="text-emerald-300 font-bold">Frequency: </span>{selected.freq}</span>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">Why it matters</h3>
                <p className="text-neutral-600 leading-relaxed">{selected.detail.intro}</p>
              </div>

              {selected.detail.measured && (
                <div>
                  <h3 className="font-bold text-neutral-900 mb-3">What's measured</h3>
                  <ul className="space-y-3">
                    {selected.detail.measured.map((m, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle2 size={16} className="text-emerald-600 mt-1 shrink-0" />
                        <div><span className="font-bold text-neutral-800">{m.name}</span> — <span className="text-neutral-600">{m.desc}</span></div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.detail.ranges && (
                <div>
                  <h3 className="font-bold text-neutral-900 mb-3">Reference ranges</h3>
                  <div className="space-y-2">
                    {selected.detail.ranges.map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                        <span className="text-sm font-semibold text-neutral-700">{r.label}</span>
                        <span className="text-sm font-bold text-emerald-700">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.detail.prep && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <h3 className="font-bold text-amber-800 mb-1">Preparation</h3>
                  <p className="text-sm text-amber-700">{selected.detail.prep}</p>
                </div>
              )}

              {selected.detail.note && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <h3 className="font-bold text-emerald-800 mb-1">Important Note</h3>
                  <p className="text-sm text-emerald-700">{selected.detail.note}</p>
                </div>
              )}

              <a href="#contact" onClick={() => setSelected(null)} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg block text-center">
                <span>Book a Screening Consultation</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export const Learning = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const modules = [
    { title: "Why high cholesterol is silent", content: "Cholesterol buildup in arteries doesn't cause symptoms until a major event occurs. Regular screening is the only way to know your levels." },
    { title: "How walking reduces heart risk", content: "Just 30 minutes of brisk walking daily can lower blood pressure and improve heart muscle efficiency significantly." },
    { title: "Understanding BP numbers", content: "Systolic (top) is pressure during heartbeats; Diastolic (bottom) is pressure between beats. Both are critical for health." },
    { title: "Food swaps for better heart health", content: "Replace butter with olive oil, white bread with whole grains, and salt with herbs to protect your cardiovascular system." },
    { title: "The danger of trans fats", content: "Trans fats raise bad cholesterol (LDL) and lower good cholesterol (HDL), significantly increasing heart disease risk." },
    { title: "Benefits of Omega-3 fatty acids", content: "Found in fatty fish and walnuts, Omega-3s help reduce inflammation and lower the risk of heart rhythm disorders." },
    { title: "How stress impacts heart health", content: "Chronic stress releases cortisol and adrenaline, which can increase blood pressure and damage arterial walls over time." },
    { title: "The role of fiber in heart health", content: "Soluble fiber binds to cholesterol in the digestive system and helps remove it from the body, lowering overall levels." },
    { title: "Hydration and blood pressure", content: "Dehydration can cause blood to thicken, making the heart work harder and potentially raising blood pressure." },
    { title: "Sleep quality and metabolic health", content: "Poor sleep disrupts hormones that regulate appetite and blood sugar, increasing the risk of obesity and diabetes." },
    { title: "Hidden sugars in processed foods", content: "Excess sugar is converted to fat by the liver, contributing to fatty liver disease and systemic inflammation." },
    { title: "The importance of strength training", content: "Building muscle improves insulin sensitivity and helps maintain a healthy weight, both vital for heart health." },
    { title: "Alcohol and heart rhythm", content: "Excessive alcohol consumption can trigger atrial fibrillation and weaken the heart muscle over time." },
    { title: "Smoking cessation benefits", content: "Within just 24 hours of quitting, your risk of heart attack begins to decrease as oxygen levels in the blood improve." },
    { title: "Salt intake and fluid retention", content: "High sodium intake causes the body to hold onto water, increasing the volume of blood and raising pressure on arteries." },
    { title: "The power of antioxidants", content: "Antioxidants in colorful vegetables protect cells from oxidative stress, which is a key driver of arterial plaque formation." },
    { title: "Managing portion sizes", content: "Using smaller plates and focusing on nutrient density helps prevent overeating and maintains a healthy metabolic rate." },
    { title: "Reading nutrition labels effectively", content: "Look beyond calories; check for serving sizes, added sugars, and sodium content to make truly heart-healthy choices." },
    { title: "Oral health and heart health", content: "Gum disease is linked to increased heart disease risk, as bacteria from the mouth can enter the bloodstream and cause inflammation." },
    { title: "Mindful eating practices", content: "Eating slowly and without distractions helps you recognize fullness cues, preventing weight gain and digestive stress." }
  ];

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, modules.length));
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Small Lessons. Big Health Impact.</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Bite-sized preventive health education you can read in 90 seconds.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {modules.slice(0, visibleCount).map((mod, idx) => (
            <motion.details
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 4) * 0.1 }}
              className="group bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden transition-all"
            >
              <summary className="p-6 cursor-pointer flex items-center justify-between list-none">
                <h3 className="text-lg font-bold text-neutral-800 group-open:text-emerald-700 transition-colors">{mod.title}</h3>
                <ChevronRight className="text-neutral-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-neutral-600 leading-relaxed">
                {mod.content}
              </div>
            </motion.details>
          ))}
        </div>

        {visibleCount < modules.length && (
          <div className="text-center">
            <button
              onClick={showMore}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-white hover:bg-neutral-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold transition-all"
            >
              <Plus size={20} />
              <span>Show More Lessons</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const items = [
    { text: "Cubik Health helped me discover my risk early and change my diet. My cholesterol dropped significantly in just 3 months.", author: "Michael A.", role: "Marketing Executive, 42", initial: "M", stars: 5 },
    { text: "As a busy professional, I never had time for health checks. Cubik's assessment gave me the clarity I needed to start my fitness journey.", author: "Elena O.", role: "Lawyer, 34", initial: "E", stars: 5 },
    { text: "I had no idea my blood pressure was that high. The Cubik screening caught it early. My doctor says I may have avoided a stroke.", author: "James T.", role: "Teacher, 58", initial: "J", stars: 5 },
    { text: "The nutrition consultation was life-changing. I lost 12kg in 4 months without any fad diets — just real, personalised food plans.", author: "Amara B.", role: "Nurse, 37", initial: "A", stars: 5 },
    { text: "Cubik's physician review explained my lab results in simple language. For the first time, I actually understood my own health.", author: "Tobi F.", role: "Engineer, 45", initial: "T", stars: 5 },
    { text: "My HbA1c was in the prediabetes range and I didn't even know. Six months later, I'm back to normal. Thank you Cubik Health.", author: "Grace N.", role: "Business Owner, 51", initial: "G", stars: 5 },
    { text: "The fitness coaching matched exactly my schedule and fitness level. I feel 10 years younger and my cardiologist is impressed.", author: "David K.", role: "Retired Civil Servant, 63", initial: "D", stars: 5 },
    { text: "Quick, easy, and incredibly thorough. Cubik Health is the health platform Nigeria has been waiting for.", author: "Funmi L.", role: "Pharmacist, 29", initial: "F", stars: 5 },
  ];

  // Duplicate the array so the marquee loops seamlessly
  const allItems = [...items, ...items];

  return (
    <section className="py-24 bg-emerald-900 text-white overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <Quote size={300} />
      </div>

      <div className="container mx-auto px-4 mb-14 relative z-10">
        <div className="text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">Real Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Members Say</h2>
          <p className="text-emerald-200/70 max-w-xl mx-auto">Thousands of people are already taking control of their health with Cubik.</p>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper relative z-10">
        <div className="marquee-track">
          {allItems.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 mx-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/90 text-sm leading-relaxed mb-6 flex-1">"{item.text}"</p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
                  {item.initial}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{item.author}</p>
                  <p className="text-emerald-300 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Consultation = () => {
  const services = [
    {
      icon: <Utensils size={24} />,
      image: '/images/nutrition.png',
      title: "Nutrition Consultation",
      desc: "Personalized meal plans for heart health and weight management. Our registered dietitians design science-backed nutrition strategies tailored to your risk profile and lifestyle."
    },
    {
      icon: <Dumbbell size={24} />,
      image: '/images/fitness.png',
      title: "Fitness Coaching",
      desc: "Safe, effective exercise routines tailored to your health data. Our certified coaches build progressive plans that improve heart strength, metabolic health, and daily energy."
    },
    {
      icon: <Stethoscope size={24} />,
      image: '/images/physician.png',
      title: "Physician Review",
      desc: "Expert medical review of your lab results and preventive strategy. Speak one-on-one with a board-certified clinician to understand your results and get a clear action plan."
    }
  ];

  return (
    <section id="consultation" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Consultation Services</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Connect with experts to take actionable steps toward better health.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-neutral-100 bg-white overflow-hidden shadow-sm text-center transition-all"
            >
              <div className="h-52 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 -mt-10 relative z-10 border-4 border-white shadow">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{s.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-10 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
          >
            <span>Book a Lifestyle Consultation</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="bg-neutral-900 text-neutral-400 py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 text-white font-bold text-2xl mb-6">
            <Puzzle className="text-emerald-500" fill="currentColor" fillOpacity={0.2} />
            <span>Cubik<span className="text-emerald-500">Health</span></span>
          </div>
          <p className="max-w-sm leading-relaxed">
            Cubik Health is a preventive health platform dedicated to early detection and proactive management of chronic diseases. Solve your health puzzle with us.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Home</a></li>
            <li><a href="#risk-assessment" className="hover:text-emerald-400 transition-colors">Risk Assessment</a></li>
            <li><a href="#pathway" className="hover:text-emerald-400 transition-colors">Our Pathway</a></li>
            <li><a href="#consultation" className="hover:text-emerald-400 transition-colors">Consultations</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-4">
            <li>support@cubikhealth.com</li>
            <li>+1 (555) 123-4567</li>
            <li className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-neutral-800 text-sm flex flex-col md:row justify-between items-center gap-4">
        <p>© 2026 Cubik Health. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);
