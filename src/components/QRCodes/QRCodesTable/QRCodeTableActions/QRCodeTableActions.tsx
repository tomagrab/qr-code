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
} from '@/components/ui/dialog';
import QRCodeForm from '@/components/QRCodes/QRCodeForm/QRCodeForm';
import QRCodesTableDeleteConfirm from '@/components/QRCodes/QRCodesTable/QRCodesTableDeleteConfirm/QRCodesTableDeleteConfirm';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { qr_code } from '@prisma/client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

type QRCodeTableActionsProps = {
  row: {
    original: qr_code;
  };
};

export default function QRCodeTableActions({ row }: QRCodeTableActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const user = useUser().user;
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isWriter =
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_1 ||
    userEmail === process.env.NEXT_PUBLIC_WRITER_EMAIL_2;

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
          <DropdownMenuItem>
            <Link href={`/QRCode/${row.original.id}`}>View QR Code</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(
                `QR Code Information:\n\n${JSON.stringify(
                  row.original,
                  null,
                  2,
                )}`,
              )
            }
          >
            Copy QR Code Information
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user && isWriter ? (
            <>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                Delete
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      {user && isWriter ? (
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
                <QRCodeForm
                  qr_code={row.original}
                  isOpen={isEditDialogOpen}
                  setIsOpen={setIsEditDialogOpen}
                />
              </ScrollArea>
            </>
          ) : isDeleteDialogOpen ? (
            <QRCodesTableDeleteConfirm
              qr_code={row.original}
              onClick={() => setIsDeleteDialogOpen(false)}
            />
          ) : null}
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
