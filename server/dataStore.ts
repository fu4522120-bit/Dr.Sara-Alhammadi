import fs from 'fs';
import path from 'path';
import {
  Appointment,
  ServiceItem,
  TestimonialItem,
  GalleryItem,
  JournalArticle,
  FAQItem,
  StudioSettings,
  AppointmentStatus
} from '../src/types.js';
import {
  initialSettings,
  initialServices,
  initialTestimonials,
  initialGallery,
  initialJournal,
  initialFAQs,
  initialAppointments
} from './initialData.js';

interface DatabaseSchema {
  settings: StudioSettings;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  gallery: GalleryItem[];
  journal: JournalArticle[];
  faqs: FAQItem[];
  appointments: Appointment[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class DataStore {
  private db: DatabaseSchema;

  constructor() {
    this.db = {
      settings: initialSettings,
      services: initialServices,
      testimonials: initialTestimonials,
      gallery: initialGallery,
      journal: initialJournal,
      faqs: initialFAQs,
      appointments: initialAppointments,
    };
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.db = {
          settings: { ...initialSettings, ...(parsed.settings || {}) },
          services: parsed.services || initialServices,
          testimonials: parsed.testimonials || initialTestimonials,
          gallery: parsed.gallery || initialGallery,
          journal: parsed.journal || initialJournal,
          faqs: parsed.faqs || initialFAQs,
          appointments: parsed.appointments || initialAppointments,
        };
      } else {
        this.persist();
      }
    } catch (err) {
      console.warn('Could not read persistent db file, using in-memory fallback:', err);
    }
  }

