import React from 'react';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f9f8f4] border-t-4 border-double border-[#051125] pt-10 pb-8 px-4 sm:px-8 lg:px-16 mt-16 text-center text-[#45474d] text-xs">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center space-y-5">
        
        {/* Ceremonial Motto */}
        <div className="text-[12px] sm:text-[13px] font-bold tracking-[0.25em] uppercase text-[#775a19] font-sans">
          LEGACY | INTEGRITY | TRADITION
        </div>

        {/* Contact Strip matching original scanned letterhead */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-xs sm:text-sm font-medium text-[#181c20]">
          <span className="flex items-center gap-1.5">
            <Phone size={14} className="text-[#775a19]" />
            <a href="tel:+2348036805245" className="hover:text-[#775a19] transition-colors">
              Tel: +234 803 680 5245
            </a>
          </span>

          <span className="hidden md:inline text-[#c5c6cd]">·</span>

          <span className="flex items-center gap-1.5">
            <Phone size={14} className="text-[#775a19]" />
            <a href="tel:+2348033377769" className="hover:text-[#775a19] transition-colors">
              +234 803 337 7769
            </a>
          </span>

          <span className="hidden md:inline text-[#c5c6cd]">·</span>

          <span className="flex items-center gap-1.5">
            <Mail size={14} className="text-[#775a19]" />
            <a href="mailto:toyecokeralmnus@gmail.com" className="hover:text-[#775a19] underline transition-colors">
              toyecokeralmnus@gmail.com
            </a>
          </span>
        </div>

        {/* Institutional Jurisdiction note */}
        <p className="text-[11px] text-[#75777d] max-w-xl mx-auto leading-relaxed">
          The Toye Coker Alumnus is dedicated to preserving the constitutional scholarship, advocacy standards, and judicial ethics of Chief Toye Coker, SAN, OON. Secretariat located at Abeokuta Judicial Division, Ogun State, Nigeria.
        </p>

        <div className="h-px w-32 bg-[#c5c6cd]"></div>

        {/* Copyright notice */}
        <div className="text-[11px] text-[#75777d] tracking-wider uppercase font-semibold">
          © {new Date().getFullYear()} TOYE COKER ALUMNUS · ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};
