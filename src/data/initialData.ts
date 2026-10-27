import { DignitaryProfile, ColloquiumSession, ArchiveDocument, EndowmentDonation } from '../types';

export const BENCH_MEMBERS: DignitaryProfile[] = [
  {
    id: 'bench-1',
    name: 'Hon. Justice Mosunmola Dipeolu',
    title: 'Chief Judge, Ogun State',
    role: 'Bench',
    courtOrChambers: 'High Court of Justice, Ogun State Judiciary',
    callToBarYear: '1987',
    bioSnippet: 'Distinguished jurist presiding as the Chief Judge of Ogun State. An ardent advocate for judicial independence, digitized court administration, and procedural ethics.'
  },
  {
    id: 'bench-2',
    name: 'Hon. Justice T.A. Okunsonkan',
    title: 'Judge, Ogun State',
    role: 'Bench',
    courtOrChambers: 'High Court Bench, Abeokuta Judicial Division',
    callToBarYear: '1992',
    bioSnippet: 'Eminent judge recognized for seminal rulings in constitutional interpretation, property law jurisprudence, and judicial reform.'
  },
  {
    id: 'bench-3',
    name: 'Hon. Justice Funmi Stanley',
    title: 'Judge, Ogun State',
    role: 'Bench',
    courtOrChambers: 'High Court Bench, Ogun State',
    callToBarYear: '1994',
    bioSnippet: 'Honored jurist with extensive service across the commercial, appellate, and public interest dockets in Southwest Nigeria.'
  },
  {
    id: 'bench-4',
    name: 'Hon. Justice Ogunbanjo',
    title: 'Judge, Ogun State',
    role: 'Bench',
    courtOrChambers: 'High Court of Ogun State',
    callToBarYear: '1996',
    bioSnippet: 'Esteemed judicial officer acclaimed for unwavering integrity, scholarly opinions on statutory construction, and institutional mentorship.'
  }
];

export const BAR_MEMBERS: DignitaryProfile[] = [
  {
    id: 'bar-1',
    name: 'Cyril Boware Ogbekene Esq.',
    title: 'Legal Practitioner & Senior Counsel',
    role: 'Bar',
    courtOrChambers: 'Boware & Partners',
    callToBarYear: '1982',
    bioSnippet: 'Veteran commercial litigator and constitutional counsel with four decades of rigorous advocacy across Nigerian appellate courts.'
  },
  {
    id: 'bar-2',
    name: 'Chief Afolabi Fashanu SAN',
    title: 'Senior Advocate of Nigeria',
    role: 'Bar',
    courtOrChambers: 'Fashanu & Co. Chambers',
    callToBarYear: '1985',
    bioSnippet: 'Doyen of the Nigerian Bar and Silk. Leading authority on arbitration, corporate governance, and complex landmark appeals.'
  },
  {
    id: 'bar-3',
    name: 'Olusola Idowu SAN',
    title: 'Senior Advocate of Nigeria',
    role: 'Bar',
    courtOrChambers: 'Idowu & Associates',
    callToBarYear: '1988',
    bioSnippet: 'Eminent Silk with unmatched courtroom presence, championing legal education and mentoring succeeding generations of litigators.'
  },
  {
    id: 'bar-4',
    name: 'Olusola O. Ojutalayo SAN',
    title: 'Senior Advocate of Nigeria',
    role: 'Bar',
    courtOrChambers: 'Ojutalayo Legal Practice',
    callToBarYear: '1990',
    bioSnippet: 'Distinguished Senior Advocate whose appellate briefs have shaped contemporary principles of civil procedure and administrative justice.'
  },
  {
    id: 'bar-5',
    name: 'Abiodun Olusi Esq.',
    title: 'Legal Practitioner & Notary Public',
    role: 'Bar',
    courtOrChambers: 'Olusi & Associates',
    callToBarYear: '1995',
    bioSnippet: 'Respected advocate specializing in land law, probate, and corporate drafting with decades of bar leadership service.'
  },
  {
    id: 'bar-6',
    name: 'Chief S.A. Akinbanmi Esq.',
    title: 'Principal Counsel & Traditional Chieftaincy Titular',
    role: 'Bar',
    courtOrChambers: 'Akinbanmi Law Chambers',
    callToBarYear: '1993',
    bioSnippet: 'Esteemed litigator versed in customary jurisprudence, chieftaincy disputes, and property litigation across Western Nigeria.'
  },
  {
    id: 'bar-7',
    name: 'Otunba Olusegun Adeniyi Esq.',
    title: 'Legal Practitioner & Corporate Advisor',
    role: 'Bar',
    courtOrChambers: 'Adeniyi & Partners',
    callToBarYear: '1997',
    bioSnippet: 'Corporate strategist and courtroom advocate noted for transactional advisory and legal philanthropy.'
  },
  {
    id: 'bar-8',
    name: 'Dr. Niyi Salau Esq.',
    title: 'Legal Scholar & Principal Partner',
    role: 'Bar',
    courtOrChambers: 'Salau & Co.',
    callToBarYear: '2001',
    bioSnippet: 'Academic jurist and author whose monographs on constitutional checks and balances are widely cited across Nigerian law faculties.'
  },
  {
    id: 'bar-9',
    name: 'Abraham Adeoye Esq.',
    title: 'Advocate & Solicitor',
    role: 'Bar',
    courtOrChambers: 'Adeoye Law Firm',
    callToBarYear: '2003',
    bioSnippet: 'Dynamic advocate actively contributing to bar associations, public legal clinics, and human rights causes.'
  },
  {
    id: 'bar-10',
    name: 'Olaolu Kuforiji Esq.',
    title: 'Barrister & Solicitor of the Supreme Court',
    role: 'Bar',
    courtOrChambers: 'Kuforiji Legal Consult',
    callToBarYear: '2005',
    bioSnippet: 'Accomplished litigator, tireless bar officer, and passionate alumnus sustaining the scholarly legacy of Chief Toye Coker.'
  }
];

