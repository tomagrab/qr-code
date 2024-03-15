import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
import LoadingTableHeader from './LoadingTableHeader/LoadingTableHeader';
import LoadingTableCell from './LoadingTableCell/LoadingTableCell';
import LoadingTableButtons from './LoadingTableButtons/LoadingTableButtons';

type LoadingTableProps = {
  numberOfButtons: number;
  numberOfColumns: number;
  numberOfRows: number;
};

export default function LoadingTable({
  numberOfButtons,
  numberOfColumns,
  numberOfRows,
}: LoadingTableProps) {
  return (
    <>
      {Array.from({ length: numberOfButtons }).map((_, index) => (
        <LoadingTableButtons key={index} />
      ))}

      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: numberOfColumns }).map((_, index) => (
              <LoadingTableHeader key={index} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: numberOfRows }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: numberOfColumns }).map((_, index) => (
                <LoadingTableCell key={index} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
