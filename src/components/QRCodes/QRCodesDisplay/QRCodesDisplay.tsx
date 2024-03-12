import { qr_code_columns } from '@/components/QRCodes/QRCodesTable/qr_code_columns';
import { qr_code } from '@prisma/client';
import DataTable from '@/components/ui/data-table';
import { currentUser } from '@clerk/nextjs/server';
import { SignedIn } from '@clerk/nextjs';
import QRCodeDialog from '@/components/QRCodes/QRCodeDialog/QRCodeDialog';

type QRCodesDisplayProps = {
  qr_codes?: qr_code[] | null;
};

export default async function QRCodesDisplay({
  qr_codes,
}: QRCodesDisplayProps) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  return (
    <div
      className={`
        flex
        flex-col
      `}
    >
      <div
        className={`
          flex
          flex-row
          items-center
          gap-2
          px-2
          py-4
        `}
      >
        <h2
          className={`
            text-2xl
            font-bold
          `}
        >
          QR Codes
        </h2>
        <SignedIn>
          {user &&
          (userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
            userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_2) ? (
            <QRCodeDialog
              title="Create"
              subtitle="Create QR Code"
              description="This form will allow you to create a new QR code"
            />
          ) : null}
        </SignedIn>
      </div>
      {qr_codes && qr_codes.length > 0 ? (
        <DataTable columns={qr_code_columns} data={qr_codes} />
      ) : (
        <div
          className={`
            flex
            flex-row
            items-center
            justify-center
            gap-2
            px-2
            py-4
          `}
        >
          <h3
            className={`
              text-xl
              font-bold
            `}
          >
            No QR Codes found
          </h3>
        </div>
      )}
    </div>
  );
}
