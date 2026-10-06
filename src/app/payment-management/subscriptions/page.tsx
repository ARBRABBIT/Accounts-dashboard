'use client';
import { useRouter } from 'next/navigation';
import { SubscriptionPaymentsView } from '@/components/payments/subscription-payments-view';

export default function SubscriptionPaymentsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#F2F2F2] p-4 sm:p-6 md:p-8 lg:p-12 font-sans">
      <div className="mx-auto max-w-[1332px]">
        <SubscriptionPaymentsView
          onBack={() => router.push('/payment-management')}
        />
      </div>
    </div>
  );
}

