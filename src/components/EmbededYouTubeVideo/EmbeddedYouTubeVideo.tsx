import { convertToEmbedURL } from '@/lib/Utilities/ConvertToEmbedURL/ConvertToEmbedURL';
import { GetYouTubeVideoDetails } from '@/lib/Utilities/GetYouTubeVideoDetails/GetYouTubeVideoDetails';
import { GetYouTubeVideoID } from '@/lib/Utilities/GetYouTubeVideoID/GetYouTubeVideoID';

type EmbeddedYouTubeVideoProps = {
  videoUrl: string;
};

export default async function EmbeddedYouTubeVideo({
  videoUrl,
}: EmbeddedYouTubeVideoProps) {
  if (!videoUrl) {
    return null;
  }

  const videoID = GetYouTubeVideoID(videoUrl);

  if (!videoID) {
    return null;
  }

  const videoDetails = await GetYouTubeVideoDetails(videoID);
  const embedUrl = convertToEmbedURL(videoUrl);

  return (
    <div
      className={`
          flex
          flex-col
          items-center
          gap-2
          `}
    >
      <h2
        className={`
          text-xl
          font-bold

            `}
      >
        {videoDetails?.items[0].snippet.title}
      </h2>
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
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
