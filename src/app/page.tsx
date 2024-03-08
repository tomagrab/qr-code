import ChangeQRCodeLinkForm from '@/components/ChangeQRCodeLinkForm/ChangeQRCodeLinkForm';
import Header from '@/components/Layout/Header/Header';
import QRCode from '@/components/QRCode/QRCode';
import { currentUser } from '@clerk/nextjs/server';
import EmbeddedYouTubeVideo from '@/components/EmbededYouTubeVideo/EmbeddedYouTubeVideo';
import PDFUploadForm from '@/components/PDFUploadForm/PDFUploadForm';

export default async function Home() {
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
        shadow-md
      `}
    >
      <Header />
      <div
        className={`
          flex
          flex-col
          items-center
          justify-center
          gap-4
          p-4
          pt-0
        `}
      >
        {videoUrl ? <EmbeddedYouTubeVideo videoUrl={videoUrl} /> : null}
        <div
          className={`
          flex
          flex-col
          items-center
          gap-4
          md:flex-row
          `}
        >
          <QRCode />
          {qrCodes &&
          (userEmail === process.env.WRITER_EMAIL_1 ||
            userEmail === process.env.WRITER_EMAIL_2) ? (
            <ChangeQRCodeLinkForm qrCodes={qrCodes} />
          ) : null}
        </div>
        <div>
          <PDFUploadForm />
        </div>
      </div>
    </main>
  );
}
