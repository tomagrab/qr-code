import { YouTubeVideoDetails } from '@/lib/Types/YouTubeVideoTypes/YouTubeVideoTypes';

/**
 * Retrieves the title of a YouTube video based on its video ID.
 * @param videoId - The ID of the YouTube video.
 * @returns A Promise that resolves to the title of the YouTube video, or null if the video is not found or an error occurs.
 */
export const GetYouTubeVideoDetails = async (
  videoId: string,
): Promise<YouTubeVideoDetails | null> => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch YouTube video title', error);
    return null;
  }
};
