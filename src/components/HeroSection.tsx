import React from 'react';
import { Ticket, HeartHandshake, BookOpen, Calendar, MapPin, Users, Award } from 'lucide-react';

interface HeroSectionProps {
  onOpenRsvp: () => void;
  onOpenDonate: () => void;
  onViewArchive: () => void;
  seatsRemaining?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRsvp,
  onOpenDonate,
  onViewArchive,
  seatsRemaining = 78
}) => {
  return (
    <section className="relative bg-white border border-[#c5c6cd] p-6 sm:p-10 shadow-sm overflow-hidden">
      {/* Subtle judicial lattice texture backdrop */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M12 0L24 12L12 24L0 12z" fill="%23051125"/%3E%3C/svg%3E')`
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
        {/* Left Column: Formal Dignitary Portrait Frame (Master Tablet Style) */}
        <div className="w-full md:w-5/12 lg:w-4/12 flex flex-col items-center">
          <div className="relative rounded-full p-2.5 gold-accent border-2 border-[#051125]/15 shadow-xl">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-white bg-[#051125]">
              <img
                src="/assets/aistudio/Image_2_1f7a2c89.jpeg"
                alt="Chief Toye Coker, SAN, OON formal judicial portrait"
                className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-105 hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-[#775a19] bg-[#fed488]/30 px-3 py-1 border border-[#775a19]/30">
              <Award size={13} className="text-[#775a19]" />
              SAN · OON · Apoi of Egbaland
            </span>
          </div>
        </div>

        {/* Right Column: Tribute Prose & Operational CTAs */}
        <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#775a19]">
              In Memoriam &amp; Judicial Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051125] font-serif-legal tracking-tight">
              Chief Toye Coker
            </h2>
            <p className="text-lg sm:text-xl text-[#775a19] font-serif-legal tracking-widest uppercase font-semibold">
              1923 — 2012
            </p>
          </div>

          <div className="h-0.5 w-24 bg-[#775a19] my-2"></div>

          <p className="text-base sm:text-lg text-[#45474d] leading-relaxed max-w-2xl font-normal">
            Honoring the life, courage, and monumental contributions to Nigerian jurisprudence, the independence of the Bar, and equitable governance. This platform serves as the convocation portal for the 2026 Memorial Lecture &amp; Legal Colloquium, a public directory of distinguished alumni of the Bench and Bar, and an open repository of legal precedents.
          </p>

          {/* Operational Event Highlights Card */}
          <div className="w-full bg-[#f1f4f9] border border-[#c5c6cd] p-4 text-xs text-[#181c20] grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="flex items-start gap-2.5">
              <Calendar size={18} className="text-[#775a19] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block text-[10px] text-[#45474d]">Date &amp; Time</span>
                <span className="font-semibold text-[13px] text-[#051125]">Saturday, 14 Nov 2026</span>
                <span className="block text-[11px] text-[#45474d]">10:00 AM West Africa Time</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin size={18} className="text-[#775a19] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block text-[10px] text-[#45474d]">Venue &amp; Location</span>
                <span className="font-semibold text-[13px] text-[#051125]">High Court Judicial Complex</span>
                <span className="block text-[11px] text-[#45474d]">Abeokuta, Ogun State, Nigeria</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users size={18} className="text-[#775a19] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block text-[10px] text-[#45474d]">Colloquium Capacity</span>
                <span className="font-semibold text-[13px] text-[#051125]">422 Confirmed RSVPs</span>
                <span className="block text-[11px] font-bold text-[#ba1a1a]">
                  Only {seatsRemaining} Seats Remaining
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs (Solving the Conversion Flaw from critique) */}
          <div className="flex flex-wrap gap-3 pt-2 w-full justify-center md:justify-start">
            <button
              onClick={onOpenRsvp}
              className="bg-[#051125] text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-6 py-3.5 border-b-2 border-[#775a19] hover:bg-[#1b263b] transition-all flex items-center gap-2 shadow-md active:scale-98"
            >
              <Ticket size={16} className="text-[#fed488]" />
              Reserve Your Seat (Free Pass)
            </button>

            <button
              onClick={onOpenDonate}
              className="bg-[#fed488] text-[#785a1a] text-xs sm:text-sm font-bold uppercase tracking-widest px-6 py-3.5 border border-[#775a19]/40 hover:bg-[#ffdea5] transition-all flex items-center gap-2 shadow-sm active:scale-98"
            >
              <HeartHandshake size={16} />
              Support the Legacy (Donate)
            </button>

            <button
              onClick={onViewArchive}
              className="bg-white text-[#051125] border border-[#c5c6cd] text-xs sm:text-sm font-bold uppercase tracking-widest px-5 py-3.5 hover:bg-[#f1f4f9] transition-all flex items-center gap-2 active:scale-98"
            >
              <BookOpen size={16} className="text-[#775a19]" />
              View Lecture Materials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
