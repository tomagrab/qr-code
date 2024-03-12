'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import QRCodeForm from '@/components/QRCodes/QRCodeForm/QRCodeForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { qr_code } from '@prisma/client';
import { useState } from 'react';

type CreateQRCodeDialogProps = {
  title: string;
  subtitle: string;
  description?: string;
  qr_code?: qr_code;
};

export default function QRCodeDialog({
  title,
  subtitle,
  description,
  qr_code,
}: CreateQRCodeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={`
          rounded-md
          bg-velgreen
          px-4
          py-2
          font-bold
          text-white
          transition
          duration-300
          ease-in-out
          hover:bg-vellightgreen
        `}
      >
        {title}
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
              {subtitle}
            </span>
          </DialogTitle>
          <DialogDescription>
            {description ? (
              <span
                className={`
                  text-sm
                `}
              >
                {description}
              </span>
            ) : null}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className={``}>
          <QRCodeForm qr_code={qr_code} isOpen={isOpen} setIsOpen={setIsOpen} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
