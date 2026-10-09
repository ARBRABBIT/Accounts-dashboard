'use client';
import {
  ChevronRight,
  MapPin,
  Building2,
  FileText,
  ShieldCheck,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  LandPlot,
  Coins,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PropertyCommissionDeal, AgentCommission } from '@/lib/commission-management-data';

interface FarmlandDetailViewProps {
  deal: PropertyCommissionDeal;
  agent: AgentCommission;
  onBack: () => void;
  onBackToManagement?: () => void;
}

export function FarmlandDetailView({
  deal,
  agent,
  onBack,
  onBackToManagement,
}: FarmlandDetailViewProps) {
  const isSettled = deal.status === 'Settled';

  const documents = [
    {
      id: 'DOC-COMM-101',
      title: 'Dharani Digital RoR-1B Title Record',
      category: 'Title & Ownership',
      size: '2.4 MB',
      date: deal.settlementDate || 'OCT 12, 2023',
      verified: true,
    },
    {
      id: 'DOC-COMM-102',
      title: '30-Year Encumbrance Certificate (Nil-EC)',
      category: 'Encumbrance Clearances',
      size: '3.1 MB',
      date: 'OCT 08, 2023',
      verified: true,
    },
    {
      id: 'DOC-COMM-103',
      title: 'Cadastral Tippon & Geo-FMB Boundary Map',
      category: 'Cadastral Survey Map',
      size: '5.8 MB',
      date: 'OCT 05, 2023',
      verified: true,
    },
    {
      id: 'DOC-COMM-104',
      title: 'Sec 22-A Non-Government Clearance Report',
      category: 'Government Clearances',
      size: '1.9 MB',
      date: 'OCT 01, 2023',
      verified: true,
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Breadcrumb Navigation */}
      <div>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-1.5 text-base sm:text-lg font-semibold min-h-10 -mt-1"
        >
          <button
            type="button"
            onClick={onBackToManagement || onBack}
            className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
          >
            Commission Management
          </button>
          <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
          <button
            type="button"
            onClick={onBack}
            className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
          >
            Commission Details ({agent.name})
          </button>
          <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
          <span className="text-black font-bold">
            {deal.landId}
          </span>
        </nav>
      </div>

      {/* Property Hero Banner */}
      <section
        aria-label="Farmland Property Banner"
        className="w-full"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <img
              src={deal.imageUrl}
              alt={deal.landId}
              className="h-32 w-32 sm:h-36 sm:w-36 rounded-2xl object-cover ring-2 ring-black/5 shadow-sm shrink-0"
            />
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center rounded-lg bg-[#F1F5F9] px-3 py-1 text-sm font-bold text-[#00609A]">
                  {deal.landId}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    isSettled
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSettled ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  {deal.status}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF4FB] px-3 py-1 text-xs font-semibold text-[#00609A] border border-[#2780C4]/20">
                  <ShieldCheck size={13} className="text-[#2780C4]" />
                  Dharani Verified RoR-1B
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191C1E]">
                  Farmland Parcel — {deal.landId}
                </h1>
                <p className="mt-1 text-sm text-[#5E5E63]">
                  Purchased by <strong className="text-[#191C1E]">{deal.customerName}</strong> in {deal.location}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5E5E63] pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#86868B]" />
                  <span>{deal.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LandPlot size={14} className="text-[#86868B]" />
                  <span>{deal.acres || '14.50 Acres'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#86868B]" />
                  <span>Settled: {deal.settlementDate || 'OCT 12, 2023'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => alert(`Downloading registry dossier for ${deal.landId}...`)}
              className="inline-flex items-center gap-2 rounded-full bg-[#2780C4] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1f6da8] hover:shadow-md cursor-pointer"
            >
              <Download size={14} />
              <span>Download Dossier</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Financial & Settlement Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[22px] border border-[#E5E5EA]/70 bg-white p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            TOTAL SALE VALUE
          </span>
          <p className="mt-2 text-2xl font-bold text-[#191C1E]">
            {deal.saleValue}
          </p>
          <span className="mt-1 block text-xs text-[#64748B]">
            Registered transaction amount
          </span>
        </div>

        <div className="rounded-[22px] border border-[#E5E5EA]/70 bg-white p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            EARNED COMMISSION
          </span>
          <p className="mt-2 text-2xl font-bold text-[#2780C4]">
            {deal.earnedAmount}
          </p>
          <span className="mt-1 block text-xs font-medium text-emerald-600">
            5.0% commission disbursed
          </span>
        </div>

        <div className="rounded-[22px] border border-[#E5E5EA]/70 bg-white p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            SETTLEMENT STATUS
          </span>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                isSettled ? 'bg-[#2780C4] text-white' : 'bg-[#EF4646] text-white'
              }`}
            >
              {deal.status}
            </span>
          </div>
          <span className="mt-1 block text-xs text-[#64748B]">
            {isSettled ? 'RTGS Escrow Verified' : 'Awaiting Final Clearing'}
          </span>
        </div>

        <div className="rounded-[22px] border border-[#E5E5EA]/70 bg-white p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            ASSIGNED AGENT
          </span>
          <div className="mt-2 flex items-center gap-2.5">
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="h-7 w-7 rounded-full object-cover ring-1 ring-black/5"
            />
            <span className="text-base font-bold text-[#191C1E]">{agent.name}</span>
          </div>
          <span className="mt-1 block text-xs text-[#64748B]">
            {agent.role || 'Senior Sales Agent'}
          </span>
        </div>
      </div>

      {/* Two Column Section: Property Specs & Verification Documents */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Property & GIS Specifications */}
        <div className="flex flex-col gap-4 rounded-[28px] border border-[#E5E5EA]/70 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2F2F2]">
            <h3 className="text-lg font-bold text-[#191C1E]">
              Property Specifications & GIS Data
            </h3>
            <span className="rounded-full bg-[#EAF4FB] px-2.5 py-0.5 text-xs font-semibold text-[#00609A]">
              TS Dharani Linked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
            <div className="rounded-xl bg-[#FAFBFD] border border-[#E5E5EA] p-3.5">
              <span className="font-medium text-[#64748B] uppercase tracking-wider text-[10.5px]">
                Survey Number
              </span>
              <p className="mt-1 text-sm font-bold text-[#191C1E]">
                {deal.surveyNumber || 'Sy. No. 412/A'}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAFBFD] border border-[#E5E5EA] p-3.5">
              <span className="font-medium text-[#64748B] uppercase tracking-wider text-[10.5px]">
                Registered Extent
              </span>
              <p className="mt-1 text-sm font-bold text-[#191C1E]">
                {deal.acres || '14.50 Acres'}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAFBFD] border border-[#E5E5EA] p-3.5">
              <span className="font-medium text-[#64748B] uppercase tracking-wider text-[10.5px]">
                Mandal & District
              </span>
              <p className="mt-1 text-sm font-bold text-[#191C1E]">
                {deal.location}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAFBFD] border border-[#E5E5EA] p-3.5">
              <span className="font-medium text-[#64748B] uppercase tracking-wider text-[10.5px]">
                E-Passbook Number
              </span>
              <p className="mt-1 text-sm font-bold text-[#191C1E]">
                {deal.passbookNo || 'T28190048123'}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAFBFD] border border-[#E5E5EA] p-3.5 sm:col-span-2">
              <span className="font-medium text-[#64748B] uppercase tracking-wider text-[10.5px]">
                Land Use Classification
              </span>
              <p className="mt-1 text-sm font-bold text-[#191C1E]">
                {deal.landUse || 'Managed Farmland Agroforestry & Sustainable Crop Cultivation'}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 text-xs text-[#475569] space-y-1.5 mt-2">
            <div className="flex items-center gap-2 font-bold text-[#1E293B]">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Full Encumbrance Verification Complete</span>
            </div>
            <p className="leading-relaxed">
              No registered mortages or legal claims pending on this parcel. All municipal and sub-registrar stamps certified under Telangana Farmland Act.
            </p>
          </div>
        </div>

        {/* Right Column: Registry Verification Documents */}
        <div className="flex flex-col gap-4 rounded-[28px] border border-[#E5E5EA]/70 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F2F2F2]">
            <h3 className="text-lg font-bold text-[#191C1E]">
              Verification Documents & Clearances
            </h3>
            <span className="text-xs font-semibold text-[#64748B]">
              4 / 4 Available
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-xl border border-[#E5E5EA] bg-[#FAFBFD] p-3.5 transition-colors hover:bg-white hover:border-[#2780C4]/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2780C4]/10 text-[#2780C4]">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#191C1E]">
                      {doc.title}
                    </h4>
                    <p className="text-[11px] text-[#64748B]">
                      {doc.category} • {doc.size} • {doc.date}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Viewing document: ${doc.title}`)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#64748B] hover:bg-[#2780C4]/10 hover:text-[#2780C4] transition-colors cursor-pointer"
                  title="View Document"
                  aria-label={`View document ${doc.title}`}
                >
                  <Download size={15} />
                </button>
              </div>
            ))}
          </div>

          {/* Audit Ledger Footnote */}
          <div className="mt-2 flex items-center justify-between rounded-xl bg-[#F0FDF4] border border-emerald-200/60 p-3 text-xs text-emerald-800">
            <span className="font-semibold">
              Registry Transaction Reference: TXN-GLC-{deal.id.toUpperCase()}-2023
            </span>
            <span className="font-bold">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

