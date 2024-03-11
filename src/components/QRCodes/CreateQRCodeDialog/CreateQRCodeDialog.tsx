import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import QRCodeForm from '@/components/QRCodes/QRCodeForm/QRCodeForm';

export default function CreateQRCodeDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create QR Code</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-2xl font-bold">Create QR Code</span>
          </DialogTitle>
          <DialogDescription>
            This form will allow you to create a new QR code
          </DialogDescription>
        </DialogHeader>
        <QRCodeForm />
      </DialogContent>
    </Dialog>
  );
}
