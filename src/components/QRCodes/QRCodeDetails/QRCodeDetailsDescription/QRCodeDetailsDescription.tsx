'use client';
import QRCodeDialog from '@/components/QRCodes/QRCodeDialog/QRCodeDialog';
import { Button } from '@/components/ui/button';
import { qr_code } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type QRCodeDetailsDescriptionProps = {
  qr_code: qr_code;
  isWriter: boolean;
};

export default function QRCodeDetailsDescription({
  isWriter,
  qr_code,
}: QRCodeDetailsDescriptionProps) {
  const pathname = usePathname();
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
          {/* Todo: Add delete button */}
          {/* 
            {!qr_code.active || qr_code.archived ? (

            ) : ()} 
            */}
          <QRCodeDialog
            title={pathname.includes('QRCodeLogs') ? 'Revert' : 'Edit'}
            subtitle={
              pathname.includes('QRCodeLogs')
                ? `Revert this QR code to version # ${qr_code.version}`
                : 'Edit this QR code'
            }
            description={
              pathname.includes('QRCodeLogs')
                ? `Are you sure you want to revert this QR code to version # ${qr_code.version}?`
                : 'Edit this QR code'
            }
            qr_code={qr_code}
          />
          {pathname.includes('QRCodeLogs') ? null : (
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
          )}
        </div>
      ) : null}
    </div>
  );
}
