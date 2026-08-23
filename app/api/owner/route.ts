import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const owner = await prisma.ownerProfile.findUnique({ where: { id: 'owner_singleton' } });
    if (!owner) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(owner);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updated = await prisma.ownerProfile.upsert({
      where: { id: 'owner_singleton' },
      update: {
        heroEyebrow: body.heroEyebrow,
        heroTitle: body.heroTitle,
        heroSubtitle: body.heroSubtitle,
        image: body.image,
        imageAlt: body.imageAlt,
        name: body.name,
        role: body.role,
        eyebrow: body.eyebrow,
        title: body.title,
        description: body.description,
        tags: body.tags,
        footer: body.footer,
        footerCode: body.footerCode,
        socials: body.socials,
        socialEyebrow: body.socialEyebrow,
        socialTitle: body.socialTitle,
        socialSubtitle: body.socialSubtitle,
        specialThanks: body.specialThanks,
      },
      create: {
        id: 'owner_singleton',
        heroEyebrow: body.heroEyebrow ?? '',
        heroTitle: body.heroTitle ?? 'The Espada',
        heroSubtitle: body.heroSubtitle ?? '',
        image: body.image ?? '/Pics/Sevann.jpg',
        imageAlt: body.imageAlt ?? 'Sevaan',
        name: body.name ?? 'Sevaan',
        role: body.role ?? 'Creator',
        eyebrow: body.eyebrow ?? '',
        title: body.title ?? '',
        description: body.description ?? '',
        tags: body.tags ?? [],
        footer: body.footer ?? '',
        footerCode: body.footerCode ?? '',
        socials: body.socials ?? {},
        socialEyebrow: body.socialEyebrow ?? '',
        socialTitle: body.socialTitle ?? '',
        socialSubtitle: body.socialSubtitle ?? '',
        specialThanks: body.specialThanks ?? {},
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
