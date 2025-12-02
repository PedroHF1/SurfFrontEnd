'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface EmptyStatePopupProps {
  isVisible: boolean;
  onAddBeachClick?: () => void;
}

export function EmptyStatePopup({ isVisible, onAddBeachClick }: EmptyStatePopupProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className='fixed left-1/2 top-[180px] z-50 -translate-x-1/2'
        >
          <div className='relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-2xl p-6 max-w-md mx-4'>
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className='absolute top-2 right-2 text-white/80 hover:text-white transition-colors'
              aria-label='Fechar'
            >
              <X className='w-4 h-4' />
            </button>

            {/* Icon */}
            <div className='flex items-start gap-4'>
              <div className='bg-white/20 p-3 rounded-full backdrop-blur-sm'>
                <MapPin className='w-6 h-6' />
              </div>

              {/* Content */}
              <div className='flex-1 pr-4'>
                <h3 className='text-lg font-bold mb-2'>Adicione uma praia para começar! 🏖️</h3>
                <p className='text-sm text-white/90 mb-4'>
                  Você precisa adicionar uma praia para começar a ver as previsões de surf para
                  aquela localização.
                </p>

                {/* Action button */}
                {onAddBeachClick && (
                  <Button
                    onClick={onAddBeachClick}
                    size='sm'
                    className='bg-white text-blue-600 hover:bg-white/90 gap-2'
                  >
                    <Plus className='w-4 h-4' />
                    Adicionar Praia
                  </Button>
                )}
              </div>
            </div>

            {/* Decorative wave pattern */}
            <div className='absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-b-lg' />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
