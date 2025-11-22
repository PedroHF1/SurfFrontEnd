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
}

export function BeachList({ beaches, selectedTimeIndex, sortBy, searchQuery }: BeachListProps) {
  const filteredAndSortedBeaches = useMemo(() => {
    let filtered = beaches;

    // Apply search filter
    if (searchQuery) {
      filtered = beaches.filter((beach) =>
        beach.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply sorting
    return sortBeaches(filtered, sortBy);
  }, [beaches, sortBy, searchQuery]);

  // if (filteredAndSortedBeaches.length === 0) {
  //   return (
  //     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-12'>
  //       <div className='text-muted-foreground'>
  //         {searchQuery ? `No beaches found matching "${searchQuery}"` : ''}
  //       </div>
  //     </motion.div>
  //   );
  // }

  return (
    <motion.div
      className='space-y-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.04 }}
    >
      <AnimatePresence mode='popLayout'>
        {filteredAndSortedBeaches.map((beach, index) => (
          <BeachCard key={beach.name} beach={beach} selectedTimeIndex={selectedTimeIndex} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
