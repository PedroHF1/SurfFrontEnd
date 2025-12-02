import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddBeach } from '@/interfaces/forecast';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddBeachDialogProps {
  onAddBeach: (beach: AddBeach) => void;
}

export function AddBeachDialog({ onAddBeach }: AddBeachDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newBeach, setNewBeach] = useState({
    name: '',
    position: '',
    lat: '',
    lng: '',
  });

  const handleSubmit = () => {
    if (newBeach.name && newBeach.lat && newBeach.lng) {
      const beach = {
        name: newBeach.name,
        lat: Number.parseFloat(newBeach.lat),
        lng: Number.parseFloat(newBeach.lng),
        position: newBeach.position,
      };
      onAddBeach(beach);
      setNewBeach({ name: '', lat: '', lng: '', position: '' });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className=' bg-gradient-to-r from-slate-100 to-slate-300 dark:from-slate-400 text-primary dark:to-slate-600 hover:bg-gradient-to-r dark:hover:from-slate-400 dark:hover:to-slate-600'
          size={'sm'}
          leftIcon={<Plus className='w-4 h-4 mr-2' />}
        >
          Adicionar Praia
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-background'>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Praia</DialogTitle>
          <DialogDescription className='text-slate-500'>
            Cadastre um novo pico de surf para acompanhar as condições
          </DialogDescription>
        </DialogHeader>
        <div className='grid  gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nome da Praia</Label>
              <Input
                id='name'
                value={newBeach.name}
                placeholder='Praia do Rosa'
                onChange={(e) => setNewBeach({ ...newBeach, name: e.target.value })}
                className='bg-background border-border dark:border-slate-600'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='position'>Posição da Praia</Label>
              <Select
                value={newBeach.position}
                onValueChange={(value) => setNewBeach({ ...newBeach, position: value })}
              >
                <SelectTrigger className='w-full dark:border-slate-600'>
                  <SelectValue placeholder='Selecione uma posição' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='north'>Norte</SelectItem>
                  <SelectItem value='south'>Sul</SelectItem>
                  <SelectItem value='east'>Leste</SelectItem>
                  <SelectItem value='west'>Oeste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='latitude'>Latitude</Label>
              <Input
                id='latitude'
                type='text'
                placeholder='-23.000372'
                step='any'
                value={newBeach.lat}
                onChange={(e) => {
                  let value = e.target.value;

                  value = value.replace(/[^-\d.]/g, '');

                  if (value.indexOf('-') > 0) {
                    value = value.replace(/-/g, '');
                  }

                  let parts = value.split('.');

                  if (parts[0]) {
                    const isNegative = parts[0].startsWith('-');
                    let integerPart = parts[0].replace('-', '');

                    if (integerPart.length >= 2) {
                      integerPart = integerPart.slice(0, 2);
                      if (parts.length === 1 && value.length >= (isNegative ? 3 : 2)) {
                        value = (isNegative ? '-' : '') + integerPart + '.';
                      } else {
                        const decimalPart = parts[1] ? parts[1].slice(0, 6) : '';
                        value = (isNegative ? '-' : '') + integerPart + '.' + decimalPart;
                      }
                    } else {
                      value = (isNegative ? '-' : '') + integerPart;
                    }
                  }

                  setNewBeach({ ...newBeach, lat: value });
                }}
                className='bg-background border-border dark:border-slate-600'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='longitude'>Longitude</Label>
              <Input
                id='longitude'
                type='text'
                placeholder='-43.365894'
                step='any'
                value={newBeach.lng}
                onChange={(e) => {
                  let value = e.target.value;

                  value = value.replace(/[^-\d.]/g, '');

                  if (value.indexOf('-') > 0) {
                    value = value.replace(/-/g, '');
                  }

                  let parts = value.split('.');

                  if (parts[0]) {
                    const isNegative = parts[0].startsWith('-');
                    let integerPart = parts[0].replace('-', '');

                    if (integerPart.length >= 2) {
                      integerPart = integerPart.slice(0, 2);
                      if (parts.length === 1 && value.length >= (isNegative ? 3 : 2)) {
                        value = (isNegative ? '-' : '') + integerPart + '.';
                      } else {
                        const decimalPart = parts[1] ? parts[1].slice(0, 6) : '';
                        value = (isNegative ? '-' : '') + integerPart + '.' + decimalPart;
                      }
                    } else {
                      value = (isNegative ? '-' : '') + integerPart;
                    }
                  }

                  setNewBeach({ ...newBeach, lng: value });
                }}
                className='bg-background border-border dark:border-slate-600'
              />
            </div>
          </div>
        </div>
        <div className='flex justify-end gap-2'>
          <Button variant='outline' onClick={() => setIsOpen(false)} className=''>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className='bg-gradient-to-r from-slate-100 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-black dark:text-white'
          >
            Adicionar Praia
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
