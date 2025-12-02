'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth';
import { cn } from '@/lib/utils';
import { LoginProps, LoginSchema } from '@/schemas/auth/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { GalleryVerticalEnd } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ForgotPasswordDialog } from '@/components/forgot-password-dialog';
import Image from 'next/image';

export default function PageLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginProps) => {
    setIsLoading(true);
    console.log(data);
    try {
      await login(data);
      setError(null);
      router.push('/forecast');
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-center'>
          <a href='#' className='flex items-center gap-2 font-semibold text-2xl'>
            <Image src='/surfing.png' width={30} height={30} alt='Logo' />
            Web Surf
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <form className={'flex flex-col gap-6'} onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col items-center gap-2 text-center '>
                <h1 className='text-2xl font-bold'>Entre na sua conta</h1>
                <p className='text-balance text-sm text-muted-foreground'>
                  Digite seu e-mail abaixo para entrar na sua conta
                </p>
              </div>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='your@email.com'
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className='text-red-400 text-sm mt-1'>{errors.email.message}</p>
                  )}
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Senha</Label>
                    <button
                      type='button'
                      onClick={() => setForgotPasswordOpen(true)}
                      className='ml-auto text-sm underline-offset-4 hover:underline'
                    >
                      Esqueceu sua senha?
                    </button>
                  </div>
                  <Input id='password' type='password' {...register('password')} />
                  {errors.password && (
                    <p className='text-red-400 text-sm mt-1'>{errors.password.message}</p>
                  )}
                </div>

                {error && (
                  <Alert variant={'destructive'}>
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type='submit' className='w-full' loading={isLoading} disabled={isLoading}>
                  Entrar
                </Button>
              </div>
              <div className='text-center text-sm'>
                Não tem uma conta?{' '}
                <a href='/register' className='underline underline-offset-4'>
                  Cadastre-se
                </a>
              </div>
            </form>
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

      <ForgotPasswordDialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen} />
    </div>
  );
}
