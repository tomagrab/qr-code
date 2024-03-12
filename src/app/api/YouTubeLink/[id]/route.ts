import { readQRCode } from '@/db/prisma';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

// This is a dynamic route
export const dynamic = 'force-dynamic';

type YouTubeLinkRouteParams = {
  request: NextRequest;
  response: NextResponse;
  params: {
    id: string;
  };
};

export async function GET({
  params,
  response,
  request,
}: YouTubeLinkRouteParams) {
  // Get the request ID
  const id = params.id;

  // Check if the ID is a number and if it is greater than 0
  if (isNaN(Number(id)) || Number(id) <= 0) {
    // If the ID is not a number or is less than or equal to 0, redirect to the home page
    return redirect('/');
  }

  // Get the QR Code from the database
  const qrCode = await readQRCode(Number(id));

  // Check if the QR Code exists or if it has a YouTube URL
  if (!qrCode || !qrCode.youtube_url) {
    // If the QR Code does not exist or does not have a YouTube URL, redirect to the home page
    return redirect('/');
  }

  // If all checks pass, redirect to the YouTube URL
  return redirect(qrCode.youtube_url);
}
