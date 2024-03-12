import { z } from 'zod';

export const QRCodeFormSchema = z.object({
  // Field for the title of the QR code. Ensures it's a string and at least 3 characters long.
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(256, { message: 'Title must be at most 256 characters long' }),

  // Field for optional description. Ensures it's a string if provided.
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters long',
    })
    .max(1000, {
      message: 'Description must be at most 1000 characters long',
    })
    .optional(),

  active: z
    .union([z.literal('true'), z.literal('false'), z.boolean()])
    .transform(value => value === 'true' || value === true),

  // Field for archived status. Ensures it's a boolean.
  archived: z
    .union([z.literal('true'), z.literal('false'), z.boolean()])
    .transform(value => value === 'true' || value === true),

  // Field for optional YouTube URL. Ensures it's a string and a valid URL if provided.
  youtube_url: z.string().url().optional(),

  // Field for optional PDF URL. Ensures it's a string and a valid URL if provided.
  pdf_url: z.string().url().optional(),
});