  private persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.db, null, 2), 'utf-8');
    } catch (err) {
      console.warn('Could not persist db file to disk:', err);
    }
  }

  // Settings
  getSettings(): StudioSettings {
    return this.db.settings;
  }
  updateSettings(data: Partial<StudioSettings>): StudioSettings {
    this.db.settings = { ...this.db.settings, ...data };
    this.persist();
    return this.db.settings;
  }

  // Services
  getServices(): ServiceItem[] {
    return this.db.services;
  }
  createService(item: Omit<ServiceItem, 'id'> & { id?: string }): ServiceItem {
    const newService: ServiceItem = {
      id: item.id || `srv-${Date.now()}`,
      title: item.title,
      tagline: item.tagline || '',
      description: item.description,
      category: item.category || 'Cosmetic',
      duration: item.duration || '60 mins',
      keyBenefits: item.keyBenefits || [],
      icon: item.icon || 'Sparkles',
    };
    this.db.services.push(newService);
    this.persist();
    return newService;
  }
  updateService(id: string, data: Partial<ServiceItem>): ServiceItem | null {
    const idx = this.db.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.db.services[idx] = { ...this.db.services[idx], ...data };
    this.persist();
    return this.db.services[idx];
  }
  deleteService(id: string): boolean {
    const initialLen = this.db.services.length;
    this.db.services = this.db.services.filter((s) => s.id !== id);
    this.persist();
    return this.db.services.length < initialLen;
  }

  // Testimonials
  getTestimonials(): TestimonialItem[] {
    return this.db.testimonials;
  }
  createTestimonial(item: Omit<TestimonialItem, 'id'>): TestimonialItem {
    const newTestimonial: TestimonialItem = {
      id: `test-${Date.now()}`,
      ...item,
    };
    this.db.testimonials.unshift(newTestimonial);
    this.persist();
    return newTestimonial;
  }
  updateTestimonial(id: string, data: Partial<TestimonialItem>): TestimonialItem | null {
    const idx = this.db.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    this.db.testimonials[idx] = { ...this.db.testimonials[idx], ...data };
    this.persist();
    return this.db.testimonials[idx];
  }
  deleteTestimonial(id: string): boolean {
    const initialLen = this.db.testimonials.length;
    this.db.testimonials = this.db.testimonials.filter((t) => t.id !== id);
    this.persist();
    return this.db.testimonials.length < initialLen;
  }

  // Gallery
  getGallery(): GalleryItem[] {
    return this.db.gallery;
  }
  createGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const newGal: GalleryItem = {
      id: `gal-${Date.now()}`,
      ...item,
    };
    this.db.gallery.unshift(newGal);
    this.persist();
    return newGal;
  }
  updateGalleryItem(id: string, data: Partial<GalleryItem>): GalleryItem | null {
    const idx = this.db.gallery.findIndex((g) => g.id === id);
    if (idx === -1) return null;
    this.db.gallery[idx] = { ...this.db.gallery[idx], ...data };
    this.persist();
    return this.db.gallery[idx];
  }
  deleteGalleryItem(id: string): boolean {
    const initialLen = this.db.gallery.length;
    this.db.gallery = this.db.gallery.filter((g) => g.id !== id);
    this.persist();
    return this.db.gallery.length < initialLen;
  }

  // Journal
  getJournal(): JournalArticle[] {
    return this.db.journal;
  }
  createJournalArticle(item: Omit<JournalArticle, 'id'>): JournalArticle {
    const newArticle: JournalArticle = {
      id: `jour-${Date.now()}`,
      ...item,
    };
    this.db.journal.unshift(newArticle);
    this.persist();
    return newArticle;
  }
  updateJournalArticle(id: string, data: Partial<JournalArticle>): JournalArticle | null {
    const idx = this.db.journal.findIndex((j) => j.id === id);
    if (idx === -1) return null;
    this.db.journal[idx] = { ...this.db.journal[idx], ...data };
    this.persist();
    return this.db.journal[idx];
  }
  deleteJournalArticle(id: string): boolean {
    const initialLen = this.db.journal.length;
    this.db.journal = this.db.journal.filter((j) => j.id !== id);
    this.persist();
    return this.db.journal.length < initialLen;
  }

  // FAQs
  getFAQs(): FAQItem[] {
    return this.db.faqs;
  }
  createFAQ(item: Omit<FAQItem, 'id'>): FAQItem {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      ...item,
    };
    this.db.faqs.push(newFaq);
    this.persist();
    return newFaq;
  }
  updateFAQ(id: string, data: Partial<FAQItem>): FAQItem | null {
    const idx = this.db.faqs.findIndex((f) => f.id === id);
    if (idx === -1) return null;
    this.db.faqs[idx] = { ...this.db.faqs[idx], ...data };
    this.persist();
    return this.db.faqs[idx];
  }
  deleteFAQ(id: string): boolean {
    const initialLen = this.db.faqs.length;
    this.db.faqs = this.db.faqs.filter((f) => f.id !== id);
    this.persist();
    return this.db.faqs.length < initialLen;
  }

  // Appointments
  getAppointments(): Appointment[] {
    return this.db.appointments;
  }
  createAppointment(data: {
    fullName: string;
    email: string;
    phone: string;
    service: string;
    preferredDate: string;
    preferredTime: string;
    message?: string;
  }): Appointment {
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      service: data.service,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      message: data.message?.trim(),
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    this.db.appointments.unshift(newApt);
    this.persist();
    return newApt;
  }
  updateAppointmentStatus(id: string, status: AppointmentStatus, notes?: string): Appointment | null {
    const apt = this.db.appointments.find((a) => a.id === id);
    if (!apt) return null;
    apt.status = status;
    if (notes !== undefined) {
      apt.notes = notes;
    }
    this.persist();
    return apt;
  }
  deleteAppointment(id: string): boolean {
    const initialLen = this.db.appointments.length;
    this.db.appointments = this.db.appointments.filter((a) => a.id !== id);
    this.persist();
    return this.db.appointments.length < initialLen;
  }

  // Dashboard Stats
  getStats() {
    const totalAppointments = this.db.appointments.length;
    const newAppointments = this.db.appointments.filter((a) => a.status === 'New').length;
    const confirmedAppointments = this.db.appointments.filter((a) => a.status === 'Confirmed').length;
    const completedAppointments = this.db.appointments.filter((a) => a.status === 'Completed').length;
    const servicesCount = this.db.services.length;
    const galleryCount = this.db.gallery.length;
    const testimonialsCount = this.db.testimonials.length;
    const journalCount = this.db.journal.length;

    return {
      totalAppointments,
      newAppointments,
      confirmedAppointments,
      completedAppointments,
      servicesCount,
      galleryCount,
      testimonialsCount,
      journalCount,
    };
  }
}

export const dataStore = new DataStore();
