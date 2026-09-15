import { ServiceItem, TestimonialItem, GalleryItem, JournalArticle, FAQItem, StudioSettings, Appointment } from '../src/types.js';

export const initialSettings: StudioSettings = {
  clinicName: "Dr. Sara Alhammadi Dental Studio",
  doctorName: "Dr. Sara Alhammadi",
  doctorTitle: "BDS, MSc Prosthodontics, Specialist Cosmetic Dentist",
  address: "Villa 410, Jumeirah Beach Road, Jumeirah 2",
  city: "Dubai",
  country: "United Arab Emirates",
  phone: "+971 4 345 8822",
  whatsapp: "+971 50 892 4100",
  email: "concierge@drsaraalhammadi.com",
  instagram: "@drsaraalhammadi",
  openingHours: "Mon – Sat: 9:00 AM – 7:00 PM | Sunday: By Private Appointment",
  googleMapsUrl: "https://maps.google.com/?q=Jumeirah+Beach+Road+Dubai+UAE"
};

export const initialServices: ServiceItem[] = [
  {
    id: "digital-smile-design",
    title: "Digital Smile Design",
    tagline: "Virtual 3D simulation before touching a single tooth",
    description: "Using cutting-edge facial biometric analysis, 3D scanning, and digital photographic planning to architect your bespoke smile proportioned in harmony with your facial contours.",
    category: "Cosmetic",
    duration: "60 - 90 mins",
    keyBenefits: ["3D Virtual preview of your new smile", "Facial symmetry & aesthetic mapping", "Try-in mock-up in your mouth"],
    icon: "Sparkles"
  },
  {
    id: "porcelain-veneers",
    title: "Porcelain Veneers",
    tagline: "Ultra-thin, master-crafted ceramic laminates",
    description: "Custom-layered feldspathic and E-max porcelain veneers that recreate the subtle depth, natural luminescence, and micro-texture of genuine tooth enamel.",
    category: "Cosmetic",
    duration: "2 - 3 visits",
    keyBenefits: ["Individual hand-layering by master ceramists", "Minimally invasive preservation", "Stain-resistant & natural luminescence"],
    icon: "Layers"
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    tagline: "Permanent, biomimetic tooth replacement",
    description: "Computer-guided implant surgery utilizing biocompatible grade-4 titanium or zirconia fixtures for natural chewing dynamics and bone preservation.",
    category: "Restorative",
    duration: "1 - 2 hours",
    keyBenefits: ["3D Cone Beam CT surgical guidance", "Bone tissue conservation", "Seamless gum contour emergence"],
    icon: "ShieldCheck"
  },
  {
    id: "full-mouth-rehabilitation",
    title: "Full Mouth Rehabilitation",
    tagline: "Holistic restoration of bite, aesthetics & health",
    description: "A comprehensive multidisciplinary approach correcting severe tooth wear, collapsed vertical dimensions, and joint dysfunction for lifelong comfort and refined elegance.",
    category: "Prosthodontics",
    duration: "Comprehensive protocol",
    keyBenefits: ["TMJ balance and jaw relief", "Harmonious facial proportion restoration", "Total oral rejuvenation"],
    icon: "Activity"
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    tagline: "Artful harmonization of your smile line",
    description: "Combining composite bonding, aesthetic gum contouring (gingivoplasty), and precision micro-abrasion to refine minor irregularities with graceful restraint.",
    category: "Cosmetic",
    duration: "1 - 2 hours",
    keyBenefits: ["Same-day artistic composite artistry", "Gingival frame rebalancing", "Zero downtime"],
    icon: "Wand2"
  },
  {
    id: "prosthodontics",
    title: "Prosthodontics",
    tagline: "Specialist reconstructive expertise",
    description: "Led by Dr. Sara's post-graduate prosthodontic specialty, designing custom ceramic inlays, onlays, and precision bridge architecture for complex restorative needs.",
    category: "Prosthodontics",
    duration: "2 - 3 visits",
    keyBenefits: ["Postgraduate specialist execution", "Biomechanically sound restorations", "Longevity-focused engineering"],
    icon: "Gem"
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    tagline: "In-studio laser & tailored home brightening",
    description: "Enamel-safe, sensitivity-controlled luxury bleaching utilizing cold-light activation to gently lift internal discoloration while protecting vital enamel structures.",
    category: "Cosmetic",
    duration: "60 mins",
    keyBenefits: ["Up to 8 shades of brighter natural tone", "Desensitizing peptide treatment", "Custom precision maintenance trays"],
    icon: "Sun"
  },
  {
    id: "smile-makeovers",
    title: "Smile Makeovers",
    tagline: "Curated multi-modality transformation",
    description: "A synchronized aesthetic journey orchestrating alignment, porcelain enhancements, and facial aesthetic symmetry tailored for distinguished Dubai clientele.",
    category: "Advanced",
    duration: "Customized timeline",
    keyBenefits: ["Complete personalized treatment roadmap", "Dedicated concierge scheduling", "Turnkey natural perfection"],
    icon: "Smile"
  }
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: "test-1",
    patientName: "Mariam A.",
    location: "Dubai Hills, UAE",
    treatment: "Digital Smile Design & 8 Porcelain Veneers",
    quote: "Dr. Sara is an artist before anything else. She listened attentively to my wish for teeth that didn't look artificially stark white. The translucency and natural contours she achieved gave me an understated elegance I receive compliments on constantly.",
    rating: 5,
    featured: true
  },
  {
    id: "test-2",
    patientName: "Tariq K.",
    location: "DIFC, Dubai",
    treatment: "Full Mouth Prosthodontic Rehabilitation",
    quote: "Having dealt with severe grinding and uneven wear for years, Dr. Sara's prosthodontic approach restored both my bite and facial youthfulness. The clinic feels more like a serene private sanctuary than any medical office.",
    rating: 5,
    featured: true
  },
  {
    id: "test-3",
    patientName: "Charlotte V.",
    location: "Palm Jumeirah",
    treatment: "Porcelain Veneers & Gum Contouring",
    quote: "The 3D smile test in my mouth allowed me to see and feel the final result before any preparation took place. There were zero surprises, just sublime craftsmanship and complete gentle comfort.",
    rating: 5,
    featured: true
  },
  {
    id: "test-4",
    patientName: "Noura S.",
    location: "Jumeirah 1, Dubai",
    treatment: "Minimal Prep Veneers",
    quote: "Her clinical eye for facial symmetry is second to none. She refused to do unnecessary filing and preserved almost all my natural enamel. The team's warmth and discretion are exemplary.",
    rating: 5,
    featured: false
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Natural Porcelain Veneer Artistry",
    category: "Veneers",
    imageUrl: "/src/assets/images/smile_natural_detail_1789472941289.jpg",
    description: "10 hand-layered feldspathic porcelain veneers harmonizing with warm undertones and natural incisal translucency.",
    shade: "Natural Bleach BL3 / A1 Gradient",
    teethCount: "10 Upper Veneers"
  },
  {
    id: "gal-2",
    title: "Digital Smile Design & Micro-Contouring",
    category: "Smile Design",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    description: "Facial-driven smile architecture designed to broaden the buccal corridors and balance gingival heights.",
    shade: "Enamel Luminance A1",
    teethCount: "Upper Arch Transformation"
  },
  {
    id: "gal-3",
    title: "Subtle Cosmetic Alignment & Bonding",
    category: "Cosmetic Dentistry",
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
    description: "Direct artistic resin layering closing diastema and leveling incisal edges without aggressive reduction.",
    shade: "Multi-layered Body + Translucent Enamel",
    teethCount: "Anterior 4 Teeth"
  },
  {
    id: "gal-4",
    title: "Graceful Natural Smile Rejuvenation",
    category: "Natural Smile",
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    description: "Conservative aesthetic touch-ups restoring youthfulness to worn tooth edges with warm natural harmony.",
    shade: "Shade B1 Natural Pearl",
    teethCount: "Full Smile Arch"
  },
  {
    id: "gal-5",
    title: "Bespoke Ceramic Smile Transformation",
    category: "Before & After",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    beforeImageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80",
    description: "Restoration of tetracycline-stained enamel with custom opaque dentin block-outs and natural surface micro-anatomy.",
    shade: "Natural Ivory Bright",
    teethCount: "10 Units"
  },
  {
    id: "gal-6",
    title: "Prosthodontic Bite Restoration",
    category: "Smile Design",
    imageUrl: "/src/assets/images/dr_sara_portrait_1789472919670.jpg",
    description: "Re-establishing lip support and vertical masticatory clearance with custom ceramic occlusal onlays.",
    shade: "Harmonized Enamel B1",
    teethCount: "Prosthodontic Case"
  }
];

