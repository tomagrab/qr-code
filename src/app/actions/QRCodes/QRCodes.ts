'use server';

import { createQRCode, readQRCodeByURL, updateQRCode } from '@/db/prisma';
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

  // Proceed to create a new QR Code if neither URL exists already
  const newQRCode = await createQRCode(values);
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

  // Proceed to update the QR Code if neither URL exists already
  const updatedQRCode = await updateQRCode(id, values);
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
