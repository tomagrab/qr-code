import ChangeQRCodeLinkForm from '@/components/ChangeQRCodeLinkForm/ChangeQRCodeLinkForm';
import { EmbededYouTubeVideo } from '@/components/EmbededYouTubeVideo/EmbededYouTubeVideo';
import QRCode from '@/components/QRCode/QRCode';
import { getCurrentQRCodeURL, getQRCodes } from '@/data/drizzle';

export default async function Home() {
  const videoUrl = await getCurrentQRCodeURL();
  const qrCodes = await getQRCodes();
  return (
    <main
      className={`
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        bg-gray-50
    `}
    >
      <div
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
          {qrCodes ? <ChangeQRCodeLinkForm qrCodes={qrCodes} /> : null}
        </div>
      </div>
    </main>
  );
}
