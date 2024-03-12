'use client';

import QRCode from '@/components/QRCodes/QRCode/QRCode';
import { qr_code } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import QRCodeTableActions from '@/components/QRCodes/QRCodesTable/QRCodeTableActions/QRCodeTableActions';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';
import VideoTitle from '@/components/VideoTitle/VideoTitle';
import QRCodesTableHeader from './QRCodesTableHeader/QRCodesTableHeader';
import QRCodesTableCell from './QRCodesTableCell/QRCodesTableCell';
import { GetYouTubeVideoID } from '@/lib/Utilities/GetYouTubeVideoID/GetYouTubeVideoID';
import { GetYouTubeVideoDetails } from '@/lib/Utilities/GetYouTubeVideoDetails/GetYouTubeVideoDetails';
import { Badge } from '@/components/ui/badge';

export const qr_code_columns: ColumnDef<qr_code>[] = [
  {
    accessorKey: 'id',
    accessorFn: row => row.id.toString(),

    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      return <QRCodesTableCell>{row.original.id}</QRCodesTableCell>;
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
    accessorKey: 'youtube_url',
    header: ({ column }) => {
      return <QRCodesTableHeader column={column} title="Video" />;
    },
    accessorFn: async row => {
      if (!row.youtube_url) {
        return null;
      }

      const videoId = GetYouTubeVideoID(row.youtube_url);

      if (!videoId) {
        return null;
      }

      const videoDetails = await GetYouTubeVideoDetails(videoId);

      if (!videoDetails) {
        return null;
      }

      return videoDetails.items[0].snippet.title;
    },
    cell: ({ row }) => {
      return row.original.youtube_url ? (
        <QRCodesTableCell>
          <VideoTitle videoUrl={row.original.youtube_url} />
        </QRCodesTableCell>
      ) : (
        <QRCodesTableCell>
          <Badge variant={`destructive`}>No Video</Badge>
        </QRCodesTableCell>
      );
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
  },
];
