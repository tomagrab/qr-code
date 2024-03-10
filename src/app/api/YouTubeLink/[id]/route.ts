import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const lastCharacterOfURL = request.url[request.url.length - 1];
  console.log('request', lastCharacterOfURL);
  return redirect('https://www.youtube.com/watch?v=8');
}
