import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [souls, staff, gallery, owner] = await Promise.all([
      prisma.soul.findMany({ orderBy: { order: 'asc' }, select: { id: true, name: true, user: true, avatar: true, description: true, role: true, tone: true } }),
      prisma.staff.findMany({ orderBy: { order: 'asc' }, select: { id: true, name: true, user: true, avatar: true, description: true, role: true, tone: true } }),
      prisma.galleryItem.findMany({ orderBy: { order: 'asc' }, select: { id: true, title: true, imageUrl: true, tag: true } }),
      prisma.ownerProfile.findUnique({ where: { id: 'owner_singleton' }, select: { id: true, image: true, imageAlt: true, name: true, role: true, description: true, specialThanks: true } }),
    ]);

    const specialThanks = owner?.specialThanks as any || {};

    return Response.json({
      souls,
      staff,
      gallery,
      owner: owner ? {
        id: owner.id,
        image: owner.image,
        imageAlt: owner.imageAlt,
        name: owner.name,
        role: owner.role,
        description: owner.description,
        specialThanksImage: specialThanks.image,
        specialThanksName: specialThanks.name,
      } : null,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}