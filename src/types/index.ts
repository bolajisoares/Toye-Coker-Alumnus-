export type ProfessionalCategory = 
  | 'The Bench'
  | 'Senior Advocate of Nigeria (SAN)'
  | 'Legal Practitioner (The Bar)'
  | 'Alumnus'
  | 'Judicial Officer / Registrar'
  | 'Law Student'
  | 'Distinguished Guest / Press';

export interface AttendeeRecord {
  id: string;
  ticketCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  category: ProfessionalCategory;
  organization: string;
  seatNumber?: string;
  registrationDate: string;
  checkedIn: boolean;
  notes?: string;
}

export interface DignitaryProfile {
  id: string;
  name: string;
  title: string;
  role: 'Bench' | 'Bar';
  courtOrChambers?: string;
  callToBarYear?: string;
  bioSnippet?: string;
}

export interface ColloquiumSession {
  id: string;
  time: string;
  title: string;
  speaker: string;
  role: string;
  hall: string;
  description: string;
}

export interface ArchiveDocument {
  id: string;
  title: string;
  author: string;
  date: string;
  category: 'BENCH' | 'BAR' | 'GENERAL';
  fileType: 'pdf' | 'audio';
  durationOrPages?: string;
  excerpt?: string;
  fullText?: string;
  audioUrl?: string;
}

export interface EndowmentDonation {
  id: string;
  donorName: string;
  amount: number;
  currency: 'NGN' | 'USD';
  reference: string;
  date: string;
  isAnonymous?: boolean;
  dedication?: string;
}
