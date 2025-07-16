'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { TitleBar } from '@/features/dashboard/TitleBar';

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
};

const AddMembersPage = () => {
  const t = useTranslations('AddMembers');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      // Używamy relatywnego URL, aby automatycznie dopasował się do aktualnego hosta i portu
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add member');
      }

      toast({
        title: t('success_title'),
        description: t('success_description'),
      });

      reset();
    } catch (error) {
      console.error('Error adding member:', error);
      toast({
        title: t('error_title'),
        description: typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : t('error_description'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="mt-8 max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">{t('email_label')}</Label>
            <Input
              id="email"
              placeholder={t('email_placeholder')}
              {...register('email', {
                required: t('email_required'),
                pattern: {
                  value: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
                  message: t('email_invalid'),
                },
              })}
              className="mb-1"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">{t('first_name_label')}</Label>
            <Input
              id="firstName"
              type="text"
              placeholder={t('first_name_placeholder')}
              {...register('firstName', {
                required: t('first_name_required'),
              })}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">{t('last_name_label')}</Label>
            <Input
              id="lastName"
              type="text"
              placeholder={t('last_name_placeholder')}
              {...register('lastName', {
                required: t('last_name_required'),
              })}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('submitting') : t('submit')}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddMembersPage;
