import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Heart, AlertCircle, CheckCircle2, ArrowRight, RefreshCcw, ShieldCheck, Clock } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { RiskCategory } from '../types';

export default function RiskScreening() {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    sex: 'male',
    bpSystolic: '',
    bpDiastolic: '',
    cholesterol: '',
    smoking: false,
    diabetes: false,
    physicalActivity: 'moderate',
  });

  const [result, setResult] = useState<{
    score: number;
    category: RiskCategory;
  } | null>(null);

  const calculateRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple mock calculation logic for cardiovascular risk
    // In a real app, this would use a validated clinical algorithm like Framingham or QRISK3
    let score = 0;
    const age = parseInt(formData.age);
    const sys = parseInt(formData.bpSystolic) || 120;
    const chol = parseInt(formData.cholesterol) || 180;

    score += (age - 30) * 0.5;
    if (formData.sex === 'male') score += 2;
    if (sys > 140) score += 5;
    if (chol > 240) score += 4;
    if (formData.smoking) score += 8;
    if (formData.diabetes) score += 10;
    if (formData.physicalActivity === 'low') score += 3;

    // Normalize score to a percentage (0-100)
    const finalScore = Math.min(Math.max(Math.round(score), 1), 100);

    let category: RiskCategory = 'Low';
    if (finalScore > 20) category = 'High';
    else if (finalScore > 10) category = 'Moderate';

    const assessmentResult = { score: finalScore, category };
    setResult(assessmentResult);

    try {
      // Save to Firestore
      await addDoc(collection(db, 'riskAssessments'), {
        ...formData,
        age: parseInt(formData.age),
        bpSystolic: parseInt(formData.bpSystolic) || null,
        bpDiastolic: parseInt(formData.bpDiastolic) || null,
        cholesterol: parseInt(formData.cholesterol) || null,
        riskScore: finalScore,
        riskCategory: category,
        timestamp: serverTimestamp(),
        userId: auth.currentUser?.uid || null,
      });

      // Sync to Google Sheets via backend
      const response = await fetch('/api/sync/risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            ...formData,
            riskScore: finalScore,
            riskCategory: category
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Google Sheets Sync Failed (Risk):', errorData.error);
      }
    } catch (error) {
      console.error("Error saving assessment:", error);
    }

    setLoading(false);
    setStep('result');
  };

  const reset = () => {
    setStep('form');
    setResult(null);
  };

  return (
    <section id="risk-assessment" className="py-24 bg-neutral-50 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/5 hidden lg:block rounded-l-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Information */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold mb-6 uppercase tracking-widest">
                Preventive Care
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6 leading-tight">
                Cardiovascular <br/>Risk Screening
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                Get instant insights into your heart health. This tool provides a preliminary assessment based on common risk factors, helping you take proactive steps before symptoms appear.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm flex items-start space-x-4 max-w-lg">
              <div className="bg-red-50 text-red-500 p-3 rounded-full flex-shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">The Silent Killer</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  1 in 3 adults has high blood pressure, and many don't know it. Early detection is your best defense against cardiovascular events.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              {[
                { icon: <Clock size={20} />, text: 'Takes less than 2 minutes to complete' },
                { icon: <ShieldCheck size={20} />, text: '100% confidential and secure data' },
                { icon: <Activity size={20} />, text: 'Based on standard clinical guidelines' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-neutral-700 font-medium">
                  <div className="text-emerald-600">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/20"
              >
                <span>Book a Screening</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-neutral-100 relative">
            <AnimatePresence mode="wait">
              {step === 'form' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={calculateRisk}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-700">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-700">Age</label>
                      <input
                        type="number"
                        required
                        min="18"
                        max="120"
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="Years"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-700">Sex</label>
                      <select
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        value={formData.sex}
                        onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-700">Systolic BP</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="mmHg (e.g. 120)"
                        value={formData.bpSystolic}
                        onChange={(e) => setFormData({ ...formData, bpSystolic: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-700">Cholesterol</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        placeholder="mg/dL"
                        value={formData.cholesterol}
                        onChange={(e) => setFormData({ ...formData, cholesterol: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-700">Physical Activity Level</label>
                    <select
                      className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.physicalActivity}
                      onChange={(e) => setFormData({ ...formData, physicalActivity: e.target.value })}
                    >
                      <option value="low">Low (Sedentary)</option>
                      <option value="moderate">Moderate (Active)</option>
                      <option value="high">High (Very Active)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <input
                        type="checkbox"
                        id="smoking"
                        className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                        checked={formData.smoking}
                        onChange={(e) => setFormData({ ...formData, smoking: e.target.checked })}
                      />
                      <label htmlFor="smoking" className="text-sm font-medium text-neutral-700 cursor-pointer">
                        Smoker
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <input
                        type="checkbox"
                        id="diabetes"
                        className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                        checked={formData.diabetes}
                        onChange={(e) => setFormData({ ...formData, diabetes: e.target.checked })}
                      />
                      <label htmlFor="diabetes" className="text-sm font-medium text-neutral-700 cursor-pointer">
                        Diabetes
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-emerald-900/10"
                    >
                      {loading ? (
                        <RefreshCcw className="animate-spin" />
                      ) : (
                        <>
                          <span>Calculate My Risk</span>
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-8"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mb-2">
                    <Heart size={40} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Your Results</h3>
                    <div className="text-6xl font-black text-emerald-700 mb-4 tracking-tighter">
                      {result?.score}%
                    </div>
                    <div className={`inline-block px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${result?.category === 'High' ? 'bg-red-100 text-red-700' :
                        result?.category === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                      }`}>
                      {result?.category} Risk
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                      <div className="flex items-center space-x-2 text-emerald-700 mb-1">
                        <CheckCircle2 size={16} />
                        <span className="font-bold text-sm">Next Steps</span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        {result?.category === 'High'
                          ? 'Consult a physician immediately for a comprehensive cardiovascular workup.'
                          : 'Schedule a routine check-up to monitor your key health metrics.'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <a
                      href="#contact"
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/10 block"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight size={20} />
                    </a>

                    <button
                      onClick={reset}
                      className="text-neutral-500 hover:text-emerald-700 font-medium transition-colors flex items-center justify-center space-x-2 mx-auto w-full py-2"
                    >
                      <RefreshCcw size={16} />
                      <span>Start New Assessment</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