export const COLLOQUIUM_SESSIONS: ColloquiumSession[] = [
  {
    id: 'sess-1',
    time: '09:30 AM — 10:00 AM WAT',
    title: 'Arrival of Dignitaries & Academic Procession',
    speaker: 'Secretariat & Alumnus Marshals',
    role: 'Opening Protocol',
    hall: 'Main Judicial Amphitheatre',
    description: 'Registration verification, issuance of conference satchels, and ceremonial entry of the Chief Judge, Bench, and Silks.'
  },
  {
    id: 'sess-2',
    time: '10:00 AM — 10:20 AM WAT',
    title: 'Welcome Address & The Legacy of Chief Toye Coker, SAN, OON',
    speaker: 'Chief Afolabi Fashanu SAN & Alumni President',
    role: 'Chairman of the Occasion',
    hall: 'Main Judicial Amphitheatre',
    description: 'Reflections on the indelible imprint of Chief Toye Coker (1923-2012) on legal practice, judicial integrity, and democratic order.'
  },
  {
    id: 'sess-3',
    time: '10:20 AM — 11:30 AM WAT',
    title: '2026 Memorial Keynote: "Judicial Precedents & Constitutional Resilience"',
    speaker: 'Hon. Justice Mosunmola Dipeolu',
    role: 'Chief Judge of Ogun State',
    hall: 'Main Judicial Amphitheatre',
    description: 'A comprehensive oration examining the role of statutory interpretation and ethical judicial craft in upholding national stability.'
  },
  {
    id: 'sess-4',
    time: '11:45 AM — 01:15 PM WAT',
    title: 'Colloquium Panel: "Ethics in Contemporary Advocacy & Legal Modernization"',
    speaker: 'Olusola Idowu SAN, Olusola O. Ojutalayo SAN & Cyril Boware Ogbekene Esq.',
    role: 'Senior Advocates & Bar Leaders Panel',
    hall: 'Judicial Forum Hall B',
    description: 'Interactive discourse addressing courtroom decorum, cross-examination ethics, digital evidence, and mentorship of junior practitioners.'
  },
  {
    id: 'sess-5',
    time: '01:30 PM — 02:30 PM WAT',
    title: 'Alumni Induction, Endowment Presentation & Valedictory Reception',
    speaker: 'Board of Trustees & Memorial Trust',
    role: 'Valedictory & Fellowship',
    hall: 'Grand Banquet Lawn & Terrace',
    description: 'Formal unveiling of new digital archive access grants, endowment fund report, and fellowship reception.'
  }
];

