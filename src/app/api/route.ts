import { getCurrentQRCodeURL } from '@/data/drizzle';
import { redirect } from 'next/navigation';
import { QRCodeURL } from '../../../db/schema';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const youtubeVideoUrl: string | null = await getCurrentQRCodeURL();

  if (youtubeVideoUrl === null) {
    return redirect('/');
  }

  redirect(youtubeVideoUrl);
}
