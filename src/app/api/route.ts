import { getCurrentQRCodeURL } from "@/data/drizzle";
import { redirect } from "next/navigation";

export async function GET() {
  let youtubeVideoUrl = await getCurrentQRCodeURL();

  if (!youtubeVideoUrl) {
    youtubeVideoUrl = "https://www.youtube.com/watch?v=Fyvit9gG8Yo";
  }

  redirect(youtubeVideoUrl);
}
