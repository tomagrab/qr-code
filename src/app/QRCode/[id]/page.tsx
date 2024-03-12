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
        />
        <div className="flex flex-col gap-4 p-4">
          {qr_code.youtube_url ? (
            <EmbeddedYouTubeVideo videoUrl={qr_code.youtube_url} />
          ) : null}
          <QRCodeDetailsDescription isWriter={isWriter} qr_code={qr_code} />
          <div className="flex justify-evenly gap-4">
            <QRCode
              value={`https://velocitor-qr-code.com/api/YouTubeLink/${qr_code.id}`}
            />
            <div className="flex flex-col justify-evenly">
              <Badge
                className={`
                text-base
                `}
              >
                Author:&nbsp;{qr_code.author}
              </Badge>
              <Badge
                className={`
          text-base
          `}
              >
                Archived:
                {qr_code.archived ? (
                  <span className="font-bold text-red-500">&nbsp;Yes</span>
                ) : (
                  <span className="font-bold text-green-500">&nbsp;No</span>
                )}
              </Badge>
            </div>
          </div>
          <QRCodeDetailsBody
            qr_code_createdAt={qr_code.createdAt}
            qr_code_updatedAt={qr_code.updatedAt}
          />
        </div>
      </div>
    </main>
  );
}
