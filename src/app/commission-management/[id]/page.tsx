'use client';
import { useParams, useRouter } from 'next/navigation';
import { CommissionDetailsView } from '@/components/commission/commission-details-view';
import { agentCommissions } from '@/lib/commission-management-data';

export default function AgentCommissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params?.id as string;

  const agent =
    agentCommissions.find((a) => a.id === agentId) ||
    agentCommissions.find((a) => a.agentId === agentId) ||
    agentCommissions[2]; // Default fallback to Arjun (comm-3) if not found

  return (
    <div className="min-h-screen w-full bg-[#F2F2F2] p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="mx-auto max-w-[1332px]">
        <CommissionDetailsView
          agent={agent}
          onBack={() => router.push('/commission-management')}
        />
      </div>
    </div>
  );
}

