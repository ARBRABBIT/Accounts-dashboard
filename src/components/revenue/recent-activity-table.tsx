'use client';
import { useState, useMemo, useEffect } from 'react';
import { recentActivityItems, RecentActivityItem } from '@/lib/revenue-management-data';
import { Modal } from '@/components/ui/modal';
import { Pagination } from '@/components/ui/pagination';

interface RecentActivityTableProps {
  searchQuery?: string;
}

export function RecentActivityTable({ searchQuery = '' }: RecentActivityTableProps) {
  const [selectedItem, setSelectedItem] = useState<RecentActivityItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery?.trim()) return recentActivityItems;
    const q = searchQuery.toLowerCase().trim();
    return recentActivityItems.filter(
      (item) =>
        item.farmlandId.toLowerCase().includes(q) ||
        item.leadName.toLowerCase().includes(q) ||
        item.serviceType.toLowerCase().includes(q) ||
        item.amount.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q) ||
        item.time.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Reset page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Slice paginated items
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  return (
    <section aria-labelledby="recent-activity-heading" className="w-full">
      {/* Section Title */}
      <div className="mb-4 sm:mb-5 flex items-center justify-between">
        <h2
          id="recent-activity-heading"
          className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold leading-[36px] tracking-[-0.6px] text-[#1A1C1D]"
        >
          Recent Activity
        </h2>
        <span className="text-xs sm:text-sm font-medium text-[#5E5E63]">
          {filteredItems.length} {filteredItems.length === 1 ? 'record' : 'records'}
        </span>
      </div>

      {/* Elevated Table Container */}
      <div className="overflow-hidden rounded-[24px] border border-[#E5E5EA]/70 bg-white shadow-xs">
        {/* Horizontal scroll wrapper for small screens */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none">
                <th scope="col" className="pl-7 pr-4 py-3.5">
                  Farmland ID
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Lead Name
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Category
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Published Time
                </th>
                <th scope="col" className="pr-7 pl-4 py-3.5 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F2F2F2]">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-[#5E5E63]">
                    No recent activity records found matching &ldquo;{searchQuery}&rdquo;
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="h-[68px] sm:h-[72px] transition-colors hover:bg-subtle/60"
                  >
                    {/* Farmland ID - First Column */}
                    <td className="pl-7 pr-4 py-3 text-[13px] font-bold text-[#1A1C1D]">
                      {item.farmlandId}
                    </td>

                    {/* Lead Name with avatar */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatarUrl}
                          alt=""
                          aria-hidden="true"
                          className="h-[36px] w-[36px] rounded-full object-cover ring-1 ring-black/5 shrink-0"
                        />
                        <span className="text-[13px] font-semibold text-[#1A1C1D]">
                          {item.leadName}
                        </span>
                      </div>
                    </td>

                    {/* Category: Subscriptions, Farmland Services, External Verification */}
                    <td className="px-4 py-3 text-[12.5px] font-medium text-[#3D4949]">
                      {item.serviceType}
                    </td>



                    {/* Published Time */}
                    <td className="px-4 py-3 text-[12.5px] text-[#3D4949]">
                      {item.publishedTime}
                    </td>

                    {/* Action View Button */}
                    <td className="pr-7 pl-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="inline-flex items-center justify-center rounded-full bg-[#2780C4] px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.53px] text-white shadow-xs transition-all hover:bg-[#1f6da8] hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                      >
                        VIEW
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredItems.length > pageSize && (
          <Pagination
            total={filteredItems.length}
            page={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            itemLabel="activities"
          />
        )}
      </div>

      {selectedItem && (
        <Modal
          title={`Transaction: ${selectedItem.farmlandId} — ${selectedItem.leadName}`}
          onClose={() => setSelectedItem(null)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl bg-subtle p-4">
              <img
                src={selectedItem.avatarUrl}
                alt=""
                className="h-12 w-12 rounded-full object-cover ring-2 ring-brand/30 shrink-0"
              />
              <div>
                <p className="font-bold text-ink">{selectedItem.leadName}</p>
                <p className="text-xs font-semibold text-[#2780C4]">ID: {selectedItem.farmlandId}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-lg font-bold text-brand">{selectedItem.amount}</p>
                <span className="inline-block rounded-full bg-[#3C78B9] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  {selectedItem.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-line p-3">
                <span className="text-muted">Farmland ID</span>
                <p className="mt-1 font-bold text-ink">{selectedItem.farmlandId}</p>
              </div>
              <div className="rounded-xl border border-line p-3">
                <span className="text-muted">Category</span>
                <p className="mt-1 font-semibold text-ink">{selectedItem.serviceType}</p>
              </div>
              <div className="rounded-xl border border-line p-3">
                <span className="text-muted">Recorded Timestamp</span>
                <p className="mt-1 font-semibold text-ink">{selectedItem.time}</p>
              </div>
            </div>

            <div className="rounded-xl border border-line p-3 text-xs">
              <span className="text-muted">Ledger Published Time</span>
              <p className="mt-1 font-semibold text-ink">{selectedItem.publishedTime}</p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
