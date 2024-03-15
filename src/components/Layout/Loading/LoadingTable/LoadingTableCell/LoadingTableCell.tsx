import { Skeleton } from '@/components/ui/skeleton';
import { TableCell } from '@/components/ui/table';

export default function LoadingTableCell() {
  return (
    <TableCell>
      <Skeleton className="h-[20px] w-[100px] rounded-full" />
    </TableCell>
  );
}
