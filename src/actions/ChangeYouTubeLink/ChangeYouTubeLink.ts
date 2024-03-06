"use server";

import { createQRCode } from "@/data/drizzle";
import { z } from "zod";
import { ChangeYouTubeLinkFormSchema } from "@/lib/schemas/ChangeYouTubeLinkFormSchema/ChangeYouTubeLinkFormSchema";
import { revalidatePath } from "next/cache";

export async function ChangeYouTubeLink(
  values: z.infer<typeof ChangeYouTubeLinkFormSchema>
): Promise<void> {
  {
    const newQRCode = await createQRCode(values.qrCodeURL);

    if (!newQRCode) {
      throw new Error("Error creating QR code");
    }

    revalidatePath("/");
  }
}
