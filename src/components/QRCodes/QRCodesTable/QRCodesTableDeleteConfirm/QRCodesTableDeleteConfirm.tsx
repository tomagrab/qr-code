'use client';

import { DeleteQRCode } from '@/app/actions/QRCodes/QRCodesActions';
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
      <h2>Are you sure you want to delete this QR Code?</h2>
      <h3>This action cannot be undone.</h3>
      <div>
        <Button
          variant={`destructive`}
          onClick={async () => {
            await DeleteQRCode(qr_code.id);
            onClick(false);
          }}
        >
          Delete
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => {
            onClick(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
