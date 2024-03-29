'use client';

import { QRCodeFormSchema } from '@/lib/schemas/QRCodeFormSchema/QRCodeFormSchema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { qr_code } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreateQRCode, UpdateQRCode } from '@/actions/QRCodes/QRCodesActions';
import { Switch } from '@/components/ui/switch';
import { usePathname } from 'next/navigation';
import TipTap from '@/components/ui/tip-tap';

type QRCodeFormProps = {
  qr_code?: qr_code;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function QRCodeForm({
  qr_code,
  isOpen,
  setIsOpen,
}: QRCodeFormProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUrlInUse, setIsUrlInUse] = useState(false);

  const form = useForm<z.infer<typeof QRCodeFormSchema>>({
    resolver: zodResolver(QRCodeFormSchema),
    defaultValues: {
      title: qr_code?.title ?? '',
      description: qr_code?.description ?? '',
      active: qr_code?.active ?? true,
      archived: qr_code?.archived ?? false,
      youtube_url: qr_code?.youtube_url ?? 'https://www.velocitor-qr-code.com/',
    },
  });

  const onSubmit = async (values: z.infer<typeof QRCodeFormSchema>) => {
    setLoading(true);
    setErrorMessage(null);
    setIsUrlInUse(false);

    if (!values) {
      setErrorMessage('Failed to create QR code');
      setLoading(false);
      return;
    }

    // Convert archived to boolean
    if (typeof values.archived === 'string') {
      values.archived = values.archived === 'true';
    }

    let response;
    if (qr_code) {
      response = await UpdateQRCode(qr_code.id, values);
    } else {
      response = await CreateQRCode(values);
    }

    // Assuming the backend functions return a similar structure
    // Check for existing QR Code in the response
    if (response?.existingQRCode) {
      setIsUrlInUse(true);
      setErrorMessage(response.message);
    } else if (!response) {
      setErrorMessage('Failed to create QR code');
    }

    setLoading(false);

    if (response && !response.existingQRCode) {
      form.reset();
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`
          flex
          flex-col
          gap-4
          p-2
        `}
      >
        <div
          className={`
              flex
              items-center
              justify-between
              `}
        >
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem
                className={`
                  flex
                  items-center
                  gap-2
                  space-y-0
                `}
              >
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    disabled={loading}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="archived"
            render={({ field }) => (
              <FormItem
                className={`
                  flex
                  items-center
                  gap-2
                  space-y-0
                `}
              >
                <FormLabel>Archived</FormLabel>
                <FormControl>
                  <Switch
                    disabled={loading}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="QR Code Title..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <TipTap
                  limit={500}
                  loading={loading}
                  content={field.value}
                  onChange={e => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="youtube_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube URL</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="YouTube URL..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pdf_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF URL</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="PDF URL..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {qr_code && loading && pathname.includes('QRCodeLogs')
            ? 'Reverting...'
            : qr_code && loading
              ? 'Updating...'
              : loading
                ? 'Creating...'
                : qr_code && pathname.includes('QRCodeLogs')
                  ? 'Revert'
                  : qr_code
                    ? 'Update'
                    : 'Create'}
        </Button>

        {errorMessage ? (
          <Alert variant={`destructive`}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription
              className={`

              `}
            >
              {errorMessage}
            </AlertDescription>
          </Alert>
        ) : null}
      </form>
    </Form>
  );
}
