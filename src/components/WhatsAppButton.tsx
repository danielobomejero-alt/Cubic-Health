import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  // Use environment variable or default placeholder
  const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890';
  // Strip non-numeric characters (like + or spaces) for the wa.me link
  const cleanNumber = rawNumber.replace(/\D/g, '');
  
  const message = encodeURIComponent("Hello Cubik Health! I'd like to learn more about my preventive health options.");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-colors group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" className="text-white" />
      <span className="absolute right-full mr-4 bg-white text-neutral-800 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-neutral-100">
        Chat with us
      </span>
    </motion.a>
  );
}