export const INITIAL_ARCHIVE_DOCUMENTS: ArchiveDocument[] = [
  {
    id: 'doc-1',
    title: 'Constitutional Precedents 2010',
    author: 'Chief Justice A. O. Coker',
    date: 'Oct 12, 2010',
    category: 'BENCH',
    fileType: 'pdf',
    durationOrPages: '34 Pages',
    excerpt: 'An authoritative disquisition on the doctrine of stare decisis and judicial discretion in landmark West African appellate jurisprudence.',
    fullText: `TOYE COKER MEMORIAL ARCHIVES - PRECEDENTS SERIES (VOL. XVII)
AUTHOR: Chief Justice A. O. Coker
SUBJECT: Constitutional Precedents, Stare Decisis, and Jurisprudential Stability.

[EXCERPT]
The foundation of legal certainty rests upon adherence to settled constitutional authority. When superior courts speak with clarity, the lower judicial echelons are bound not merely by the formal letters of the decree, but by the ratio decidendi that preserves the social contract. Chief Toye Coker's life work was a relentless testament to this solemn principle: that justice delayed, or justice arbitrarily administered without statutory anchor, undermines the very pillars of the Republic...`
  },
  {
    id: 'doc-2',
    title: 'Ethics in Advocacy Panel Proceedings',
    author: 'Senior Advocates Forum',
    date: 'Mar 05, 2018',
    category: 'BAR',
    fileType: 'audio',
    durationOrPages: '48 Mins Audio',
    excerpt: 'Audio recording and transcript of the roundtable discussion on courtroom etiquette, candour to the Bench, and duties of junior litigators.',
    fullText: `AUDIO ARCHIVE TRANSCRIPT - 2018 ADVOCACY ROUNDTABLE
MODERATOR: Chief Afolabi Fashanu SAN
KEY SPEAKERS: Cyril Boware Ogbekene Esq., Olusola Idowu SAN

"The highest standard required of an advocate is not the triumph of rhetoric, but the relentless fidelity to truth. In the words of our revered patron Chief Toye Coker, an officer of the court who misleads a judge has struck a blow against justice itself..."`
  },
  {
    id: 'doc-3',
    title: 'Annual General Meeting Minutes & Trustees Report',
    author: 'Secretariat & Board of Trustees',
    date: 'Nov 20, 2023',
    category: 'GENERAL',
    fileType: 'pdf',
    durationOrPages: '18 Pages',
    excerpt: 'Official proceedings of the 2023 Alumni convocation, audit of endowment disbursements, and digital library digitization roadmap.',
    fullText: `TOYE COKER ALUMNUS TRUSTEES REPORT 2023
SECRETARIAT REPORT ON SCHOLARSHIP AND ENDOWMENT EXPANSION
1. Digital Archive Project launched with initial corpus from voluntary patron gifts.
2. 42 undergraduate law bursaries conferred to deserving students across Ogun State tertiary institutions.
3. Memorial Lecture series scheduled for continued biannual rotation.`
  },
  {
    id: 'doc-4',
    title: 'Judicial Review of Administrative Actions & Due Process',
    author: 'Hon. Justice Mosunmola Dipeolu',
    date: 'Nov 14, 2021',
    category: 'BENCH',
    fileType: 'pdf',
    durationOrPages: '28 Pages',
    excerpt: 'Comprehensive lecture analysing prerogative orders of Mandamus, Certiorari, and Prohibition in statutory administration.',
    fullText: `MEMORIAL LECTURE MONOGRAPH 2021
DELIVERED BY: Hon. Justice Mosunmola Dipeolu, Chief Judge of Ogun State
TOPIC: The Prerogative Powers of the Superior Courts in Curbing Administrative Excess

"Where executive power exceeds constitutional bounds, the Court must serve as the unshakeable refuge of the citizen. In honoring Chief Toye Coker, we recall a counsel whose applications for judicial review were masterclasses in precision and constitutional courage..."`
  },
  {
    id: 'doc-5',
    title: 'Cross-Examination Mastery & Evidence Law',
    author: 'Chief Toye Coker, SAN, OON (Archival Lecture)',
    date: 'Oct 08, 1998',
    category: 'BAR',
    fileType: 'pdf',
    durationOrPages: '42 Pages',
    excerpt: 'Original archival lecture notes delivered by Chief Toye Coker on the art of witness examination, hearsay rules, and documentary tendering.',
    fullText: `CHIEF TOYE COKER, SAN, OON - LECTURE NOTES (1998)
THE ADVOCATE'S CRAFT: PRINCIPLES OF CROSS-EXAMINATION

"Never ask a question to which you do not already know the answer, or to which any answer will damage the adverse party. Courtroom advocacy is not an arena for exploratory fishing expeditions; it is a systematic demonstration of incontrovertible facts..."`
  }
];

export const INITIAL_DONATIONS: EndowmentDonation[] = [
  {
    id: 'don-1',
    donorName: 'Chief Afolabi Fashanu SAN',
    amount: 500000,
    currency: 'NGN',
    reference: 'TC-ENDOW-849201',
    date: 'Oct 24, 2026',
    dedication: 'In sustained memory of Chief Toye Coker - mentor to generations of Silks.'
  },
  {
    id: 'don-2',
    donorName: 'Hon. Justice Benefactor',
    amount: 250000,
    currency: 'NGN',
    reference: 'TC-ENDOW-772109',
    date: 'Oct 22, 2026',
    isAnonymous: true,
    dedication: 'Toward the preservation of legal archives and youth law bursaries.'
  },
  {
    id: 'don-3',
    donorName: 'Ojutalayo & Co. Legal',
    amount: 350000,
    currency: 'NGN',
    reference: 'TC-ENDOW-918234',
    date: 'Oct 19, 2026',
    dedication: 'Supporting digital library access for young members of the Nigerian Bar.'
  },
  {
    id: 'don-4',
    donorName: 'Alumni Class of 1994',
    amount: 150000,
    currency: 'NGN',
    reference: 'TC-ENDOW-443912',
    date: 'Oct 15, 2026',
    dedication: 'Tradition, Integrity, and Legacy forever upheld.'
  }
];
