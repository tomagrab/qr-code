import ChangeQRCodeLinkForm from '@/components/ChangeQRCodeLinkForm/ChangeQRCodeLinkForm';
import { EmbededYouTubeVideo } from '@/components/EmbededYouTubeVideo/EmbededYouTubeVideo';
import QRCode from '@/components/QRCode/QRCode';
import { getCurrentQRCodeURL, getQRCodes } from '@/data/drizzle';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const videoUrl = await getCurrentQRCodeURL();
  const qrCodes = await getQRCodes();
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  return (
    <main
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-4
        rounded-lg
        border
        border-gray-200
        p-4
        shadow-md
      `}
    >
      {videoUrl ? <EmbededYouTubeVideo videoUrl={videoUrl} /> : null}
      <div
        className={`
          flex
          flex-col
          gap-4
          md:flex-row
        `}
      >
        <QRCode />
        {(qrCodes && user && userEmail === process.env.WRITER_EMAIL_1) ||
        userEmail === process.env.WRITER_EMAIL_2 ? (
          <ChangeQRCodeLinkForm qrCodes={qrCodes} />
        ) : null}
      </div>
    </main>
  );
}
