// ============================================
// OWNER PAGE TEMPLATE - EDIT THIS FILE EASILY
// ============================================
// Just replace the values below. All text on /Owner comes from here.
// Image path is relative to /public folder. e.g. "/Pics/Sevann.jpg"

export const ownerConfig = {
  // --- Hero (top) ---
  heroEyebrow: '',
  heroTitle: 'The Espada',
  heroSubtitle: 'The only Espada of our soul society',

  // --- Card Image ---
  image: '/Pics/Sevann.jpg', // <-- replace image path here
  imageAlt: 'Sevaan', // alt text for SEO

  // --- Card Header (on image) ---
  name: 'Sevaan', // <-- your name
  role: 'Creator of this Community', // <-- small text under name

  // --- Card Body ---
  eyebrow: 'About the creator',
  title: 'Hounered One', // <-- big title inside card
  // Use \n for line breaks or keep as single paragraph
  description: `I'm Sevaan. Built this place from scratch — code, design, the whole thing. Video editing on the side. Not much else to say.`,

  // --- Tags (little pills) - add/remove as needed ---
  tags: ['Developer', 'Video Editor', 'Creator'] as string[],

  // --- Footer note ---
  footer: 'See ya somewhere else ',
  footerCode: 'Kaiiner.fr',

  // --- Social Links (second card) - glass buttons ---
  socials: {
    discord: 'https://discord.com/users/1332000313887952947',
    instagram: 'https://www.instagram.com/kaiiner.fr',
    instagram2: 'https://www.instagram.com/kawakiwoamekuh',
  },
  socialEyebrow: '✮⋆˙',
  socialTitle: 'Socials',
  socialSubtitle: 'My personal socials — not the society',

  // --- Special Thanks Card (middle card) ---
  specialThanks: {
    cardTitle: 'Special Thanks',
    name: 'Chachaa',
    image: '/Pics/chachaa.jpg',
    role: 'Special grade Developer',
    description: 'Ethical hacker and minecraft plugin developer', // kept for reference
    highlights: ['Ethical Hacker', 'Plugin Developer', 'Web Developer'] as string[], // <-- highlighted pills like other card
  },
} as const;

// Type for template - you don't need to edit this
export type OwnerConfig = typeof ownerConfig;
