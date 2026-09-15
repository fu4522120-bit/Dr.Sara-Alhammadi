import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Layers,
  Image,
  Quote,
  BookOpen,
  HelpCircle,
  Settings as SettingsIcon,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Plus,
  Lock,
  Unlock,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  Appointment,
  ServiceItem,
  GalleryItem,
  TestimonialItem,
  JournalArticle,
  FAQItem,
  StudioSettings,
  AppointmentStatus
} from '../../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, onDataUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [currentTab, setCurrentTab] = useState<
    'dashboard' | 'appointments' | 'services' | 'gallery' | 'testimonials' | 'journal' | 'faqs' | 'settings'
  >('dashboard');

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [journal, setJournal] = useState<JournalArticle[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [settings, setSettings] = useState<StudioSettings | null>(null);

  // Sub-modals for creating/editing
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  // Fetch all data
  const fetchAllData = async () => {
    try {
      const [
        statsRes,
        aptRes,
        srvRes,
        galRes,
        testRes,
        jourRes,
        faqRes,
        setRes
      ] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/appointments'),
        fetch('/api/services'),
        fetch('/api/gallery'),
        fetch('/api/testimonials'),
        fetch('/api/journal'),
        fetch('/api/faqs'),
        fetch('/api/settings')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (aptRes.ok) setAppointments(await aptRes.json());
      if (srvRes.ok) setServices(await srvRes.json());
      if (galRes.ok) setGallery(await galRes.json());
      if (testRes.ok) setTestimonials(await testRes.json());
      if (jourRes.ok) setJournal(await jourRes.json());
      if (faqRes.ok) setFaqs(await faqRes.json());
      if (setRes.ok) setSettings(await setRes.json());
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchAllData();
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.trim() === '2026' || pin.trim() === 'sara' || pin.trim() === '') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Appointment Status Update
  const updateAppointmentStatus = async (id: string, status: AppointmentStatus) => {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to remove this appointment record?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Generic Deletion
  const deleteRecord = async (endpoint: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingItem?.id);
    const url = isEdit ? `/api/services/${editingItem.id}` : '/api/services';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        setModalType(null);
        setEditingItem(null);
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert('Studio settings updated successfully.');
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save FAQ
  const handleSaveFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingItem?.id);
    const url = isEdit ? `/api/faqs/${editingItem.id}` : '/api/faqs';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        setModalType(null);
        setEditingItem(null);
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Testimonial
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingItem?.id);
    const url = isEdit ? `/api/testimonials/${editingItem.id}` : '/api/testimonials';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        setModalType(null);
        setEditingItem(null);
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Gallery Item
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingItem?.id);
    const url = isEdit ? `/api/gallery/${editingItem.id}` : '/api/gallery';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        setModalType(null);
        setEditingItem(null);
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Journal Article
  const handleSaveJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(editingItem?.id);
    const url = isEdit ? `/api/journal/${editingItem.id}` : '/api/journal';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        setModalType(null);
        setEditingItem(null);
        fetchAllData();
        onDataUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#1F1D1B]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl h-[90vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="p-5 sm:px-8 bg-[#FAF8F5] border-b border-[#EAE2D5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EAE2D5] text-[#1F1D1B] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#B69768]" />
            </div>
            <div>
              <h2 className="font-editorial text-lg sm:text-xl font-medium text-[#1F1D1B]">
                Studio Concierge & Administration
              </h2>
              <p className="text-[11px] text-[#8E8276] uppercase tracking-widest font-sans font-light">
                Dr. Sara Alhammadi Dental Studio • Jumeirah 2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F2EDE4] hover:bg-[#EAE2D5] text-[#554E46] transition-colors"
            aria-label="Close admin dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Barrier */}
        {!isAuthenticated ? (
          <div className="grow flex items-center justify-center p-6 bg-[#FAF8F5]">
            <div className="w-full max-w-md p-8 bg-[#FFFFFF] rounded-2xl border border-[#ECE5DA] shadow-xl text-center">
              <div className="w-12 h-12 rounded-full bg-[#F4EFE6] text-[#B69768] mx-auto flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl text-[#1F1D1B] mb-1">
                Studio Management Portal
              </h3>
              <p className="text-xs text-[#7A7167] mb-6">
                Enter your studio access PIN (Default PIN: <strong>2026</strong> or press Instant Access)
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN (e.g. 2026)"
                  className="w-full px-4 py-3 text-center tracking-[0.4em] font-mono text-lg bg-[#FAF8F5] border border-[#E5DDD0] rounded-xl focus:outline-hidden focus:border-[#B69768]"
                />

                {pinError && (
                  <p className="text-xs text-red-600">Incorrect PIN. Please try again.</p>
                )}

                <div className="flex gap-2.5">
                  <button
                    type="submit"
                    className="grow py-3 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                  >
                    Unlock Portal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAuthenticated(true);
                      setPinError(false);
                    }}
                    className="px-5 py-3 rounded-full bg-[#EAE2D5] hover:bg-[#D9CFBF] text-[#242220] text-xs uppercase tracking-[0.16em] font-medium transition-colors"
                  >
                    Instant Access
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Main Admin Layout */
          <div className="grow flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <aside className="w-full md:w-64 bg-[#F5EFE6] border-r border-[#E8E0D2] p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-colors text-left ${
                  currentTab === 'dashboard'
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'text-[#61584F] hover:bg-[#EAE2D5]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setCurrentTab('appointments')}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-colors text-left ${
                  currentTab === 'appointments'
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'text-[#61584F] hover:bg-[#EAE2D5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>Appointments</span>
                </div>
                {stats?.newAppointments > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#B69768] text-white text-[10px]">
                    {stats.newAppointments}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCurrentTab('services')}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-colors text-left ${
                  currentTab === 'services'
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'text-[#61584F] hover:bg-[#EAE2D5]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Services ({services.length})</span>
              </button>

              <button
                onClick={() => setCurrentTab('gallery')}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-colors text-left ${
                  currentTab === 'gallery'
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'text-[#61584F] hover:bg-[#EAE2D5]'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Smile Gallery ({gallery.length})</span>
              </button>

              <button
                onClick={() => setCurrentTab('testimonials')}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-colors text-left ${
                  currentTab === 'testimonials'
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'text-[#61584F] hover:bg-[#EAE2D5]'
                }`}
              >
                <Quote className="w-4 h-4" />
                <span>Testimonials ({testimonials.length})</span>
              </button>

              <button
                onClick={() => setCurrentTab('journal')}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-colors text-left ${
                  currentTab === 'journal'
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'text-[#61584F] hover:bg-[#EAE2D5]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>The Journal ({journal.length})</span>
              </button>

              <button
                onClick={() => setCurrentTab('faqs')}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-colors text-left ${
                  currentTab === 'faqs'
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'text-[#61584F] hover:bg-[#EAE2D5]'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Studio FAQs ({faqs.length})</span>
              </button>

              <button
                onClick={() => setCurrentTab('settings')}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.16em] font-medium transition-colors text-left ${
                  currentTab === 'settings'
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'text-[#61584F] hover:bg-[#EAE2D5]'
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Studio Settings</span>
              </button>

              <div className="mt-auto pt-4 hidden md:block">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full py-2 text-xs uppercase tracking-[0.16em] text-[#8E8276] hover:text-[#1F1D1B]"
                >
                  Lock Session
                </button>
              </div>
            </aside>

            {/* Tab Body */}
            <main className="grow p-6 sm:p-8 overflow-y-auto bg-[#FAF8F5]">
              
              {/* TAB: DASHBOARD */}
              {currentTab === 'dashboard' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B]">
                      Studio Overview
                    </h3>
                    <p className="text-xs text-[#7A7167]">
                      Live metrics and active consultation inquiries.
                    </p>
                  </div>

                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA]">
                      <p className="text-[11px] uppercase tracking-wider text-[#8E8276]">Total Inquiries</p>
                      <p className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] mt-1 font-medium">
                        {stats?.totalAppointments || appointments.length}
                      </p>
                      <span className="text-[10px] text-[#554E46] mt-1 block">Patient requests</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA]">
                      <p className="text-[11px] uppercase tracking-wider text-[#B69768] font-semibold">New Requests</p>
                      <p className="font-editorial text-3xl sm:text-4xl text-[#B69768] mt-1 font-medium">
                        {stats?.newAppointments || 0}
                      </p>
                      <span className="text-[10px] text-[#8E8276] mt-1 block">Awaiting reply</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA]">
                      <p className="text-[11px] uppercase tracking-wider text-[#4E8D5D] font-semibold">Confirmed</p>
                      <p className="font-editorial text-3xl sm:text-4xl text-[#4E8D5D] mt-1 font-medium">
                        {stats?.confirmedAppointments || 0}
                      </p>
                      <span className="text-[10px] text-[#8E8276] mt-1 block">Scheduled visits</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA]">
                      <p className="text-[11px] uppercase tracking-wider text-[#8E8276]">Active Services</p>
                      <p className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] mt-1 font-medium">
                        {stats?.servicesCount || services.length}
                      </p>
                      <span className="text-[10px] text-[#554E46] mt-1 block">Signature treatments</span>
                    </div>
                  </div>

                  {/* Recent Inquiries Quick Table */}
                  <div className="bg-[#FFFFFF] rounded-2xl border border-[#ECE5DA] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm uppercase tracking-wider font-medium text-[#1F1D1B]">
                        Recent Consultation Inquiries
                      </h4>
                      <button
                        onClick={() => setCurrentTab('appointments')}
                        className="text-xs text-[#B69768] hover:underline"
                      >
                        View All Appointments →
                      </button>
                    </div>

                    <div className="divide-y divide-[#F2ECE1]">
                      {appointments.slice(0, 4).map((apt) => (
                        <div key={apt.id} className="py-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-[#1F1D1B]">{apt.fullName}</p>
                            <p className="text-xs text-[#7A7167]">
                              {apt.service} • {apt.preferredDate} ({apt.preferredTime})
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium ${
                              apt.status === 'New'
                                ? 'bg-[#FEF3C7] text-[#92400E]'
                                : apt.status === 'Confirmed'
                                ? 'bg-[#D1FAE5] text-[#065F46]'
                                : 'bg-[#EAE2D5] text-[#4A433A]'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: APPOINTMENTS */}
              {currentTab === 'appointments' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#1F1D1B]">
                        Consultation Requests
                      </h3>
                      <p className="text-xs text-[#7A7167]">
                        Track, confirm, and update patient inquiries.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA] flex flex-col md:flex-row md:items-center justify-between gap-5"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2.5">
                            <span className="font-medium text-[#1F1D1B] text-base">{apt.fullName}</span>
                            <span className="text-xs text-[#8E8276]">({apt.id})</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#635B52]">
                            <span>📞 {apt.phone}</span>
                            <span>✉️ {apt.email}</span>
                            <span className="font-medium text-[#B69768]">✨ {apt.service}</span>
                          </div>

                          <div className="text-xs text-[#71685E]">
                            <strong>Date requested:</strong> {apt.preferredDate} ({apt.preferredTime})
                          </div>

                          {apt.message && (
                            <p className="text-xs italic text-[#59524A] bg-[#FAF8F5] p-2.5 rounded-lg mt-2">
                              &ldquo;{apt.message}&rdquo;
                            </p>
                          )}
                        </div>

                        {/* Status Controls */}
                        <div className="flex items-center gap-3 shrink-0">
                          <select
                            value={apt.status}
                            onChange={(e) =>
                              updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)
                            }
                            className={`px-3 py-1.5 text-xs font-medium rounded-full border cursor-pointer ${
                              apt.status === 'New'
                                ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                                : apt.status === 'Confirmed'
                                ? 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]'
                                : apt.status === 'Contacted'
                                ? 'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]'
                                : apt.status === 'Completed'
                                ? 'bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]'
                                : 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => deleteAppointment(apt.id)}
                            className="p-2 text-[#991B1B] hover:bg-[#FEE2E2] rounded-lg transition-colors"
                            title="Delete Appointment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SERVICES */}
              {currentTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#1F1D1B]">
                        Signature Treatments
                      </h3>
                      <p className="text-xs text-[#7A7167]">
                        Manage clinical services displayed on the website.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem({
                          title: '',
                          tagline: '',
                          description: '',
                          category: 'Cosmetic',
                          duration: '60 mins',
                          keyBenefits: ['Facial harmony', 'Biological preservation'],
                          icon: 'Sparkles',
                        });
                        setModalType('service');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Treatment</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase tracking-wider font-medium text-[#8E8276] px-2.5 py-0.5 rounded-full bg-[#FAF8F5]">
                              {srv.category}
                            </span>
                            <span className="text-xs text-[#7A7167]">⏱️ {srv.duration}</span>
                          </div>
                          <h4 className="font-editorial text-xl text-[#1F1D1B] mb-1">{srv.title}</h4>
                          <p className="text-xs text-[#635B52] line-clamp-2 mb-3">{srv.description}</p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F5EFE6]">
                          <button
                            onClick={() => {
                              setEditingItem(srv);
                              setModalType('service');
                            }}
                            className="p-1.5 text-[#554E46] hover:text-[#1F1D1B] hover:bg-[#F2ECE1] rounded-md"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteRecord('services', srv.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: GALLERY */}
              {currentTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#1F1D1B]">Smile Gallery</h3>
                      <p className="text-xs text-[#7A7167]">
                        Manage clinical case transformations and before/after items.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem({
                          title: '',
                          category: 'Veneers',
                          imageUrl: '/src/assets/images/smile_natural_detail_1789472941289.jpg',
                          beforeImageUrl: '',
                          description: '',
                          shade: 'Natural A1',
                          teethCount: '10 Upper Veneers',
                        });
                        setModalType('gallery');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Transformation</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gallery.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA] overflow-hidden flex flex-col justify-between"
                      >
                        <div className="aspect-4/3 overflow-hidden bg-[#EAE2D5] relative">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-medium bg-[#1F1D1B]/80 text-white">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-editorial text-base text-[#1F1D1B] mb-1">{item.title}</h4>
                          <p className="text-xs text-[#71685E] line-clamp-2 mb-3">{item.description}</p>
                          <div className="flex items-center justify-between pt-2 border-t border-[#F5EFE6]">
                            <span className="text-[10px] text-[#B69768]">{item.shade}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem(item);
                                  setModalType('gallery');
                                }}
                                className="p-1 text-[#554E46] hover:text-[#1F1D1B]"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteRecord('gallery', item.id)}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: TESTIMONIALS */}
              {currentTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#1F1D1B]">Patient Reviews</h3>
                      <p className="text-xs text-[#7A7167]">Manage patient quotes and feedback.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem({
                          patientName: '',
                          location: 'Dubai, UAE',
                          treatment: 'Porcelain Veneers',
                          quote: '',
                          rating: 5,
                        });
                        setModalType('testimonial');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Testimonial</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {testimonials.map((test) => (
                      <div
                        key={test.id}
                        className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA] flex flex-col md:flex-row items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <p className="font-medium text-[#1F1D1B]">{test.patientName} ({test.location})</p>
                          <p className="text-xs text-[#B69768] font-medium">{test.treatment}</p>
                          <p className="text-xs italic text-[#59524A]">&ldquo;{test.quote}&rdquo;</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(test);
                              setModalType('testimonial');
                            }}
                            className="p-1.5 text-[#554E46] hover:bg-[#F2ECE1] rounded-md"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteRecord('testimonials', test.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: JOURNAL */}
              {currentTab === 'journal' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#1F1D1B]">The Journal</h3>
                      <p className="text-xs text-[#7A7167]">Publish and edit clinical editorials.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem({
                          title: '',
                          category: 'Cosmetic Dentistry',
                          excerpt: '',
                          content: '',
                          readTime: '4 min read',
                          publishDate: 'March 2026',
                          imageUrl: '/src/assets/images/journal_editorial_1789472959890.jpg',
                        });
                        setModalType('journal');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Article</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {journal.map((art) => (
                      <div
                        key={art.id}
                        className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE5DA] flex flex-col md:flex-row items-start justify-between gap-4"
                      >
                        <div>
                          <span className="text-[10px] uppercase font-medium text-[#8E8276] px-2 py-0.5 rounded-full bg-[#FAF8F5]">
                            {art.category}
                          </span>
                          <h4 className="font-editorial text-lg text-[#1F1D1B] mt-1">{art.title}</h4>
                          <p className="text-xs text-[#635B52] line-clamp-2 mt-1">{art.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingItem(art);
                              setModalType('journal');
                            }}
                            className="p-1.5 text-[#554E46] hover:bg-[#F2ECE1] rounded-md"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteRecord('journal', art.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: FAQS */}
              {currentTab === 'faqs' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-2xl text-[#1F1D1B]">Studio FAQs</h3>
                      <p className="text-xs text-[#7A7167]">Manage consultation and patient questions.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem({
                          question: '',
                          answer: '',
                          category: 'General',
                        });
                        setModalType('faq');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="p-4 rounded-xl bg-[#FFFFFF] border border-[#ECE5DA] flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium text-sm text-[#1F1D1B]">{faq.question}</p>
                          <p className="text-xs text-[#635B52] mt-1">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingItem(faq);
                              setModalType('faq');
                            }}
                            className="p-1 text-[#554E46] hover:bg-[#F2ECE1] rounded-md"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteRecord('faqs', faq.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS */}
              {currentTab === 'settings' && settings && (
                <div className="max-w-2xl space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#1F1D1B]">Studio Configuration</h3>
                    <p className="text-xs text-[#7A7167]">
                      Update contact numbers, location, hours, and social channels.
                    </p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-4 bg-[#FFFFFF] p-6 rounded-2xl border border-[#ECE5DA]">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#4D463E] mb-1">Clinic Name</label>
                      <input
                        type="text"
                        value={settings.clinicName}
                        onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-medium text-[#4D463E] mb-1">Telephone</label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-medium text-[#4D463E] mb-1">WhatsApp</label>
                        <input
                          type="text"
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-medium text-[#4D463E] mb-1">Email</label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-medium text-[#4D463E] mb-1">Instagram Handle</label>
                        <input
                          type="text"
                          value={settings.instagram}
                          onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#4D463E] mb-1">Address</label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#4D463E] mb-1">Opening Hours</label>
                      <input
                        type="text"
                        value={settings.openingHours}
                        onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#E5DCD0] rounded-lg"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#1F1D1B] hover:bg-[#B69768] text-white text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      Save Settings
                    </button>
                  </form>
                </div>
              )}

            </main>
          </div>
        )}

        {/* Modal for Service Edit/Create */}
        {modalType === 'service' && editingItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] p-6 rounded-3xl w-full max-w-lg shadow-2xl border border-[#EAE2D5]">
              <h4 className="font-editorial text-xl mb-4">
                {editingItem.id ? 'Edit Treatment' : 'Add Treatment'}
              </h4>
              <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1">Treatment Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingItem.tagline || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                    >
                      <option value="Cosmetic">Cosmetic</option>
                      <option value="Prosthodontics">Prosthodontics</option>
                      <option value="Restorative">Restorative</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Estimated Duration</label>
                    <input
                      type="text"
                      value={editingItem.duration || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 rounded-full border border-[#D9CFBF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#1F1D1B] text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for FAQ Edit/Create */}
        {modalType === 'faq' && editingItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] p-6 rounded-3xl w-full max-w-lg shadow-2xl border border-[#EAE2D5]">
              <h4 className="font-editorial text-xl mb-4">
                {editingItem.id ? 'Edit FAQ' : 'Add FAQ'}
              </h4>
              <form onSubmit={handleSaveFAQ} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1">Question *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.question}
                    onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Answer *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.answer}
                    onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 rounded-full border border-[#D9CFBF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#1F1D1B] text-white"
                  >
                    Save FAQ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Testimonial Edit/Create */}
        {modalType === 'testimonial' && editingItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] p-6 rounded-3xl w-full max-w-lg shadow-2xl border border-[#EAE2D5]">
              <h4 className="font-editorial text-xl mb-4">
                {editingItem.id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h4>
              <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.patientName}
                    onChange={(e) => setEditingItem({ ...editingItem, patientName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={editingItem.location}
                      onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Treatment</label>
                    <input
                      type="text"
                      value={editingItem.treatment}
                      onChange={(e) => setEditingItem({ ...editingItem, treatment: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Review Quote *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.quote}
                    onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 rounded-full border border-[#D9CFBF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#1F1D1B] text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Gallery Edit/Create */}
        {modalType === 'gallery' && editingItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] p-6 rounded-3xl w-full max-w-lg shadow-2xl border border-[#EAE2D5]">
              <h4 className="font-editorial text-xl mb-4">
                {editingItem.id ? 'Edit Transformation' : 'Add Transformation'}
              </h4>
              <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1">Case Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                    >
                      <option value="Smile Design">Smile Design</option>
                      <option value="Veneers">Veneers</option>
                      <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                      <option value="Natural Smile">Natural Smile</option>
                      <option value="Before & After">Before & After</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Enamel Shade</label>
                    <input
                      type="text"
                      value={editingItem.shade || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, shade: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Image URL *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.imageUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Before Image URL (Optional)</label>
                  <input
                    type="text"
                    value={editingItem.beforeImageUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, beforeImageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 rounded-full border border-[#D9CFBF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#1F1D1B] text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Journal Edit/Create */}
        {modalType === 'journal' && editingItem && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] p-6 rounded-3xl w-full max-w-lg shadow-2xl border border-[#EAE2D5]">
              <h4 className="font-editorial text-xl mb-4">
                {editingItem.id ? 'Edit Article' : 'New Article'}
              </h4>
              <form onSubmit={handleSaveJournal} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1">Category</label>
                    <input
                      type="text"
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Read Time</label>
                    <input
                      type="text"
                      value={editingItem.readTime}
                      onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Short Excerpt *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingItem.excerpt}
                    onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Full Article Content *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingItem.content}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5DCD0] rounded-lg text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 rounded-full border border-[#D9CFBF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#1F1D1B] text-white"
                  >
                    Save Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
