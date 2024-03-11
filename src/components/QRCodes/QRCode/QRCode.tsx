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
  value: string;
};

export default function QRCode({ value }: QRCodeProps) {
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
            <DialogTitle>
              <span className="text-2xl font-bold">Scan QR Code</span>
            </DialogTitle>
            <DialogDescription>
              Scan to open the most recent VEDR installation video
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
