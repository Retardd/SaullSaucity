import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // On Vercel filesystem is read-only except /tmp -> use base64 data URL for production
    // This persists in DB and works without external storage ( Supabase Storage / Vercel Blob can be added later )
    const isVercel = !!process.env.VERCEL;
    if (isVercel) {
      const mime = file.type || 'image/png';
      // limit 4.5MB (Vercel payload limit) - reject huge files
      if (buffer.length > 4.5 * 1024 * 1024) {
        return Response.json({ error: 'File too large (max 4.5MB on Vercel)' }, { status: 413 });
      }
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${mime};base64,${base64}`;
      return Response.json({ url: dataUrl });
    }

    // Local dev: save to public/uploads
    const ext = file.name.split('.').pop() || 'png';
    const filename = `${uuidv4()}.${ext}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;

    return Response.json({ url });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}