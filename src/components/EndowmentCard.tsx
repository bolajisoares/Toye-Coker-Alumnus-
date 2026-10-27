import React, { useState } from 'react';
import { Landmark, Copy, Check, CreditCard, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { QrCodeSvg } from './QrCodeSvg';
import { INITIAL_DONATIONS } from '../data/initialData';
import { EndowmentDonation } from '../types';

interface EndowmentCardProps {
  onOpenDonateModal: () => void;
  donations?: EndowmentDonation[];
}

export const EndowmentCard: React.FC<EndowmentCardProps> = ({
  onOpenDonateModal,
  donations = INITIAL_DONATIONS
}) => {
  const [copied, setCopied] = useState(false);

  const accountDetails = {
    name: 'Toye Coker Memorial Trust',
    number: '0123456789',
    bank: 'First Bank of Nigeria',
    branch: 'Abeokuta Main Branch'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(accountDetails.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const totalRaised = donations.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div
      id="endowment"
      className="bg-[#051125] text-white p-6 sm:p-8 shadow-md border-t-4 border-[#775a19] flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-[#775a19] opacity-10 rounded-bl-full pointer-events-none" />

      <div className="mb-3 text-[#fed488]">
        <Landmark size={44} strokeWidth={1.5} />
      </div>

      <h4 className="text-xl sm:text-2xl font-bold font-serif-legal text-white mb-1.5 tracking-tight">
        Support the Legacy
      </h4>

      <p className="text-xs sm:text-sm text-[#bbc6e2] mb-5 opacity-90 max-w-xs font-normal leading-relaxed">
        Your contributions maintain the digital legal repository, fund youth law bursaries, and sustain the biannual memorial lecture series.
      </p>

      {/* QR Code Container for Instant Mobile Scanning & Paystack Link */}
      <div className="bg-white p-3 border-2 border-[#775a19]/50 shadow-inner mb-4 flex flex-col items-center">
        <QrCodeSvg
          value="https://paystack.com/pay/toye-coker-memorial-endowment"
          size={148}
          fgColor="#051125"
          bgColor="#ffffff"
        />
        <span className="text-[9px] uppercase tracking-widest text-[#775a19] font-bold mt-1.5">
          Scan to Donate (Paystack / USSD)
        </span>
      </div>

      {/* Online Paystack Checkout Button */}
      <div className="w-full mb-6">
        <button
          onClick={onOpenDonateModal}
          className="w-full bg-[#fed488] text-[#785a1a] text-xs font-bold uppercase tracking-widest py-3 px-4 border border-[#775a19] hover:bg-[#ffdea5] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
        >
          <CreditCard size={15} />
          Donate via Paystack (Naira / Card)
        </button>
        <span className="text-[10px] text-[#828da7] mt-1 block">
          Supports GTB *737#, Zenith, Access USSD, Debit Cards &amp; Transfers
        </span>
      </div>

      {/* Official Verified Banking Details Box (Master Stitch Spec) */}
      <div className="w-full space-y-3.5 text-left border-t border-[#75777d]/40 pt-5">
        <div>
          <p className="text-[10px] text-[#fed488] tracking-widest uppercase font-bold mb-0.5">
            ACCOUNT NAME
          </p>
          <p className="text-sm font-semibold text-white tracking-wide">
            {accountDetails.name}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-[#fed488] tracking-widest uppercase font-bold mb-0.5">
              ACCOUNT NUMBER
            </p>
            <button
              onClick={handleCopy}
              className="text-[11px] text-[#fed488] hover:underline flex items-center gap-1 font-mono transition-colors"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </button>
          </div>
          <p className="text-lg font-mono font-bold tracking-widest text-white">
            {accountDetails.number}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-[#fed488] tracking-widest uppercase font-bold mb-0.5">
            BANK &amp; BRANCH
          </p>
          <p className="text-sm font-semibold text-white">
            {accountDetails.bank} ({accountDetails.branch})
          </p>
        </div>
      </div>

      {/* Endowment Metric & Recent Contributors Ticker */}
      <div className="w-full mt-6 pt-4 border-t border-[#75777d]/30 text-left">
        <div className="flex justify-between items-center text-[11px] mb-2">
          <span className="text-[#828da7] uppercase font-bold tracking-wider">Endowment Corpus:</span>
          <span className="font-mono font-bold text-[#fed488] text-xs">
            ₦{totalRaised.toLocaleString('en-NG')}
          </span>
        </div>

        <div className="bg-[#1b263b] p-2.5 border border-[#75777d]/30 text-[11px] space-y-1">
          <span className="text-[9px] uppercase tracking-widest text-[#bbc6e2] font-bold block mb-1">
            Recent Memorial Patrons:
          </span>
          {donations.slice(0, 2).map((don) => (
            <div key={don.id} className="flex justify-between text-[#e5e8ee]">
              <span className="truncate max-w-[170px]">{don.isAnonymous ? 'Honored Anonymous Patron' : don.donorName}</span>
              <span className="font-mono text-[#fed488]">₦{don.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-4 text-center">
        <span className="text-[10px] text-[#828da7] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-[#fed488]" />
          REGISTERED ENDOWMENT TRUST
        </span>
      </div>
    </div>
  );
};
