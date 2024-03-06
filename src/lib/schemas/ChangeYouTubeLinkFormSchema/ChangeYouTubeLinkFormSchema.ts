import { z } from "zod";

export const ChangeYouTubeLinkFormSchema = z.object({
  qrCodeURL: z.string().url(),
});
