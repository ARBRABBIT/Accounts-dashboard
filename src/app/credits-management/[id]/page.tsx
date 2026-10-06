'use client';
import { useParams, useRouter } from 'next/navigation';
import { CreditsDetailsView } from '@/components/credits/credits-details-view';
import {
  agentCredits,
  userCredits,
  AgentCredit,
} from '@/lib/credits-management-data';

export default function CreditsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const allAccounts: AgentCredit[] = [...agentCredits, ...userCredits];
  const account =
    allAccounts.find((a) => a.id === id) ||
    allAccounts.find((a) => a.agentId === id) ||
    agentCredits[0];

  return (
    <div className="min-h-screen w-full bg-[#F2F2F2] p-4 sm:p-6 md:p-8 lg:p-12 font-sans">
      <div className="mx-auto max-w-[1332px]">
        <CreditsDetailsView
          agent={account}
          onBack={() => router.push('/credits-management')}
        />
      </div>
    </div>
  );
}

