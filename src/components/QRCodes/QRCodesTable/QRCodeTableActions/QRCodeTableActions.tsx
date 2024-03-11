import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import QRCodeForm from '../../QRCodeForm/QRCodeForm';
import { qr_code } from '@prisma/client';

type QRCodeTableActionsProps = {
  row: {
    original: qr_code;
  };
};

export default function QRCodeTableActions({ row }: QRCodeTableActionsProps) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(
                JSON.stringify(row.original, null, 2),
              )
            }
          >
            Copy QR Code Information
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex ">
            <DialogTrigger className="grow text-left">Edit</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
          <QRCodeForm qr_code={row.original} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
