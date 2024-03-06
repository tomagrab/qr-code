import { redirect } from "next/navigation";

export async function GET() {
  const youtubeVideoUrl = "https://www.youtube.com/watch?v=3G_uCbKoG5A"; // Replace with actual YouTube video URL
  redirect(youtubeVideoUrl);
}
