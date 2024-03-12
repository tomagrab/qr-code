import { qr_code } from '@prisma/client';

type QRCodeDetailsBodyProps = {
  qr_code_createdAt: qr_code['createdAt'];
  qr_code_updatedAt: qr_code['updatedAt'];
};

export default function QRCodeDetailsBody({
  qr_code_createdAt,
  qr_code_updatedAt,
}: QRCodeDetailsBodyProps) {
  return (
    <div
      className={`
          flex
          flex-col
          gap-4
        `}
    >
      <p
        className={`
              text-base
          `}
      >
        Created:&nbsp;
        {qr_code_createdAt.toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
        })}
      </p>
      <p
        className={`
              text-base
          `}
      >
        Updated:&nbsp;
        {qr_code_updatedAt.toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
        })}
      </p>
    </div>
  );
}
