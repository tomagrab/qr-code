'use client';

import QRCode from '@/components/QRCodes/QRCode/QRCode';
import { qr_code } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import QRCodeTableActions from '@/components/QRCodes/QRCodesTable/QRCodeTableActions/QRCodeTableActions';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';

export const qr_code_columns: ColumnDef<qr_code>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    id: 'qr_code_svg',
    header: 'QR Code',
    accessorKey: 'qr_code_svg',
    cell: ({ row }) => {
      return (
        <QRCode
          value={`https://velocitor-qr-code.com/api/YouTubeLink/${row.original.id}`}
        />
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'youtube_url',
    header: 'YouTube Video',
  },
  {
    accessorKey: 'pdf_url',
    header: 'PDF URL',
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      {
        return row.original.created_at
          ? FormatDate(row.original.created_at)
          : '';
      }
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
    cell: ({ row }) => {
      {
        return row.original.updated_at
          ? FormatDate(row.original.updated_at)
          : '';
      }
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <QRCodeTableActions row={row} />;
    },
  },
];
