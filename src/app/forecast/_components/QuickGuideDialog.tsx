'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Sparkles, Plus, List } from 'lucide-react';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'forecast-quick-guide-shown';

interface QuickGuideDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const guideSteps = [
  {
    title: 'Welcome to Surf Forecast! 🏄‍♂️',
    description: 'Let\'s take a quick tour to help you get started with tracking your favorite surf spots.',
    icon: Sparkles,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          This page shows real-time surf conditions for beaches around the world. 
          You can view wave heights, wind speeds, and optimal surfing times.
        </p>
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-foreground">
            💡 <strong>Tip:</strong> Use the date and time selectors in the header to check future conditions!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Adding Your Favorite Beaches',
    description: 'Easily add new surf spots to track conditions.',
    icon: Plus,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          To add a new beach, click the <strong className="text-foreground">"Add Beach"</strong> button 
          in the top-right corner of the page.
        </p>
        <div className="relative bg-gradient-to-r from-slate-100 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Plus className="w-4 h-4" />
            <span>Add Beach</span>
          </div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg">
              👆
            </div>
          </motion.div>
        </div>
        <p className="text-sm text-muted-foreground">
          You'll need to provide the beach name, position, and coordinates (latitude/longitude).
        </p>
      </div>
    ),
  },
  {
    title: 'Your Beach List',
    description: 'View and manage all your tracked beaches.',
    icon: List,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Once you add beaches, they'll appear in the <strong className="text-foreground">beach list</strong> below 
          the header. Each card shows current conditions including:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Wave Height</div>
            <div className="text-lg font-semibold text-blue-500">1.5m</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Wind Speed</div>
            <div className="text-lg font-semibold text-cyan-500">12 km/h</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Rating</div>
            <div className="text-lg font-semibold text-green-500">⭐ 4.5</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Period</div>
            <div className="text-lg font-semibold text-purple-500">8s</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
          <p className="text-sm text-foreground">
            🌊 <strong>Pro Tip:</strong> Use filters and sorting to find the best conditions quickly!
          </p>
        </div>
      </div>
    ),
  },
];

export function QuickGuideDialog({ isOpen, onClose }: QuickGuideDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    onClose();
  };

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const currentStepData = guideSteps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-background max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <StepIcon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <DialogTitle className="text-xl">{currentStepData.title}</DialogTitle>
                <DialogDescription className="text-sm">
                  {currentStepData.description}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground -mt-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="py-4"
          >
            {currentStepData.content}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex gap-1.5">
            {guideSteps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'w-2 bg-muted'
                }`}
                initial={false}
                animate={{
                  scale: index === currentStep ? 1 : 0.8,
                }}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious} size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              {currentStep === guideSteps.length - 1 ? (
                'Got it!'
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useQuickGuide() {
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem(STORAGE_KEY);
    if (!hasSeenGuide) {
      // Small delay to ensure page has loaded
      const timer = setTimeout(() => {
        setShowGuide(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return {
    showGuide,
    closeGuide: () => setShowGuide(false),
  };
}
