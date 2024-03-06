/**
 * Extracts the YouTube video ID from a given URL.
 * This function supports various YouTube URL formats including:
 * - Standard watch URLs
 * - Shortened URLs
 * - Embed URLs
 *
 * @param url The YouTube URL from which to extract the video ID.
 * @returns The extracted YouTube video ID, or null if the URL is invalid.
 */
export const GetYouTubeVideoID = (url: string): string | null => {
  // This regex covers several YouTube URL formats including:
  // - Standard watch URLs
  // - Shortened URLs
  // - Embed URLs
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[2] : null;
};
