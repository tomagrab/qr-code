'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ChangeYouTubeLinkFormSchema } from '@/lib/schemas/ChangeYouTubeLinkFormSchema/ChangeYouTubeLinkFormSchema';
import { ChangeYouTubeLink } from '@/actions/ChangeYouTubeLink/ChangeYouTubeLink';
import { useState } from 'react';
import { QRCodes } from '../../../db/schema';

type ChangeQRCodeLinkFormProps = {
  qrCodes: QRCodes;
};

export default function ChangeQRCodeLinkForm({
  qrCodes,
}: ChangeQRCodeLinkFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof ChangeYouTubeLinkFormSchema>>({
    resolver: zodResolver(ChangeYouTubeLinkFormSchema),
    defaultValues: {
      qrCodeURL: 'https://www.youtube.com/watch?v=Fyvit9gG8Yo',
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

    if (checkIfYouTubeLinkExists(values.qrCodeURL)) {
      console.log('YouTube link already exists');
      form.reset();
      setLoading(false);
      return;
    }

    const newQRCode = await ChangeYouTubeLink(values);

    if (newQRCode !== null) {
      console.log('Success');
    } else {
      console.log('Error');
    }

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
        <Button type="submit" disabled={loading}>
          {loading ? 'Changing Link...' : 'Change QR Code Link'}
        </Button>
      </form>
    </Form>
  );
}
