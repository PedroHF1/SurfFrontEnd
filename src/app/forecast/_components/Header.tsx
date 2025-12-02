'use client';

import { Search, Plus, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AddBeachDialog } from './Beach/AddBeachDialog';
import { AddBeach } from '@/interfaces/forecast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import moment from 'moment';
import { HourBar } from './TimeBar';

interface HeaderProps {
  beachCount: number;
  searchQuery: string;
  isPanelExpanded: boolean;
  onSearchChange: (query: string) => void;
  onAddBeach: (payload: AddBeach) => void;
  onOpenFilters: () => void;
  onTogglePanel: () => void;
  dateTimes: string[];
  onDateSelect: (date: string) => void;
  selectedDate: string;
  selectedTime: string;
  handleTimeSelect: (time: string) => void;
}

export function Header({
  beachCount,
  onTogglePanel,
  dateTimes,
  onDateSelect,
  searchQuery,
  isPanelExpanded,
  onSearchChange,
  onAddBeach,
  onOpenFilters,
  handleTimeSelect,
  selectedDate,
  selectedTime,
}: HeaderProps) {
  const date = dateTimes.map((time) => moment(time).format('YYYY-MM-DD'));
  const dateFormatted = new Set(date);
  return (
    <motion.header
      className='border-b border-border bg-card/50 backdrop-blur-sm max-md:overflow-auto'
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className='mx-auto px-4 py-4'>
        <div className='flex items-center max-md:flex-col max-md:w-full justify-between gap-4'>
          <div className='flex items-center max-md:flex-col max-md:w-full gap-4'>
            <Button
              variant='ghost'
              size='sm'
              onClick={(e) => {
                e.stopPropagation();
                onTogglePanel();
              }}
              className='text-slate-400 hover:text-white max-md:hidden'
            >
              {isPanelExpanded ? (
                <ChevronDown className='w-5 h-5' />
              ) : (
                <ChevronUp className='w-5 h-5' />
              )}
            </Button>
            <motion.h1
              className='text-2xl font-bold text-foreground max-md:flex'
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.1 }}
            >
              Praias
              <Button
                variant='ghost'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePanel();
                }}
                className='text-slate-400 hover:text-white max-md:flex hidden'
              >
                {isPanelExpanded ? (
                  <ChevronDown className='w-5 h-5' />
                ) : (
                  <ChevronUp className='w-5 h-5' />
                )}
              </Button>
            </motion.h1>

            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Buscar praias...'
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className='pl-10 w-64 bg-background/50'
              />
            </div>

            <div>
              <Select defaultValue={Array.from(dateFormatted)[0]} onValueChange={onDateSelect}>
                <SelectTrigger>
                  <span className='text-gray-500 text-sm'>Data: </span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(dateFormatted).map((date) => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <HourBar
              times={dateTimes}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
            />
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='secondary'
              size='sm'
              onClick={onOpenFilters}
              className='gap-2 bg-gradient-to-r to-slate-100 from-slate-300 dark:to-slate-400 text-primary dark:from-slate-600 hover:bg-gradient-to-r dark:hover:to-slate-400 dark:hover:from-slate-600'
              leftIcon={<Filter className='h-4 w-4 ' />}
            >
              Todas Condições
            </Button>

            <AddBeachDialog onAddBeach={onAddBeach} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
