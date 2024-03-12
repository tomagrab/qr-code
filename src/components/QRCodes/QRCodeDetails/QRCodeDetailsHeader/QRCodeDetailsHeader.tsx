import { Badge } from '@/components/ui/badge';
import { qr_code } from '@prisma/client';

type QRCodeDetailsHeaderProps = {
  qr_code_id: qr_code['id'];
  qr_code_title: qr_code['title'];
};

export default function QRCodeDetailsHeader({
  qr_code_id,
  qr_code_title,
}: QRCodeDetailsHeaderProps) {
  return (
    <div
      className={`
          flex
          justify-between
          rounded-t-md
          bg-velblue
          p-4
      `}
    >
      <Badge
        variant={'default'}
        className={`
        text-base
        `}
      >
        QR Code ID:&nbsp;
        <span className="font-bold">{qr_code_id}</span>
      </Badge>
      <h2
        className={`
        rounded-t-md
        text-2xl
        font-bold
        text-white
        `}
      >
        {qr_code_title}
      </h2>
    </div>
  );
}
