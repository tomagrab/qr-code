import QRCodeDialog from '@/components/QRCodes/QRCodeDialog/QRCodeDialog';
import { qr_code } from '@prisma/client';

type QRCodeDetailsDescriptionProps = {
  qr_code: qr_code;
  isWriter: boolean;
};

export default function QRCodeDetailsDescription({
  isWriter,
  qr_code,
}: QRCodeDetailsDescriptionProps) {
  return (
    <div
      className={`
          flex
          items-start
          justify-between
          gap-4
        `}
    >
      <p
        className={`
            max-w-md
            text-lg
        `}
      >
        {qr_code.description}
      </p>
      {isWriter ? (
        <QRCodeDialog
          title="Edit"
          subtitle="Edit QR Code"
          description="
            This form will allow you to edit the selected QR code
          "
          qr_code={qr_code}
        />
      ) : null}
    </div>
  );
}
