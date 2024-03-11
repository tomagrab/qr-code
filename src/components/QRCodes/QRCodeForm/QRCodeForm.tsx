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
import { qr_code } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type QRCodeFormProps = {
  qr_code?: qr_code;
};

export default function QRCodeForm({ qr_code }: QRCodeFormProps) {
  const form = useForm<z.infer<typeof QRCodeFormSchema>>({
    resolver: zodResolver(QRCodeFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof QRCodeFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
