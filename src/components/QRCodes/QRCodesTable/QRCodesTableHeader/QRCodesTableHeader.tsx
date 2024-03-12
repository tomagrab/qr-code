import { Button } from '@/components/ui/button';
import { qr_code } from '@prisma/client';
import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

type QRCodesTableHeaderProps = {
  title: string;
  column: Column<qr_code, unknown>;
};

export default function QRCodesTableHeader({
  title,
  column,
}: QRCodesTableHeaderProps) {
  return (
    <div
      className={`
          flex
          items-center
          justify-center
          text-center
        `}
    >
      <Button
        variant={`ghost`}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
