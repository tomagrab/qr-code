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
import { Button } from '../ui/button';

export default function QRCode() {
  // Function to handle print action
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <QRCodeSVG value="https://www.velocitor-qr-code.com/api" />
      </DialogTrigger>
      {/* Add the `printable-content` class to your DialogContent */}
      <DialogContent className="printable-content flex flex-col items-center">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>
            <h2 className="text-2xl font-bold">Scan QR Code</h2>
          </DialogTitle>
          <DialogDescription>
            Scan to open the most recent VEDR installation video
          </DialogDescription>
        </DialogHeader>
        <QRCodeSVG
          value="https://qr-code-seven-mauve.vercel.app/api"
          className="h-60 w-60"
        />
        {/* Adjust the Button's onClick to call `handlePrint` */}
        <Button onClick={handlePrint}>Print</Button>
      </DialogContent>
    </Dialog>
  );
}
