import type { ComponentProps } from 'react';

const controlStyles = 'w-full rounded-xl border border-line bg-surface p-3 text-sm text-ink transition-colors disabled:cursor-not-allowed disabled:bg-subtle disabled:text-muted aria-invalid:border-danger';

export function Input({ className = '', ...props }: ComponentProps<'input'>) {
  return <input className={`${controlStyles} ${className}`} {...props} />;
}

export function Select({ className = '', ...props }: ComponentProps<'select'>) {
  return <select className={`${controlStyles} ${className}`} {...props} />;
}