export const initialJournal: JournalArticle[] = [
  {
    id: "jour-1",
    title: "How Digital Smile Design Changes Treatment Planning",
    slug: "how-digital-smile-design-changes-treatment-planning",
    category: "Digital Dentistry",
    excerpt: "Gone are the days of guessing your aesthetic outcome. Explore how 3D facial biometrics and digital simulation allow patients to test-drive their smile before treatment begins.",
    content: "Cosmetic dentistry has transitioned from an intuitive artisanal guess to an exacting science grounded in facial biomechanics. Digital Smile Design (DSD) is a revolutionary methodology that begins not with tooth molds, but with high-definition dynamic video analysis of the patient laughing, speaking, and expressing genuine emotion. By mapping the relationship between the interpupillary line, the lip dynamics, and the dental midline, Dr. Sara designs a restoration that naturally compliments the architecture of your unique face.",
    readTime: "4 min read",
    publishDate: "March 2026",
    imageUrl: "/src/assets/images/journal_editorial_1789472959890.jpg"
  },
  {
    id: "jour-2",
    title: "Veneers: What Makes a Smile Look Natural?",
    slug: "veneers-what-makes-a-smile-look-natural",
    category: "Cosmetic Dentistry",
    excerpt: "The secret to undetectable porcelain veneers lies in three subtle optical details: incisal translucency, surface micro-texture, and anatomical graduation.",
    content: "When people think of veneers, they often worry about the stark, monochromatic 'chiclet' look popularized in early Hollywood dentistry. Today's true cosmetic dentistry is an exercise in biological mimicry. Real teeth are never flat or uniformly white; they feature delicate mamelons, micro-lines that refract soft natural daylight, and graduated saturation where the neck of the tooth is slightly warmer than the cutting edge.",
    readTime: "5 min read",
    publishDate: "February 2026",
    imageUrl: "/src/assets/images/smile_natural_detail_1789472941289.jpg"
  },
  {
    id: "jour-3",
    title: "What to Know Before Your Smile Makeover",
    slug: "what-to-know-before-your-smile-makeover",
    category: "Patient Guidance",
    excerpt: "A comprehensive guide to preparing for cosmetic dental treatment in Dubai, from initial digital consultations to long-term maintenance protocols.",
    content: "Embarking on a smile makeover is a transformative personal decision. Before starting, it is paramount to understand the distinction between general restorative work and prosthodontic aesthetic planning. A successful journey starts with an in-depth conversation exploring your personal preferences, facial aesthetics, and functional lifestyle requirements.",
    readTime: "6 min read",
    publishDate: "January 2026",
    imageUrl: "/src/assets/images/studio_lounge_1789472978518.jpg"
  },
  {
    id: "jour-4",
    title: "The Art of Natural-Looking Dentistry",
    slug: "the-art-of-natural-looking-dentistry",
    category: "Editorial Philosophy",
    excerpt: "Why restraint, proportion, and harmony are the core principles guiding our cosmetic and prosthodontic studio in Jumeirah.",
    content: "In Dubai's vibrant luxury landscape, true sophistication is characterized by effortless, quiet refinement. In dental aesthetics, this principle means honoring what nature intended. Our studio philosophy centers on conservative preparation, safeguarding healthy tooth tissue, and selecting restorative ceramics that dance with the light just as pristine natural enamel does.",
    readTime: "4 min read",
    publishDate: "December 2025",
    imageUrl: "/src/assets/images/hero_dr_sara_studio_1789472901178.jpg"
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What happens during the first consultation?",
    answer: "Your initial appointment is a dedicated 60-minute private consultation with Dr. Sara Alhammadi. It begins with high-resolution digital clinical photography, 3D intraoral optical scanning, and an in-depth discussion about your aesthetic desires and dental history. You will discuss treatment possibilities without any pressure to commit.",
    category: "Consultation"
  },
  {
    id: "faq-2",
    question: "How does Digital Smile Design work?",
    answer: "We capture biometric digital measurements of your smile in motion. Using proprietary 3D smile design software, Dr. Sara blueprints your ideal tooth shapes, proportions, and positions. We can then 3D-print a physical mockup placed temporarily over your teeth, allowing you to view and feel your future smile in the mirror before any permanent treatment begins.",
    category: "Technology"
  },
  {
    id: "faq-3",
    question: "How long does treatment usually take?",
    answer: "For porcelain veneers or smile design cases, treatment typically requires 2 to 3 appointments spanning approximately 2 to 3 weeks. For our international and visiting patients, we offer expedited concierge scheduling completed within 7 to 10 days.",
    category: "Timeline"
  },
  {
    id: "faq-4",
    question: "Do you offer consultations for international patients?",
    answer: "Yes, a significant portion of our distinguished clientele travels to Dubai for dental artistry. We provide preliminary virtual video consultations, personalized treatment roadmaps, and dedicated concierge assistance coordinating dates and accommodations.",
    category: "Concierge"
  },
  {
    id: "faq-5",
    question: "Are porcelain veneers permanent and how long do they last?",
    answer: "Porcelain veneers bonded with modern adhesive technology and master-level ceramics routinely last 15 to 20+ years when cared for with standard good hygiene and regular professional check-ups.",
    category: "Treatments"
  },
  {
    id: "faq-6",
    question: "Will the procedures be uncomfortable or painful?",
    answer: "Patient comfort is our top priority. We utilize painless micro-anesthetic delivery, gentle touch techniques, and a tranquil spa-like studio environment with calming acoustics, warm blankets, and relaxation amenities to ensure an entirely pleasant experience.",
    category: "Comfort"
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: "apt-101",
    fullName: "Sheikha Hessa Al-Maktoum",
    email: "h.almaktoum@example.ae",
    phone: "+971 50 123 4567",
    service: "Digital Smile Design",
    preferredDate: "2026-09-24",
    preferredTime: "11:00 AM",
    message: "Looking for an initial smile assessment and 3D preview before my winter calendar.",
    status: "Confirmed",
    createdAt: "2026-09-14T09:30:00.000Z",
    notes: "VIP consultation requested. Prefers private suite."
  },
  {
    id: "apt-102",
    fullName: "Alexander Wright",
    email: "alex.wright@capital.ae",
    phone: "+971 52 987 6543",
    service: "Porcelain Veneers",
    preferredDate: "2026-09-26",
    preferredTime: "02:30 PM",
    message: "Seeking consultation for replacement of 6 older veneers with natural-looking modern laminates.",
    status: "New",
    createdAt: "2026-09-15T03:15:00.000Z"
  },
  {
    id: "apt-103",
    fullName: "Dr. Fatima Al-Zahra",
    email: "fatima.alzahra@hospital.ae",
    phone: "+971 55 456 7890",
    service: "Full Mouth Rehabilitation",
    preferredDate: "2026-09-28",
    preferredTime: "10:00 AM",
    message: "Consultation for nocturnal bruxism wear and bite rejuvenation.",
    status: "Contacted",
    createdAt: "2026-09-13T14:20:00.000Z",
    notes: "Spoke with concierge. Sent medical history form."
  }
];
