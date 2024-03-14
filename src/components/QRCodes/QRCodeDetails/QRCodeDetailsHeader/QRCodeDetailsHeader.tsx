import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import { qr_code } from '@prisma/client';

type QRCodeDetailsHeaderProps = {
  qr_code_id: qr_code['id'];
  qr_code_title: qr_code['title'];
  qr_code_createdAt: qr_code['createdAt'];
  qr_code_updatedAt: qr_code['updatedAt'];
};

export default function QRCodeDetailsHeader({
  qr_code_id,
  qr_code_title,
  qr_code_createdAt,
  qr_code_updatedAt,
}: QRCodeDetailsHeaderProps) {
  return (
    <div
      className={`
        flex
        w-full
        flex-col
        items-center
        gap-2
        bg-velblue
        p-4
      `}
    >
      <div
        className={`
          flex
          w-full
          items-center
          bg-velblue
        `}
      >
        <div
          className={`
            flex
            w-1/2
            justify-start
          `}
        >
          <Badge
            variant={`outline`}
            className={`
            text-white
            `}
          >
            {qr_code_id}
          </Badge>
        </div>
        <div
          className={`
            shrink-0
          `}
        >
          <h2
            className={`
              text-center
              text-xl
              font-bold
              text-white
            `}
          >
            {qr_code_title}
          </h2>
        </div>
        <div
          className={`
            flex
            w-1/2
            justify-end
          `}
        ></div>
      </div>
      <div
        className={`
          flex
          flex-row
          items-center
          justify-evenly
          gap-2
        `}
      >
        <p
          className={`
            text-center
            text-xs
            text-slate-200
            `}
        >
          Created:&nbsp;
          {FormatDate(qr_code_createdAt)}
        </p>
        <Separator orientation={`vertical`} className="h-4" />
        <p
          className={`
            text-center
            text-xs
            text-slate-200
          `}
        >
          Updated:&nbsp;
          {FormatDate(qr_code_updatedAt)}
        </p>
      </div>
    </div>
  );
}
