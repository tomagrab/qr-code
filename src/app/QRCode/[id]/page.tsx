import EmbeddedYouTubeVideo from '@/components/EmbededYouTubeVideo/EmbeddedYouTubeVideo';
import QRCode from '@/components/QRCodes/QRCode/QRCode';
import QRCodeDetailsBody from '@/components/QRCodes/QRCodeDetails/QRCodeDetailsBody/QRCodeDetailsBody';
import QRCodeDetailsDescription from '@/components/QRCodes/QRCodeDetails/QRCodeDetailsDescription/QRCodeDetailsDescription';
import QRCodeDetailsHeader from '@/components/QRCodes/QRCodeDetails/QRCodeDetailsHeader/QRCodeDetailsHeader';
import { Badge } from '@/components/ui/badge';
import { readQRCode } from '@/db/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

type QRCodeDetailsProps = {
  params: {
    id: string;
  };

  searchParams?: {
    editMode: string;
  };
};

export default async function QRCodeDetails({
  params,
  searchParams,
}: QRCodeDetailsProps) {
  const qr_code = await readQRCode(Number(params.id));
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
              <EmbeddedYouTubeVideo videoUrl={qr_code.youtube_url} />
            </>
          ) : null}
          <div className="flex justify-evenly gap-4">
            <QRCode
              title={qr_code.title || ''}
              description={qr_code.description || ''}
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
