'use client';

import QRCode from '@/components/QRCodes/QRCode/QRCode';
import { qr_code } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import QRCodeTableActions from '@/components/QRCodes/QRCodesTable/QRCodeTableActions/QRCodeTableActions';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import EmbeddedYouTubeVideo from '@/components/EmbededYouTubeVideo/EmbeddedYouTubeVideo';
import VideoTitle from '@/components/VideoTitle/VideoTitle';
import QRCodesTableHeader from './QRCodesTableHeader/QRCodesTableHeader';
import QRCodesTableCell from './QRCodesTableCell/QRCodesTableCell';

export const qr_code_columns: ColumnDef<qr_code>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <QRCodesTableHeader title="ID" />;
    },
    cell: ({ row }) => {
      return <QRCodesTableCell>{row.original.id}</QRCodesTableCell>;
    },
  },
  {
    id: 'qr_code_svg',
    header: () => {
      return <QRCodesTableHeader title="QR Code" />;
    },
    accessorKey: 'qr_code_svg',
    cell: ({ row }) => {
      return (
        <QRCodesTableCell>
          <QRCode
            value={`https://velocitor-qr-code.com/api/YouTubeLink/${row.original.id}`}
          />
        </QRCodesTableCell>
      );
    },
  },
  {
    accessorKey: 'title',
    header: () => {
      return <QRCodesTableHeader title="Title" />;
    },
    cell: ({ row }) => {
      return row.original.youtube_url ? (
        <QRCodesTableCell>
          <VideoTitle videoUrl={row.original.youtube_url} />
        </QRCodesTableCell>
      ) : null;
    },
  },
  {
    accessorKey: 'youtube_url',
    header: () => {
      return <QRCodesTableHeader title="Video" />;
    },
    cell: ({ row }) => {
      return row.original.youtube_url ? (
        <QRCodesTableCell>
          <EmbeddedYouTubeVideo videoUrl={row.original.youtube_url} />
        </QRCodesTableCell>
      ) : null;
    },
  },
  {
    accessorKey: 'author',
    header: () => {
      return <QRCodesTableHeader title="Author" />;
    },
    cell: ({ row }) => {
      return <QRCodesTableCell>{row.original.author}</QRCodesTableCell>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => {
      return <QRCodesTableHeader title="Created At" />;
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
    header: () => {
      return <QRCodesTableHeader title="Updated At" />;
    },
    cell: ({ row }) => {
      {
        return row.original.updatedAt ? (
          <QRCodesTableCell>
            {FormatDate(row.original.updatedAt)}
          </QRCodesTableCell>
        ) : (
          ''
        );
      }
    },
  },
  {
    id: 'actions',
    header: () => {
      return <QRCodesTableHeader title="Actions" />;
    },
    cell: ({ row }) => {
      return (
        <QRCodesTableCell>
          <QRCodeTableActions row={row} />
        </QRCodesTableCell>
      );
    },
  },
];
