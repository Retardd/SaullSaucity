import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET() {
  const data = await prisma.galleryItem.findMany({ orderBy: { order: 'asc' } });
  return Response.json(data, { headers: { 'Cache-Control': 'no-store, must-revalidate' } });
}