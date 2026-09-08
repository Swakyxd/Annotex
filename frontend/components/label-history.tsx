'use client';

import React, { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { TrendingUp, Award, Target, Zap } from 'lucide-react';

export interface LabelHistoryItem {
  id: string;
  taskId: string;
  taskTitle: string;
  value: string;
  confidence: number;
  createdAt: string;
  isAccurate?: boolean;
  feedback?: string;
}

interface LabelHistoryProps {
  labels: LabelHistoryItem[];
  loading?: boolean;
  onTaskClick?: (taskId: string) => void;
}

/** LabelHistory — Displays user's label submission history with statistics */
export function LabelHistory({ labels, loading = false, onTaskClick }: LabelHistoryProps) {
  const stats = useMemo(() => {
    if (!labels.length) return { totalLabels: 0, averageConfidence: 0, accuracyRate: 0, recentCount: 0 };
    const totalLabels = labels.length;
    const averageConfidence = labels.reduce((sum, l) => sum + l.confidence, 0) / totalLabels;
    const accurateLabels = labels.filter((l) => l.isAccurate !== false).length;
    const accuracyRate = (accurateLabels / totalLabels) * 100;
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 7);
    const recentCount = labels.filter((l) => new Date(l.createdAt) > recentDate).length;
    return { totalLabels, averageConfidence, accuracyRate, recentCount };
  }, [labels]);

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
    { label: 'Avg Confidence', value: `${(stats.averageConfidence * 100).toFixed(0)}%`, icon: Zap },
    { label: 'Accuracy', value: `${stats.accuracyRate.toFixed(0)}%`, icon: Award },
    { label: 'This Week', value: stats.recentCount, icon: TrendingUp },
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

      {/* History timeline */}
      <article className="card rounded-[2rem] p-6">
        <p className="eyebrow text-xs text-muted">Timeline</p>
        <h2 className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em]">Submission History</h2>

        {labels.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-black/15 p-10 text-center">
            <Target className="mx-auto size-10 text-muted/40" aria-hidden="true" />
            <p className="mt-4 font-semibold">No label submissions yet</p>
            <p className="mt-1 text-sm text-muted">Start by selecting a task from the dashboard.</p>
          </div>
        ) : (
          <div className="mt-5 max-h-[30rem] space-y-2 overflow-y-auto pr-1">
            {labels.map((label) => (
              <div
                key={label.id}
                className="flex items-start gap-4 rounded-2xl border border-black/8 bg-white/60 px-4 py-3 transition hover:border-black/15"
              >
                {/* Timeline dot */}
                <div className="mt-1 size-2 shrink-0 rounded-full bg-black/25" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <button
                      onClick={() => onTaskClick?.(label.taskId)}
                      className="text-sm font-semibold text-foreground hover:underline text-left"
                    >
                      {label.taskTitle}
                    </button>
                    <p className="whitespace-nowrap text-xs text-muted">
                      {formatDistanceToNow(new Date(label.createdAt), { addSuffix: true })}
                    </p>
                  </div>

                  <p className="mt-1 text-sm text-muted">
                    Label: <span className="font-semibold text-foreground">{label.value}</span>
                  </p>

                  {/* Confidence bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-xs text-muted">Confidence</p>
                    <div className="w-16 h-1.5 overflow-hidden rounded-full bg-black/8">
                      <div
                        className="h-full rounded-full bg-black/50"
                        style={{ width: `${label.confidence * 100}%` }}
                      />
                    </div>
                    <p className="text-xs font-semibold">{Math.round(label.confidence * 100)}%</p>
                    {label.isAccurate !== undefined && (
                      <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] ${
                        label.isAccurate
                          ? 'bg-black text-white'
                          : 'bg-black/8 text-muted'
                      }`}>
                        {label.isAccurate ? 'Accurate' : 'Review'}
                      </span>
                    )}
                  </div>

                  {label.feedback && (
                    <p className="mt-1 text-xs text-muted italic">{label.feedback}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

/** PerformanceMetrics — Standalone monochromatic metric grid */
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
    { label: 'This Week', value: recentCount, icon: TrendingUp },
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
