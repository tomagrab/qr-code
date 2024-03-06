'use server';

import {
  createQRCode,
  getMostRecentQRCode,
  updateQRCode,
} from '@/data/drizzle';
import { z } from 'zod';
import { ChangeYouTubeLinkFormSchema } from '@/lib/schemas/ChangeYouTubeLinkFormSchema/ChangeYouTubeLinkFormSchema';
import { revalidatePath } from 'next/cache';

export async function ChangeYouTubeLink(
  values: z.infer<typeof ChangeYouTubeLinkFormSchema>,
): Promise<void> {
  {
    const currentQRCode = await getMostRecentQRCode();

    if (currentQRCode === null) {
      const newQRCode = await createQRCode(values.qrCodeURL);
      if (!newQRCode) {
        throw new Error('Error creating QR code');
      }
    }

    if (currentQRCode) {
      const updatedQRCode = await updateQRCode(
        currentQRCode.id,
        values.qrCodeURL,
      );
      if (!updatedQRCode) {
        throw new Error('Error updating QR code');
      }

      revalidatePath('/');
      revalidatePath('/api');
    }
  }
}
