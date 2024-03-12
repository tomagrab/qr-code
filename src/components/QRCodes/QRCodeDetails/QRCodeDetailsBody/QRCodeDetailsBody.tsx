import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import { qr_code } from '@prisma/client';

type QRCodeDetailsBodyProps = {
  qr_code_author: qr_code['author'];
  qr_code_active: qr_code['active'];
  qr_code_archived: qr_code['archived'];
};

export default function QRCodeDetailsBody({
  qr_code_author,
  qr_code_active,
  qr_code_archived,
}: QRCodeDetailsBodyProps) {
  return (
    <div className="flex flex-col justify-evenly">
      <p>Author:&nbsp;{qr_code_author}</p>
      <p>
        Active:&nbsp;
        {qr_code_active ? (
          <span className="font-bold text-green-500">&nbsp;Yes</span>
        ) : (
          <span className="font-bold text-red-500">&nbsp;No</span>
        )}
      </p>
      <p>
        Archived:
        {qr_code_archived ? (
          <span className="font-bold text-green-500">&nbsp;Yes</span>
        ) : (
          <span className="font-bold text-red-500">&nbsp;No</span>
        )}
      </p>
    </div>
  );
}
