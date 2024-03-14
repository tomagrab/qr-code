import { qr_code_columns } from '@/components/QRCodes/QRCodesTable/qr_code_columns';
import DataTable from '@/components/ui/data-table';
import { readQRCodeLogsByQRCode } from '@/db/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { qr_code } from '@prisma/client';
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

  const transformedData: qr_code[] = qr_code_logs.map(qr_code_log => {
    return {
      id: qr_code_log.qr_code_id,
      version: qr_code_log.version,
      title: qr_code_log.title,
      description: qr_code_log.description,
      active: qr_code_log.active,
      archived: qr_code_log.archived,
      youtube_title: qr_code_log.youtube_title,
      youtube_url: qr_code_log.youtube_url,
      pdf_url: qr_code_log.pdf_url,
      author: qr_code_log.author,
      createdAt: qr_code_log.createdAt,
      updatedAt: qr_code_log.updatedAt,
    };
  });

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
        QR Code Logs
      </h2>
    </div>
  );
};
