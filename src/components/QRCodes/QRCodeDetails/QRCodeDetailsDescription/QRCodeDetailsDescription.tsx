import QRCodeDialog from '@/components/QRCodes/QRCodeDialog/QRCodeDialog';
import { Button } from '@/components/ui/button';
import { qr_code } from '@prisma/client';
import Link from 'next/link';

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
        <div
          className={`
              flex
              flex-col
              gap-2
          `}
        >
          <QRCodeDialog
            title="Edit"
            subtitle="Edit QR Code"
            description="
          This form will allow you to edit the selected QR code
          "
            qr_code={qr_code}
          />
          <Link href={`/QRCodeLogs/${qr_code.id}`}>
            <Button
              className={`
              bg-velblue
              hover:bg-vellightblue
            `}
            >
              View Logs
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
