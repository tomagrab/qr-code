import ChangeQRCodeLinkForm from "@/components/ChangeQRCodeLinkForm/ChangeQRCodeLinkForm";
import { EmbededYouTubeVideo } from "@/components/EmbededYouTubeVideo/EmbededYouTubeVideo";
import QRCode from "@/components/QRCode/QRCode";
import { getCurrentQRCodeURL, getQRCodes } from "@/data/drizzle";

export default async function Home() {
  const videoUrl = await getCurrentQRCodeURL();
  const qrCodes = await getQRCodes();
  return (
    <main className="">
      {qrCodes ? <ChangeQRCodeLinkForm qrCodes={qrCodes} /> : null}
      <QRCode />
      {videoUrl ? <EmbededYouTubeVideo videoUrl={videoUrl} /> : null}
    </main>
  );
}
