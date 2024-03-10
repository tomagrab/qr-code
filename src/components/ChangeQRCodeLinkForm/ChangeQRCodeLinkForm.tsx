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
import { useState } from 'react';
import { qr_code } from '@prisma/client';

type ChangeQRCodeLinkFormProps = {
  qrCodes: qr_code[];
};

export default function ChangeQRCodeLinkForm({
  qrCodes,
}: ChangeQRCodeLinkFormProps) {
  const [loading, setLoading] = useState(false);
  const [duplicateLinkMessage, setDuplicateLinkMessage] = useState('');
  const [qrCodeURL, setQRCodeURL] = useState(
    qrCodes.length > 0 ? qrCodes[0].youtube_url : '',
  );
  const form = useForm<z.infer<typeof ChangeYouTubeLinkFormSchema>>({
    resolver: zodResolver(ChangeYouTubeLinkFormSchema),
    defaultValues: {
      qrCodeURL: qrCodeURL || '',
    },
  });

  const checkIfYouTubeLinkExists = (url: string) => {
    const found = qrCodes.find(qrCode => qrCode.youtube_url === url);
    return found !== undefined;
  };

  const onSubmit = async (
    values: z.infer<typeof ChangeYouTubeLinkFormSchema>,
  ) => {
    setLoading(true);
    console.log('values', values);
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
            <FormItem
              className={`
                flex
                flex-col
                items-center`}
            >
              <FormLabel>YouTube Video Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  className={`
                    ${duplicateLinkMessage ? 'border-velorange ring-velorange ring-opacity-50' : 'border-vellink'}
                    focus-visible:border-vellink
                    focus-visible:ring-vellink
                    focus-visible:ring-opacity-50
                  `}
                  disabled={loading}
                  placeholder="YouTube video link..."
                  {...field}
                />
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
