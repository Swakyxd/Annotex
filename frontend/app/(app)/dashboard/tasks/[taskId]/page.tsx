'use client';

import { SubmissionResult } from '@/components/label-submission-feedback';
import { LabelSubmitForm } from '@/components/label-submit-form';
import { useAuth } from '@/components/providers/auth-provider';
import { usePermissions } from '@/components/rbac/use-permissions';
import { useSubmitLabel, useTaskLabels } from '@/hooks/use-labels';
import type { Task } from '@/hooks/use-tasks';
import { API_BASE_URL } from '@/lib/constants';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function getApiOrigin(): string {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return API_BASE_URL.replace(/\/api\/v1\/?$/, '');
  }
}

function parseRawData(rawData: unknown): unknown {
  if (typeof rawData !== 'string') return rawData;
  const trimmed = rawData.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return rawData;
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return rawData;
  }
}

const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|bmp|svg|tiff?|avif)$/i;

function getRecordImagePath(rawData: unknown): string | null {
  const normalized = parseRawData(rawData);

  // Case 1: rawData is itself a string — check if it looks like an image path
  if (typeof normalized === 'string') {
    const s = normalized.trim();
    if (IMAGE_EXTENSIONS.test(s) || s.includes('/uploads/') || s.startsWith('data:image/')) {
      return s;
    }
    return null;
  }

  if (!normalized || typeof normalized !== 'object' || Array.isArray(normalized)) return null;

  const record = normalized as Record<string, unknown>;

  // Case 2: check common key names (priority order)
  const candidateKeys = [
    'imagePath', 'image_path', 'imageUrl', 'image_url',
    'filePath', 'file_path', 'fileUrl', 'file_url',
    'image', 'url', 'src', 'path', 'filename', 'file', 'data', 'content',
  ];
  for (const key of candidateKeys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      const s = value.trim();
      // Accept if it looks like a path/url/data-uri — not a short label word
      if (
        IMAGE_EXTENSIONS.test(s) ||
        s.includes('/uploads/') ||
        s.startsWith('data:image/') ||
        s.startsWith('http') ||
        s.includes('/') // any slash-containing string is likely a path
      ) {
        return s;
      }
    }
  }

  // Case 3: last-resort — scan every string value for image extension
  for (const value of Object.values(record)) {
    if (typeof value === 'string' && IMAGE_EXTENSIONS.test(value.trim())) {
      return value.trim();
    }
  }

  return null;
}

interface TaskRecord {
  id: string;
  recordNumber: number;
  rawData: unknown;
}

function extractRecordText(rawData: unknown): string {
  const normalized = parseRawData(rawData);
  if (typeof normalized === 'string') return normalized;
  if (!normalized || typeof normalized !== 'object' || Array.isArray(normalized))
    return 'No record content available for this task yet.';
  const record = normalized as Record<string, unknown>;
  for (const key of ['text', 'content', 'sentence', 'review', 'message', 'description']) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value;
  }
  const firstString = Object.values(record).find((v) => typeof v === 'string' && (v as string).trim());
  if (typeof firstString === 'string') return firstString;
  return JSON.stringify(record, null, 2);
}

function statusLabel(status: string): string {
  switch (status) {
    case 'pending': return 'Pending';
    case 'in_progress': return 'In Progress';
    case 'labeled': return 'Labeled';
    case 'validated': return 'Accepted';
    case 'rejected': return 'Rejected';
    case 'completed': return 'Completed';
    default: return status.replace('_', ' ');
  }
}

