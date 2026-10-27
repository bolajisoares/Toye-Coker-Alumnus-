import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DirectorySection } from './components/DirectorySection';
import { EndowmentCard } from './components/EndowmentCard';
import { ColloquiumSection } from './components/ColloquiumSection';
import { ArchiveDashboard } from './components/ArchiveDashboard';
import { RsvpModal } from './components/RsvpModal';
import { PaystackDonationModal } from './components/PaystackDonationModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { Footer } from './components/Footer';
import { INITIAL_ARCHIVE_DOCUMENTS, INITIAL_DONATIONS } from './data/initialData';
import { AttendeeRecord, ArchiveDocument, EndowmentDonation } from './types';
import { Ticket, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'dashboard'>('public');
  const [activeSection, setActiveSection] = useState<string>('bench');
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<ArchiveDocument | null>(null);

  // Dynamic state with local storage fallback
  const [documents, setDocuments] = useState<ArchiveDocument[]>(() => {
    try {
      const saved = localStorage.getItem('tc_archive_documents');
      return saved ? JSON.parse(saved) : INITIAL_ARCHIVE_DOCUMENTS;
    } catch {
      return INITIAL_ARCHIVE_DOCUMENTS;
    }
  });

  const [donations, setDonations] = useState<EndowmentDonation[]>(() => {
    try {
      const saved = localStorage.getItem('tc_endowment_donations');
      return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
    } catch {
      return INITIAL_DONATIONS;
    }
  });

  const [userPass, setUserPass] = useState<AttendeeRecord | null>(() => {
    try {
      const saved = localStorage.getItem('tc_user_pass');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tc_archive_documents', JSON.stringify(documents));
    } catch (e) {
      console.error(e);
    }
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem('tc_endowment_donations', JSON.stringify(donations));
    } catch (e) {
      console.error(e);
    }
  }, [donations]);

  const handleRsvpSuccess = (attendee: AttendeeRecord) => {
    setUserPass(attendee);
    try {
      localStorage.setItem('tc_user_pass', JSON.stringify(attendee));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDonationSuccess = (donation: EndowmentDonation) => {
    setDonations((prev) => [donation, ...prev]);
  };

  const handleAddDocument = (newDoc: ArchiveDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f8f4] text-[#181c20]">
      {/* Top Navigation & Brand Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenRsvp={() => setIsRsvpOpen(true)}
        onOpenDonate={() => setIsDonateOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* User Pass Ribbon if already registered */}
        {userPass && currentView === 'public' && (
          <div className="bg-[#1b263b] text-white p-3.5 border-l-4 border-[#fed488] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#fed488] shrink-0" />
              <span>
                You have a confirmed reservation for <strong className="text-[#fed488]">{userPass.fullName}</strong> (Pass Code: <span className="font-mono">{userPass.ticketCode}</span>).
              </span>
            </div>
            <button
              onClick={() => setIsRsvpOpen(true)}
              className="bg-[#fed488] text-[#785a1a] font-bold uppercase tracking-wider px-3.5 py-1.5 hover:bg-[#ffdea5] transition-colors shrink-0"
            >
              View My Digital Pass ↗
            </button>
          </div>
        )}

        {currentView === 'public' ? (
          <>
            {/* Master Hero Banner Section */}
            <HeroSection
              onOpenRsvp={() => setIsRsvpOpen(true)}
              onOpenDonate={() => setIsDonateOpen(true)}
              onViewArchive={() => {
                const element = document.getElementById('archive');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setCurrentView('dashboard');
                }
              }}
              seatsRemaining={78}
            />

            {/* Colloquium Details & Schedule Section */}
            <ColloquiumSection onOpenRsvp={() => setIsRsvpOpen(true)} />

            {/* Master Tablet Split Layout: The Bench & Bar (8 cols) + Sticky Endowment (4 cols) */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Registries of The Bench & The Bar */}
              <div className="lg:col-span-8 space-y-8">
                <DirectorySection />

                {/* Quick Archive Preview Banner */}
                <div id="archive" className="bg-white border border-[#c5c6cd] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#e5e8ee] pb-3">
                    <div>
                      <h4 className="text-xl font-bold font-serif-legal text-[#051125]">
                        Archival Legal Precedents &amp; Lectures
                      </h4>
                      <p className="text-xs text-[#45474d] mt-0.5">
                        Historical treatises, keynote addresses, and appellate arguments by Chief Toye Coker and jurists.
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className="text-xs font-bold uppercase tracking-wider text-[#775a19] hover:underline shrink-0"
                    >
                      Open Full Library ↗
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {documents.slice(0, 4).map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoc(doc)}
                        className="p-3.5 border border-[#e5e8ee] hover:bg-[#f7f9ff] cursor-pointer transition-colors group"
                      >
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#775a19]">
                          {doc.category}
                        </span>
                        <h5 className="text-sm font-bold font-serif-legal text-[#051125] group-hover:text-[#775a19] transition-colors mt-1 line-clamp-1">
                          {doc.title}
                        </h5>
                        <p className="text-xs text-[#45474d] mt-1 line-clamp-2">
                          {doc.excerpt}
                        </p>
                        <span className="text-[11px] text-[#775a19] font-semibold mt-2 inline-block">
                          Read Document →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Support / Endowment Card (Master Stitch Layout) */}
              <div className="lg:col-span-4 sticky top-6">
                <EndowmentCard
                  onOpenDonateModal={() => setIsDonateOpen(true)}
                  donations={donations}
                />
              </div>
            </section>
          </>
        ) : (
          /* Internal Archive Dashboard View */
          <ArchiveDashboard
            documents={documents}
            onAddDocument={handleAddDocument}
            onOpenViewer={(doc) => setSelectedDoc(doc)}
            onOpenDonateModal={() => setIsDonateOpen(true)}
            onBackToPortal={() => setCurrentView('public')}
          />
        )}
      </main>

      {/* Mobile Sticky Reservation Trigger (Capped at 12% viewport height) */}
      {!userPass && currentView === 'public' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#051125] border-t-2 border-[#775a19] p-3 shadow-2xl flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#fed488] block">
              Memorial Colloquium
            </span>
            <span className="text-xs font-semibold text-white">
              Complimentary Pass · 78 Seats Left
            </span>
          </div>
          <button
            onClick={() => setIsRsvpOpen(true)}
            className="bg-[#fed488] text-[#785a1a] text-xs font-bold uppercase tracking-wider px-4 py-2 border border-[#775a19] shrink-0"
          >
            Reserve Now
          </button>
        </div>
      )}

      {/* Modals */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSuccess={handleRsvpSuccess}
        onProceedToDonation={() => setIsDonateOpen(true)}
      />

      <PaystackDonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        onDonationSuccess={handleDonationSuccess}
      />

      <DocumentViewerModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />

      {/* Official Ceremonial Footer */}
      <Footer />
    </div>
  );
}
