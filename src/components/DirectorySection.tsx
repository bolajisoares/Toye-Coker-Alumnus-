import React, { useState } from 'react';
import { Gavel, Scale, Search, UserCheck, X, ExternalLink } from 'lucide-react';
import { BENCH_MEMBERS, BAR_MEMBERS } from '../data/initialData';
import { DignitaryProfile } from '../types';

export const DirectorySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<DignitaryProfile | null>(null);

  const filteredBench = BENCH_MEMBERS.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBar = BAR_MEMBERS.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Directory Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#c5c6cd] shadow-sm">
        <div>
          <h3 className="text-lg font-bold font-serif-legal text-[#051125] tracking-tight">
            Distinguished Alumni &amp; Honor Roll
          </h3>
          <p className="text-xs text-[#45474d]">
            Official register of Hon. Justices of the Bench and Senior Advocates &amp; Counsel of the Bar.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#75777d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Bench or Bar member..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#c5c6cd] bg-[#f7f9ff] focus:outline-none focus:border-[#051125] focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#75777d] hover:text-[#051125]"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* The Bench Container (Master Tablet Stitch Pattern) */}
      <div id="bench" className="bg-white border border-[#c5c6cd] p-6 sm:p-8 shadow-sm relative">
        <div className="absolute top-0 left-0 w-1.5 h-full gold-accent"></div>
        
        <div className="flex items-center justify-between border-b border-[#e5e8ee] pb-4 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold font-serif-legal text-[#775a19] uppercase tracking-widest flex items-center gap-3">
            <Gavel size={26} className="text-[#775a19]" />
            THE BENCH
          </h3>
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#45474d] bg-[#f1f4f9] px-2.5 py-1 border border-[#c5c6cd]">
            {filteredBench.length} Jurists Listed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredBench.map((jurist) => (
            <div
              key={jurist.id}
              onClick={() => setSelectedProfile(jurist)}
              className="border-b border-[#e5e8ee] pb-4 group cursor-pointer hover:bg-[#f7f9ff] p-2 transition-colors rounded-none"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base sm:text-lg font-bold font-serif-legal text-[#051125] group-hover:text-[#775a19] transition-colors">
                    {jurist.name}
                  </p>
                  <p className="text-xs sm:text-sm text-[#45474d] italic mt-0.5">
                    {jurist.title}
                  </p>
                  <p className="text-[11px] text-[#75777d] mt-1 font-mono">
                    {jurist.courtOrChambers}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#775a19] opacity-0 group-hover:opacity-100 transition-opacity">
                  View Profile →
                </span>
              </div>
            </div>
          ))}

          {filteredBench.length === 0 && (
            <div className="col-span-2 py-6 text-center text-xs text-[#75777d]">
              No jurists found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      </div>

      {/* The Bar Container (Master Tablet Stitch Pattern) */}
      <div id="bar" className="bg-white border border-[#c5c6cd] p-6 sm:p-8 shadow-sm relative">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#051125]"></div>
        
        <div className="flex items-center justify-between border-b border-[#e5e8ee] pb-4 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold font-serif-legal text-[#051125] uppercase tracking-widest flex items-center gap-3">
            <Scale size={26} className="text-[#051125]" />
            THE BAR
          </h3>
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#45474d] bg-[#f1f4f9] px-2.5 py-1 border border-[#c5c6cd]">
            {filteredBar.length} Practitioners
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {filteredBar.map((advocate) => (
            <div
              key={advocate.id}
              onClick={() => setSelectedProfile(advocate)}
              className="flex items-center justify-between py-2.5 px-2 border-b border-[#e5e8ee]/80 hover:bg-[#f7f9ff] cursor-pointer group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#775a19] shrink-0"></span>
                <div>
                  <span className="text-[15px] font-bold text-[#051125] group-hover:text-[#775a19] transition-colors block leading-snug">
                    {advocate.name}
                  </span>
                  <span className="text-[11px] text-[#45474d] block">
                    {advocate.title}
                  </span>
                </div>
              </div>

              <span className="text-[10px] text-[#75777d] group-hover:text-[#775a19] uppercase tracking-wider transition-colors shrink-0">
                Details ↗
              </span>
            </div>
          ))}

          {filteredBar.length === 0 && (
            <div className="col-span-2 py-6 text-center text-xs text-[#75777d]">
              No advocates found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      </div>

      {/* Dignitary Honorific Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-[#051125]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#775a19] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 text-[#75777d] hover:text-[#051125] p-1"
              aria-label="Close Profile"
            >
              <X size={20} />
            </button>

            <div className="border-b border-[#e5e8ee] pb-4 mb-4">
              <div className="inline-block gold-accent px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#051125] mb-2">
                {selectedProfile.role === 'Bench' ? 'The Judicial Bench' : 'The Legal Bar & Silk'}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold font-serif-legal text-[#051125]">
                {selectedProfile.name}
              </h4>
              <p className="text-sm font-semibold text-[#775a19] italic mt-1">
                {selectedProfile.title}
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#45474d]">
              {selectedProfile.courtOrChambers && (
                <div className="flex justify-between py-1 border-b border-[#f1f4f9]">
                  <span className="font-bold text-[#051125] uppercase tracking-wider">Institution / Chambers:</span>
                  <span className="font-medium">{selectedProfile.courtOrChambers}</span>
                </div>
              )}
              {selectedProfile.callToBarYear && (
                <div className="flex justify-between py-1 border-b border-[#f1f4f9]">
                  <span className="font-bold text-[#051125] uppercase tracking-wider">Call to Bar Year:</span>
                  <span className="font-mono">{selectedProfile.callToBarYear}</span>
                </div>
              )}

              <div className="pt-2">
                <span className="font-bold text-[#051125] uppercase tracking-wider block mb-1">
                  Biographical Citation:
                </span>
                <p className="text-sm leading-relaxed text-[#181c20] bg-[#f7f9ff] p-3 border border-[#c5c6cd]">
                  {selectedProfile.bioSnippet}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedProfile(null)}
                className="bg-[#051125] text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-[#1b263b] transition-all"
              >
                Close Citation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
