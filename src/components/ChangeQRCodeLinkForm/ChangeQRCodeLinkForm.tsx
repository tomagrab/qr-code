'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeYouTubeLinkFormSchema } from '@/lib/schemas/ChangeYouTubeLinkFormSchema/ChangeYouTubeLinkFormSchema';
import { ChangeYouTubeLink } from '@/actions/ChangeYouTubeLink/ChangeYouTubeLink';
import { useState } from 'react';
import { QRCodes } from '@/lib/Types/DBTypes/DBTypes';

type ChangeQRCodeLinkFormProps = {
  qrCodes: QRCodes;
};

export default function ChangeQRCodeLinkForm({
  qrCodes,
}: ChangeQRCodeLinkFormProps) {
  const [loading, setLoading] = useState(false);
  const [duplicateLinkMessage, setDuplicateLinkMessage] = useState('');
  const [qrCodeURL, setQRCodeURL] = useState(
    qrCodes.length > 0 ? qrCodes[0].url : '',
  );
  const form = useForm<z.infer<typeof ChangeYouTubeLinkFormSchema>>({
    resolver: zodResolver(ChangeYouTubeLinkFormSchema),
    defaultValues: {
      qrCodeURL: qrCodeURL || '',
    },
  });

  const checkIfYouTubeLinkExists = (url: string) => {
    const found = qrCodes.find(qrCode => qrCode.url === url);
    return found !== undefined;
  };

  const onSubmit = async (
    values: z.infer<typeof ChangeYouTubeLinkFormSchema>,
  ) => {
    setLoading(true);
    setDuplicateLinkMessage('');
    setQRCodeURL(values.qrCodeURL);

    if (checkIfYouTubeLinkExists(values.qrCodeURL)) {
      setLoading(false);
      setDuplicateLinkMessage('This is the current QR code link');
      await ChangeYouTubeLink(values);
      form.reset();
      return;
    }

    await ChangeYouTubeLink(values);

    form.reset();
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`
          flex
          flex-col
          gap-4
        `}
        data-testid="change-qr-code-link-form"
      >
        <FormField
          control={form.control}
          name="qrCodeURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube Video Link</FormLabel>
              <FormControl>
                <Input placeholder="YouTube video link..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className={`
          ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${duplicateLinkMessage ? 'bg-velorange hover:bg-vellightorange' : 'bg-velblue text-white hover:bg-vellightblue'}
        `}
        >
          {duplicateLinkMessage
            ? duplicateLinkMessage
            : loading
              ? 'Loading...'
              : 'Change QR Code Link'}
        </Button>
      </form>
    </Form>
  );
}
