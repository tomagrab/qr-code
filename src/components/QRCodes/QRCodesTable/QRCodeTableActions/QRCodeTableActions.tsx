'use client';
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
import { useState } from 'react';
import { DeleteQRCode } from '@/app/actions/QRCodes/QRCodesActions';
import QRCodesTableDeleteConfirm from '../QRCodesTableDeleteConfirm/QRCodesTableDeleteConfirm';

type QRCodeTableActionsProps = {
  row: {
    original: qr_code;
  };
};

export default function QRCodeTableActions({ row }: QRCodeTableActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <Dialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={
        isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
      }
    >
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
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        {isEditDialogOpen ? (
          <>
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
          </>
        ) : isDeleteDialogOpen ? (
          <QRCodesTableDeleteConfirm
            qr_code={row.original}
            onClick={() => setIsDeleteDialogOpen(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
