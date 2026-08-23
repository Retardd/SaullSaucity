import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, id, imageUrl } = body;

    if (!type || !id || !imageUrl) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let result;
    switch (type) {
      case 'soul':
        result = await prisma.soul.update({
          where: { id },
          data: { avatar: imageUrl },
          select: { id: true, name: true, avatar: true },
        });
        break;
      case 'staff':
        result = await prisma.staff.update({
          where: { id },
          data: { avatar: imageUrl },
          select: { id: true, name: true, avatar: true },
        });
        break;
      case 'gallery':
        result = await prisma.galleryItem.update({
          where: { id },
          data: { imageUrl },
          select: { id: true, title: true, imageUrl: true },
        });
        break;
      case 'owner':
        result = await prisma.ownerProfile.update({
          where: { id: 'owner_singleton' },
          data: { image: imageUrl },
          select: { id: true, image: true, imageAlt: true },
        });
        break;
      case 'ownerSpecialThanks':
        const owner = await prisma.ownerProfile.findUnique({ where: { id: 'owner_singleton' } });
        const specialThanks = (owner?.specialThanks as any) || {};
        specialThanks.image = imageUrl;
        result = await prisma.ownerProfile.update({
          where: { id: 'owner_singleton' },
          data: { specialThanks: specialThanks },
          select: { id: true, specialThanks: true },
        });
        break;
      default:
        return Response.json({ error: 'Invalid type' }, { status: 400 });
    }

    return Response.json({ success: true, data: result });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Failed to update' }, { status: 500 });
  }
}