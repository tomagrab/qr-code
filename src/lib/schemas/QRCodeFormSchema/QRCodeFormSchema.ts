import { z } from 'zod';

export const QRCodeFormSchema = z.object({
  // Field for optional YouTube URL
  youtube_url: z.string().url().optional(),

  // Field for optional PDF file
  pdf_url: z.any().optional(),
});
