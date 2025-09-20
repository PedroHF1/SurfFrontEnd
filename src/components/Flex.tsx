import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> { }

export const Flex = ({ children, className, ...props }: Props) => {
  return (
    <div className={cn('flex', className)} {...props}>
      {children}
    </div>
  );
};
