'use client';

import QRCode from '@/components/QRCodes/QRCode/QRCode';
import { qr_code } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import QRCodesTableHeader from './QRCodesTableHeader/QRCodesTableHeader';
import QRCodesTableCell from './QRCodesTableCell/QRCodesTableCell';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export const qr_code_columns: ColumnDef<qr_code>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    accessorFn: row => row.id.toString(),
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      return (
        <QRCodesTableCell>
          <Link href={`/QRCode/${row.original.id}`}>
            <Badge>{row.original.id}</Badge>
          </Link>
        </QRCodesTableCell>
      );
    },
  },
  {
    id: 'qr_code_svg',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="QR Code" />;
    },
    accessorKey: 'qr_code_svg',
    cell: ({ row }) => {
      return (
        <QRCodesTableCell>
          <QRCode
            title={row.original.title || ''}
            description={row.original.description || ''}
            value={`https://velocitor-qr-code.com/api/YouTubeLink/${row.original.id}`}
          />
        </QRCodesTableCell>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="Title" />;
    },
    cell: ({ row }) => {
      return <QRCodesTableCell>{row.original.title}</QRCodesTableCell>;
    },
  },
  {
    accessorKey: 'youtube_title',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="Video" />;
    },
    cell: ({ row }) => {
      return <QRCodesTableCell>{row.original.youtube_title}</QRCodesTableCell>;
    },
  },
  {
    accessorKey: 'author',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="Author" />;
    },
    cell: ({ row }) => {
      return <QRCodesTableCell>{row.original.author}</QRCodesTableCell>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => {
      {
        return row.original.createdAt ? (
          <QRCodesTableCell>
            {FormatDate(row.original.createdAt)}
          </QRCodesTableCell>
        ) : (
          ''
        );
      }
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="Updated At" />;
    },
    cell: ({ row }) => {
      {
        return row.original.updatedAt ? (
          <QRCodesTableCell>
            {/* Test */}

            {FormatDate(row.original.updatedAt)}
          </QRCodesTableCell>
        ) : (
          ''
        );
      }
    },
  },
  {
    accessorKey: 'version',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="Version" />;
    },
    cell: ({ row }) => {
      return <QRCodesTableCell>{row.original.version}</QRCodesTableCell>;
    },
  },
  /*   {
    id: 'actions',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      return (
        <QRCodesTableCell>
          <QRCodeTableActions row={row} />
        </QRCodesTableCell>
      );
    },
  }, */
];
