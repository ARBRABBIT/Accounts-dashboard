'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import {
  ArrowLeft,
  Home,
  Sprout,
  Shield,
  Droplets,
  Calendar as CalendarIcon,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  ArrowUpRight,
  Map,
  Wallet,
  Wrench,
  Search,
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Pagination } from '@/components/ui/pagination';
import { BackButton } from '@/components/ui/back-button';
import {
  serviceCategories,
  zoneServiceStats,
  organicFarmingStats,
  getConstructionProjectsForZone,
  ServiceCategory,
  ZoneServiceStat,
  OrganicFarmingStat,
  ConstructionProject,
} from '@/lib/farmland-services-data';

export default function FarmlandServicesPage() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('farmhouse-construction');
  const [organicSubCategory, setOrganicSubCategory] = useState<'standard' | 'timber'>('standard');
  const [selectedZone, setSelectedZone] = useState<ZoneServiceStat | null>(null);
  const [selectedOrganicZone, setSelectedOrganicZone] = useState<OrganicFarmingStat | null>(null);
  const [selectedProject, setSelectedProject] = useState<ConstructionProject | null>(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Fiscal Year 2025-26');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Ongoing' | 'Completed'>('All');

  const activeService =
    serviceCategories.find((s) => s.id === selectedServiceId) ||
    serviceCategories[0];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-top-card',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
      gsap.fromTo(
        '.zone-table-row',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  function handleBack() {
    if (selectedProject) {
      setSelectedProject(null);
      return;
    }
    if (selectedZone) {
      setSelectedZone(null);
      return;
    }
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/revenue-management');
    }
  }

  function renderServiceIcon(icon: string, isActive: boolean) {
    const size = 20;
    switch (icon) {
      case 'home':
        return <Home size={size} strokeWidth={2} />;
      case 'leaf':
        return <Sprout size={size} strokeWidth={2} />;
      case 'shield':
        return <Shield size={size} strokeWidth={2} />;
      case 'droplet':
      default:
        return <Droplets size={size} strokeWidth={2} />;
    }
  }

  return (
    <div
      ref={rootRef}
      className="min-h-screen w-full bg-[#f8f9fa] px-4 pt-6 pb-20 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Header */}
        <header className="flex items-start gap-4">
          {!selectedZone && (
            <BackButton
              onClick={handleBack}
              label="Go back to Revenue Management"
            />
          )}
          <div className="flex-1 min-w-0">
            {selectedZone ? (
              <nav
                aria-label="Breadcrumb"
                className="flex items-center flex-wrap gap-1.5 text-base sm:text-lg font-semibold min-h-10 -mt-1"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    setSelectedZone(null);
                  }}
                  className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
                >
                  Farmland Services
                </button>
                <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    setSelectedZone(null);
                  }}
                  className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
                >
                  {activeService.name}
                </button>
                <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
                {selectedProject ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
                    >
                      {selectedZone.district}
                    </button>
                    <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
                    <span className="text-black font-bold">
                      {selectedProject.landId}
                    </span>
                  </>
                ) : (
                  <span className="text-black font-bold">
                    {selectedZone.district}
                  </span>
                )}
              </nav>
            ) : (
              <>
                <h1 className="text-[28px] font-semibold leading-[1.1] text-black">
                  {selectedServiceId === 'farmhouse-construction'
                    ? 'Farmland Services'
                    : activeService.name}
                </h1>
                <p className="mt-1.5 text-base sm:text-lg font-medium text-[#524F4F]">
                  Overview of Financial performance and key metrics
                </p>
              </>
            )}
          </div>
        </header>

        {/* If selectedProject is set, render the full Payment History Page View */}
        {selectedProject ? (
          <div className="mt-8 space-y-8 animate-in fade-in duration-200">
            {/* Header Title & Subtitle */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-[28px] font-semibold leading-[1.1] text-black">
                  {activeService.name} Payment History
                </h1>
                <p className="mt-1.5 text-base sm:text-lg font-medium text-[#524F4F]">
                  Track all {activeService.name.toLowerCase()} payments made for {selectedProject.landId}.
                </p>
              </div>
            </div>

            {/* 3 Summary Overview Cards */}
            <section
              aria-label="Property & Customer Overview"
              className="grid grid-cols-1 gap-5 sm:grid-cols-3"
            >
              {/* Land Identity */}
              <div className="rounded-[22px] border border-[#E5E5EA]/70 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-[0.6px] text-[#64748B]">
                  LAND IDENTITY
                </span>
                <div className="mt-2 text-xl font-bold text-[#0F172A]">
                  {selectedProject.landId}
                </div>
                <div className="mt-1 text-sm font-medium text-[#64748B]">
                  {selectedZone?.mandal}, {selectedZone?.district}
                </div>
              </div>

              {/* Customer */}
              <div className="rounded-[22px] border border-[#E5E5EA]/70 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-[0.6px] text-[#64748B]">
                  CUSTOMER
                </span>
                <div className="mt-2 text-xl font-bold text-[#0F172A]">
                  {selectedProject.customerName}
                </div>
                <div className="mt-1 text-sm font-medium text-[#2780C4]">
                  {selectedProject.customerTier || 'Premium Member'}
                </div>
              </div>

              {/* Property Details */}
              <div className="rounded-[22px] border border-[#E5E5EA]/70 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-[0.6px] text-[#64748B]">
                  PROPERTY DETAILS
                </span>
                <div className="mt-2 text-xl font-bold text-[#0F172A]">
                  {selectedProject.area}
                </div>
                <div className="mt-1 text-sm font-medium text-[#64748B]">
                  Project Cost: <span className="font-bold text-[#00609A]">{selectedProject.cost}</span>
                </div>
              </div>
            </section>

            {/* Payment Progress Timeline Container */}
            <section
              aria-label="Payment Progress Timeline"
              className="rounded-[24px] border border-[#E5E5EA]/70 bg-white p-7 sm:p-9 shadow-xs"
            >
              <div className="border-b border-[#F2F2F2] pb-5">
                <h2 className="text-xl font-bold text-[#191C1E]">
                  Payment Progress Timeline
                </h2>
                <p className="mt-1 text-sm text-[#5E5E63]">
                  Milestone disbursements and settlement verifications
                </p>
              </div>

              <div className="mt-8 space-y-5 max-w-4xl">
                {(selectedProject.payments || [
                  {
                    id: 'def-1',
                    stageName: 'Advance Payment',
                    date: '05 Jan 2024',
                    amount: '₹2,00,000',
                    status: 'Completed',
                  },
                  {
                    id: 'def-2',
                    stageName: 'Foundation Stage',
                    date: '20 Feb 2024',
                    amount: '₹2,00,000',
                    status: 'Completed',
                  },
                  {
                    id: 'def-3',
                    stageName: 'Final Payment',
                    date: '10 Jun 2024',
                    amount: '₹2,00,000',
                    status: 'Completed',
                  },
                ]).map((item, idx, arr) => (
                  <div key={item.id} className="relative flex items-start gap-5">
                    {/* Left Timeline Guide & Node */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-xs ${
                          item.status === 'Completed'
                            ? 'bg-[#2780C4]'
                            : 'bg-slate-300'
                        }`}
                      >
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                      </div>
                      {idx !== arr.length - 1 && (
                        <div className="my-2 h-16 w-0.5 bg-[#E2E8F0]" />
                      )}
                    </div>

                    {/* Timeline Card */}
                    <div className="flex flex-1 items-center justify-between rounded-2xl border border-[#E5E5EA] bg-[#FAFBFD]/60 p-5 sm:p-6 shadow-2xs transition-all hover:bg-white hover:shadow-xs">
                      <div className="space-y-1.5">
                        <div className="text-base sm:text-lg font-bold text-[#191C1E]">
                          {item.stageName}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-[#64748B]">
                          {item.date}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === 'Completed'
                              ? 'bg-[#CFE5FF]/70 text-[#00609A]'
                              : 'bg-[#FFF7ED] text-[#EA580C]'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.status === 'Completed' ? 'bg-[#00609A]' : 'bg-[#EA580C]'
                            }`}
                          />
                          {item.status}
                        </span>
                      </div>

                      <div className="text-right text-lg sm:text-xl font-bold text-[#0F172A]">
                        {item.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : selectedZone ? (
          <div className="mt-8 space-y-8 animate-in fade-in duration-200">
            {/* Section - Location Overview Card */}
            <section
              aria-label="Location Overview Card"
              className="rounded-2xl border border-[#F1F5F9]/60 bg-white p-6 sm:p-8 shadow-[0px_4px_24px_-1px_rgba(0,0,0,0.04),0px_2px_8px_-1px_rgba(0,0,0,0.02)]"
            >
              <div className="grid grid-cols-1 gap-6 divide-y divide-[#F1F5F9] sm:grid-cols-2 sm:divide-y-0 sm:gap-8 lg:grid-cols-4 lg:divide-x lg:divide-[#F1F5F9]">
                {/* Region / District */}
                <div className="flex items-center gap-5 lg:pr-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2780C4] text-white">
                    <MapPin size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.6px] text-[#64748B]">
                      Region / District
                    </span>
                    <div className="mt-1 text-lg font-bold leading-snug text-[#0F172A]">
                      {selectedZone.district}
                    </div>
                  </div>
                </div>

                {/* Mandal */}
                <div className="flex items-center gap-5 pt-6 sm:pt-0 lg:px-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2780C4] text-white">
                    <Map size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.6px] text-[#64748B]">
                      Mandal
                    </span>
                    <div className="mt-1 text-lg font-bold leading-snug text-[#0F172A]">
                      {selectedZone.mandal}
                    </div>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="flex items-center gap-5 pt-6 sm:pt-0 lg:px-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2780C4] text-white">
                    <Wallet size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.6px] text-[#64748B]">
                      Total Revenue
                    </span>
                    <div className="mt-1 text-lg font-bold leading-snug text-[#00609A]">
                      {selectedZone.revenue}
                    </div>
                  </div>
                </div>

                {/* Service Units / Projects */}
                <div className="flex items-center gap-5 pt-6 sm:pt-0 lg:pl-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2780C4] text-white">
                    {selectedServiceId === 'organic-farming' ? (
                      <Sprout size={18} strokeWidth={2.2} />
                    ) : selectedServiceId === 'fencing-security' ? (
                      <Shield size={18} strokeWidth={2.2} />
                    ) : selectedServiceId === 'borewell-drilling' ? (
                      <Droplets size={18} strokeWidth={2.2} />
                    ) : (
                      <Wrench size={18} strokeWidth={2.2} />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.6px] text-[#64748B]">
                      {selectedServiceId === 'organic-farming'
                        ? 'Farms Active'
                        : selectedServiceId === 'fencing-security'
                        ? 'Fenced Units'
                        : selectedServiceId === 'borewell-drilling'
                        ? 'Borewells'
                        : 'Projects'}
                    </span>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-sm font-bold text-[#00609A]">
                        {selectedZone.completedProjects} Done
                      </span>
                      <span className="text-[#CBD5E1]">|</span>
                      <span className="text-sm font-bold text-[#EA580C]">
                        {selectedZone.ongoingProjects} Ongoing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter Tabs and Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Status Filter Tabs */}
              <div className="inline-flex w-fit items-center rounded-full bg-white p-1 border border-[#E5E5EA]/80 shadow-[0px_4px_24px_rgba(0,0,0,0.03)]">
                {(['All', 'Ongoing', 'Completed'] as const).map((tab) => {
                  const isActive = statusFilter === tab;
                  const allProjects = getConstructionProjectsForZone(selectedZone.id, selectedServiceId);
                  const count =
                    tab === 'All'
                      ? allProjects.length
                      : allProjects.filter((p) => p.status === tab).length;

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setStatusFilter(tab)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#2780C4] text-white shadow-xs'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      <span>{tab}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative flex items-center">
                <Search size={18} className="pointer-events-none absolute left-4 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search Land ID, Customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full sm:w-[300px] rounded-full border border-[#E5E5EA] bg-white pl-11 pr-4 text-sm text-[#0F172A] placeholder-[#94A3B8] shadow-xs transition-all focus:border-[#2780C4] focus:outline-none"
                />
              </div>
            </div>

            {/* Construction Projects Table */}
            <section
              aria-label="Construction Projects List"
              className="overflow-hidden rounded-2xl border border-[#F1F5F9] bg-white shadow-[0px_4px_24px_-1px_rgba(0,0,0,0.04)]"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#F1F5F9] bg-[#FAFBFD] text-xs font-bold uppercase tracking-[0.6px] text-[#64748B] select-none">
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Land ID</th>
                      <th scope="col" className="px-6 py-4">Customer Name</th>
                      <th scope="col" className="px-6 py-4">Area</th>
                      <th scope="col" className="px-6 py-4 text-right">Construction Cost</th>
                      <th scope="col" className="px-6 py-4 text-right">Amount Paid</th>
                      <th scope="col" className="px-6 py-4 text-right">Pending</th>
                      <th scope="col" className="px-6 py-4 text-center">Status</th>
                      <th scope="col" className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {(() => {
                      const projects = getConstructionProjectsForZone(selectedZone.id, selectedServiceId)
                        .filter((proj) => {
                          if (statusFilter !== 'All' && proj.status !== statusFilter) return false;
                          if (searchQuery.trim()) {
                            const query = searchQuery.toLowerCase();
                            return (
                              proj.landId.toLowerCase().includes(query) ||
                              proj.customerName.toLowerCase().includes(query) ||
                              proj.area.toLowerCase().includes(query)
                            );
                          }
                          return true;
                        });

                      if (projects.length === 0) {
                        return (
                          <tr>
                            <td colSpan={9} className="px-6 py-12 text-center text-sm font-medium text-[#64748B]">
                              No {activeService.name.toLowerCase()} projects found matching your search and filter criteria.
                            </td>
                          </tr>
                        );
                      }

                      return projects.map((proj) => (
                      <tr
                        key={proj.id}
                        className="transition-colors hover:bg-slate-50/70"
                      >
                        {/* Order Number */}
                        <td className="px-6 py-4 text-sm font-semibold text-[#64748B]">
                          {proj.orderNumber}
                        </td>

                        {/* Land ID */}
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-md bg-[#F1F5F9] px-2.5 py-1 text-xs font-bold tracking-wide text-[#0F172A]">
                            {proj.landId}
                          </span>
                        </td>

                        {/* Customer Name */}
                        <td className="px-6 py-4 text-sm font-bold text-[#0F172A]">
                          {proj.customerName}
                        </td>

                        {/* Area */}
                        <td className="px-6 py-4 text-sm font-medium text-[#475569]">
                          {proj.area}
                        </td>

                        {/* Construction Cost */}
                        <td className="px-6 py-4 text-right text-sm font-bold text-[#0F172A]">
                          {proj.cost}
                        </td>

                        {/* Amount Paid */}
                        <td className="px-6 py-4 text-right text-sm font-bold text-[#2780C4]">
                          {proj.amountPaid}
                        </td>

                        {/* Pending */}
                        <td className="px-6 py-4 text-right text-sm font-bold text-[#64748B]">
                          {proj.pending}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
                              proj.status === 'Completed'
                                ? 'bg-[#F3FAFF] text-[#00609A]'
                                : 'bg-[#FFF7ED] text-[#EA580C]'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                proj.status === 'Completed'
                                  ? 'bg-[#00609A]'
                                  : 'bg-[#EA580C]'
                              }`}
                            />
                            {proj.status}
                          </span>
                        </td>

                        {/* Action: View */}
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedProject(proj)}
                            className="inline-flex h-[34px] w-[76px] items-center justify-center rounded-full bg-[#2780C4] text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1f6da8] hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ));
                  })()}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <Pagination
                total={
                  getConstructionProjectsForZone(selectedZone.id, selectedServiceId).filter((proj) => {
                    if (statusFilter !== 'All' && proj.status !== statusFilter) return false;
                    if (searchQuery.trim()) {
                      const query = searchQuery.toLowerCase();
                      return (
                        proj.landId.toLowerCase().includes(query) ||
                        proj.customerName.toLowerCase().includes(query) ||
                        proj.area.toLowerCase().includes(query)
                      );
                    }
                    return true;
                  }).length
                }
                page={1}
                pageSize={5}
                itemLabel="entries"
              />
            </section>
          </div>
        ) : (
          <>
            {/* Top 4 Service Revenue Cards */}
            <section
              aria-label="Service Revenue Overview"
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
          {serviceCategories.map((service) => {
            const isActive = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedServiceId(service.id)}
                className={`service-top-card relative flex h-[183px] w-full flex-col justify-between rounded-[22px] p-7 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand active:scale-[0.98] ${
                  isActive
                    ? 'bg-gradient-to-br from-[#2780C4] to-[#61CAEB] text-white shadow-md'
                    : 'border border-[#E5E5EA]/70 bg-white/90 text-[#191C1E] shadow-xs hover:border-[#2780C4]/40 hover:-translate-y-0.5'
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-105 ${
                    isActive
                      ? 'bg-white text-[#2780C4]'
                      : 'bg-[#2780C4] text-white'
                  }`}
                >
                  {renderServiceIcon(service.icon, isActive)}
                </div>

                {/* Text & Amount */}
                <div className="flex flex-col gap-1.5">
                  <span
                    className={`text-sm font-medium tracking-wide ${
                      isActive ? 'text-white' : 'text-[#404750]'
                    }`}
                  >
                    {service.name}
                  </span>
                  <span
                    className={`text-[30px] sm:text-[32px] font-semibold leading-tight tracking-tight ${
                      isActive ? 'text-white' : 'text-[#191C1E]'
                    }`}
                  >
                    {service.revenue}
                  </span>
                </div>
              </button>
            );
          })}
        </section>

        {/* Section Header */}
        <section className="mt-10" aria-label="Zone Breakdown Section">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#191C1E] sm:text-[24px]">
                {activeService.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-[#5E5E63]">
                Real time settlement data across administrative zones
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCalendarModal(true)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E5E5EA] bg-white px-5 py-2.5 text-sm font-medium text-[#1D1D1F] shadow-xs transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-brand"
            >
              <CalendarIcon size={16} className="text-[#86868B]" />
              <span>Calendar</span>
            </button>
          </div>

          {/* Sub-Category Pill Toggle (Standard Agri-Yield vs Premium Timber) */}
          {selectedServiceId === 'organic-farming' && (
            <div className="mt-5 inline-flex items-center rounded-full bg-white p-1 shadow-[0px_4px_24px_rgba(0,0,0,0.04)] border border-[#E5E5EA]/70">
              <button
                type="button"
                onClick={() => setOrganicSubCategory('standard')}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  organicSubCategory === 'standard'
                    ? 'bg-[#2780C4] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#191C1E]'
                }`}
              >
                Standard Agri-Yield
              </button>
              <button
                type="button"
                onClick={() => setOrganicSubCategory('timber')}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  organicSubCategory === 'timber'
                    ? 'bg-[#2780C4] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#191C1E]'
                }`}
              >
                Premium Timber
              </button>
            </div>
          )}

          {/* Dynamic Table: Organic Farming Table vs Farmhouse Construction Table */}
          {selectedServiceId === 'organic-farming' ? (
            /* Organic Farming Revenue Table */
            <div className="mt-6 overflow-hidden rounded-[24px] border border-[#E5E5EA]/70 bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[880px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none">
                      <th scope="col" className="px-6 sm:px-8 py-4">
                        Zone / Location
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-center">
                        Yield Efficiency
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                        Revenue
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-center">
                        Farms Covered
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                        Liquidity
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-left">
                        Organic Share
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F2F2]">
                    {organicFarmingStats
                      .filter((s) => s.category === organicSubCategory)
                      .map((zone) => (
                        <tr
                          key={zone.id}
                          className="zone-table-row group transition-colors hover:bg-[#F8FAFC]"
                        >
                          {/* Zone / Location */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,96,154,0.1)] text-[#00609A]">
                                <MapPin size={18} />
                              </div>
                              <div>
                                <div className="font-bold text-[#191C1E]">
                                  {zone.district}
                                </div>
                                <div className="text-xs font-semibold text-[#404750]">
                                  {zone.mandal}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Yield Efficiency Badge */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-center">
                            <span className="inline-flex items-center rounded-full bg-[#2780C4]/10 px-3 py-1 text-xs font-extrabold text-[#2780C4]">
                              {zone.efficiency}
                            </span>
                          </td>

                          {/* Revenue */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-bold text-[#00609A] text-base">
                            {zone.revenue}
                          </td>

                          {/* Farms Covered */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-center font-bold text-[#191C1E] text-sm">
                            {zone.farms}
                          </td>

                          {/* Liquidity */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-bold text-[#00609A] text-sm">
                            {zone.liquidity}
                          </td>

                          {/* Organic Share Progress Bar */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-[#2780C4]"
                                  style={{ width: zone.organicShare }}
                                />
                              </div>
                              <span className="text-xs font-bold text-[#5E5E63]">
                                {zone.organicShare}
                              </span>
                            </div>
                          </td>

                          {/* View Details Action */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedZone({
                                  id: zone.id,
                                  district: zone.district,
                                  mandal: zone.mandal,
                                  revenue: zone.revenue,
                                  completedProjects: zone.farms,
                                  pendingRevenue: zone.liquidity,
                                  ongoingProjects: Math.max(2, Math.floor(zone.farms / 3)),
                                  avgDuration: '3.5 Months',
                                });
                              }}
                              className="inline-flex items-center justify-center rounded-full bg-[#2780C4] px-5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1f6da8] active:scale-95 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination / Table Footer */}
              <Pagination
                total={
                  organicFarmingStats.filter((s) => s.category === organicSubCategory).length * 3
                }
                page={1}
                pageSize={
                  organicFarmingStats.filter((s) => s.category === organicSubCategory).length
                }
                itemLabel="zone entries"
              />
            </div>
          ) : (
            /* Farmhouse Construction & General Service Revenue Table */
            <div className="mt-6 overflow-hidden rounded-[24px] border border-[#E5E5EA]/70 bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none">
                      <th scope="col" className="px-6 sm:px-8 py-4">
                        Zone / Mandal
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                        Revenue
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-center">
                        Completed Projects
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                        Pending Revenue
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-center">
                        Ongoing Projects
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-center">
                        Avg. Duration
                      </th>
                      <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F2F2]">
                    {zoneServiceStats.map((zone) => (
                      <tr
                        key={zone.id}
                        className="zone-table-row group transition-colors hover:bg-[#F8FAFC]"
                      >
                        {/* Zone / Mandal */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,96,154,0.1)] text-[#00609A]">
                              <MapPin size={18} />
                            </div>
                            <div>
                              <div className="font-bold text-[#191C1E]">
                                {zone.district}
                              </div>
                              <div className="text-xs font-semibold text-[#404750]">
                                {zone.mandal}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Revenue */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-bold text-[#00609A] text-base">
                          {zone.revenue}
                        </td>

                        {/* Completed Projects */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-center font-bold text-[#191C1E] text-sm">
                          {zone.completedProjects}
                        </td>

                        {/* Pending Revenue */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-bold text-[#00609A] text-sm">
                          {zone.pendingRevenue}
                        </td>

                        {/* Ongoing Projects */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-center font-bold text-[#00609A] text-sm">
                          {zone.ongoingProjects}
                        </td>

                        {/* Avg. Duration */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-center font-medium text-[#191C1E] text-sm">
                          {zone.avgDuration}
                        </td>

                        {/* View Details Action */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedZone(zone)}
                            className="inline-flex items-center justify-center rounded-full bg-[#2780C4] px-5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1f6da8] active:scale-95 focus-visible:outline-2 focus-visible:outline-brand"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination / Table Footer */}
              <Pagination
                total={zoneServiceStats.length * 3}
                page={1}
                pageSize={zoneServiceStats.length}
                itemLabel="zone entries"
              />
            </div>
          )}
        </section>
          </>
        )}



        {/* Modal: Organic Farming Zone Details Drilldown */}
        {selectedOrganicZone && (
          <Modal
            title={`${selectedOrganicZone.district} (${selectedOrganicZone.mandal}) Organic Agriculture`}
            onClose={() => setSelectedOrganicZone(null)}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-xl bg-subtle p-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Recognized Crop Revenue
                  </span>
                  <div className="mt-1 text-2xl font-bold text-[#00609A]">
                    {selectedOrganicZone.revenue}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Yield Efficiency
                  </span>
                  <div className="mt-1 text-2xl font-bold text-[#2780C4]">
                    {selectedOrganicZone.efficiency}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-divider p-3.5">
                  <span className="text-xs font-semibold text-muted">
                    Farms in Production
                  </span>
                  <p className="mt-1 text-xl font-bold text-[#191C1E]">
                    {selectedOrganicZone.farms} Units
                  </p>
                </div>
                <div className="rounded-xl border border-divider p-3.5">
                  <span className="text-xs font-semibold text-muted">
                    Escrow Liquidity Pool
                  </span>
                  <p className="mt-1 text-xl font-bold text-[#00609A]">
                    {selectedOrganicZone.liquidity}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#F8FAFC] p-4 text-sm text-[#404750]">
                <p className="font-semibold text-[#191C1E] mb-1">
                  Agro-Ecological Classification ({organicSubCategory === 'standard' ? 'Standard Agri-Yield' : 'Premium Timber'})
                </p>
                <p>
                  Certified organic horticulture and agro-forestry cluster operating at {selectedOrganicZone.organicShare} organic cultivation purity across {selectedOrganicZone.mandal}, under verifiable bio-fertilization protocols.
                </p>
              </div>

              <div className="space-y-2 border-t border-divider pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  Accreditation & Standards
                </p>
                <div className="flex items-center gap-2 text-xs text-[#393B3F]">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>NPOP (National Programme for Organic Production) Certified</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#393B3F]">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>Drip irrigation water conservation quota met (94% efficiency)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#393B3F]">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>Zero-synthetic pesticide residue audit cleared for Q1</span>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* Modal: Calendar Period Filter */}
        {showCalendarModal && (
          <Modal
            title="Filter by Fiscal Accounting Window"
            onClose={() => setShowCalendarModal(false)}
          >
            <div className="space-y-4">
              <p className="text-sm text-muted">
                Select settlement period to recalculate recognized revenue across administrative zones.
              </p>
              <div className="space-y-2">
                {[
                  'Fiscal Year 2025-26',
                  'Fiscal Year 2024-25',
                  'Last 90 Days (Q4)',
                  'Month-to-Date (MTD)',
                ].map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => {
                      setSelectedPeriod(period);
                      setShowCalendarModal(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-semibold transition-colors ${
                      selectedPeriod === period
                        ? 'border-[#2780C4] bg-[#2780C4]/5 text-[#2780C4]'
                        : 'border-[#E5E5EA] bg-white text-[#191C1E] hover:bg-slate-50'
                    }`}
                  >
                    <span>{period}</span>
                    {selectedPeriod === period && (
                      <CheckCircle2 size={18} className="text-[#2780C4]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
