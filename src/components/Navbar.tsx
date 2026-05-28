import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Risk Assessment', href: '#risk-assessment' },
    { name: 'Our Pathway', href: '#pathway' },
    { name: 'Consultations', href: '#consultation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-xl py-4 shadow-sm border-b border-neutral-200' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2 text-neutral-900 font-display font-bold text-2xl group">
          <div className="relative">
              <img
                src="/logo.png"
                alt="Cubik Health Logo"
                className="w-8 h-8 transition-transform group-hover:rotate-12"
              />
            </div>
          <span className="tracking-tight">Cubik<span className="text-emerald-600">Health</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-neutral-600 hover:text-emerald-700 font-bold transition-colors text-sm uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#risk-assessment"
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-900/20 hover:scale-105"
          >
            Check My Risk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-neutral-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-neutral-100 p-4 shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-neutral-800 font-bold py-2 text-lg hover:text-emerald-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#risk-assessment"
              className="w-full py-4 bg-emerald-700 text-white rounded-2xl font-bold text-center shadow-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Check My Risk
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
