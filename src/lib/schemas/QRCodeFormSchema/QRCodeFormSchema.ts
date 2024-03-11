import { z } from 'zod';

export const QRCodeFormSchema = z.object({
  // Field for optional YouTube URL. Ensures it's a string and a valid URL if provided.
  youtube_url: z.string().url().optional(),

  // Field for optional PDF URL. Ensures it's a string and a valid URL if provided.
  pdf_url: z.string().url().optional(),

  // Field for optional author name. It ensures the author is a string if provided.
  author: z.string().optional(),
});
