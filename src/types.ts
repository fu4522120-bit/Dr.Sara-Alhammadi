export type AppointmentStatus = 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: AppointmentStatus;
  createdAt: string;
  notes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Cosmetic' | 'Prosthodontics' | 'Restorative' | 'Advanced';
  duration: string;
  keyBenefits: string[];
  icon: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  location: string;
  treatment: string;
  quote: string;
  rating: number;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Smile Design' | 'Veneers' | 'Cosmetic Dentistry' | 'Natural Smile' | 'Before & After';
  imageUrl: string;
  beforeImageUrl?: string;
  description: string;
  shade?: string;
  teethCount?: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  publishDate: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StudioSettings {
  clinicName: string;
  doctorName: string;
  doctorTitle: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  openingHours: string;
  googleMapsUrl: string;
}
