'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80 dark:text-black',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:text-black',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 dark:text-black',
    outline: 'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:text-black'
  };

  // Wymuszenie czarnego tekstu w trybie ciemnym dla wszystkich tagów
  const darkModeOverride = 'dark:!text-black';
  const classes = `${baseClasses} ${variantClasses[variant]} ${darkModeOverride} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
} 