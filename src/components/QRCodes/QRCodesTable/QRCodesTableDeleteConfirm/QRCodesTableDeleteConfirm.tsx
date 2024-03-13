'use client';

import { DeleteQRCode } from '@/actions/QRCodes/QRCodesActions';
import { Button } from '@/components/ui/button';
import { qr_code } from '@prisma/client';
import { SetStateAction } from 'react';

type QRCodesTableDeleteConfirmProps = {
  qr_code: qr_code;
  onClick: (value: SetStateAction<boolean>) => void;
};

export default function QRCodesTableDeleteConfirm({
  qr_code,
  onClick,
}: QRCodesTableDeleteConfirmProps) {
  return (
    <div>
      <h2
        className={`
          text-lg
          font-semibold  
        `}
      >
        Are you sure you want to delete this QR Code?
      </h2>
      <h3>This action cannot be undone.</h3>
      <div
        className={`
          flex
          justify-end
          gap-2
        `}
      >
        <Button
          variant={'secondary'}
          onClick={() => {
            onClick(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant={`destructive`}
          onClick={async () => {
            await DeleteQRCode(qr_code.id);
            onClick(false);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
