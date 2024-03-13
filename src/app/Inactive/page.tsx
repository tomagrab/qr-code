import { qr_code_columns } from '@/components/QRCodes/QRCodesTable/qr_code_columns';
import DataTable from '@/components/ui/data-table';
import { readInactiveQRCodes } from '@/db/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Inactive() {
  const inactive_qr_codes = await readInactiveQRCodes();
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isWriter =
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_2;

  if (!user || !isWriter) {
    redirect('/');
  }

  if (!inactive_qr_codes || inactive_qr_codes.length === 0) {
    return (
      <main>
        <InactiveHeader />
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
            No QR Codes have been made inactive!
          </h3>
        </div>
      </main>
    );
  }

  return (
    <main>
      <InactiveHeader />
      {inactive_qr_codes && inactive_qr_codes.length > 0 ? (
        <DataTable columns={qr_code_columns} data={inactive_qr_codes} />
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
            No QR Codes have been made inactive!
          </h3>
        </div>
      )}
    </main>
  );
}

const InactiveHeader = () => {
  return (
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
        Inactive QR Codes
      </h2>
    </div>
  );
};
