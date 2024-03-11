'use client';
import { convertToEmbedURL } from '@/lib/Utilities/ConvertToEmbedURL/ConvertToEmbedURL';

type EmbeddedYouTubeVideoProps = {
  videoUrl: string;
};

export default function EmbeddedYouTubeVideo({
  videoUrl,
}: EmbeddedYouTubeVideoProps) {
  const embedUrl = convertToEmbedURL(videoUrl);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-lg bg-gray-900 shadow-md">
        <iframe
          className="h-56 w-full rounded-lg border border-gray-900 md:h-[13.5rem] md:w-96"
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
