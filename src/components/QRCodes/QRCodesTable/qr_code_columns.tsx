'use client';

import { qr_code } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const qr_code_columns: ColumnDef<qr_code>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'youtube_url',
    header: 'YouTube URL',
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
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
  },
];
