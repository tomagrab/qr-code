'use client';

import { PDFUploadFromSchema } from '@/lib/schemas/PDFUploadFormSchema/PDFUploadFormSchema';
import type { PutBlobResult } from '@vercel/blob';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PDFUploadForm() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [duplicateLinkMessage, setDuplicateLinkMessage] = useState('');
  const [fileError, setFileError] = useState('');

  const form = useForm<z.infer<typeof PDFUploadFromSchema>>({
    resolver: zodResolver(PDFUploadFromSchema),
  });

  const onSubmit = async (values: z.infer<typeof PDFUploadFromSchema>) => {
    setLoading(true);
    setDuplicateLinkMessage('');

    if (values.pdf) {
      const response = await fetch(
        `/api/avatar/upload?filename=${values.pdf.name}`,
        {
          method: 'POST',
          body: values.pdf,
        },
      );

      const newBlob = (await response.json()) as PutBlobResult;

      setBlob(newBlob);
    }
  };

  return (
    <>
      <h3
        className={`
            text-center
            text-2xl
            font-semibold
            text-gray-800
        `}
      >
        Upload QRG PDF
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="pdf"
            render={({ field }) => (
              <FormItem
                className={`
                flex
                flex-col
                items-center`}
              >
                <FormLabel>Upload QRG PDF</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    disabled={loading}
                    placeholder="QRG PDF..."
                    className={`
                    ${duplicateLinkMessage ? 'border-velorange ring-velorange ring-opacity-50' : 'border-vellink'}
                    focus-visible:border-vellink
                    focus-visible:ring-vellink
                    focus-visible:ring-opacity-50
                  `}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`
                rounded-md
                bg-velgreen
                p-2
                font-semibold
                text-white
                transition
                duration-300
                ease-in-out
                hover:bg-velorange
                `}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload a PDF'}
          </Button>
        </form>

        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </Form>
    </>
  );
}
