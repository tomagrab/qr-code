/**
 * Converts a YouTube video URL to an embed URL.
 * If the input URL matches the expected YouTube video URL pattern, it returns the embed URL.
 * Otherwise, it returns the original URL.
 * @param url - The YouTube video URL to convert.
 * @returns The embed URL if the input URL matches the expected pattern, otherwise the original URL.
 */
export const convertToEmbedURL = (url: string): string => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  } else {
    // Return the original URL if it doesn't match the expected YouTube video URL pattern
    return url;
  }
};
