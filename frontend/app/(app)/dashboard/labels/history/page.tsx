'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLabelHistory } from '@/hooks/use-labels';
import { LabelHistory } from '@/components/label-history';
import { ArrowLeft, RefreshCw } from 'lucide-react';

/** LabelHistoryPage — Shows user's label submission history and performance metrics */
export default function LabelHistoryPage() {
  const router = useRouter();
  const { labels, loading, error, refetch } = useLabelHistory();

  const historyItems = labels.map((label) => ({
    id: label.id,
    taskId: label.taskId,
    taskTitle: label.task?.title ?? `Task ${label.taskId.slice(0, 8)}`,
    value: label.value,
    confidence: label.confidence,
    createdAt: label.createdAt,
  }));

  const handleTaskClick = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 p-2.5 transition hover:bg-white"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <p className="eyebrow text-xs text-muted">Contributor</p>
            <h1 className="font-mono text-2xl font-semibold tracking-[-0.04em] md:text-3xl">Label History</h1>
          </div>
        </div>
        <button
          className="btn-secondary px-4 py-2.5 text-sm"
          onClick={() => void refetch()}
          type="button"
        >
          <RefreshCw className="mr-2 inline-block size-4" />
          Refresh
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="card rounded-[2rem] p-6">
          <p className="font-semibold">Failed to load history</p>
          <p className="mt-1 text-sm text-muted">{error.message}</p>
          <button className="btn-secondary mt-4 px-4 py-2 text-sm" onClick={() => void refetch()} type="button">
            Retry
          </button>
        </div>
      )}

      {/* Content */}
      {!error && (
        <LabelHistory
          labels={historyItems}
          loading={loading}
          onTaskClick={handleTaskClick}
        />
      )}
    </div>
  );
}
