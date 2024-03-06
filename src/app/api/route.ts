import { getCurrentQRCodeURL } from '@/data/drizzle';
import { redirect } from 'next/navigation';

export async function GET() {
  console.log('GET /api/route.ts');
  const youtubeVideoUrl: string | null = await getCurrentQRCodeURL();

  console.log('youtubeVideoUrl', youtubeVideoUrl);
  if (youtubeVideoUrl === null) {
    return redirect('/');
  }

  redirect(youtubeVideoUrl);
}
