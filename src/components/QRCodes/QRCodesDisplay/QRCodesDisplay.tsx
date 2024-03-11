import { qr_code_columns } from '@/components/QRCodes/QRCodesTable/qr_code_columns';
import { qr_code } from '@prisma/client';
import DataTable from '@/components/ui/data-table';
import CreateQRCodeDialog from '@/components/QRCodes/CreateQRCodeDialog/CreateQRCodeDialog';

type QRCodesDisplayProps = {
  qr_codes?: qr_code[] | null;
};

export default function QRCodesDisplay({ qr_codes }: QRCodesDisplayProps) {
  return (
    <div
      className={`
        flex
        flex-col
      `}
    >
      <div
        className={`
          flex
          flex-row
          items-center
          gap-2
          px-2
          py-4
        `}
      >
        <h2
          className={`
            text-2xl
            font-bold
          `}
        >
          QR Codes
        </h2>
        <CreateQRCodeDialog />
      </div>
      {qr_codes && qr_codes.length > 0 ? (
        <DataTable columns={qr_code_columns} data={qr_codes} />
      ) : null}
    </div>
  );
}
