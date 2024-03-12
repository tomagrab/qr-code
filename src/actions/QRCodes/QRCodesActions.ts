'use server';

import {
  createQRCode,
  readQRCodeByURL,
  updateQRCode,
  deleteQRCode,
  archiveQRCode,
  toggleArchiveQRCode,
} from '@/db/prisma';
import { GetYouTubeVideoDetails } from '@/lib/Utilities/GetYouTubeVideoDetails/GetYouTubeVideoDetails';
import { GetYouTubeVideoID } from '@/lib/Utilities/GetYouTubeVideoID/GetYouTubeVideoID';
import { QRCodeFormSchema } from '@/lib/schemas/QRCodeFormSchema/QRCodeFormSchema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const CreateQRCode = async (
  values: z.infer<typeof QRCodeFormSchema>,
) => {
  let existingQRCode;

  // Check if the QR code YouTube URL already exists
  if (values.youtube_url) {
    existingQRCode = await readQRCodeByURL('youtube_url', values.youtube_url);
    if (existingQRCode) {
      return {
        existingQRCode,
        message: `This YouTube URL is already in use by QR Code # ${existingQRCode.id}`,
      };
    }
  }

  // Check if the QR code PDF URL already exists
  if (values.pdf_url) {
    existingQRCode = await readQRCodeByURL('pdf_url', values.pdf_url);
    if (existingQRCode) {
      return {
        existingQRCode,
        message: `This PDF URL is already in use by QR Code # ${existingQRCode.id}`,
      };
    }
  }

  let youtube_title: string | null = 'No title found';

  // Try to get the YouTube video details if the YouTube URL exists
  if (values.youtube_url) {
    const youtubeVideoID = GetYouTubeVideoID(values.youtube_url);
    if (youtubeVideoID) {
      const youtubeVideoDetails = await GetYouTubeVideoDetails(youtubeVideoID);
      if (youtubeVideoDetails) {
        youtube_title = youtubeVideoDetails.items[0].snippet.title;
      }
    }
  }

  // Proceed to create a new QR Code if neither URL exists already
  const newQRCode = await createQRCode(values, youtube_title);
  if (!newQRCode) {
    throw new Error('Failed to create QR code');
  }

  revalidatePath('/');

  // Return the newly created QR Code
  return {
    newQRCode,
    message: 'QR Code successfully created.',
  };
};

export const UpdateQRCode = async (
  id: number,
  values: z.infer<typeof QRCodeFormSchema>,
) => {
  let existingQRCode;

  // Check if the QR code YouTube URL already exists
  if (values.youtube_url) {
    existingQRCode = await readQRCodeByURL('youtube_url', values.youtube_url);
    if (existingQRCode && existingQRCode.id !== id) {
      return {
        existingQRCode,
        message: `This YouTube URL is already in use by QR Code # ${existingQRCode.id}`,
      };
    }
  }

  // Check if the QR code PDF URL already exists
  if (values.pdf_url) {
    existingQRCode = await readQRCodeByURL('pdf_url', values.pdf_url);
    if (existingQRCode && existingQRCode.id !== id) {
      return {
        existingQRCode,
        message: `This PDF URL is already in use by QR Code # ${existingQRCode.id}`,
      };
    }
  }

  let youtube_title: string | null = 'No title found';

  // Try to get the YouTube video details if the YouTube URL exists
  if (values.youtube_url) {
    const youtubeVideoID = GetYouTubeVideoID(values.youtube_url);
    if (youtubeVideoID) {
      const youtubeVideoDetails = await GetYouTubeVideoDetails(youtubeVideoID);
      if (youtubeVideoDetails) {
        youtube_title = youtubeVideoDetails.items[0].snippet.title;
      }
    }
  }

  // Proceed to update the QR Code if neither URL exists already
  const updatedQRCode = await updateQRCode(id, youtube_title, values);
  if (!updatedQRCode) {
    throw new Error('Failed to update QR code');
  }

  revalidatePath('/');

  // Return the updated QR Code
  return {
    updatedQRCode,
    message: 'QR Code successfully updated.',
  };
};

export const DeleteQRCode = async (id: number) => {
  console.log('DeleteQRCode', id);
  const deletedQRCode = await deleteQRCode(id);
  if (!deletedQRCode) {
    throw new Error('Failed to delete QR code');
  }

  revalidatePath('/');

  return {
    deletedQRCode,
    message: 'QR Code successfully deleted.',
  };
};

export const ArchiveQRCode = async (id: number) => {
  const archivedQRCode = await archiveQRCode(id);
  if (!archivedQRCode) {
    throw new Error('Failed to archive QR code');
  }

  revalidatePath('/');

  return {
    archivedQRCode,
    message: 'QR Code successfully archived.',
  };
};

export const ToggleArchiveQRCode = async (id: number) => {
  const toggled_qr_code = await toggleArchiveQRCode(id);
  if (!toggled_qr_code) {
    throw new Error('Failed to toggle archive QR code');
  }

  revalidatePath('/');
  return {
    toggled_qr_code,
    message: 'QR Code successfully toggled.',
  };
};
