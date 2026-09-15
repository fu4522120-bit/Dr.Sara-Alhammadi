import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { dataStore } from './server/dataStore.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', studio: 'Dr. Sara Alhammadi Dental Studio' });
  });

  // Settings
  app.get('/api/settings', (_req: Request, res: Response) => {
    res.json(dataStore.getSettings());
  });

  app.put('/api/settings', (req: Request, res: Response) => {
    const updated = dataStore.updateSettings(req.body);
    res.json(updated);
  });

  // Services
  app.get('/api/services', (_req: Request, res: Response) => {
    res.json(dataStore.getServices());
  });

  app.post('/api/services', (req: Request, res: Response) => {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }
    const created = dataStore.createService(req.body);
    res.status(201).json(created);
  });

  app.put('/api/services/:id', (req: Request, res: Response) => {
    const updated = dataStore.updateService(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/services/:id', (req: Request, res: Response) => {
    const ok = dataStore.deleteService(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({ success: true });
  });

  // Testimonials
  app.get('/api/testimonials', (_req: Request, res: Response) => {
    res.json(dataStore.getTestimonials());
  });

  app.post('/api/testimonials', (req: Request, res: Response) => {
    const { patientName, quote, treatment } = req.body;
    if (!patientName || !quote || !treatment) {
      res.status(400).json({ error: 'Patient name, treatment, and review quote are required' });
      return;
    }
    const created = dataStore.createTestimonial(req.body);
    res.status(201).json(created);
  });

  app.put('/api/testimonials/:id', (req: Request, res: Response) => {
    const updated = dataStore.updateTestimonial(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/testimonials/:id', (req: Request, res: Response) => {
    const ok = dataStore.deleteTestimonial(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    res.json({ success: true });
  });

  // Gallery
  app.get('/api/gallery', (_req: Request, res: Response) => {
    res.json(dataStore.getGallery());
  });

  app.post('/api/gallery', (req: Request, res: Response) => {
    const { title, imageUrl, category } = req.body;
    if (!title || !imageUrl || !category) {
      res.status(400).json({ error: 'Title, image URL, and category are required' });
      return;
    }
    const created = dataStore.createGalleryItem(req.body);
    res.status(201).json(created);
  });

  app.put('/api/gallery/:id', (req: Request, res: Response) => {
    const updated = dataStore.updateGalleryItem(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Gallery item not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/gallery/:id', (req: Request, res: Response) => {
    const ok = dataStore.deleteGalleryItem(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Gallery item not found' });
      return;
    }
    res.json({ success: true });
  });

  // Journal
  app.get('/api/journal', (_req: Request, res: Response) => {
    res.json(dataStore.getJournal());
  });

  app.post('/api/journal', (req: Request, res: Response) => {
    const { title, content, excerpt, category } = req.body;
    if (!title || !content || !excerpt) {
      res.status(400).json({ error: 'Title, excerpt, and content are required' });
      return;
    }
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const created = dataStore.createJournalArticle({
      title,
      slug: req.body.slug || slug,
      category: category || 'Cosmetic Dentistry',
      excerpt,
      content,
      readTime: req.body.readTime || '4 min read',
      publishDate: req.body.publishDate || 'March 2026',
      imageUrl: req.body.imageUrl || '/src/assets/images/journal_editorial_1789472959890.jpg',
    });
    res.status(201).json(created);
  });

  app.put('/api/journal/:id', (req: Request, res: Response) => {
    const updated = dataStore.updateJournalArticle(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Journal post not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/journal/:id', (req: Request, res: Response) => {
    const ok = dataStore.deleteJournalArticle(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Journal post not found' });
      return;
    }
    res.json({ success: true });
  });

  // FAQs
  app.get('/api/faqs', (_req: Request, res: Response) => {
    res.json(dataStore.getFAQs());
  });

  app.post('/api/faqs', (req: Request, res: Response) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
      res.status(400).json({ error: 'Question and answer are required' });
      return;
    }
    const created = dataStore.createFAQ({
      question,
      answer,
      category: req.body.category || 'General',
    });
    res.status(201).json(created);
  });

  app.put('/api/faqs/:id', (req: Request, res: Response) => {
    const updated = dataStore.updateFAQ(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'FAQ item not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/faqs/:id', (req: Request, res: Response) => {
    const ok = dataStore.deleteFAQ(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }
    res.json({ success: true });
  });

  // Appointments (Booking requests)
  app.get('/api/appointments', (_req: Request, res: Response) => {
    res.json(dataStore.getAppointments());
  });

  app.post('/api/appointments', (req: Request, res: Response) => {
    const { fullName, email, phone, service, preferredDate, preferredTime, message } = req.body;

    // Backend validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({ error: 'Please enter your full name (at least 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      res.status(400).json({ error: 'Please provide a valid contact telephone or WhatsApp number.' });
      return;
    }

    if (!service) {
      res.status(400).json({ error: 'Please select a preferred treatment or consultation type.' });
      return;
    }

    if (!preferredDate) {
      res.status(400).json({ error: 'Please specify your preferred consultation date.' });
      return;
    }

    if (!preferredTime) {
      res.status(400).json({ error: 'Please specify your preferred time window.' });
      return;
    }

    const newApt = dataStore.createAppointment({
      fullName,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request received successfully. Our studio concierge will contact you within 24 hours.',
      appointment: newApt,
    });
  });

  app.patch('/api/appointments/:id/status', (req: Request, res: Response) => {
    const { status, notes } = req.body;
    const validStatuses = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ error: `Invalid status. Allowed values: ${validStatuses.join(', ')}` });
      return;
    }

    const updated = dataStore.updateAppointmentStatus(req.params.id, status, notes);
    if (!updated) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/appointments/:id', (req: Request, res: Response) => {
    const ok = dataStore.deleteAppointment(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }
    res.json({ success: true });
  });

  // Admin stats
  app.get('/api/admin/stats', (_req: Request, res: Response) => {
    res.json(dataStore.getStats());
  });

  // --- Vite Dev Middleware or Production Static Serving ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dr. Sara Alhammadi Dental Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
