import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Ticket, Award, BookOpen, Navigation, CheckCircle2 } from 'lucide-react';
import { COLLOQUIUM_SESSIONS } from '../data/initialData';

interface ColloquiumSectionProps {
  onOpenRsvp: () => void;
}

export const ColloquiumSection: React.FC<ColloquiumSectionProps> = ({ onOpenRsvp }) => {
  const [activeSessionTab, setActiveSessionTab] = useState<string>('all');

  return (
    <section id="colloquium" className="bg-white border border-[#c5c6cd] p-6 sm:p-10 shadow-sm relative space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#e5e8ee] pb-6 gap-4">
        <div>
          <div className="inline-block gold-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#051125] mb-2">
            CONVOCATION PROGRAMME · 2026
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-legal text-[#051125] tracking-tight">
            Memorial Lecture &amp; Legal Colloquium
          </h3>
          <p className="text-xs sm:text-sm text-[#45474d] mt-1 max-w-2xl">
            Theme: <span className="font-semibold text-[#775a19]">&quot;Judicial Independence, Constitutional Precedents &amp; The Ethics of Advocacy in Modern Nigeria&quot;</span>
          </p>
        </div>

        <button
          onClick={onOpenRsvp}
          className="bg-[#051125] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 border-b-2 border-[#775a19] hover:bg-[#1b263b] transition-all flex items-center gap-2 shadow-sm shrink-0 self-start md:self-auto"
        >
          <Ticket size={16} className="text-[#fed488]" />
          Reserve Seat (Complimentary)
        </button>
      </div>

      {/* Program Schedule & Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base sm:text-lg font-bold font-serif-legal text-[#051125] uppercase tracking-wider flex items-center gap-2">
            <Clock size={18} className="text-[#775a19]" />
            Official Order of Proceedings
          </h4>
          <span className="text-xs text-[#75777d] font-mono">Saturday, 14 Nov 2026</span>
        </div>

        <div className="border border-[#c5c6cd] divide-y divide-[#e5e8ee]">
          {COLLOQUIUM_SESSIONS.map((session, idx) => (
            <div
              key={session.id}
              className="p-4 sm:p-5 hover:bg-[#f7f9ff] transition-colors flex flex-col md:flex-row md:items-start gap-4"
            >
              <div className="w-full md:w-56 shrink-0">
                <span className="text-xs font-bold font-mono text-[#775a19] bg-[#fed488]/30 px-2.5 py-1 border border-[#775a19]/20 inline-block">
                  {session.time}
                </span>
                <span className="block text-[11px] text-[#75777d] mt-1 font-medium">
                  {session.hall}
                </span>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold font-serif-legal text-[#775a19]">
                    0{idx + 1}.
                  </span>
                  <h5 className="text-base font-bold text-[#051125] font-serif-legal">
                    {session.title}
                  </h5>
                </div>

                <p className="text-xs sm:text-sm text-[#45474d] leading-relaxed">
                  {session.description}
                </p>

                <div className="pt-1.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-[#051125]">Lead Speaker / Faculty:</span>
                  <span className="text-[#775a19] font-medium bg-[#f1f4f9] px-2 py-0.5 border border-[#c5c6cd]">
                    {session.speaker}
                  </span>
                  <span className="text-[#75777d] italic">({session.role})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Venue, Hall Location & Nigerian Transit Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#e5e8ee]">
        <div className="bg-[#f7f9ff] border border-[#c5c6cd] p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#051125]">
            <MapPin size={20} className="text-[#775a19]" />
            <h5 className="text-sm font-bold uppercase tracking-wider font-sans">
              Venue &amp; Reception Grounds
            </h5>
          </div>

          <div className="text-xs text-[#45474d] space-y-1.5 leading-relaxed">
            <p className="font-bold text-sm text-[#051125]">
              High Court of Justice Judicial Complex &amp; Cultural Amphitheatre
            </p>
            <p>Kobape Road / Presidential Boulevard, Abeokuta, Ogun State, Nigeria.</p>
            <p className="text-[#75777d]">
              Coordinates: 7.1557° N, 3.3450° E · Ample dignitary valet and VIP security escort protocol arranged.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <a
              href="https://maps.google.com/?q=Abeokuta+High+Court+Ogun+State"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white border border-[#c5c6cd] px-3 py-1.5 font-bold text-[#051125] hover:bg-[#f1f4f9] transition-colors"
            >
              <Navigation size={13} className="text-[#775a19]" />
              Open in Google Maps ↗
            </a>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#775a19] font-semibold py-1">
              <CheckCircle2 size={13} />
              Airport &amp; Inter-State Shuttle Available
            </span>
          </div>
        </div>

        <div className="bg-[#f7f9ff] border border-[#c5c6cd] p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#051125]">
            <Award size={20} className="text-[#775a19]" />
            <h5 className="text-sm font-bold uppercase tracking-wider font-sans">
              Protocol &amp; Accreditations
            </h5>
          </div>

          <ul className="text-xs text-[#45474d] space-y-2 list-disc list-inside">
            <li>
              <strong className="text-[#051125]">Judicial Robing:</strong> Members of the Bench and Senior Advocates of Nigeria are invited to attend in business formal or traditional attire.
            </li>
            <li>
              <strong className="text-[#051125]">Accreditation Verification:</strong> Present your digital pass or printed QR code at Gate 1 for expeditious verification.
            </li>
            <li>
              <strong className="text-[#051125]">Lecture Monograph:</strong> Registered delegates receive the printed 2026 Memorial Monograph and complimentary digital repository access.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
