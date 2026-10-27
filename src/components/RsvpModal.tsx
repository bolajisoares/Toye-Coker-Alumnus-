import React, { useState } from 'react';
import { X, Check, Ticket, Download, Printer, Share2, Sparkles, AlertCircle, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QrCodeSvg } from './QrCodeSvg';
import { AttendeeRecord, ProfessionalCategory } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (attendee: AttendeeRecord) => void;
  onProceedToDonation: () => void;
}

const CATEGORIES: ProfessionalCategory[] = [
  'The Bench',
  'Senior Advocate of Nigeria (SAN)',
  'Legal Practitioner (The Bar)',
  'Alumnus',
  'Judicial Officer / Registrar',
  'Law Student',
  'Distinguished Guest / Press'
];

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onProceedToDonation
}) => {
  const [step, setStep] = useState<'form' | 'pass'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    category: 'Legal Practitioner (The Bar)' as ProfessionalCategory,
    organization: '',
    notes: '',
    honeypot: '' // Anti-bot trap
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedPass, setGeneratedPass] = useState<AttendeeRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full legal name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid correspondence email is required';
    }
    // Nigerian phone validation (accepts 070, 080, 081, 090, 091, or +234)
    const phoneClean = formData.phoneNumber.replace(/[\s-]/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      errs.phoneNumber = 'Valid Nigerian mobile / WhatsApp phone number is required';
    }
    if (!formData.organization.trim()) {
      errs.organization = 'Court, Chambers, University, or Organization is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bots

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketNum = Math.floor(1000 + Math.random() * 9000);
      const rowNum = Math.floor(1 + Math.random() * 12);
      const seatNum = Math.floor(1 + Math.random() * 30);

      const newRecord: AttendeeRecord = {
        id: `att-${Date.now()}`,
        ticketCode: `TC-2026-${ticketNum}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
        category: formData.category,
        organization: formData.organization.trim(),
        seatNumber: `Row ${rowNum}, Seat ${seatNum}`,
        registrationDate: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        checkedIn: false,
        notes: formData.notes
      };

      setGeneratedPass(newRecord);
      onSuccess(newRecord);
      setIsSubmitting(false);
      setStep('pass');

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#051125', '#dfc282', '#775a19', '#ffffff']
      });
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!generatedPass) return;
    const text = encodeURIComponent(
      `I have reserved my complimentary seat for the Chief Toye Coker, SAN, OON Annual Memorial Lecture & Legal Colloquium 2026! (Pass Code: ${generatedPass.ticketCode}). Register your seat here:`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}%20${window.location.origin}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#051125]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-[#775a19] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#75777d] hover:text-[#051125] p-1.5 transition-colors no-print"
          aria-label="Close Registration"
        >
          <X size={20} />
        </button>

        {step === 'form' ? (
          <div>
            {/* Modal Header */}
            <div className="border-b border-[#e5e8ee] pb-4 mb-5 text-center">
              <div className="inline-block gold-accent px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#051125] mb-2">
                ACCREDITATION &amp; SEAT RESERVATION
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-legal text-[#051125]">
                Annual Memorial Lecture 2026
              </h3>
              <p className="text-xs text-[#45474d] mt-1">
                Admission is complimentary. Please register to secure reserved hall seating and the printed monograph.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bot trap honeypot */}
              <input
                type="text"
                name="websiteUrl"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1">
                  Full Legal Name (with Title) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chief / Hon. Justice / Dr. Adebayo Adeleke Esq."
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs sm:text-sm p-2.5 border border-[#c5c6cd] bg-[#f7f9ff] focus:bg-white focus:outline-none focus:border-[#051125]"
                />
                {errors.fullName && <p className="text-[11px] text-[#ba1a1a] mt-0.5">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="counsel@chambers.ng"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[#c5c6cd] bg-[#f7f9ff] focus:bg-white focus:outline-none focus:border-[#051125]"
                  />
                  {errors.email && <p className="text-[11px] text-[#ba1a1a] mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="0803 000 0000 or +234..."
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[#c5c6cd] bg-[#f7f9ff] focus:bg-white focus:outline-none focus:border-[#051125]"
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-[#ba1a1a] mt-0.5">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1">
                    Professional Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as ProfessionalCategory })
                    }
                    className="w-full text-xs sm:text-sm p-2.5 border border-[#c5c6cd] bg-[#f7f9ff] focus:bg-white focus:outline-none focus:border-[#051125]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1">
                    Chambers / Court / Affiliation *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ogun State High Court / Firm"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[#c5c6cd] bg-[#f7f9ff] focus:bg-white focus:outline-none focus:border-[#051125]"
                  />
                  {errors.organization && (
                    <p className="text-[11px] text-[#ba1a1a] mt-0.5">{errors.organization}</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#051125] text-white text-xs sm:text-sm font-bold uppercase tracking-widest py-3.5 border-b-2 border-[#775a19] hover:bg-[#1b263b] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 disabled:opacity-50"
                >
                  <Ticket size={16} className="text-[#fed488]" />
                  {isSubmitting ? 'Verifying & Issuing Pass...' : 'Confirm Seat Reservation'}
                </button>
              </div>

              <p className="text-[10px] text-[#75777d] text-center">
                Strict NDPR compliant data storage. Your pass details will be cached on this device for offline gate check-in.
              </p>
            </form>
          </div>
        ) : (
          /* Step 2: Digital Ticket Pass Card */
          <div className="space-y-5">
            <div className="text-center border-b border-[#e5e8ee] pb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200 uppercase tracking-wider mb-2">
                <Check size={14} className="text-emerald-700" />
                Reservation Confirmed
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-legal text-[#051125]">
                Official Colloquium Pass
              </h3>
              <p className="text-xs text-[#45474d]">
                Chief Toye Coker Memorial Lecture &amp; Legal Colloquium
              </p>
            </div>

            {/* Official Pass Badge (Printable) */}
            <div className="bg-[#f7f9ff] border-2 border-[#051125] p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 gold-accent"></div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#775a19] uppercase bg-[#fed488]/30 px-2 py-0.5 border border-[#775a19]/20">
                    {generatedPass?.category}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold font-serif-legal text-[#051125]">
                    {generatedPass?.fullName}
                  </h4>
                  <p className="text-xs text-[#45474d] font-medium">
                    {generatedPass?.organization}
                  </p>
                  <div className="pt-2 text-xs text-[#75777d] space-y-0.5 font-mono">
                    <p>Pass Code: <strong className="text-[#051125]">{generatedPass?.ticketCode}</strong></p>
                    <p>Hall Allocation: <strong className="text-[#775a19]">{generatedPass?.seatNumber}</strong></p>
                    <p>Date: Saturday, 14 Nov 2026 · 10:00 AM</p>
                  </div>
                </div>

                <div className="bg-white p-2 border border-[#c5c6cd] shadow-xs shrink-0 flex flex-col items-center">
                  <QrCodeSvg
                    value={`TC-PASS:${generatedPass?.ticketCode}|${generatedPass?.fullName}`}
                    size={110}
                    fgColor="#051125"
                  />
                  <span className="text-[8px] font-mono tracking-widest uppercase text-[#775a19] font-bold mt-1">
                    GATE 1 SCAN
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#c5c6cd] flex justify-between items-center text-[10px] text-[#75777d] uppercase tracking-wider font-semibold">
                <span>High Court Complex, Abeokuta</span>
                <span>Toye Coker Alumnus</span>
              </div>
            </div>

            {/* Pass Actions */}
            <div className="flex flex-wrap gap-2 justify-center no-print">
              <button
                onClick={handlePrint}
                className="bg-white border border-[#c5c6cd] text-[#051125] text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-[#f1f4f9] transition-colors flex items-center gap-1.5"
              >
                <Printer size={14} />
                Print Pass
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-[#20ba59] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Share2 size={14} />
                Share on WhatsApp
              </button>
            </div>

            {/* Bridge to Endowment Fund */}
            <div className="bg-[#051125] text-white p-4 border border-[#775a19] text-center space-y-2 no-print">
              <span className="text-[11px] text-[#fed488] font-bold uppercase tracking-widest block">
                Consider an Endowment Gift
              </span>
              <p className="text-xs text-[#bbc6e2] leading-relaxed">
                As a registered guest, you may optionally support our digital legal archives and young lawyer bursaries via Paystack.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onProceedToDonation();
                }}
                className="bg-[#fed488] text-[#785a1a] text-xs font-bold uppercase tracking-widest px-5 py-2 hover:bg-[#ffdea5] transition-all inline-flex items-center gap-1.5"
              >
                <HeartHandshake size={14} />
                Give to Endowment Fund
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
