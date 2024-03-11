import QRCode from '@/components/QRCode/QRCode';
import { qr_code } from '@prisma/client';

type QRCodeListProps = {
  qr_codes: qr_code[];
};

export default function QRCodeList({ qr_codes }: QRCodeListProps) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        gap-4
      `}
    >
      {qr_codes.map(qr_code => (
        <QRCode
          key={qr_code.id}
          value={`https://www.velocitor-qr-code.com/api/YouTubeLink/${qr_code.id}`}
        />
      ))}
    </div>
  );
}
