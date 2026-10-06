'use client';
import { useState } from 'react';
import { Palette, PanelsTopLeft, LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input, Select } from './ui/form-controls';
import { Modal } from './ui/modal';
import { Pagination } from './ui/pagination';
import { SummaryMetric } from './ui/summary-metric';
import { Table, TableCell, TableHead } from './ui/table';

export function DesignSystemExamples() {
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState('Pages');
  const [state, setState] = useState('Data');
  return <div className="space-y-6">
    <Example title="08 · Form controls" description="Shared Input and Select primitives. Labels remain visible; helper and error text link to the control. Tab through the examples to inspect focus.">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-semibold">Region<Select className="mt-2" defaultValue="All regions"><option>All regions</option><option>Mahabubnagar</option></Select></label>
        <label className="text-sm font-semibold">Reporting date<Input type="date" className="mt-2"/><span className="mt-2 block font-normal text-muted">Use native date selection.</span></label>
        <div><label htmlFor="ds-invalid" className="text-sm font-semibold">Required name</label><Input id="ds-invalid" aria-invalid="true" aria-describedby="ds-error" className="mt-2"/><p id="ds-error" className="mt-2 text-sm text-danger">Enter a name to continue.</p></div>
        <label className="text-sm font-semibold">Disabled field<Input disabled value="Unavailable" readOnly className="mt-2"/></label>
      </div>
    </Example>
    <Example title="09 · Dialogs" description="Use Modal for focused tasks. It traps keyboard focus, restores focus to the trigger, supports Escape, and scrolls within the viewport.">
      <Button onClick={() => setModal(true)}>Open dialog example</Button>
      {modal && <Modal title="Dialog example" onClose={() => setModal(false)}><p className="mb-6 text-sm leading-6 text-muted">Use a clear title, brief supporting text, and one primary action. Press Escape or use the close button to dismiss.</p><Button variant="primary" className="w-full" onClick={() => setModal(false)}>Done</Button></Modal>}
    </Example>
    <Example title="10 · Summary metrics" description="Original Figma icons, uppercase labels, and optional units. Horizontal on desktop; vertically stacked at 640px and below.">
      <div className="summary !mt-0 flex items-center rounded-panel border border-panel-line bg-surface"><SummaryMetric icon="imgContainer" label="State" value="Telangana"/><SummaryMetric icon="imgContainer1" label="Total revenue" value="₹40.60 Cr" revenue/><SummaryMetric icon="imgContainer2" label="Total acres" value="567" unit="Acres"/></div>
    </Example>
    <Example title="11 · Pagination & navigation" description="Current page uses brand color; unavailable directions are disabled. Preview tabs have an explicit selected state. The floating navigation below uses real routes.">
      <Pagination total={18} page={page} onPageChange={setPage}/>
      <div role="tablist" aria-label="Navigation state examples" className="inline-flex rounded-full border border-line p-1.5 shadow-lg">
        {['Pages','Design system'].map((name,i) => <button key={name} role="tab" id={`ds-tab-${i}`} aria-controls={`ds-panel-${i}`} aria-selected={tab===name} onClick={()=>setTab(name)} className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tab===name?'bg-brand text-white':'text-muted hover:bg-subtle'}`}>{i===0?<PanelsTopLeft size={17}/>:<Palette size={17}/>} {name}</button>)}
      </div>
      {['Pages','Design system'].map((name,i)=><p key={name} role="tabpanel" id={`ds-panel-${i}`} aria-labelledby={`ds-tab-${i}`} hidden={tab!==name} className="mt-3 text-sm text-muted">{name} is selected in this state preview.</p>)}
    </Example>
    <Example title="12 · Table states" description="Data, empty, and loading patterns use the same container and columns. Announce asynchronous updates; never display invented financial data.">
      <label className="mb-4 block max-w-xs text-sm font-semibold">Preview state<Select className="mt-2" value={state} onChange={e=>setState(e.target.value)}>{['Data','Empty','Loading'].map(s=><option key={s}>{s}</option>)}</Select></label>
      <Table aria-label="Table state preview" aria-busy={state==='Loading'}><thead><tr><TableHead scope="col">Region</TableHead><TableHead scope="col" className="text-right">Revenue</TableHead><TableHead scope="col" className="text-right">Action</TableHead></tr></thead><tbody>{state==='Data'?<tr className="border-t border-line"><th scope="row" className="px-6 py-5 font-semibold">Mahabubnagar</th><TableCell className="text-right font-bold text-brand">₹24.01 Cr</TableCell><TableCell className="text-right"><Button variant="primary" size="compact" onClick={()=>setModal(true)}>View Mandals</Button></TableCell></tr>:<tr><TableCell colSpan={3} className="!py-12 text-center text-muted"><span role="status" className="inline-flex items-center gap-2">{state==='Loading'&&<LoaderCircle className="animate-spin" size={18}/>} {state==='Loading'?'Loading regions…':'No regions to display.'}</span></TableCell></tr>}</tbody></Table>
    </Example>
    <Example title="13 · Interaction & responsive rules" description="A consistent contract for every screen built with this system.">
      <div className="grid gap-6 text-sm leading-7 text-muted sm:grid-cols-2"><div><p className="font-bold text-ink">States and accessibility</p><p>Hover: subtle surface or darker brand. Focus: 3px brand outline with 4px offset. Disabled actions: 30% opacity. Invalid fields: danger border with associated message. Dialogs use unique accessible titles. Numeric columns align right and use tabular figures.</p></div><div><p className="font-bold text-ink">Layout and motion</p><p>Maximum page width: 1440px. Desktop gutters: 62px; tablet: 32px at 1100px; mobile: 20px at 640px. Tables keep a 640px minimum width and scroll within their container. Keep 100–110px bottom space for floating navigation. GSAP entrance: 450ms, 60ms stagger; reduced motion disables animation.</p></div></div>
    </Example>
  </div>;
}
function Example({title,description,children}:{title:string;description:string;children:React.ReactNode}) {
  return <section className="rounded-card border border-line bg-surface p-6 sm:p-8"><h2 className="text-xl font-bold">{title}</h2><p className="mt-2 mb-6 text-sm leading-6 text-muted">{description}</p>{children}</section>;
}
