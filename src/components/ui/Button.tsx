import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      isLoading,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-medium tracking-tight transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed';

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
      md: 'text-sm px-6 py-3 rounded-full gap-2',
      lg: 'text-base px-8 py-4 rounded-full gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-zinc-100 text-zinc-950 font-semibold hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-[0.98]',
      secondary:
        'bg-zinc-900 text-zinc-100 border border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 hover:text-white active:scale-[0.98]',
      outline:
        'bg-transparent text-zinc-200 border border-zinc-700/80 hover:bg-zinc-900/50 hover:border-zinc-400 active:scale-[0.98]',
      ghost:
        'bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 px-3 py-2 rounded-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ y: 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="transition-transform duration-200 group-hover:-translate-x-0.5">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && !isLoading && (
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
