import { getCurrentQRCodeURL } from '@/data/drizzle';
import { redirect } from 'next/navigation';
import { QRCodeURL } from '../../../db/schema';

export async function GET() {
  const youtubeVideoUrl: QRCodeURL | string =
    (await getCurrentQRCodeURL()) ||
    'https://www.youtube.com/watch?v=Fyvit9gG8Yo';

  console.log(youtubeVideoUrl);

  redirect(youtubeVideoUrl);
}
