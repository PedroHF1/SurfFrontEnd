'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ResetPasswordProps, ResetPasswordSchema } from '@/schemas/auth/reset-password.schema';
import { resetPassword } from '@/services/auth';
import { AxiosError } from 'axios';
import { Lock, CheckCircle2, AlertCircle, GalleryVerticalEnd } from 'lucide-react';

interface Props {
  params: { token: string };
}

export default function ResetPasswordPage({ params }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ResetPasswordProps>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  useEffect(() => {
    const loadToken = async () => {
      const { token } = await params;
      console.log('token', token);
      if (token) {
        setValue('token', token);
      }
    };
    loadToken();
  }, [params, setValue]);

  const onSubmit = async (data: ResetPasswordProps) => {
    setIsLoading(true);
    setError(null);
    try {
      await resetPassword({
        email: data.email,
        token: data.token,
        password: data.password,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        const message = error.response?.data.message;
        if (message?.includes('expired')) {
          setError('Your reset token has expired. Please request a new password reset.');
        } else if (message?.includes('invalid')) {
          setError('Invalid reset token. Please request a new password reset.');
        } else {
          setError(message || 'Failed to reset password. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='/' className='flex items-center gap-2 font-medium'>
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Web Surf
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-md'>
            <Card className='border-2'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-2xl'>
                  <Lock className='h-6 w-6 text-primary' />
                  Reset Password
                </CardTitle>
                <CardDescription>
                  {success
                    ? 'Your password has been reset successfully'
                    : 'Enter your email and new password'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success ? (
                  <Alert className='border-green-500 bg-green-50 dark:bg-green-950'>
                    <CheckCircle2 className='h-4 w-4 text-green-600' />
                    <AlertTitle className='text-green-800 dark:text-green-200'>Success!</AlertTitle>
                    <AlertDescription className='text-green-800 dark:text-green-200'>
                      Your password has been updated successfully. Redirecting to login...
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='your@email.com'
                        {...register('email')}
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className='text-red-400 text-sm'>{errors.email.message}</p>
                      )}
                    </div>

                    <input type='hidden' {...register('token')} />

                    <div className='space-y-2'>
                      <Label htmlFor='password'>New Password</Label>
                      <Input
                        id='password'
                        type='password'
                        placeholder='Enter new password'
                        {...register('password')}
                        disabled={isLoading}
                      />
                      {errors.password && (
                        <p className='text-red-400 text-sm'>{errors.password.message}</p>
                      )}
                      <p className='text-xs text-muted-foreground'>
                        Password must be at least 6 characters and contain uppercase, lowercase, and
                        numbers
                      </p>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='confirmPassword'>Confirm Password</Label>
                      <Input
                        id='confirmPassword'
                        type='password'
                        placeholder='Confirm new password'
                        {...register('confirmPassword')}
                        disabled={isLoading}
                      />
                      {errors.confirmPassword && (
                        <p className='text-red-400 text-sm'>{errors.confirmPassword.message}</p>
                      )}
                    </div>

                    {error && (
                      <Alert variant='destructive'>
                        <AlertCircle className='h-4 w-4' />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type='submit'
                      className='w-full'
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      Reset Password
                    </Button>

                    <div className='text-center text-sm'>
                      Remember your password?{' '}
                      <a href='/login' className='underline underline-offset-4'>
                        Back to login
                      </a>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block'>
        <img
          src='/image.png'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}
