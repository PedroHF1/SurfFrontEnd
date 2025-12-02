'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteBeachDialogProps {
  isOpen: boolean;
  beachName: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteBeachDialog({
  isOpen,
  beachName,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteBeachDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10'>
              <AlertTriangle className='h-5 w-5 text-destructive' />
            </div>
            <DialogTitle>Excluir Praia</DialogTitle>
          </div>
          <DialogDescription className='pt-3'>
            Tem certeza que deseja excluir{' '}
            <span className='font-semibold text-foreground'>{beachName}</span>? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2 sm:gap-0'>
          <Button variant='outline' onClick={onClose} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={onConfirm}
            loading={isDeleting}
            disabled={isDeleting}
            className='ml-2'
          >
            Excluir Praia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
