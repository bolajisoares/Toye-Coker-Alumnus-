import React, { useState } from 'react';
import { Menu, X, Landmark, Ticket, BookOpen, HeartHandshake, Shield } from 'lucide-react';

interface HeaderProps {
  currentView: 'public' | 'dashboard';
  setCurrentView: (view: 'public' | 'dashboard') => void;
  onOpenRsvp: () => void;
  onOpenDonate: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenRsvp,
  onOpenDonate,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'bench', label: 'The Bench', href: '#bench' },
    { id: 'bar', label: 'The Bar', href: '#bar' },
    { id: 'colloquium', label: 'Colloquium & Agenda', href: '#colloquium' },
    { id: 'archive', label: 'Archive & Lectures', href: '#archive' },
    { id: 'endowment', label: 'Endowment Fund', href: '#endowment' }
  ];

  const handleNavClick = (id: string, href: string) => {
    if (currentView === 'dashboard') {
      setCurrentView('public');
    }
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-[#f7f9ff] border-b border-[#c5c6cd] w-full pt-6 pb-4 px-4 sm:px-8 lg:px-16 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
        
        {/* Top Operational Bar & View Switcher */}
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-[#e5e8ee] text-xs font-semibold tracking-wider text-[#45474d]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
            <span className="uppercase text-[11px] font-sans">Annual Memorial Lecture &amp; Legal Colloquium · 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView(currentView === 'public' ? 'dashboard' : 'public')}
              className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all border ${
                currentView === 'dashboard'
                  ? 'bg-[#051125] text-white border-[#775a19]'
                  : 'bg-white text-[#051125] border-[#c5c6cd] hover:border-[#775a19]'
              }`}
            >
              {currentView === 'dashboard' ? '← Back to Memorial Portal' : 'Internal Archive Dashboard ↗'}
            </button>
          </div>
        </div>

        {/* Brand Crest / Seal & Title */}
        <div className="flex flex-col items-center space-y-3 mb-4">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 drop-shadow-sm flex items-center justify-center">
            <img
              src="/assets/aistudio/Image_4_7966d670.jpeg"
              alt="Official Toye Coker Alumnus Crest"
              className="w-full h-full object-contain rounded-full border border-[#dfc282]/40"
              loading="eager"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#051125] font-serif-legal">
              TOYE COKER ALUMNUS
            </h1>
            <p className="text-xs sm:text-sm text-[#45474d] tracking-widest uppercase font-medium">
              In Honor of Chief Toye Coker, SAN, OON (1923–2012)
            </p>
          </div>
        </div>

        {/* Ceremonial Motto Bar (Master Stitch Component) */}
        <div className="gold-accent text-[#051125] px-6 sm:px-10 py-1.5 rounded-sm border border-[#051125]/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)] inline-block mb-5">
          <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.22em] uppercase font-sans">
            LEGACY | INTEGRITY | TRADITION
          </span>
        </div>

        {/* Desktop / Tablet Navigation Links */}
        <div className="w-full flex items-center justify-between pt-2">
          {/* Mobile hamburger button */}
          <div className="flex md:hidden w-full items-center justify-between">
            <span className="text-xs uppercase font-bold text-[#775a19]">Navigation Menu</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#c5c6cd] text-[#051125] bg-white rounded-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="hidden md:flex flex-wrap items-center justify-center gap-6 lg:gap-8 mx-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && currentView === 'public';
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.href)}
                  className={`text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? 'text-[#775a19] border-[#775a19]'
                      : 'text-[#45474d] border-transparent hover:text-[#775a19]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRsvp}
              className="bg-[#051125] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 border-b-2 border-[#775a19] hover:bg-[#1b263b] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Ticket size={14} className="text-[#fed488]" />
              Reserve Seat
            </button>

            <button
              onClick={onOpenDonate}
              className="bg-[#fed488] text-[#785a1a] text-xs font-bold uppercase tracking-widest px-4 py-2.5 border border-[#775a19]/40 hover:bg-[#ffdea5] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <HeartHandshake size={14} />
              Support Fund
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full mt-4 bg-white border border-[#c5c6cd] p-4 text-left shadow-lg">
            <div className="flex flex-col space-y-3 pb-3 border-b border-[#e5e8ee]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.href)}
                  className="text-left text-sm font-bold uppercase tracking-wider text-[#181c20] hover:text-[#775a19] py-2"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRsvp();
                }}
                className="w-full bg-[#051125] text-white text-xs font-bold uppercase tracking-widest py-3 text-center border-b-2 border-[#775a19]"
              >
                Reserve Colloquium Seat (Free)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full bg-[#fed488] text-[#785a1a] text-xs font-bold uppercase tracking-widest py-3 text-center border border-[#775a19]/40"
              >
                Support the Legacy (Paystack / Transfer)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
