import { z } from 'zod';

const youtubeUrlRegex =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

export const ChangeYouTubeLinkFormSchema = z.object({
  qrCodeURL: z.string().url().regex(youtubeUrlRegex, 'Must be a YouTube URL'),
});
