'use client';

import { GetYouTubeVideoDetails } from '@/lib/Utilities/GetYouTubeVideoDetails/GetYouTubeVideoDetails';
import { GetYouTubeVideoID } from '@/lib/Utilities/GetYouTubeVideoID/GetYouTubeVideoID';
import { useEffect, useState } from 'react';

type VideoTitleProps = {
  videoUrl: string;
};

export default function VideoTitle({ videoUrl }: VideoTitleProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const videoID = GetYouTubeVideoID(videoUrl);
      if (!videoID) return;

      // Ensure the API key is correctly defined and accessible here
      const videoDetails = await GetYouTubeVideoDetails(videoID);
      if (videoDetails) {
        setTitle(videoDetails.items[0].snippet.title);
        // Assuming convertToEmbedURL generates a valid embed URL from the video ID
      }
    };

    fetchVideoDetails();
  }, [videoUrl]);

  return title;
}
