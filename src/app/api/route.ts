import { getCurrentQRCodeURL } from '@/data/drizzle';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: Request) {
  const youtubeVideoUrl: string | null = await getCurrentQRCodeURL();

  if (youtubeVideoUrl === null) {
    return redirect('/');
  }

  redirect(youtubeVideoUrl);
}
