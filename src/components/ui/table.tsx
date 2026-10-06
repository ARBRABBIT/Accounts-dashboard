import type { ComponentProps } from 'react';

export function Table({
  children,
  className = '',
  ...props
}: ComponentProps<'table'>) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E5E5EA]/70 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table
          className={`w-full min-w-[700px] border-collapse text-left ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableHead({
  className = '',
  ...props
}: ComponentProps<'th'>) {
  return (
    <th
      className={`border-b border-[#F2F2F2] bg-[#FAFBFD]/80 px-6 sm:px-8 py-4 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none ${className}`}
      {...props}
    />
  );
}

export function TableCell({
  className = '',
  ...props
}: ComponentProps<'td'>) {
  return <td className={`px-6 sm:px-8 py-4 sm:py-5 ${className}`} {...props} />;
}
