import { Skeleton } from '@/components/ui/skeleton';
import { TableHead } from '@/components/ui/table';

export default function LoadingTableHeader() {
  return (
    <TableHead className="w-[100px]">
      <Skeleton className="h-[20px] w-[100px] rounded-full" />
    </TableHead>
  );
}
