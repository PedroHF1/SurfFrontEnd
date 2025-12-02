'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface FiltersSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    minRating: number;
    position: 'all' | 'north' | 'south';
    maxWind: number;
    minSwellPeriod: number;
    timeOfDay: string[];
  };
  onFiltersChange: (filters: any) => void;
}

const TIME_OF_DAY_OPTIONS = [
  { value: 'dawn', label: 'Madrugada', hours: [5, 6, 7] },
  { value: 'morning', label: 'Manhã', hours: [8, 9, 10, 11] },
  { value: 'afternoon', label: 'Tarde', hours: [12, 13, 14, 15, 16] },
  { value: 'evening', label: 'Entardecer', hours: [17, 18, 19] },
  { value: 'night', label: 'Noite', hours: [20, 21, 22, 23, 0, 1, 2, 3, 4] },
];

export function FiltersSheet({ isOpen, onClose, filters, onFiltersChange }: FiltersSheetProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      minRating: 0,
      position: 'all' as const,
      maxWind: 50,
      minSwellPeriod: 0,
      timeOfDay: [],
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const toggleTimeOfDay = (timeValue: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      timeOfDay: prev.timeOfDay.includes(timeValue)
        ? prev.timeOfDay.filter((t) => t !== timeValue)
        : [...prev.timeOfDay, timeValue],
    }));
  };

  const togglePosition = (position: 'north' | 'south') => {
    setLocalFilters((prev) => ({
      ...prev,
      position: prev.position === position ? 'all' : position,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50'
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className='fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-lg z-50 overflow-y-auto'
          >
            <div className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-lg font-semibold text-card-foreground'>Filtrar Condições</h2>
                <Button variant='ghost' size='icon' onClick={onClose} className='h-8 w-8'>
                  <X className='h-4 w-4' />
                </Button>
              </div>

              <div className='space-y-6'>
                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>Avaliação Mínima</Label>
                  <div className='px-2'>
                    <Slider
                      value={[localFilters.minRating]}
                      onValueChange={([value]) =>
                        setLocalFilters((prev) => ({ ...prev, minRating: value }))
                      }
                      max={5}
                      min={0}
                      step={0.5}
                      className='w-full'
                    />
                    <div className='flex justify-between text-xs text-muted-foreground mt-1'>
                      <span>0</span>
                      <span className='font-medium'>{localFilters.minRating}</span>
                      <span>5</span>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>Posição</Label>
                  <div className='flex gap-2'>
                    <Button
                      variant={localFilters.position === 'north' ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => togglePosition('north')}
                      className='flex-1'
                    >
                      Norte
                    </Button>
                    <Button
                      variant={localFilters.position === 'south' ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => togglePosition('south')}
                      className='flex-1'
                    >
                      Sul
                    </Button>
                  </div>
                </div>

                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>Velocidade Máxima do Vento (kt)</Label>
                  <div className='px-2'>
                    <Slider
                      value={[localFilters.maxWind]}
                      onValueChange={([value]) =>
                        setLocalFilters((prev) => ({ ...prev, maxWind: value }))
                      }
                      max={50}
                      min={0}
                      step={1}
                      className='w-full'
                    />
                    <div className='flex justify-between text-xs text-muted-foreground mt-1'>
                      <span>0</span>
                      <span className='font-medium'>{localFilters.maxWind}</span>
                      <span>50</span>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>Período Mínimo do Swell (s)</Label>
                  <div className='px-2'>
                    <Slider
                      value={[localFilters.minSwellPeriod]}
                      onValueChange={([value]) =>
                        setLocalFilters((prev) => ({ ...prev, minSwellPeriod: value }))
                      }
                      max={20}
                      min={0}
                      step={1}
                      className='w-full'
                    />
                    <div className='flex justify-between text-xs text-muted-foreground mt-1'>
                      <span>0</span>
                      <span className='font-medium'>{localFilters.minSwellPeriod}</span>
                      <span>20</span>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <Label className='text-sm font-medium'>Período do Dia</Label>
                  <div className='flex flex-wrap gap-2'>
                    {TIME_OF_DAY_OPTIONS.map((option) => (
                      <Badge
                        key={option.value}
                        variant={
                          localFilters.timeOfDay.includes(option.value) ? 'default' : 'outline'
                        }
                        className='cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors'
                        onClick={() => toggleTimeOfDay(option.value)}
                      >
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex gap-3 mt-8 pt-6 border-t border-border'>
                <Button
                  variant='outline'
                  onClick={handleReset}
                  className='flex-1 gap-2 bg-transparent'
                  leftIcon={<RotateCcw className='h-4 w-4' />}
                >
                  Redefinir
                </Button>
                <Button onClick={handleApply} className='flex-1'>
                  Aplicar Filtros
                </Button>
              </div>

              {(localFilters.minRating > 0 ||
                localFilters.position !== 'all' ||
                localFilters.maxWind < 50 ||
                localFilters.minSwellPeriod > 0 ||
                localFilters.timeOfDay.length > 0) && (
                <div className='mt-6 p-4 bg-muted rounded-lg'>
                  <h3 className='text-sm font-medium mb-2'>Filtros Ativos</h3>
                  <div className='space-y-1 text-xs text-muted-foreground'>
                    {localFilters.minRating > 0 && (
                      <div>Avaliação Mín: {localFilters.minRating}+</div>
                    )}
                    {localFilters.position !== 'all' && (
                      <div>Posição: {localFilters.position === 'north' ? 'Norte' : 'Sul'}</div>
                    )}
                    {localFilters.maxWind < 50 && <div>Vento Máx: {localFilters.maxWind}kt</div>}
                    {localFilters.minSwellPeriod > 0 && (
                      <div>Período Swell Mín: {localFilters.minSwellPeriod}s</div>
                    )}
                    {localFilters.timeOfDay.length > 0 && (
                      <div>
                        Horário:{' '}
                        {localFilters.timeOfDay
                          .map((t) => TIME_OF_DAY_OPTIONS.find((o) => o.value === t)?.label)
                          .join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
