import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const enquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  interestedInConsultation: z.boolean(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
      interestedInConsultation: false,
    }
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setLoading(true);
    try {
      // Save to Firestore
      await addDoc(collection(db, 'enquiries'), {
        ...data,
        createdAt: serverTimestamp(),
      });

      // Sync to Google Sheets via backend
      const response = await fetch('/api/sync/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Google Sheets Sync Failed (Enquiry):', errorData.error);
      }

      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('There was an error submitting your enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-50 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-neutral-100 bg-white">
          
          {/* Left Side: Information & Branding */}
          <div className="lg:w-5/12 bg-emerald-900 text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative BG pattern */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-700 rounded-full blur-3xl opacity-30" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">Let's Talk About <br/><span className="text-emerald-300">Your Health</span></h2>
              <p className="text-emerald-100/90 text-lg leading-relaxed mb-10">
                Have questions about your risk assessment or want to book a lifestyle consultation? Our experts are ready to guide you.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: 'Personalized expert advice', desc: 'Speak to a board-certified professional.' },
                  { title: 'Confidential health reviews', desc: 'Your data is encrypted and private.' },
                  { title: 'Actionable lifestyle plans', desc: 'Get steps you can take today.' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-4">
                    <div className="mt-1">
                      <CheckCircle2 className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{item.title}</h4>
                      <p className="text-emerald-200/80 text-sm mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="mt-16 pt-10 border-t border-emerald-800 relative z-10">
              <p className="text-xs text-emerald-300 font-bold uppercase tracking-widest mb-2">Response Time</p>
              <p className="text-3xl font-display font-bold text-white">Within 24 Hours</p>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="lg:w-7/12 p-10 md:p-16 bg-white">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]"
              >
                <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-neutral-900 mb-2">Enquiry Received!</h3>
                  <p className="text-neutral-600 text-lg max-w-sm mx-auto">
                    Thank you for reaching out. A member of our team will contact you shortly to assist you.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-8 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-bold transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-700">Full Name</label>
                    <input
                      {...register('fullName')}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-50 border ${
                        errors.fullName ? 'border-red-400' : 'border-neutral-200'
                      } focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-neutral-900 placeholder-neutral-400`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-700">Email Address</label>
                    <input
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-50 border ${
                        errors.email ? 'border-red-400' : 'border-neutral-200'
                      } focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-neutral-900 placeholder-neutral-400`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Phone Number (Optional)</label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-neutral-900 placeholder-neutral-400"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-700">Message / Health Concern</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-50 border ${
                      errors.message ? 'border-red-400' : 'border-neutral-200'
                    } focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none text-neutral-900 placeholder-neutral-400`}
                    placeholder="How can we help you today?"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</p>}
                </div>

                <div className="flex items-start space-x-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <input
                    type="checkbox"
                    id="interestedInConsultation"
                    {...register('interestedInConsultation')}
                    className="mt-1 w-5 h-5 bg-white border-emerald-300 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="interestedInConsultation" className="text-sm font-medium text-emerald-900 cursor-pointer leading-relaxed">
                    Yes, I am interested in booking a one-on-one lifestyle consultation with a health expert.
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-emerald-900/10"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