/** TaskDetailsPage — Detailed view of a single task with label submission */
export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const { accessToken, user } = useAuth();

  const [task, setTask] = useState<Task | null>(null);
  const [taskRecords, setTaskRecords] = useState<TaskRecord[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [taskError, setTaskError] = useState<string | null>(null);

  const { labels, loading: labelsLoading, refetch: refetchLabels } = useTaskLabels(taskId);
  const { lastSubmittedLabel } = useSubmitLabel();
  const { isContributor, isValidator } = usePermissions();

  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  const fetchTask = useCallback(async () => {
    if (!taskId) return;
    setTasksLoading(true);
    setTaskError(null);
    try {
      const session = await getSession();
      const token = session?.accessToken ?? accessToken;
      if (!token) throw new Error('Missing session token. Please sign in again.');

      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const payload = (await response.json()) as { success: boolean; message: string; data?: Task };
      if (!response.ok || !payload.success || !payload.data) throw new Error(payload.message || 'Failed to load task');
      setTask(payload.data);

      const recordsResponse = await fetch(`${API_BASE_URL}/tasks/${taskId}/records`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      if (recordsResponse.ok) {
        const rp = (await recordsResponse.json()) as { success: boolean; data?: { records?: TaskRecord[] } };
        if (rp.success) setTaskRecords(rp.data?.records ?? []);
      }
    } catch (error) {
      setTask(null);
      setTaskError(error instanceof Error ? error.message : 'Failed to load task');
    } finally {
      setTasksLoading(false);
    }
  }, [taskId, accessToken]);

  useEffect(() => {
    void fetchTask();
  }, [fetchTask]);

  if (tasksLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-7 animate-spin text-muted" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="card rounded-[2rem] p-8 text-center">
        <p className="font-mono text-xl font-semibold tracking-[-0.04em]">Task not found</p>
        <p className="mt-2 text-sm text-muted">{taskError ?? "The task you're looking for doesn't exist or has been removed."}</p>
        <Link href="/dashboard" className="btn-secondary mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm">
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const progressPercent = task.requiredLabels ? (task.submittedLabels / task.requiredLabels) * 100 : 0;
  const canSubmitLabel = isContributor() || isValidator();
  const isAcceptingSubmissions = task.status === 'pending' || task.status === 'in_progress';
  const canLeaveTask = isContributor() && task.status === 'in_progress' && task.assignedToId === user?.id;
  const activeRecord = task.record ?? taskRecords[0];
  const labelOptions = Array.isArray(task.dataset?.labelOptions)
    ? task.dataset.labelOptions.filter((o): o is string => typeof o === 'string')
    : [];
  const activeRecordImagePath = getRecordImagePath(activeRecord?.rawData);
  // Build the full URL — only prepend /uploads/ if the path doesn't already contain it
  const activeRecordImageUrl = activeRecordImagePath
    ? activeRecordImagePath.startsWith('http') || activeRecordImagePath.startsWith('data:')
      ? activeRecordImagePath
      : activeRecordImagePath.includes('/uploads/')
        ? `${getApiOrigin()}${activeRecordImagePath.startsWith('/') ? '' : '/'}${activeRecordImagePath}`
        : `${getApiOrigin()}/uploads/${activeRecordImagePath.replace(/^\/+/, '')}`
    : null;

  const assignAndStart = async () => {
    // If already assigned to this user, just show the form
    if (task.assignedToId === user?.id) {
      setShowForm(true);
      return;
    }
    setIsAssigning(true);
    try {
      const session = await getSession();
      const token = session?.accessToken ?? accessToken;
      if (!token) throw new Error('Missing session token.');
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const payload = (await res.json()) as { success: boolean; message: string; data?: Task };
      if (!res.ok || !payload.success) throw new Error(payload.message || 'Failed to claim task');
      if (payload.data) setTask(payload.data);
      setShowForm(true);
    } catch (error) {
      setTaskError(error instanceof Error ? error.message : 'Failed to claim task');
    } finally {
      setIsAssigning(false);
    }
  };

  const leaveTask = async () => {
    if (!accessToken || !window.confirm('Leave this task? It will return to the available task queue.')) return;
    setIsLeaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/assign`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      });
      const payload = (await response.json()) as { success: boolean; message: string };
      if (!response.ok || !payload.success) throw new Error(payload.message || 'Unable to leave this task');
      router.replace('/dashboard');
    } catch (error) {
      setTaskError(error instanceof Error ? error.message : 'Unable to leave this task');
      setIsLeaving(false);
    }
  };

  return (
    /* flex-1 + min-h-0 + overflow-y-auto: fills the shell content slot and scrolls internally */
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/tasks"
            className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 p-2.5 transition hover:bg-white"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <p className="eyebrow text-xs text-muted">Task detail</p>
            <h1 className="font-mono text-2xl font-semibold tracking-[-0.04em] md:text-3xl">{task.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {canLeaveTask && (
            <button
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-50"
              disabled={isLeaving}
              onClick={leaveTask}
              type="button"
            >
              {isLeaving ? 'Leaving…' : 'Leave task'}
            </button>
          )}
          <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-foreground">
            {statusLabel(task.status)}
          </span>
        </div>
      </div>

      {/* ── Main content area: switches to side-by-side when labeling form is active ── */}
      <div className={`p-6 ${showForm ? 'flex gap-5 items-start' : 'space-y-5'}`}>

        {/* Left column: always visible content */}
        <div className={`space-y-5 ${ showForm ? 'w-1/2 shrink-0 sticky top-0' : '' }`}>
          {taskError && (
            <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm" role="alert">
              {taskError}
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: 'Reward', value: `◎ ${task.reward.toFixed(2)}` },
              { label: 'Dataset', value: task.dataset?.name ?? 'Unknown' },
              { label: 'Required', value: `${task.requiredLabels} labels` },
              { label: 'Consensus', value: `${(task.consensusThreshold * 100).toFixed(0)}%` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-[1.75rem] border border-black/8 bg-white/65 p-4">
                <p className="eyebrow text-[0.65rem] text-muted">{label}</p>
                <p className="mt-2 font-mono text-xl font-semibold tracking-[-0.04em] truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <article className="card rounded-[2rem] p-6">
            <p className="eyebrow text-xs text-muted">About this task</p>
            <h2 className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em]">Description</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{task.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-black/8 pt-4 text-xs text-muted">
              <span>Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
              {task.assignedTo && (
                <><span>·</span><span>Assigned to {task.assignedTo.name}</span></>
              )}
            </div>
          </article>

          {/* Data to label */}
          <article className="card rounded-[2rem] p-6">
            <p className="eyebrow text-xs text-muted">Record payload</p>
            <h2 className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em]">Data To Label</h2>
            <div className="mt-4">
              {activeRecord ? (
                <>
                  <p className="eyebrow mb-3 text-[0.65rem] text-muted">Record #{activeRecord.recordNumber}</p>
                  {activeRecordImageUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-black/8 bg-black/[0.03]">
                      <img
                        alt={`Record ${activeRecord.recordNumber}`}
                        className="mx-auto max-h-[480px] w-full object-contain"
                        src={activeRecordImageUrl}
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-black/8 bg-black/[0.03] p-5">
                      <p className="whitespace-pre-wrap text-sm leading-7">{extractRecordText(activeRecord.rawData)}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted">No record payload found for this task.</p>
              )}
            </div>
          </article>

          {/* Label progress — only show in single-column mode */}
          {!showForm && (
            <article className="card rounded-[2rem] p-6">
              <p className="eyebrow text-xs text-muted">Submissions</p>
              <h2 className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em]">Label Progress</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">{task.submittedLabels} of {task.requiredLabels} labels received</span>
                  <span className="font-semibold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/8">
                  <div className="h-full rounded-full bg-black transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              {labelsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="size-5 animate-spin text-muted" />
                </div>
              ) : labels.length > 0 ? (
                <div className="mt-5 space-y-2">
                  <h3 className="eyebrow text-[0.65rem] text-muted">Submitted labels</h3>
                  <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                    {labels.map((label, idx) => (
                      <div key={label.id} className="flex items-center justify-between rounded-2xl border border-black/8 bg-white/60 px-4 py-3 text-sm">
                        <div>
                          <p className="font-semibold">{idx + 1}. {label.value}</p>
                          <p className="mt-0.5 text-xs text-muted">Confidence: {Math.round(label.confidence * 100)}%</p>
                        </div>
                        <p className="whitespace-nowrap text-xs text-muted ml-4">
                          {formatDistanceToNow(new Date(label.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted">No labels submitted yet.</p>
              )}
            </article>
          )}
        </div>

        {/* Right column (or bottom in single-column): label form + state messages */}
        <div className={showForm ? 'flex-1 space-y-4' : 'space-y-4'}>
          {/* Label submission form */}
          {canSubmitLabel && isAcceptingSubmissions && (
            <article className="card rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow text-xs text-muted">Contribute</p>
                  <h2 className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em]">Submit Your Label</h2>
                </div>
                {showForm && (
                  <button onClick={() => setShowForm(false)} className="text-sm text-muted hover:text-foreground transition">
                    Hide form
                  </button>
                )}
              </div>
              <div className="mt-5">
                {lastSubmittedLabel && showResult ? (
                  <SubmissionResult
                    labelValue={lastSubmittedLabel.value}
                    confidence={lastSubmittedLabel.confidence}
                    submittedAt={lastSubmittedLabel.createdAt}
                    onContinue={() => { setShowResult(false); setShowForm(true); }}
                  />
                ) : !showForm ? (
                  <button
                    onClick={() => void assignAndStart()}
                    disabled={isAssigning}
                    className="btn-primary w-full py-3 text-sm disabled:opacity-60"
                  >
                    {isAssigning ? 'Claiming task…' : 'Start Labeling'}
                  </button>
                ) : (
                  <LabelSubmitForm
                    taskId={taskId}
                    taskTitle={task.title}
                    labelType={task.dataset?.labelType}
                    labelOptions={labelOptions}
                    onSuccess={() => {
                      setShowForm(false);
                      setShowResult(true);
                      void refetchLabels();
                      // Re-fetch task status; only re-show form if task still accepts submissions
                      setTimeout(() => {
                        void fetchTask().then(() => {
                          setShowResult(false);
                          // setShowForm(true) is intentionally omitted — the updated task
                          // state drives whether the form re-appears via isAcceptingSubmissions
                        });
                      }, 3000);
                    }}
                    onCancel={() => setShowForm(false)}
                  />
                )}
              </div>
            </article>
          )}

          {/* State messages */}
          {!canSubmitLabel && (
            <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 text-center text-sm text-muted">
              You don&apos;t have permission to submit labels for this task.
            </div>
          )}
          {canSubmitLabel && !isAcceptingSubmissions && (
            <div className="rounded-[2rem] border border-black/8 bg-white/50 p-6 text-center text-sm text-muted">
              This task is no longer accepting submissions — status: <span className="font-semibold">{statusLabel(task.status)}</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
