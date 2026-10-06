'use client';
import { useState } from 'react';
import { recentActivityItems, RecentActivityItem } from '@/lib/revenue-management-data';
import { Modal } from '@/components/ui/modal';

export function RecentActivityTable() {
  const [selectedItem, setSelectedItem] = useState<RecentActivityItem | null>(null);

  return (
    <section aria-labelledby="recent-activity-heading" className="w-full">
      {/* Section Title */}
      <h2
        id="recent-activity-heading"
        className="mb-6 text-[30px] sm:text-[34px] font-semibold leading-[40px] tracking-[-0.9px] text-[#1A1C1D]"
      >
        Recent Activity
      </h2>

      {/* Elevated Table Container */}
      <div className="overflow-hidden rounded-[24px] border border-[#E5E5EA]/70 bg-white shadow-xs">
        {/* Horizontal scroll wrapper for small screens */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none">
                <th scope="col" className="pl-7 pr-4 py-4">
                  Lead Name
                </th>
                <th scope="col" className="px-4 py-4">
                  Farmland ID
                </th>
                <th scope="col" className="px-4 py-4">
                  Time
                </th>
                <th scope="col" className="px-4 py-4">
                  Amount
                </th>
                <th scope="col" className="px-4 py-4">
                  Status
                </th>
                <th scope="col" className="px-4 py-4">
                  Published Time
                </th>
                <th scope="col" className="pr-7 pl-4 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F2F2F2]">
              {recentActivityItems.map((item) => (
                <tr
                  key={item.id}
                  className="h-[81px] transition-colors hover:bg-subtle/60"
                >
                  {/* Lead Name with avatar */}
                  <td className="pl-7 pr-4 py-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.avatarUrl}
                        alt=""
                        aria-hidden="true"
                        className="h-[35px] w-[35px] rounded-full object-cover ring-1 ring-black/5"
                      />
                      <span className="text-[12.3px] font-semibold text-[#1A1C1D]">
                        {item.leadName}
                      </span>
                    </div>
                  </td>

                  {/* Farmland ID */}
                  <td className="px-4 py-3 text-[12.3px] text-[#3D4949]">
                    {item.farmlandId}
                  </td>

                  {/* Time */}
                  <td className="px-4 py-3 text-[12.3px] text-[#3D4949]">
                    {item.time}
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3 text-[12.3px] font-semibold text-[#1D5E9C]">
                    {item.amount}
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-[#3C78B9] px-3 py-1 text-[10.5px] font-semibold text-white">
                      {item.status}
                    </span>
                  </td>

                  {/* Published Time */}
                  <td className="px-4 py-3 text-[12.3px] text-[#3D4949]">
                    {item.publishedTime}
                  </td>

                  {/* Action View Button */}
                  <td className="pr-7 pl-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.53px] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-brand ${
                        item.actionVariant === 'soft'
                          ? 'bg-[#96C9ED] text-[#000000] hover:bg-[#86bde3]'
                          : 'bg-[#2780C4] text-white hover:bg-brand/90'
                      }`}
                    >
                      VIEW
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <Modal
          title={`Lead Transaction: ${selectedItem.leadName}`}
          onClose={() => setSelectedItem(null)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl bg-subtle p-4">
              <img
                src={selectedItem.avatarUrl}
                alt=""
                className="h-12 w-12 rounded-full object-cover ring-2 ring-brand/30"
              />
              <div>
                <p className="font-bold text-ink">{selectedItem.leadName}</p>
                <p className="text-xs text-muted">ID: {selectedItem.farmlandId}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-lg font-bold text-brand">{selectedItem.amount}</p>
                <span className="inline-block rounded-full bg-[#3C78B9] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  {selectedItem.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-line p-3">
                <span className="text-muted">Recorded Timestamp</span>
                <p className="mt-1 font-semibold text-ink">{selectedItem.time}</p>
              </div>
              <div className="rounded-xl border border-line p-3">
                <span className="text-muted">Ledger Published</span>
                <p className="mt-1 font-semibold text-ink">{selectedItem.publishedTime}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
