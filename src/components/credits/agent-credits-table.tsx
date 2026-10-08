'use client';
import { AgentCredit } from '@/lib/credits-management-data';
import { Pagination } from '@/components/ui/pagination';
import { ArrowRight, MapPin } from 'lucide-react';

interface AgentCreditsTableProps {
  agents: AgentCredit[];
  activeTab?: 'Agents' | 'Users';
  onView: (agent: AgentCredit) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function AgentCreditsTable({
  agents,
  activeTab = 'Agents',
  onView,
  currentPage,
  pageSize,
  onPageChange,
}: AgentCreditsTableProps) {
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAgents = agents.slice(startIndex, startIndex + pageSize);
  const isUserTab = activeTab === 'Users';

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#E5E5EA]/80 bg-white shadow-xs">
      <div className="w-full flex-1 min-h-0 overflow-x-auto overflow-y-auto">
        <table
          className="w-full min-w-full border-collapse text-left"
          aria-label={`${activeTab} Credits Management Table`}
        >
          <thead>
            <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-[11px] sm:text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none sticky top-0 z-10 backdrop-blur-xs">
              <th scope="col" className="px-3 sm:px-4 lg:px-5 py-3 whitespace-nowrap">
                {isUserTab ? 'User ID' : 'Agent ID'}
              </th>
              <th scope="col" className="px-3 sm:px-4 lg:px-5 py-3 whitespace-nowrap">
                {isUserTab ? 'User' : 'Agent'}
              </th>
              <th scope="col" className="px-3 sm:px-4 lg:px-5 py-3 whitespace-nowrap">
                Location
              </th>
              <th
                scope="col"
                className="px-3 sm:px-4 lg:px-5 py-3 text-right whitespace-nowrap"
              >
                Total Credits
              </th>
              <th
                scope="col"
                className="px-3 sm:px-4 lg:px-5 py-3 text-right whitespace-nowrap"
              >
                Credits Used
              </th>
              <th
                scope="col"
                className="px-3 sm:px-4 lg:px-5 py-3 text-right whitespace-nowrap"
              >
                Cash Earned
              </th>
              <th
                scope="col"
                className="px-3 sm:px-4 lg:px-5 py-3 text-right whitespace-nowrap"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {paginatedAgents.map((agent) => (
              <tr
                key={agent.id}
                className="group transition-colors hover:bg-[#F8FAFC]"
              >
                {/* ID */}
                <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-lg bg-[#F1F5F9] px-2.5 py-1 text-xs font-bold text-[#00609A]">
                    {agent.agentId}
                  </span>
                </td>

                {/* Avatar & Name */}
                <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
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
                        {agent.role}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="shrink-0 text-[#00629E]" />
                    <span className="font-bold text-[#45474C] text-[11.5px] uppercase tracking-tight">
                      {agent.location}
                    </span>
                  </div>
                </td>

                {/* Total Credits */}
                <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 text-right font-extrabold tabular-nums text-sm text-[#091426] whitespace-nowrap">
                  {agent.totalCredits}
                </td>

                {/* Credits Used */}
                <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 text-right font-semibold tabular-nums text-sm text-[#46464A] whitespace-nowrap">
                  {agent.creditsUsed}
                </td>

                {/* Cash Earned */}
                <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 text-right font-bold tabular-nums text-sm whitespace-nowrap">
                  <span className="bg-gradient-to-r from-[#2780C4] to-[#154B73] bg-clip-text text-transparent">
                    {agent.formattedCashEarned}
                  </span>
                </td>

                {/* Action button: Details -> */}
                <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onView(agent)}
                    className="inline-flex items-center gap-1 rounded-full bg-[#2780C4] px-3.5 py-1 text-xs font-bold text-white shadow-xs transition hover:bg-[#1f6da9] hover:shadow-sm active:scale-95 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Consistent Pagination */}
      <Pagination
        total={agents.length}
        page={currentPage}
        pageSize={pageSize}
        itemLabel={isUserTab ? 'user credit accounts' : 'agent credit accounts'}
        onPageChange={onPageChange}
      />
    </div>
  );
}
