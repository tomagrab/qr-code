import { redirect } from "next/navigation";

export async function GET() {
  const youtubeVideoUrl = "https://www.youtube.com/watch?v=Fyvit9gG8Yo"; // Replace with actual YouTube video URL
  redirect(youtubeVideoUrl);
}
