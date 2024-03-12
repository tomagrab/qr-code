import { readQRCode } from '@/db/prisma';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Get the ID from the URL
  const lastCharacterOfURL = request.url[request.url.length - 1];

  // Get the QR Code from the database
  const qrCode = await readQRCode(Number(lastCharacterOfURL));

  if (!qrCode || !qrCode.youtube_url) {
    // If the QR Code does not exist, redirect to the home page
    return redirect('https://www.youtube.com/watch?v=vh1I97pXuRw');
  }

  // Redirect to the YouTube URL
  return redirect(qrCode.youtube_url);
}
