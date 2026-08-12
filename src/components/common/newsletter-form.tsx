'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const newsletterSchema = z.object({
  email: z.string().email('Email tidak valid'),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  className?: string;
  onSubmit?: (data: NewsletterValues) => Promise<void>;
}

export function NewsletterForm({ className, onSubmit }: NewsletterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit = async (data: NewsletterValues) => {
    setIsLoading(true);
    try {
      await onSubmit?.(data);
      setIsSuccess(true);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={className}>
        <p className="text-sm text-muted-foreground">
          Terima kasih telah berlangganan! Kami akan mengirim info terbaru ke email Anda.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email Anda"
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Langganan'}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
