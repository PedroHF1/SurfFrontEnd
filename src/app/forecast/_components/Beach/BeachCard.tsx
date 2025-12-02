'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Star, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatCoordinates, getDirectionArrow } from '@/lib/utils';
import { getQualityLabel } from '../../_utils';
import { Sparkline } from '../Sparkline';
import { ProcessedBeach } from '@/interfaces/forecast';
import { DeleteBeachDialog } from './DeleteBeachDialog';
import { deleteBeach } from '@/services/beach';
import { toast } from 'sonner';

interface BeachCardProps {
  beach: ProcessedBeach;
  selectedTimeIndex: number;
  className?: string;
  onDelete?: () => void;
}

export function BeachCard({ beach, selectedTimeIndex, className, onDelete }: BeachCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentData = beach.hourlyData[selectedTimeIndex] || beach.hourlyData[0];
  const quality = getQualityLabel(currentData.rating);
  const sparklineData = beach.hourlyData
    .slice(selectedTimeIndex, selectedTimeIndex + 12)
    .map((d) => d.waveHeight);

  const mapsUrl = `https://maps.google.com/?q=${beach.lat},${beach.lng}`;

  const handleDelete = async () => {
    if (!beach.name) return;

    setIsDeleting(true);
    try {
      await deleteBeach(beach.name);
      setIsDeleteDialogOpen(false);
      toast.success('Praia excluída com sucesso!', {
        description: `${beach.name} foi removida da sua lista de previsões.`,
      });
      onDelete?.();
    } catch (error) {
      console.error('Failed to delete beach:', error);
      toast.error('Falha ao excluir praia', {
        description: 'Ocorreu um erro ao excluir a praia. Por favor, tente novamente.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPosition = (position: string) => {
    switch (position) {
      case 'north':
        return 'Norte';
      case 'south':
        return 'Sul';
      case 'east':
        return 'Leste';
      case 'west':
        return 'Oeste';
      default:
        return position;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn('group', className)}
    >
      <Card className='bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-shadow duration-200'>
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between'>
            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <h3 className='font-semibold text-lg text-card-foreground'>{beach.name}</h3>
                <Badge
                  variant='secondary'
                  className={cn(
                    'text-xs',
                    beach.position === 'north'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                  )}
                >
                  {formatPosition(beach.position)}
                </Badge>
              </div>

              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-3 w-3',
                        i < Math.floor(currentData.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground',
                      )}
                    />
                  ))}
                  <span className='text-sm text-muted-foreground ml-1'>
                    {currentData.rating.toFixed(1)}
                  </span>
                </div>

                <Badge className={cn('text-xs', quality.color)}>{quality.label}</Badge>
              </div>
            </div>

            <div className='flex items-center gap-1'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsDeleteDialogOpen(true)}
                className='p-1 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsExpanded(!isExpanded)}
                className='p-1 h-8 w-8'
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <ChevronDown className='h-4 w-4' />
                </motion.div>
              </Button>
            </div>
          </div>

          <Button
            variant='link'
            size='sm'
            className='justify-start p-0 h-auto text-xs text-muted-foreground hover:text-foreground'
            rightIcon={<ExternalLink className='h-3 w-3' />}
          >
            <a
              href={mapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1'
            >
              {formatCoordinates(beach.lat, beach.lng)}
            </a>
          </Button>
        </CardHeader>

        <CardContent className='pt-0'>
          <motion.div
            className='grid grid-cols-3 gap-4 mb-4'
            key={selectedTimeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className='text-center'>
              <div className='flex items-center justify-center gap-1 mb-1'>
                <span className='text-sm font-medium text-muted-foreground'>Ondas</span>
                <motion.svg
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='text-chart-1'
                  style={{ transform: getDirectionArrow(currentData.waveDirection) }}
                  animate={{ rotate: currentData.waveDirection }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <path d='M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z' />
                </motion.svg>
              </div>
              <div className='text-lg font-bold text-foreground'>{currentData.waveHeight}m</div>
            </div>

            <div className='text-center'>
              <div className='flex items-center justify-center gap-1 mb-1'>
                <span className='text-sm font-medium text-muted-foreground'>Swell</span>
                <motion.svg
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='text-chart-2'
                  style={{ transform: getDirectionArrow(currentData.swellDirection) }}
                  animate={{ rotate: currentData.swellDirection }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <path d='M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z' />
                </motion.svg>
              </div>
              <div className='text-lg font-bold text-foreground'>{currentData.swellHeight}m</div>
              <div className='text-xs text-muted-foreground'>@ {currentData.swellPeriod}s</div>
            </div>

            <div className='text-center'>
              <div className='flex items-center justify-center gap-1 mb-1'>
                <span className='text-sm font-medium text-muted-foreground'>Vento</span>
                <motion.svg
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='text-chart-3'
                  style={{ transform: getDirectionArrow(currentData.windDirection) }}
                  animate={{ rotate: currentData.windDirection }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <path d='M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z' />
                </motion.svg>
              </div>
              <div className='text-lg font-bold text-foreground'>{currentData.windSpeed}kt</div>
            </div>
          </motion.div>

          <div className='mb-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs text-muted-foreground'>Altura das Ondas - Próximas 12h</span>
            </div>
            <Sparkline data={sparklineData} className='h-8' />
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className='overflow-hidden'
              >
                <div className='border-t border-border pt-4'>
                  <h4 className='text-sm font-medium text-foreground mb-3'>Próximas 6 Horas</h4>
                  <div className='space-y-2'>
                    {beach.hourlyData
                      .slice(selectedTimeIndex, selectedTimeIndex + 6)
                      .map((data, index) => (
                        <div key={data.time} className='flex items-center justify-between text-xs'>
                          <span className='text-muted-foreground'>
                            {new Date(data.time).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <div className='flex items-center gap-4'>
                            <span>{data.waveHeight}m</span>
                            <span>{data.windSpeed}kt</span>
                            <div className='flex items-center gap-1'>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    'h-2 w-2',
                                    i < Math.floor(data.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-muted-foreground',
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <DeleteBeachDialog
        isOpen={isDeleteDialogOpen}
        beachName={beach.name}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
}
