type EmbededYouTubeVideoProps = {
  videoUrl: string;
};

export const EmbededYouTubeVideo = ({ videoUrl }: EmbededYouTubeVideoProps) => {
  if (!videoUrl) {
    return null;
  }

  // Function to convert YouTube URL to YouTube Embed URL
  const convertToEmbedURL = (url: string): string => {
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

  const embedUrl = convertToEmbedURL(videoUrl);

  return (
    <div
      className={`
      rounded-lg
      bg-gray-900
      shadow-md
    `}
    >
      <iframe
        className={`
        h-56
        w-full
        rounded-lg
        border
        border-gray-900
        md:h-[13.5rem]
        md:w-96

      `}
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
