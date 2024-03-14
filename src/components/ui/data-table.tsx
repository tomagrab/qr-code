'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import {
  ArchiveQRCode,
  DeleteQRCode,
  ToggleActiveQRCode,
  ToggleArchiveQRCode,
  UpdateQRCode,
} from '@/actions/QRCodes/QRCodesActions';
import { qr_code } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ScrollArea } from './scroll-area';
import QRCodeForm from '../QRCodes/QRCodeForm/QRCodeForm';
import QRCodeTableFilterInputContainer from '../QRCodes/QRCodesTable/QRCodeTableFilterInputContainer/QRCodeTableFilterInputContainer';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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

  const toggleActive = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    // Iterate through the selected rows and archive them
    selectedRows.forEach(async row => {
      const qr_code = row.original as qr_code;
      if (qr_code) {
        const toggled_qr_code = await ToggleActiveQRCode(qr_code.id);
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

  const selectedRow = table.getFilteredSelectedRowModel().rows[0]
    ?.original as qr_code;

  const selectedRowId = selectedRow?.id;

  return (
    <div>
      <div className="flex gap-2">
        {table.getFilteredSelectedRowModel().rows.length === 1 ? (
          <Link href={`/QRCode/${selectedRowId}`}>
            <Button
              className={`
              bg-velgreen
              hover:bg-vellightgreen
            `}
            >
              View
            </Button>
          </Link>
        ) : (
          <Button
            variant={`default`}
            disabled
            className={`
            bg-velgreen
            `}
          >
            View
          </Button>
        )}
        {user && isWriter ? (
          <>
            {table.getFilteredSelectedRowModel().rows.length === 1 ? (
              <>
                <Dialog
                  open={isEditDialogOpen}
                  onOpenChange={
                    isEditDialogOpen
                      ? () => setIsEditDialogOpen(false)
                      : () => setIsEditDialogOpen(true)
                  }
                >
                  <DialogTrigger
                    className={`
                    focus-visible:ring-rin
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    whitespace-nowrap
                    rounded-md
                    bg-primary
                    bg-velblue
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-primary-foreground
                    ring-offset-background
                    transition-colors
                    hover:bg-primary/90
                    hover:bg-vellightblue
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    disabled:pointer-events-none
                    disabled:opacity-50
                    `}
                  >
                    Edit
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        <span
                          className={`
                            text-2xl
                            font-bold
                            `}
                        >
                          Edit QR Code
                        </span>
                      </DialogTitle>
                      <DialogDescription>
                        This form will allow you to edit the QR code.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className={``}>
                      <QRCodeForm
                        qr_code={selectedRow}
                        isOpen={isEditDialogOpen}
                        setIsOpen={setIsEditDialogOpen}
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Link href={`/QRCodeLogs/${selectedRowId}`}>
                  <Button
                    className={`
                    bg-vellink
                    hover:bg-vellightlink
                  `}
                  >
                    View Logs
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  disabled
                  className={`
                  bg-velblue
                  hover:bg-vellightblue
                  `}
                >
                  Edit
                </Button>
                <Button
                  disabled
                  className={`
                  bg-vellink
                  hover:bg-vellightlink
                  `}
                >
                  View Logs
                </Button>
              </>
            )}
          </>
        ) : null}

        {user && isWriter ? (
          <>
            <Button
              className={`
                bg-velorange
                hover:bg-vellightorange
              `}
              onClick={toggleArchive}
              disabled={!table.getFilteredSelectedRowModel().rows.length}
            >
              {pathname === '/Archive' ? 'Unarchive' : 'Archive'}
            </Button>

            {pathname === '/' || pathname === '/Archive' ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="default"
                    disabled={!table.getFilteredSelectedRowModel().rows.length}
                  >
                    {pathname === '/' || pathname === '/Archive'
                      ? 'Deactivate'
                      : 'Activate'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {table.getFilteredSelectedRowModel().rows.length > 1
                        ? 'Are you sure you want to deactivate these QR Codes?'
                        : 'Are you sure you want to deactivate this QR Code?'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will erase the current YouTube URL and replace it
                      with the URL of the home page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={toggleActive}
                      disabled={
                        !table.getFilteredSelectedRowModel().rows.length
                      }
                      className={`
                        bg-velorange 
                        hover:bg-vellightorange
                      `}
                    >
                      Deactivate
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                variant={`default`}
                onClick={toggleActive}
                disabled={!table.getFilteredSelectedRowModel().rows.length}
              >
                {pathname === '/Inactive' ? 'Activate' : 'Deactivate'}
              </Button>
            )}

            {pathname === '/Archive' || pathname === '/Inactive' ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    disabled={!table.getFilteredSelectedRowModel().rows.length}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {table.getFilteredSelectedRowModel().rows.length > 1
                        ? 'Are you sure you want to delete these QR Codes?'
                        : 'Are you sure you want to delete this QR Code?'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the QR Code. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deleteSelected}
                      disabled={
                        !table.getFilteredSelectedRowModel().rows.length
                      }
                      className="bg-red-500 hover:bg-red-400"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}
          </>
        ) : null}
      </div>
      <div
        className={`
          grid
          grid-cols-3
          items-center
          gap-2
          py-4
          md:flex
          md:items-center
          md:justify-stretch
        `}
      >
        <QRCodeTableFilterInputContainer
          labelTitle="Filter IDs"
          labelFor="filter-ids"
        >
          <Input
            id="filter-ids"
            name="filter-ids"
            placeholder="Filter IDs..."
            value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('id')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </QRCodeTableFilterInputContainer>

        <QRCodeTableFilterInputContainer
          labelTitle="Filter Titles"
          labelFor="filter-titles"
        >
          <Input
            id="filter-titles"
            name="filter-titles"
            placeholder="Filter Titles..."
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </QRCodeTableFilterInputContainer>

        <QRCodeTableFilterInputContainer
          labelTitle="Filter Videos"
          labelFor="filter-videos"
        >
          <Input
            id="filter-videos"
            name="filter-videos"
            placeholder="Filter Videos..."
            value={
              (table.getColumn('youtube_title')?.getFilterValue() as string) ??
              ''
            }
            onChange={event =>
              table
                .getColumn('youtube_title')
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </QRCodeTableFilterInputContainer>

        <QRCodeTableFilterInputContainer
          labelTitle="Filter Authors"
          labelFor="filter-authors"
        >
          <Input
            id="filter-authors"
            name="filter-authors"
            placeholder="Filter Authors..."
            value={
              (table.getColumn('author')?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn('author')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </QRCodeTableFilterInputContainer>

        <QRCodeTableFilterInputContainer
          labelTitle="Filter Created At"
          labelFor="filter-created-at"
        >
          <Input
            id="filter-created-at"
            name="filter-created-at"
            placeholder="Filter Created At..."
            value={
              (table.getColumn('createdAt')?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn('createdAt')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </QRCodeTableFilterInputContainer>

        <QRCodeTableFilterInputContainer
          labelTitle="Filter Updated At"
          labelFor="filter-updated-at"
        >
          <Input
            id="filter-updated-at"
            name="filter-updated-at"
            placeholder="Filter Updated At..."
            value={
              (table.getColumn('updatedAt')?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn('updatedAt')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </QRCodeTableFilterInputContainer>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={`
                flex
                grow
                flex-col
                items-center
                gap-2
              `}
            >
              <Label htmlFor={`filter-columns`}>Filter Columns</Label>
              <Button
                variant="outline"
                className={`
                grow
              `}
                name="filter-columns"
              >
                Columns
              </Button>
            </div>
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
                    {column.id === 'id'
                      ? 'ID'
                      : column.id === 'youtube_title'
                        ? 'Video'
                        : column.id === 'createdAt'
                          ? 'Created At'
                          : column.id === 'updatedAt'
                            ? 'Updated At'
                            : column.id}
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
