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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { qr_code } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreateQRCode, UpdateQRCode } from '@/actions/QRCodes/QRCodesActions';

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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUrlInUse, setIsUrlInUse] = useState(false);

  const form = useForm<z.infer<typeof QRCodeFormSchema>>({
    resolver: zodResolver(QRCodeFormSchema),
    defaultValues: {
      title: qr_code?.title || '',
      description: qr_code?.description || '',
      archived: qr_code?.archived || false,
      youtube_url: qr_code?.youtube_url || undefined,
      pdf_url: qr_code?.pdf_url || undefined,
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
          space-y-8
          p-2
        `}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="QR Code Title..." {...field} />
              </FormControl>
              <FormDescription>
                The title of the QR code. Must be at least 3 characters long.
              </FormDescription>
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
                <Textarea placeholder="QR Code Description..." {...field} />
              </FormControl>
              <FormDescription>
                The description of the QR code. Must be at least 3 characters
                long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="archived"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Archived</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value!.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>
                      {field.value.toString() === 'true' ? 'Yes' : 'No'}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
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
                <Input placeholder="YouTube URL..." {...field} />
              </FormControl>
              <FormDescription>
                The YouTube URL for the QR code. Must be a valid URL.
              </FormDescription>
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
                <Input placeholder="PDF URL..." {...field} />
              </FormControl>
              <FormDescription>
                The PDF URL for the QR code. Must be a valid URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {qr_code && loading
            ? 'Updating...'
            : qr_code
              ? 'Update'
              : loading
                ? 'Creating...'
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
