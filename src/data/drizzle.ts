import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import {
  NewQRCode,
  QRCode,
  QRCodeURL,
  QRCodeURLs,
  QRCodes,
  qrCode,
} from '../../db/schema';
import { desc, eq } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export const createQRCode = async (url: string): Promise<QRCodeURL | null> => {
  try {
    const newQRCode: QRCode[] = await db
      .insert(qrCode)
      .values({ url })
      .returning();

    return newQRCode[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getQRCodes = async () => {
  try {
    const currentQRCodes: QRCodes = await db
      .select()
      .from(qrCode)
      .orderBy(desc(qrCode.createdAt));
    return currentQRCodes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMostRecentQRCode = async () => {
  try {
    const currentQRCodes: QRCodes | null = await getQRCodes();

    if (!currentQRCodes) {
      return null;
    }

    const mostRecentQRCode = currentQRCodes[0];
    return mostRecentQRCode;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrentQRCodeURL = async () => {
  try {
    const currentQRCodes: QRCodes | null = await getQRCodes();

    if (!currentQRCodes) {
      return null;
    }

    const currentQRCodeURL = currentQRCodes[0].url;
    return currentQRCodeURL;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateQRCode = async (id: number, url: string) => {
  try {
    const updatedQRCode = await db
      .update(qrCode)
      .set({ url: url })
      .where(eq(qrCode.id, id));

    return updatedQRCode;
  } catch (error) {
    console.error(error);
    return null;
  }
};
