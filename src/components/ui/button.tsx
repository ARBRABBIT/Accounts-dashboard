import { ButtonHTMLAttributes } from 'react';
export function Button({variant='secondary',size='default',className='',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'primary'|'secondary'|'icon';size?:'default'|'compact'}) {
 const sizing=variant==='primary'?(size==='compact'?'min-h-10 px-5 text-sm':'min-h-14 px-6 text-[17px]'):'';
 const styles={primary:'bg-action text-white rounded-full font-medium hover:bg-brand',secondary:'bg-surface border border-line rounded-full px-5 py-2.5 text-sm hover:bg-subtle',icon:'rounded-full p-2 hover:bg-white'};
 return <button className={`inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-30 ${styles[variant]} ${sizing} ${className}`} {...props}/>;
}
