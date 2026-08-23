import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ error: 'Use POST' }, { status: 405 });
}

export async function POST(req: Request) {
  try {
    // simple protection: require url ?key=... matching NEXTAUTH_SECRET or query param seed_key
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    const expected = process.env.NEXTAUTH_SECRET || 'zanpakuto-secret';
    // allow if key matches or if running locally
    if (key !== expected) {
      return Response.json({ error: 'Unauthorized: invalid key. Use ?key=NEXTAUTH_SECRET' }, { status: 401 });
    }

    console.log('Seeding production DB...');

    await prisma.ticket.deleteMany();
    await prisma.galleryItem.deleteMany();
    await prisma.faq.deleteMany();
    await prisma.rule.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.soul.deleteMany();
    await prisma.statCache.deleteMany();

    const souls = [
      { name: 'Abhinav', user: '@Abhi_nav148', description: 'Former 10th Seat of Division 12; genius intellect who prefers to let his experiments speak for him.', role: 'Special Souls', tone: 'from-violet-300 to-fuchsia-700', avatar: '/Pics/abhinav.jpg', order: 0 },
      { name: 'Alone Boy', user: '@js_alone07', description: 'A lone wanderer who walks the border between World of the Living and Hueco Mundo, searching for a place to belong.', role: 'Special Souls', tone: 'from-slate-200 to-violet-700', avatar: '/Pics/aloneboy.jpg', order: 1 },
      { name: 'Speedy', user: '@anshhh0069', description: 'Fifth Seat of Division 2; flash-step prodigy whose movements are faster than the eye can track, rivaling even the highest-ranking captains.', role: 'Special Souls', tone: 'from-pink-200 to-purple-800', avatar: '/Pics/Speedy.jpg', order: 2 },
      { name: 'Redox', user: '@ur._.redox', description: 'Vizard who hybridized with Hollow mask; his reiatsu fluctuates between razor-sharp precision and uncontrolled frenzy.', role: 'Special Souls', tone: 'from-purple-200 to-violet-800', avatar: '/Pics/redox.jpg', order: 3 },
      { name: 'Moon', user: '@uskimau', description: 'Elite Arrancar who abandoned her fracción to seek redemption; herReleased form mirrors the crescent moon that guides lost souls.', role: 'Special Souls', tone: 'from-zinc-200 to-purple-800', avatar: '/Pics/moon.jpg', order: 4 },
      { name: 'Kartik', user: '@Kartik207', description: 'Vice-Captain of Division 8; master of bakudo who can bind even the most powerful Hollows without incantation.', role: 'Special Souls', tone: 'from-violet-200 to-fuchsia-900', avatar: '/Pics/kartik.jpg', order: 5 },
      { name: 'Jahil doshi', user: '@Jainil_doshi', description: "Former Tercera Espada who severed ties with his fracción to protect the innocent; now fights for soul society's cause.", role: 'Special Souls', tone: 'from-indigo-200 to-violet-800', avatar: '/Pics/jahildoshi.jpg', order: 6 },
      { name: 'Srikar', user: '@srikar_293199', description: 'Seat of Division 4; master of hado whose destructive spells can level structures without endangering allies.', role: 'Special Souls', tone: 'from-rose-200 to-fuchsia-800', avatar: '/Pics/srikar.jpg', order: 7 },
      { name: 'Jay', user: '@ur._.zexo', description: ' seated officer of Division 6; kidou specialist who can bend spells to his will, though he prefers to resolve conflicts with words.', role: 'Special Souls', tone: 'from-slate-100 to-indigo-800', avatar: '/Pics/Jay.jpg', order: 8 },
    ];
    for (const s of souls) await prisma.soul.create({ data: s });

    const staff = [
      { name: 'K3', user: '@krishdesh.k3', description: 'Ichigo of our community', role: 'Owner', tone: 'from-violet-300 to-fuchsia-700', avatar: '/Pics/k3.jpg', order: 0 },
      { name: 'Luffy', user: '@l_l_anup__007', description: 'Yoruichi of our community', role: 'Shadow Owner', tone: 'from-slate-200 to-violet-700', avatar: '/Pics/luffy.jpg', order: 1 },
      { name: 'Sevann', user: '@Kaiiner.fr', description: 'Rukia lover', role: 'Shadow Founder', tone: 'from-pink-200 to-purple-800', avatar: '/Pics/Sevann.jpg', order: 2 },
      { name: 'Chachaa', user: '@devcreative01', description: 'Yhwach of our community', role: 'Sr. Admin', tone: 'from-purple-200 to-violet-800', avatar: '/Pics/chachaa.jpg', order: 3 },
      { name: 'Prime', user: '@realprim3_', description: 'Shunsui of our community', role: 'Admin', tone: 'from-zinc-200 to-purple-800', avatar: '/Pics/Prime.jpg', order: 4 },
      { name: 'Law', user: '@*veryweird', description: 'Kenpachi of our community', role: 'Moderator', tone: 'from-violet-200 to-fuchsia-900', avatar: '/Pics/Law.jpg', order: 5 },
    ];
    for (const m of staff) await prisma.staff.create({ data: m });

    const rules = [
      { title: '🤝・1. Respect Everyone', text: 'Treat everyone with kindness and respect. Harassment, hate speech, discrimination, or personal attacks are not tolerated.', order: 0 },
      { title: '💬・2. Keep It Friendly', text: "Friendly banter is encouraged, but don't take it too far. Know your limits and respect others.", order: 1 },
      { title: '🚫・3. No Spam', text: "Don't spam messages, emojis, GIFs, mentions, or voice channels.", order: 2 },
      { title: '🗂️・4. Use the Correct Channels', text: 'Keep conversations in the appropriate channels to help keep the server organized.', order: 3 },
      { title: '🔞・5. Keep It Safe', text: 'No NSFW, gore, or other inappropriate content. Keep the server comfortable for everyone.', order: 4 },
      { title: '📢・6. No Advertising', text: "Don't promote other Discord servers, social media, or businesses without staff approval.", order: 5 },
      { title: '🛡️・7. No Scams or Malicious Content', text: 'No phishing, scams, malicious links, or anything that could harm other members.', order: 6 },
      { title: '🎙️・8. Voice Chat Etiquette', text: 'Avoid screaming, mic spamming, soundboards, loud music, or intentionally disturbing others.', order: 7 },
      { title: '📖・9. Follow Discord ToS', text: "All members must follow Discord's Terms of Service and Community Guidelines.", order: 8 },
      { title: '👮・10. Respect the Staff', text: 'Please listen to moderators and admins. If you have concerns, discuss them respectfully in DMs or through a support ticket.', order: 9 },
    ];
    for (const r of rules) await prisma.rule.create({ data: r });

    const faqs = [
      { question: 'Who is this community for?', answer: 'For people who want a thoughtful, welcoming Discord space with an appreciation for anime, art, and genuine conversation.', order: 0 },
      { question: 'How do I join?', answer: 'Use the invitation on the Join Us page, read the rules, and introduce yourself when you arrive.', order: 1 },
      { question: 'Is the server active?', answer: 'Yes. Our placeholder live widget will be connected to Discord in a future integration phase.', order: 2 },
      { question: 'How can I contact staff?', answer: 'Open a support ticket and a member of the team will meet you there.', order: 3 },
    ];
    for (const f of faqs) await prisma.faq.create({ data: f });

    const gallery = Array.from({ length: 8 }, (_, i) => ({
      title: `Archive · ${String(i + 1).padStart(2, '0')}`,
      imageUrl: `/Pics/LOGO.jpg`,
      tag: `Archive ${i + 1}`,
      order: i,
    }));
    for (const g of gallery) await prisma.galleryItem.create({ data: g });

    await prisma.ownerProfile.upsert({
      where: { id: 'owner_singleton' },
      update: {},
      create: {
        id: 'owner_singleton',
        heroEyebrow: '',
        heroTitle: 'The Espada',
        heroSubtitle: 'The only Espada of our soul society',
        image: '/Pics/Sevann.jpg',
        imageAlt: 'Sevaan',
        name: 'Sevaan',
        role: 'Creator of this Community',
        eyebrow: 'About the creator',
        title: 'Hounered One',
        description: `I'm Sevaan. Built this place from scratch — code, design, the whole thing. Video editing on the side. Not much else to say.`,
        tags: ['Developer', 'Video Editor', 'Creator'],
        footer: 'See ya somewhere else ',
        footerCode: 'Kaiiner.fr',
        socials: {
          discord: 'https://discord.com/users/1332000313887952947',
          instagram: 'https://www.instagram.com/kaiiner.fr',
          instagram2: 'https://www.instagram.com/kawakiwoamekuh',
        },
        socialEyebrow: '✮⋆˙',
        socialTitle: 'Socials',
        socialSubtitle: 'My personal socials — not the society',
        specialThanks: {
          cardTitle: 'Special Thanks',
          name: 'Chachaa',
          image: '/Pics/chachaa.jpg',
          role: 'Special grade Developer',
          highlights: ['Ethical Hacker', 'Plugin Developer', 'Web Developer'],
        },
      },
    });

    await prisma.statCache.upsert({
      where: { id: 'stats_singleton' },
      update: {},
      create: { id: 'stats_singleton', online: 1284, totalMembers: 8621 },
    });

    const counts = {
      souls: await prisma.soul.count(),
      staff: await prisma.staff.count(),
      gallery: await prisma.galleryItem.count(),
      owner: await prisma.ownerProfile.count(),
    };

    return Response.json({ success: true, message: 'Seeded production DB', counts });
  } catch (e: any) {
    console.error(e);
    return Response.json({ error: e.message || 'Seed failed' }, { status: 500 });
  }
}
