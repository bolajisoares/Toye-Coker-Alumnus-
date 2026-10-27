import React, { useState } from 'react';
import { X, Download, Printer, Play, Pause, Volume2, RotateCcw, FileText, Headphones, Shield } from 'lucide-react';
import { ArchiveDocument } from '../types';

interface DocumentViewerModalProps {
  document: ArchiveDocument | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  onClose
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(24); // Percentage

  if (!document) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text/blob download of the archival brief
    const element = window.document.createElement('a');
    const file = new Blob([document.fullText || document.excerpt || 'Archival record'], {
      type: 'text/plain'
    });
    element.href = URL.createObjectURL(file);
    element.download = `${document.title.replace(/\s+/g, '_')}.txt`;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#051125]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-[#775a19] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Top Bar */}
        <div className="bg-[#051125] text-white p-4 sm:px-6 flex justify-between items-center border-b border-[#775a19] shrink-0 no-print">
          <div className="flex items-center gap-2">
            {document.fileType === 'pdf' ? (
              <FileText size={18} className="text-[#fed488]" />
            ) : (
              <Headphones size={18} className="text-[#fed488]" />
            )}
            <h4 className="text-sm sm:text-base font-bold font-serif-legal truncate max-w-md">
              {document.title}
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="text-[#bbc6e2] hover:text-white p-1 transition-colors text-xs flex items-center gap-1"
              title="Download Record"
            >
              <Download size={15} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handlePrint}
              className="text-[#bbc6e2] hover:text-white p-1 transition-colors text-xs flex items-center gap-1"
              title="Print Record"
            >
              <Printer size={15} />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="text-[#bbc6e2] hover:text-white p-1 transition-colors"
              aria-label="Close Viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Audio Player Bar (if audio type) */}
        {document.fileType === 'audio' && (
          <div className="bg-[#1b263b] text-white p-4 border-b border-[#775a19]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 no-print">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-[#fed488] text-[#785a1a] flex items-center justify-center hover:bg-[#ffdea5] transition-colors shrink-0"
              >
                {isPlayingAudio ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>

              <div>
                <span className="text-xs font-bold block">{isPlayingAudio ? 'Playing Archival Address' : 'Paused'}</span>
                <span className="text-[11px] text-[#bbc6e2]">Speaker: {document.author}</span>
              </div>
            </div>

            <div className="flex-1 max-w-md w-full flex items-center gap-3 text-xs font-mono text-[#bbc6e2]">
              <span>11:32</span>
              <div
                className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setAudioProgress(Math.round((clickX / rect.width) * 100));
                }}
              >
                <div
                  className="h-full bg-[#fed488] transition-all"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <span>48:00</span>
            </div>
          </div>
        )}

        {/* Document Reading Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 font-serif-legal text-[#181c20] leading-relaxed bg-[#f9f8f4]">
          {/* Formal Judicial Letterhead Header in Document */}
          <div className="text-center border-b-2 border-double border-[#051125] pb-6 space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full border border-[#775a19] overflow-hidden p-1 bg-white">
              <img
                src="/assets/aistudio/Image_4_7966d670.jpeg"
                alt="Toye Coker Seal"
                className="w-full h-full object-contain"
              />
            </div>
            <h5 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#775a19]">
              TOYE COKER ALUMNUS · LEGAL REPOSITORY
            </h5>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#051125]">
              {document.title}
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-sans text-[#45474d] pt-1">
              <span>Author: <strong className="text-[#051125]">{document.author}</strong></span>
              <span>·</span>
              <span>Date: {document.date}</span>
              <span>·</span>
              <span className="uppercase font-bold text-[#775a19]">{document.category} JURISPRUDENCE</span>
            </div>
          </div>

          {/* Abstract / Summary */}
          <div className="bg-white p-4 border-l-4 border-[#775a19] shadow-xs text-xs sm:text-sm font-sans text-[#45474d] italic">
            <strong>Archival Abstract:</strong> {document.excerpt}
          </div>

          {/* Full Text Disquisition */}
          <div className="text-sm sm:text-base text-[#181c20] space-y-4 whitespace-pre-line font-serif-legal">
            {document.fullText || `[Full disquisition transcript archived in official trust vault. Registered delegates may request the complete certified hard copy via secretariat mail: toyecokeralmnus@gmail.com]`}
          </div>

          {/* Institutional Citation Footer */}
          <div className="mt-8 pt-4 border-t border-[#c5c6cd] text-[11px] font-sans text-[#75777d] flex justify-between items-center">
            <span>Archive Reference: TC-LEG-{document.id.toUpperCase()}</span>
            <span>Chief Toye Coker Memorial Trust · Ogun State, Nigeria</span>
          </div>
        </div>

        {/* Modal Bottom Close Bar */}
        <div className="bg-[#f1f4f9] p-3 border-t border-[#c5c6cd] flex justify-end gap-3 shrink-0 no-print">
          <button
            onClick={onClose}
            className="bg-[#051125] text-white text-xs font-bold uppercase tracking-wider px-6 py-2 hover:bg-[#1b263b] transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
