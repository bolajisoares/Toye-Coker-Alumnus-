import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Landmark, PhoneCall, Check, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EndowmentDonation } from '../types';

interface PaystackDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonationSuccess: (donation: EndowmentDonation) => void;
}

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000, 250000];

export const PaystackDonationModal: React.FC<PaystackDonationModalProps> = ({
  isOpen,
  onClose,
  onDonationSuccess
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [dedication, setDedication] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentChannel, setPaymentChannel] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reference, setReference] = useState('');

  if (!isOpen) return null;

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handlePaystackPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) return;
    if (!donorEmail.trim()) return;

    setProcessing(true);

    // Simulate Paystack transaction resolution
    setTimeout(() => {
      const ref = `TC-PSTK-${Math.floor(100000 + Math.random() * 900000)}`;
      setReference(ref);

      const donationRecord: EndowmentDonation = {
        id: `don-${Date.now()}`,
        donorName: isAnonymous ? 'Anonymous Jurist / Patron' : (donorName.trim() || 'Generous Alumnus'),
        amount: finalAmount,
        currency: 'NGN',
        reference: ref,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        isAnonymous,
        dedication: dedication.trim() || 'To the continued legacy of Chief Toye Coker, SAN, OON.'
      };

      onDonationSuccess(donationRecord);
      setProcessing(false);
      setCompleted(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#775a19', '#dfc282', '#051125', '#25D366']
      });
    }, 1200);
  };

  const resetAndClose = () => {
    setCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#051125]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-[#775a19] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-[#75777d] hover:text-[#051125] p-1.5 transition-colors"
          aria-label="Close Donation Modal"
        >
          <X size={20} />
        </button>

        {!completed ? (
          <div>
            <div className="border-b border-[#e5e8ee] pb-4 mb-5 text-center">
              <div className="inline-block gold-accent px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#051125] mb-2">
                SECURE ENDOWMENT CHECKOUT
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-legal text-[#051125]">
                Support the Memorial Trust
              </h3>
              <p className="text-xs text-[#45474d] mt-1">
                Powered by Paystack · Accepts Nigerian Debit Cards, Bank Transfer &amp; USSD
              </p>
            </div>

            <form onSubmit={handlePaystackPay} className="space-y-4">
              {/* Preset Amounts Grid */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-2">
                  Select Contribution Amount (NGN)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_AMOUNTS.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 text-xs font-bold font-mono border transition-all ${
                          isSelected
                            ? 'bg-[#051125] text-white border-[#775a19]'
                            : 'bg-[#f7f9ff] text-[#051125] border-[#c5c6cd] hover:border-[#775a19]'
                        }`}
                      >
                        ₦{amt.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2">
                  <input
                    type="number"
                    placeholder="Or enter custom amount in Naira (e.g. 15000)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 border border-[#c5c6cd] bg-[#f7f9ff] focus:bg-white focus:outline-none focus:border-[#051125]"
                  />
                </div>
              </div>

              {/* Payment Channel Tabs */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setPaymentChannel('card')}
                    className={`p-2 border flex flex-col items-center gap-1 transition-all ${
                      paymentChannel === 'card'
                        ? 'border-[#775a19] bg-[#fed488]/20 text-[#051125] font-bold'
                        : 'border-[#c5c6cd] bg-white text-[#45474d]'
                    }`}
                  >
                    <CreditCard size={16} />
                    <span>Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentChannel('transfer')}
                    className={`p-2 border flex flex-col items-center gap-1 transition-all ${
                      paymentChannel === 'transfer'
                        ? 'border-[#775a19] bg-[#fed488]/20 text-[#051125] font-bold'
                        : 'border-[#c5c6cd] bg-white text-[#45474d]'
                    }`}
                  >
                    <Landmark size={16} />
                    <span>Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentChannel('ussd')}
                    className={`p-2 border flex flex-col items-center gap-1 transition-all ${
                      paymentChannel === 'ussd'
                        ? 'border-[#775a19] bg-[#fed488]/20 text-[#051125] font-bold'
                        : 'border-[#c5c6cd] bg-white text-[#45474d]'
                    }`}
                  >
                    <PhoneCall size={16} />
                    <span>USSD (*737#)</span>
                  </button>
                </div>
              </div>

              {/* Donor Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1">
                    Your Name (or Chambers)
                  </label>
                  <input
                    type="text"
                    placeholder="Chief / Barrister Name"
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full text-xs p-2.5 border border-[#c5c6cd] bg-[#f7f9ff] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1">
                    Email for Paystack Receipt *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="donor@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-[#c5c6cd] bg-[#f7f9ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#051125] mb-1">
                  Dedication or Memorial Message (Optional)
                </label>
                <input
                  type="text"
                  placeholder="In honor of Chief Toye Coker's legal mentorship..."
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  className="w-full text-xs p-2.5 border border-[#c5c6cd] bg-[#f7f9ff]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-[#051125] border-[#c5c6cd] rounded-none focus:ring-0"
                />
                <label htmlFor="anonCheck" className="text-xs text-[#45474d] cursor-pointer">
                  List this gift as Anonymous on the Public Memorial Ledger
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={processing || finalAmount <= 0 || !donorEmail}
                  className="w-full bg-[#051125] text-white text-xs sm:text-sm font-bold uppercase tracking-widest py-3.5 border-b-2 border-[#775a19] hover:bg-[#1b263b] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 disabled:opacity-50"
                >
                  <ShieldCheck size={16} className="text-[#fed488]" />
                  {processing ? 'Connecting to Paystack Gateway...' : `Pay ₦${finalAmount.toLocaleString('en-NG')} Securely`}
                </button>
              </div>

              <p className="text-[10px] text-[#75777d] text-center flex items-center justify-center gap-1">
                <span>PCI-DSS Level 1 Encrypted · Zero Card Numbers Stored</span>
              </p>
            </form>
          </div>
        ) : (
          /* Payment Success Confirmation */
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center border-2 border-emerald-500">
              <Check size={32} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
                PAYMENT RECEIVED &amp; AUDITED
              </span>
              <h3 className="text-2xl font-bold font-serif-legal text-[#051125]">
                Thank You for Supporting the Legacy
              </h3>
              <p className="text-xs text-[#45474d]">
                Your tax-exempt contribution has been committed to the Toye Coker Memorial Trust Endowment Fund.
              </p>
            </div>

            <div className="bg-[#f7f9ff] border border-[#c5c6cd] p-4 text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between border-b border-[#e5e8ee] pb-1">
                <span className="text-[#75777d]">Reference:</span>
                <span className="font-bold text-[#051125]">{reference}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e8ee] pb-1">
                <span className="text-[#75777d]">Amount Paid:</span>
                <span className="font-bold text-[#775a19]">₦{finalAmount.toLocaleString('en-NG')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75777d]">Receipt Sent To:</span>
                <span className="text-[#051125]">{donorEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="bg-[#051125] text-white text-xs font-bold uppercase tracking-widest px-8 py-3 hover:bg-[#1b263b] transition-all"
              >
                Return to Memorial
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
