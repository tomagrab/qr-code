export type YouTubeVideoDetails = {
  kind: string;
  etag: string;
  items: YouTubeVideoDetailsItem[];
};

export type YouTubeVideoDetailsItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubeVideoDetailsSnippet;
};

export type YouTubeVideoDetailsSnippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
    standard: {
      url: string;
      width: number;
      height: number;
    };
    maxres: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
};
