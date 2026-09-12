import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'gold';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  dot = false,
  className = '',
}) => {
  const styles = {
    default: 'bg-zinc-900/80 border-zinc-800 text-zinc-300',
    accent: 'bg-lime-950/40 border-lime-500/30 text-lime-400',
    outline: 'bg-transparent border-zinc-800 text-zinc-400',
    gold: 'bg-amber-950/30 border-amber-500/30 text-amber-300',
  };

  const dotColors = {
    default: 'bg-zinc-400',
    accent: 'bg-lime-400 animate-pulse',
    outline: 'bg-zinc-500',
    gold: 'bg-amber-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border backdrop-blur-md ${styles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
