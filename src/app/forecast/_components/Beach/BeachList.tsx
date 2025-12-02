'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sortBeaches } from '../../_utils';
import { BeachCard } from './BeachCard';

interface BeachListProps {
  beaches: any[];
  selectedTimeIndex: number;
  sortBy: string;
  searchQuery: string;
  onDelete?: () => void;
}

export function BeachList({
  beaches,
  selectedTimeIndex,
  sortBy,
  searchQuery,
  onDelete,
}: BeachListProps) {
  const filteredAndSortedBeaches = useMemo(() => {
    let filtered = beaches;

    if (searchQuery) {
      filtered = beaches.filter((beach) =>
        beach.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return sortBeaches(filtered, sortBy);
  }, [beaches, sortBy, searchQuery]);

  return (
    <motion.div
      className='space-y-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.04 }}
    >
      <AnimatePresence mode='popLayout'>
        {filteredAndSortedBeaches.map((beach, index) => (
          <BeachCard
            key={beach.name}
            beach={beach}
            selectedTimeIndex={selectedTimeIndex}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
