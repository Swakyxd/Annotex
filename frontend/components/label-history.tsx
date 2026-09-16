'use client';

import React, { useMemo, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Award, CheckCircle2, Clock, Search, Target, X, Zap, XCircle } from 'lucide-react';

export type DateRange = '1d' | '1w' | '1m' | '6m' | '1y' | 'lifetime';
export type LabelStatusFilter = 'all' | 'accepted' | 'rejected' | 'pending';

export interface LabelHistoryItem {
  id: string;
  taskId: string;
  taskTitle: string;
  value: string;
  confidence: number;
  createdAt: string;
  isAccepted?: boolean;
  isRejected?: boolean;
  rejectionReason?: string | null;
  timeSpentSeconds?: number;
  isAccurate?: boolean;
  feedback?: string;
}

interface LabelHistoryProps {
  labels: LabelHistoryItem[];
  loading?: boolean;
  onTaskClick?: (taskId: string) => void;
}

export function isWithinDateRange(dateString: string, range: DateRange): boolean {
  if (range === 'lifetime') return true;
  const date = new Date(dateString);
  const now = new Date();
  const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  switch (range) {
    case '1d': return diffHours <= 24;
    case '1w': return diffHours <= 24 * 7;
    case '1m': return diffHours <= 24 * 30;
    case '6m': return diffHours <= 24 * 180;
    case '1y': return diffHours <= 24 * 365;
    default: return true;
  }
}

