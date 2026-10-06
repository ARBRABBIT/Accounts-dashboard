import { Button } from '@/components/ui/button';
import { Table, TableCell, TableHead } from '@/components/ui/table';
import type { Region } from '@/lib/regions';

export function RegionTable({ regions, onSelect }: { regions: Region[]; onSelect: (region: Region) => void }) {
  return (
    <Table aria-label="Farmland revenue by region">
      <thead>
        <tr>
          <TableHead scope="col">Region</TableHead>
          <TableHead scope="col" className="text-right">Land sold</TableHead>
          <TableHead scope="col" className="text-right">Revenue</TableHead>
          <TableHead scope="col" className="text-right">Actions</TableHead>
        </tr>
      </thead>
      <tbody>
        {regions.map(region => (
          <tr key={region.name} className="region-row border-t border-line transition-colors hover:bg-subtle">
            <th scope="row" className="px-6 py-5 text-base font-semibold">{region.name}</th>
            <TableCell className="text-right tabular-nums">{region.acres} <span className="text-muted">Acres</span></TableCell>
            <TableCell className="text-right text-lg font-bold text-brand tabular-nums">₹{region.revenue} Cr</TableCell>
            <TableCell className="text-right">
              <Button variant="primary" size="compact" aria-label={`View Mandals for ${region.name}`} onClick={() => onSelect(region)}>View Mandals</Button>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
