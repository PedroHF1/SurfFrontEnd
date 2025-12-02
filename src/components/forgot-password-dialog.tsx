'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ForgotPasswordProps, ForgotPasswordSchema } from '@/schemas/auth/forgot-password.schema';
import { forgotPassword } from '@/services/auth';
import { AxiosError } from 'axios';
import { Mail, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ForgotPasswordDialog({ trigger, open, onOpenChange }: ForgotPasswordDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ForgotPasswordProps>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordProps) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await forgotPassword(data.email);
      setSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || 'Failed to send reset email. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSuccess(false);
      setError(null);
      reset();
    }
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Mail className='h-5 w-5 text-primary' />
            Esqueceu a Senha
          </DialogTitle>
          <DialogDescription>
            {success
              ? 'Verifique seu e-mail para instruções de redefinição'
              : 'Digite seu endereço de e-mail e enviaremos um link para redefinir sua senha'}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className='space-y-4'>
            <Alert className='border-green-500 bg-green-50 dark:bg-green-950'>
              <CheckCircle2 className='h-4 w-4 text-green-600' />
              <AlertDescription className='text-green-800 dark:text-green-200'>
                E-mail de redefinição de senha enviado com sucesso! Por favor, verifique sua caixa
                de entrada e siga as instruções para redefinir sua senha.
              </AlertDescription>
            </Alert>
            <Button onClick={() => handleOpenChange(false)} className='w-full'>
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='forgot-email'>Email</Label>
              <Input
                id='forgot-email'
                type='email'
                placeholder='your@email.com'
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && <p className='text-red-400 text-sm'>{errors.email.message}</p>}
            </div>

            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-2'>
              <Button type='submit' className='flex-1' loading={isLoading} disabled={isLoading}>
                Enviar Link de Redefinição
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