/** LabelHistory — Displays user's label submission history with search, status filters & date range tabs */
export function LabelHistory({ labels, loading = false, onTaskClick }: LabelHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LabelStatusFilter>('all');
  const [dateRange, setDateRange] = useState<DateRange>('lifetime');

  const filteredLabels = useMemo(() => {
    return labels.filter((label) => {
      // Date filter
      if (!isWithinDateRange(label.createdAt, dateRange)) return false;

      // Status filter
      if (statusFilter === 'accepted' && !label.isAccepted) return false;
      if (statusFilter === 'rejected' && !label.isRejected) return false;
      if (statusFilter === 'pending' && (label.isAccepted || label.isRejected)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          label.taskTitle.toLowerCase().includes(q) ||
          label.value.toLowerCase().includes(q) ||
          Boolean(label.rejectionReason?.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [labels, dateRange, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = filteredLabels.length;
    if (!total) {
      return { totalLabels: 0, acceptedLabels: 0, rejectedLabels: 0, pendingLabels: 0, accuracyRate: 0, avgConfidence: 0 };
    }
    const accepted = filteredLabels.filter((l) => l.isAccepted).length;
    const rejected = filteredLabels.filter((l) => l.isRejected).length;
    const pending = filteredLabels.filter((l) => !l.isAccepted && !l.isRejected).length;
    const evaluated = accepted + rejected;
    const accuracyRate = evaluated > 0 ? (accepted / evaluated) * 100 : (accepted / total) * 100;
    const avgConfidence = filteredLabels.reduce((sum, l) => sum + l.confidence, 0) / total;

    return {
      totalLabels: total,
      acceptedLabels: accepted,
      rejectedLabels: rejected,
      pendingLabels: pending,
      accuracyRate,
      avgConfidence,
    };
  }, [filteredLabels]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-28 animate-pulse rounded-[2rem] bg-black/[0.05]" />
        <div className="h-96 animate-pulse rounded-[2rem] bg-black/[0.05]" />
      </div>
    );
  }

  const statItems = [
    { label: 'Total Labels', value: stats.totalLabels, icon: Target },
    { label: 'Accepted', value: stats.acceptedLabels, icon: CheckCircle2 },
    { label: 'Accuracy', value: `${stats.accuracyRate.toFixed(0)}%`, icon: Award },
    { label: 'Avg Confidence', value: `${(stats.avgConfidence * 100).toFixed(0)}%`, icon: Zap },
  ];

  const dateRangeOptions: Array<{ id: DateRange; label: string }> = [
    { id: '1d', label: '1D' },
    { id: '1w', label: '1W' },
    { id: '1m', label: '1M' },
    { id: '6m', label: '6M' },
    { id: '1y', label: '1Y' },
    { id: 'lifetime', label: 'Lifetime' },
  ];

  const statusOptions: Array<{ id: LabelStatusFilter; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'pending', label: 'Pending' },
  ];

  return (
    <div className="space-y-5">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {statItems.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-[1.75rem] border border-black/8 bg-white/65 p-4">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-[0.65rem] text-muted">{label}</p>
              <Icon className="size-4 text-muted" aria-hidden="true" />
            </div>
            <p className="mt-3 font-mono text-2xl font-semibold tracking-[-0.04em]">{value}</p>
          </div>
        ))}
      </div>

      {/* History timeline card */}
      <article className="card rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-xs text-muted">Submissions</p>
            <h2 className="mt-1 font-mono text-2xl font-semibold tracking-[-0.04em]">My Labels</h2>
          </div>

          {/* Date range filter pills */}
          <div className="flex flex-wrap items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1">
            {dateRangeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDateRange(opt.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  dateRange === opt.id
                    ? 'bg-black text-white shadow-xs'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar: Search & Status Filters */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by task title or label..."
              className="field w-full pl-9 pr-8 text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Status filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {statusOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setStatusFilter(opt.id)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                  statusFilter === opt.id
                    ? 'border-black bg-black text-white'
                    : 'border-black/10 bg-white/60 text-muted hover:border-black/20 hover:text-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count feedback */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <span>Showing {filteredLabels.length} of {labels.length} submissions</span>
          {(searchQuery || statusFilter !== 'all' || dateRange !== 'lifetime') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setDateRange('lifetime');
              }}
              className="font-medium underline hover:text-foreground"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* List items */}
        {filteredLabels.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-black/15 p-10 text-center">
            <Target className="mx-auto size-10 text-muted/40" aria-hidden="true" />
            <p className="mt-4 font-semibold">No labels found</p>
            <p className="mt-1 text-sm text-muted">
              {labels.length === 0
                ? 'Start by selecting a task from the dashboard.'
                : 'Try adjusting your search or date filter.'}
            </p>
          </div>
        ) : (
          <div className="mt-5 max-h-[32rem] space-y-2.5 overflow-y-auto pr-1">
            {filteredLabels.map((label) => {
              const statusDisplay = label.isAccepted
                ? { label: 'Accepted', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
                : label.isRejected
                ? { label: 'Rejected', badge: 'bg-red-100 text-red-800 border-red-300' }
                : { label: 'Pending Review', badge: 'bg-black/8 text-muted border-black/10' };

              return (
                <div
                  key={label.id}
                  className="flex items-start gap-4 rounded-2xl border border-black/8 bg-white/60 px-4 py-3.5 transition hover:border-black/15"
                >
                  {/* Status dot */}
                  <div
                    className={`mt-1 size-2.5 shrink-0 rounded-full ${
                      label.isAccepted
                        ? 'bg-emerald-600'
                        : label.isRejected
                        ? 'bg-red-500'
                        : 'bg-black/30'
                    }`}
                  />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <button
                        onClick={() => onTaskClick?.(label.taskId)}
                        className="text-left text-sm font-semibold text-foreground hover:underline"
                      >
                        {label.taskTitle}
                      </button>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] ${statusDisplay.badge}`}>
                          {statusDisplay.label}
                        </span>
                        <p className="whitespace-nowrap text-xs text-muted">
                          {formatDistanceToNow(new Date(label.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-muted">Label:</span>
                      <span className="rounded-md bg-black/[0.04] px-2 py-0.5 font-mono font-semibold text-foreground">
                        {label.value}
                      </span>
                      {label.timeSpentSeconds ? (
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <Clock className="size-3" />
                          {label.timeSpentSeconds}s
                        </span>
                      ) : null}
                    </div>

                    {/* Confidence bar & rejection note */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted">Confidence</p>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-black/8">
                          <div
                            className="h-full rounded-full bg-black/60"
                            style={{ width: `${label.confidence * 100}%` }}
                          />
                        </div>
                        <p className="text-xs font-semibold">{Math.round(label.confidence * 100)}%</p>
                      </div>

                      {label.isRejected && label.rejectionReason && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <XCircle className="size-3" />
                          {label.rejectionReason}
                        </p>
                      )}

                      {label.feedback && (
                        <p className="text-xs italic text-muted">{label.feedback}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </div>
  );
}

/** PerformanceMetrics — Standalone metric grid */
export function PerformanceMetrics({
  totalLabels = 0,
  averageConfidence = 0,
  accuracyRate = 0,
  recentCount = 0,
}: {
  totalLabels?: number;
  averageConfidence?: number;
  accuracyRate?: number;
  recentCount?: number;
}) {
  const items = [
    { label: 'Total', value: totalLabels, icon: Target },
    { label: 'Confidence', value: `${(averageConfidence * 100).toFixed(0)}%`, icon: Zap },
    { label: 'Accuracy', value: `${accuracyRate.toFixed(0)}%`, icon: Award },
    { label: 'This Week', value: recentCount, icon: CheckCircle2 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-[1.75rem] border border-black/8 bg-white/65 p-4">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-[0.65rem] text-muted">{label}</p>
            <Icon className="size-4 text-muted" aria-hidden="true" />
          </div>
          <p className="mt-3 font-mono text-2xl font-semibold tracking-[-0.04em]">{value}</p>
        </div>
      ))}
    </div>
  );
}
