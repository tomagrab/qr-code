import QRCodesDisplay from '@/components/QRCodes/QRCodesDisplay/QRCodesDisplay';
import { currentUser } from '@clerk/nextjs/server';
import { readQRCodes } from '@/db/prisma';
import { qr_code } from '@prisma/client';

export default async function Home() {
  const user = await currentUser();
  const qr_codes: qr_code[] | null = await readQRCodes();

  return (
    <main
      className={`
        flex
        flex-col
      `}
    >
      <QRCodesDisplay qr_codes={qr_codes} />
    </main>
  );
}
