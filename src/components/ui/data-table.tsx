'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import {
  ArchiveQRCode,
  DeleteQRCode,
  ToggleArchiveQRCode,
  UpdateQRCode,
} from '@/actions/QRCodes/QRCodesActions';
import { qr_code } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname();
  const user = useUser().user;
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isWriter =
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_2;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const toggleArchive = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    // Iterate through the selected rows and archive them
    selectedRows.forEach(async row => {
      const qr_code = row.original as qr_code;
      if (qr_code) {
        const toggled_qr_code = await ToggleArchiveQRCode(qr_code.id);
        if (!toggled_qr_code) {
          throw new Error('Failed to archive QR code');
        }
      }
    });
  };

  const deleteSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    // Iterate through the selected rows and delete them
    selectedRows.forEach(async row => {
      const qr_code = row.original as qr_code;
      if (qr_code) {
        const deletedQRCode = await DeleteQRCode(qr_code.id);
        if (!deletedQRCode) {
          throw new Error('Failed to delete QR code');
        }
      }
    });
  };

  return (
    <div>
      <div className="flex gap-2">
        {user && isWriter ? (
          <>
            <Button
              variant={`default`}
              onClick={toggleArchive}
              disabled={!table.getFilteredSelectedRowModel().rows.length}
            >
              {pathname === '/Archive' ? 'Unarchive' : 'Archive'}
            </Button>

            {pathname === '/Archive' ? (
              <Button
                variant={`destructive`}
                onClick={deleteSelected}
                disabled={!table.getFilteredSelectedRowModel().rows.length}
              >
                Delete
              </Button>
            ) : null}
          </>
        ) : null}
      </div>
      <div
        className={`
          flex
          items-center
          py-4
        `}
      >
        <Input
          placeholder="Filter IDs..."
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('id')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter Titles..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter Videos..."
          value={
            (table.getColumn('youtube_title')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('youtube_title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter Authors..."
          value={(table.getColumn('author')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('author')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter Created At..."
          value={
            (table.getColumn('createdAt')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('createdAt')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter Updated At..."
          value={
            (table.getColumn('updatedAt')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('updatedAt')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className={`
          rounded-md
          border
        `}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className={`
          flex
          items-center
          justify-end
          space-x-2
          py-4
        `}
      >
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{` `}
          {table.getFilteredRowModel().rows.length}
          {table.getFilteredRowModel().rows.length <= 1 ? ' row' : ' rows'}
          {` `}
          selected.
        </div>
        <Button
          variant={`outline`}
          size={`sm`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant={`outline`}
          size={`sm`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
