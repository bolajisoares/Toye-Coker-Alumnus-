import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Headphones,
  Check,
  FileSpreadsheet,
  Plus,
  Landmark,
  Shield,
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { QrCodeSvg } from './QrCodeSvg';
import { ArchiveDocument } from '../types';

interface ArchiveDashboardProps {
  documents: ArchiveDocument[];
  onAddDocument: (doc: ArchiveDocument) => void;
  onOpenViewer: (doc: ArchiveDocument) => void;
  onOpenDonateModal: () => void;
  onBackToPortal: () => void;
}

export const ArchiveDashboard: React.FC<ArchiveDashboardProps> = ({
  documents,
  onAddDocument,
  onOpenViewer,
  onOpenDonateModal,
  onBackToPortal
}) => {
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'BENCH' | 'BAR'>('ALL');
  const [docTitle, setDocTitle] = useState('');
  const [docAuthor, setDocAuthor] = useState('');
  const [docCategory, setDocCategory] = useState<'BENCH' | 'BAR' | 'GENERAL'>('BENCH');
  const [docFileType, setDocFileType] = useState<'pdf' | 'audio'>('pdf');
  const [commitMessage, setCommitMessage] = useState('');

  const filteredDocs = documents.filter((doc) => {
    if (filterCategory === 'ALL') return true;
    return doc.category === filterCategory;
  });

  const handleCommitResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docAuthor.trim()) return;

    const newDoc: ArchiveDocument = {
      id: `doc-${Date.now()}`,
      title: docTitle.trim(),
      author: docAuthor.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: docCategory,
      fileType: docFileType,
      durationOrPages: docFileType === 'pdf' ? '24 Pages' : '36 Mins Audio',
      excerpt: `Archival record committed by Secretariat: ${docTitle.trim()} authored by ${docAuthor.trim()}.`,
      fullText: `TOYE COKER MEMORIAL ARCHIVE - NEW ACCESSION RECORD\nTITLE: ${docTitle}\nAUTHOR: ${docAuthor}\nCATEGORY: ${docCategory}\nDATE COMMITTED: ${new Date().toLocaleDateString()}\n\nThis legal disquisition has been officially indexed into the digital repositories of the Toye Coker Alumnus.`
    };

    onAddDocument(newDoc);
    setDocTitle('');
    setDocAuthor('');
    setCommitMessage(`Successfully committed "${newDoc.title}" to the official repository.`);
    setTimeout(() => setCommitMessage(''), 4000);
  };

  const handleGenerateReport = () => {
    // Generate CSV audit report
    const headers = 'ID,Document Title,Author/Speaker,Date,Category,File Type\n';
    const rows = documents
      .map((d) => `"${d.id}","${d.title}","${d.author}","${d.date}","${d.category}","${d.fileType}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `Toye_Coker_Archive_Report_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Dashboard Top Header (Master Stitch Layout) */}
      <div className="bg-white border-b border-[#c5c6cd] py-6 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shadow-xs">
        <div>
          <button
            onClick={onBackToPortal}
            className="text-xs text-[#775a19] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Memorial Portal
          </button>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-legal text-[#051125] tracking-tight">
            Archive Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#45474d] mt-1">
            Manage library resources, legal dissertations, and alumni access catalog.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          className="bg-[#051125] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 border-b border-[#775a19] hover:bg-[#1b263b] transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <FileSpreadsheet size={15} className="text-[#fed488]" />
          GENERATE REPORT (CSV)
        </button>
      </div>

      {commitMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 text-xs font-medium flex items-center gap-2">
          <Check size={16} />
          {commitMessage}
        </div>
      )}

      {/* Bento Grid: Upload Panel (8 cols) + Sticky QR Widget (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Admin Upload Panel (Master Stitch Component) */}
        <section className="lg:col-span-8 bg-white border border-[#c5c6cd] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e5e8ee] pb-3 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold font-serif-legal text-[#051125]">
              Upload Resource
            </h3>
            <Upload size={20} className="text-[#775a19]" />
          </div>

          <form onSubmit={handleCommitResource} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Input Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#45474d] mb-1">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 1998 Judicial Review"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="w-full text-xs sm:text-sm py-2 px-0 border-b border-[#45474d] bg-transparent focus:outline-none focus:border-[#051125]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#45474d] mb-1">
                    Speaker / Author *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hon. Justice Name / Senior Advocate"
                    value={docAuthor}
                    onChange={(e) => setDocAuthor(e.target.value)}
                    className="w-full text-xs sm:text-sm py-2 px-0 border-b border-[#45474d] bg-transparent focus:outline-none focus:border-[#051125]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#45474d] mb-1">
                      Category
                    </label>
                    <select
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value as any)}
                      className="w-full text-xs py-2 bg-transparent border-b border-[#45474d] focus:outline-none focus:border-[#051125]"
                    >
                      <option value="BENCH">The Bench (Judicial)</option>
                      <option value="BAR">The Bar (Advocacy)</option>
                      <option value="GENERAL">General Archive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-[#45474d] mb-1">
                      Resource Format
                    </label>
                    <select
                      value={docFileType}
                      onChange={(e) => setDocFileType(e.target.value as any)}
                      className="w-full text-xs py-2 bg-transparent border-b border-[#45474d] focus:outline-none focus:border-[#051125]"
                    >
                      <option value="pdf">PDF Document / Brief</option>
                      <option value="audio">Audio Lecture Recording</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Drag & Drop Simulation Zone (Stitch spec) */}
              <div
                onClick={() => {
                  if (!docTitle) setDocTitle('Landmark Appellate Arguments 2004');
                  if (!docAuthor) setDocAuthor('Chief Toye Coker SAN');
                }}
                className="border-2 border-dashed border-[#c5c6cd] bg-[#f1f4f9] flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-[#ebeef3] transition-colors min-h-[180px]"
              >
                <Plus size={36} className="text-[#545e76] mb-2" />
                <p className="text-xs sm:text-sm text-[#45474d] font-medium">
                  Drag and drop PDF or Audio files here
                </p>
                <p className="text-[10px] text-[#75777d] mt-1 font-bold uppercase tracking-wider">
                  or click to auto-fill sample brief
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-[#051125] text-white text-xs font-bold uppercase tracking-widest px-8 py-3 border-b-2 border-[#775a19] hover:bg-[#1b263b] transition-colors"
              >
                COMMIT TO ARCHIVE
              </button>
            </div>
          </form>
        </section>

        {/* Sticky QR Donation Widget (Stitch 4 cols) */}
        <section className="lg:col-span-4 bg-[#051125] text-white border border-[#775a19] p-6 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#775a19] opacity-10 rounded-bl-full pointer-events-none"></div>
          
          <div className="text-[#fed488] mb-2">
            <Landmark size={36} />
          </div>

          <h3 className="text-xl font-bold font-serif-legal mb-1">
            Support the Legacy
          </h3>
          <p className="text-xs text-[#bbc6e2] mb-4 opacity-85 leading-relaxed">
            Contributions maintain the integrity of our digital archives and fund open judicial access.
          </p>

          <div className="bg-white p-3 border-2 border-[#775a19]/60 shrink-0 mb-4 flex flex-col items-center shadow-inner">
            <QrCodeSvg
              value="https://paystack.com/pay/toye-coker-archive-endowment"
              size={140}
              fgColor="#051125"
            />
          </div>

          <button
            onClick={onOpenDonateModal}
            className="w-full bg-[#fed488] text-[#785a1a] text-xs font-bold uppercase tracking-widest py-2.5 px-4 hover:bg-[#ffdea5] transition-all"
          >
            Endowment Pledge (Paystack)
          </button>

          <div className="w-full h-px bg-[#3c475d] my-3"></div>
          <p className="text-[10px] text-[#fed488] tracking-[0.2em] uppercase font-bold">
            ENDOWMENT FUND · TOYE COKER TRUST
          </p>
        </section>
      </div>

      {/* Lecture Library Catalog Table (12 cols) */}
      <section className="bg-white border border-[#c5c6cd] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-[#c5c6cd] gap-4 bg-[#f1f4f9]">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif-legal text-[#051125]">
              Library Catalog
            </h3>
            <span className="text-xs text-[#45474d]">
              Showing {filteredDocs.length} curated archival documents &amp; dissertations
            </span>
          </div>

          {/* Filters (Segmented Controls) */}
          <div className="flex gap-1.5 font-bold text-xs uppercase tracking-wider">
            <button
              onClick={() => setFilterCategory('ALL')}
              className={`px-4 py-2 border transition-colors ${
                filterCategory === 'ALL'
                  ? 'bg-[#051125] text-white border-[#775a19]'
                  : 'bg-white text-[#45474d] border-[#c5c6cd] hover:border-[#775a19]'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setFilterCategory('BENCH')}
              className={`px-4 py-2 border transition-colors ${
                filterCategory === 'BENCH'
                  ? 'bg-[#051125] text-white border-[#775a19]'
                  : 'bg-white text-[#45474d] border-[#c5c6cd] hover:border-[#775a19]'
              }`}
            >
              The Bench
            </button>
            <button
              onClick={() => setFilterCategory('BAR')}
              className={`px-4 py-2 border transition-colors ${
                filterCategory === 'BAR'
                  ? 'bg-[#051125] text-white border-[#775a19]'
                  : 'bg-white text-[#45474d] border-[#c5c6cd] hover:border-[#775a19]'
              }`}
            >
              The Bar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#051125] border-double bg-[#f7f9ff] text-[11px] font-bold uppercase tracking-wider text-[#45474d]">
                <th className="py-3.5 px-4 sm:px-6">Document Title</th>
                <th className="py-3.5 px-4 sm:px-6">Author / Speaker</th>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4 sm:px-6">Category</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm divide-y divide-[#e5e8ee]">
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-[#f7f9ff] transition-colors group cursor-pointer"
                  onClick={() => onOpenViewer(doc)}
                >
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#051125] font-serif-legal">
                    <div className="flex items-center gap-2">
                      {doc.fileType === 'pdf' ? (
                        <FileText size={16} className="text-[#775a19] shrink-0" />
                      ) : (
                        <Headphones size={16} className="text-[#775a19] shrink-0" />
                      )}
                      <span>{doc.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#45474d]">{doc.author}</td>
                  <td className="py-4 px-4 sm:px-6 text-[#75777d] font-mono">{doc.date}</td>
                  <td className="py-4 px-4 sm:px-6">
                    <span
                      className={`inline-block text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 border ${
                        doc.category === 'BENCH'
                          ? 'bg-[#1b263b] text-white border-[#775a19]'
                          : doc.category === 'BAR'
                          ? 'bg-[#e0e3e8] text-[#051125] border-[#c5c6cd]'
                          : 'bg-[#f7f9ff] text-[#45474d] border-[#c5c6cd]'
                      }`}
                    >
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenViewer(doc);
                      }}
                      className="text-[#775a19] hover:text-[#051125] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
                    >
                      {doc.fileType === 'pdf' ? 'Read Brief →' : 'Listen →'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
