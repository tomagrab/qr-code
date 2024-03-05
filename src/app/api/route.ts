import { redirect } from "next/navigation";

export async function GET() {
  const youtubeVideoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with actual YouTube video URL
  redirect(youtubeVideoUrl);
}
