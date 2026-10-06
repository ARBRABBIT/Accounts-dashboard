'use client';
import { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';
export function Modal({title,children,onClose}:{title:string;children:React.ReactNode;onClose:()=>void}) {
 const titleId=useId();
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{ const d=ref.current; d?.showModal(); return ()=>{d?.close();}; },[]);
 return <dialog ref={ref} aria-labelledby={titleId} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}} className="m-auto w-[calc(100%-40px)] max-w-lg max-h-[calc(100dvh-40px)] overflow-y-auto rounded-card border border-line bg-surface p-7 text-ink shadow-xl backdrop:bg-black/25"><div className="mb-6 flex items-center justify-between gap-4"><h2 id={titleId} className="text-xl font-bold">{title}</h2><Button variant="icon" onClick={onClose} aria-label="Close dialog"><X size={20}/></Button></div>{children}</dialog>;
}
