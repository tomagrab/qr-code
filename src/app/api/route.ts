import { getCurrentQRCodeURL } from '@/data/drizzle';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: Request) {
  console.log('GET /api/route.ts');
  const youtubeVideoUrl: string | null = await getCurrentQRCodeURL();

  console.log('youtubeVideoUrl', youtubeVideoUrl);
  if (youtubeVideoUrl === null) {
    return redirect('/');
  }

  redirect(youtubeVideoUrl);
}
