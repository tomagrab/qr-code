import { qr_code_columns } from '@/components/QRCodes/QRCodesTable/qr_code_columns';
import DataTable from '@/components/ui/data-table';
import { readQRCodeLogsByQRCode } from '@/db/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type QRCodeDetailsProps = {
  params: {
    id: string;
  };

  searchParams?: {
    editMode: string;
  };
};

export default async function QRCodeLogs({
  params,
  searchParams,
}: QRCodeDetailsProps) {
  const id = Number(params.id);
  const qr_code_logs = await readQRCodeLogsByQRCode(id);
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isWriter =
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_2;

  if (!user || !isWriter) {
    redirect('/');
  }

  if (!qr_code_logs || qr_code_logs.length === 0) {
    return (
      <main>
        <QRCodeLogsHeader />
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
            No QRCodeLogs have been made for this QR Code!
          </h3>
        </div>
      </main>
    );
  }

  const transformedData = qr_code_logs?.map(log => ({
    // Assuming you have a way to obtain or generate the missing properties
    // For properties that don't exist in qr_code_logs, you'll need to provide values or exclude them if they're optional
    id: log.id,
    title: 'QR Code Log', // This needs to be determined based on your application's logic
    description: `This is a log for QR Code # ${log.qr_code_id}`, // This needs to be determined based on your application's logic
    active: true, // Determine the correct value based on your application's logic
    archived: false, // Determine the correct value based on your application's logic
    youtube_title: '', // This needs to be determined based on your application's logic
    youtube_url: log.youtube_url,
    pdf_url: log.pdf_url,
    author: '', // Determine the correct value based on your application's logic
    createdAt: log.createdAt,
    updatedAt: log.updatedAt,
    // Include other properties as necessary
  }));

  return (
    <main>
      <QRCodeLogsHeader />
      {qr_code_logs && qr_code_logs.length > 0 ? (
        <DataTable columns={qr_code_columns} data={transformedData} />
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
            No QR Codes have been made QRCodeLogs!
          </h3>
        </div>
      )}
    </main>
  );
}

const QRCodeLogsHeader = () => {
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
        QRCodeLogs QR Codes
      </h2>
    </div>
  );
};
