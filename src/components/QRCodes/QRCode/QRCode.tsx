'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../../ui/button';

type QRCodeProps = {
  title: string;
  description: string;
  value: string;
};

export default function QRCode({ title, description, value }: QRCodeProps) {
  // Function to handle print action
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <QRCodeSVG value={value} />
      </DialogTrigger>
      {/* Add the `printable-content` class to your DialogContent */}
      <DialogContent className="printable-content flex flex-col items-center">
        <div className="printable-section flex flex-col items-center gap-4">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle
              className={`
                text-center
                text-2xl
                font-bold
              `}
            >
              {title && title.length > 0 ? title : 'Scan the QR Code'}
            </DialogTitle>
            <DialogDescription
              className={`
                text-center
              `}
            >
              {description && description.length > 0
                ? description
                : 'Scan the QR Code on your mobile device'}
            </DialogDescription>
          </DialogHeader>
          <QRCodeSVG value={value} className="h-60 w-60" />
        </div>
        {/* Adjust the Button's onClick to call `handlePrint` */}
        <Button
          onClick={handlePrint}
          className={`
          bg-velblue
          hover:bg-vellightblue
        `}
        >
          Print
        </Button>
      </DialogContent>
    </Dialog>
  );
}
