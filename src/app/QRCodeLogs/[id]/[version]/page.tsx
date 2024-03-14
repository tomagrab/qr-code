import EmbeddedYouTubeVideo from '@/components/EmbededYouTubeVideo/EmbeddedYouTubeVideo';
import QRCode from '@/components/QRCodes/QRCode/QRCode';
import QRCodeDetailsBody from '@/components/QRCodes/QRCodeDetails/QRCodeDetailsBody/QRCodeDetailsBody';
import QRCodeDetailsDescription from '@/components/QRCodes/QRCodeDetails/QRCodeDetailsDescription/QRCodeDetailsDescription';
import QRCodeDetailsHeader from '@/components/QRCodes/QRCodeDetails/QRCodeDetailsHeader/QRCodeDetailsHeader';
import { Badge } from '@/components/ui/badge';
import { readQRCode, readQRCodeLogsByQRCodeAndVersion } from '@/db/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { qr_code } from '@prisma/client';
import { notFound } from 'next/navigation';

type QRCodeDetailsProps = {
  params: {
    id: string;
    version: string;
  };

  searchParams?: {
    editMode: string;
  };
};

export default async function QRCodeDetails({
  params,
  searchParams,
}: QRCodeDetailsProps) {
  const id = Number(params.id);
  const version = Number(params.version);
  const qr_code_log = await readQRCodeLogsByQRCodeAndVersion(id, version);

  if (!qr_code_log) {
    return notFound();
  }

  // Create a QR Code from the QR Code Log data
  const qr_code: qr_code = {
    id: qr_code_log.qr_code_id,
    version: version + 1,
    title: qr_code_log.title,
    description: qr_code_log.description || 'No description available',
    active: qr_code_log.active,
    archived: qr_code_log.archived,
    youtube_title: qr_code_log.youtube_title || 'No title available',
    youtube_url:
      qr_code_log.youtube_url || 'https://www.velocitor-qr-code.com/',
    pdf_url: qr_code_log.pdf_url || 'https://www.velocitor-qr-code.com/',
    author: qr_code_log.author,
    createdAt: qr_code_log.createdAt,
    updatedAt: qr_code_log.updatedAt,
  };

  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isWriter =
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_2;

  if (!qr_code) {
    return notFound();
  }

  return (
    <main
      className={`
        flex
        grow
        flex-col
        items-center
        justify-center
      `}
    >
      <div
        className={`
            rounded-md
            border
            bg-white
            shadow-md
            `}
      >
        <QRCodeDetailsHeader
          qr_code_id={qr_code.id}
          qr_code_title={qr_code.title}
          qr_code_createdAt={qr_code.createdAt}
          qr_code_updatedAt={qr_code.updatedAt}
        />
        <div
          className={`
            flex
            flex-col
            gap-4
            p-4
          `}
        >
          {qr_code.youtube_url ? (
            <>
              {qr_code.youtube_title ? (
                <h3
                  className={`
                    text-center
                    text-2xl
                    font-bold
                  `}
                >
                  {qr_code.youtube_title}
                </h3>
              ) : null}

              {qr_code.youtube_url ===
              'https://www.velocitor-qr-code.com/' ? null : (
                <EmbeddedYouTubeVideo videoUrl={qr_code.youtube_url} />
              )}
            </>
          ) : null}
          <div className="flex justify-evenly gap-4">
            <QRCode
              value={`https://velocitor-qr-code.com/api/YouTubeLink/${qr_code.id}`}
            />
            <QRCodeDetailsBody
              qr_code_author={qr_code.author}
              qr_code_active={qr_code.active}
              qr_code_archived={qr_code.archived}
            />
          </div>
          <QRCodeDetailsDescription isWriter={isWriter} qr_code={qr_code} />
        </div>
      </div>
    </main>
  );
}
