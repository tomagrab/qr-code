import { qrCode } from '@/db/schema';

export type QRCode = typeof qrCode.$inferSelect;
export type QRCodes = Array<QRCode>;
export type NewQRCode = typeof qrCode.$inferInsert;
export type QRCodeURL = Pick<QRCode, 'url'>;
export type QRCodeURLs = Array<QRCodeURL>;
