'use client';
import { AgentCommission } from '@/lib/commission-management-data';
import { Pagination } from '@/components/ui/pagination';
import { CheckCircle2, Clock } from 'lucide-react';

interface AgentCommissionTableProps {
  agents: AgentCommission[];
  onView: (agent: AgentCommission) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function AgentCommissionTable({
  agents,
  onView,
  currentPage,
  pageSize,
  onPageChange,
}: AgentCommissionTableProps) {
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAgents = agents.slice(startIndex, startIndex + pageSize);

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#E5E5EA]/80 bg-white shadow-xs">
      <div className="w-full flex-1 min-h-0 overflow-x-auto overflow-y-auto">
        <table
          className="w-full min-w-[850px] border-collapse text-left"
          aria-label="Agent Commissions Table"
        >
          <thead>
            <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none sticky top-0 z-10 backdrop-blur-xs">
              <th scope="col" className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                Farmland ID
              </th>
              <th scope="col" className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                Agent
              </th>
              <th scope="col" className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                Region
              </th>
              <th scope="col" className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                District / Area
              </th>
              <th scope="col" className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                Date
              </th>
              <th scope="col" className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 text-right">
                Amount
              </th>
              <th scope="col" className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 text-center">
                Status
              </th>
              <th scope="col" className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {paginatedAgents.map((agent) => {
              const isPaid = agent.status === 'Paid';

              return (
                <tr
                  key={agent.id}
                  className="group transition-colors hover:bg-[#F8FAFC]"
                >
                  {/* Farmland ID column - FIRST */}
                  <td className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                    <span className="inline-flex items-center rounded-lg bg-[#F1F5F9] px-2.5 py-1 text-xs font-bold text-[#00609A]">
                      {agent.landId}
                    </span>
                  </td>

                  {/* Agent column */}
                  <td className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={agent.avatarUrl}
                        alt={agent.name}
                        className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-black/5"
                      />
                      <div>
                        <div className="font-bold text-[#191C1E] text-sm">
                          {agent.name}
                        </div>
                        <div className="text-[11px] font-medium text-[#64748B]">
                          {agent.role || 'Partner Agent'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Region column */}
                  <td className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                    <span className="font-semibold text-[#191C1E] text-sm">
                      {agent.region}
                    </span>
                  </td>

                  {/* District / Area column */}
                  <td className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5">
                    <span className="font-medium text-[#46464A] text-sm">
                      {agent.areaOrDistrict}
                    </span>
                  </td>

                  {/* Date column */}
                  <td className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 text-sm font-medium text-[#5E5E63] tabular-nums">
                    {agent.date}
                  </td>

                  {/* Amount column */}
                  <td className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 text-right font-bold tabular-nums text-sm sm:text-base">
                    <span className="bg-gradient-to-r from-[#2780C4] to-[#154B73] bg-clip-text text-transparent">
                      {agent.formattedAmount}
                    </span>
                  </td>

                  {/* Status column */}
                  <td className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.5px] ${
                        isPaid
                          ? 'bg-[#DCFCE7] text-[#16A34A]'
                          : 'bg-[#FFEDD5] text-[#EA580C]'
                      }`}
                    >
                      {isPaid ? (
                        <CheckCircle2 size={12} className="stroke-[2.5]" />
                      ) : (
                        <Clock size={12} className="stroke-[2.5]" />
                      )}
                      <span>{agent.status}</span>
                    </span>
                  </td>

                  {/* Action column */}
                  <td className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => onView(agent)}
                      className="inline-flex items-center justify-center rounded-full bg-[#3D93D1] px-4 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#2780C4] active:scale-95 focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination component matching GLC design system */}
      <Pagination
        total={agents.length}
        page={currentPage}
        pageSize={pageSize}
        itemLabel="agent commission entries"
        onPageChange={onPageChange}
      />
    </div>
  );
}
