import { qr_code_columns } from '@/components/QRCodes/QRCodesTable/qr_code_columns';
import DataTable from '@/components/ui/data-table';
import { readArchivedQRCodes, readArchivedQRCodesCount } from '@/db/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type ArchiveHeaderProps = {
  archived_qr_codes_count: number;
};

export default async function Archive() {
  const archived_qr_codes = await readArchivedQRCodes();
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isWriter =
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_2;
  const archived_qr_codes_count = (await readArchivedQRCodesCount()) ?? 0;

  if (!user || !isWriter) {
    redirect('/');
  }

  if (!archived_qr_codes || archived_qr_codes.length === 0) {
    return (
      <main>
        <ArchiveHeader archived_qr_codes_count={archived_qr_codes_count} />
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
            No QR Codes have been archived!
          </h3>
        </div>
      </main>
    );
  }

  return (
    <main>
      <ArchiveHeader archived_qr_codes_count={archived_qr_codes_count} />
      {archived_qr_codes && archived_qr_codes.length > 0 ? (
        <DataTable columns={qr_code_columns} data={archived_qr_codes} />
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
            No QR Codes have been archived!
          </h3>
        </div>
      )}
    </main>
  );
}

const ArchiveHeader = ({ archived_qr_codes_count }: ArchiveHeaderProps) => {
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
        Archived QR Codes - {archived_qr_codes_count}
      </h2>
    </div>
  );
};
