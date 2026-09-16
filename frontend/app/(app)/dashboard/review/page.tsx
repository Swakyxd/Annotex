"use client";

import { useEffect, useMemo, useState } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, Clock, RefreshCw, Search, X, XCircle } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { DateRange, isWithinDateRange } from "@/components/label-history";
import { API_BASE_URL } from "@/lib/constants";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  submittedLabels: number;
  requiredLabels: number;
  reward?: number;
};

type Label = {
  id: string;
  value: string;
  confidence: number;
  createdAt: string;
  contributor?: { id: string; firstName?: string; lastName?: string; email?: string };
  isAccepted: boolean;
  isRejected: boolean;
  timeSpentSeconds?: number;
};

const dateRangeOptions: Array<{ id: DateRange; label: string }> = [
  { id: "1d", label: "1D" },
  { id: "1w", label: "1W" },
  { id: "1m", label: "1M" },
  { id: "6m", label: "6M" },
  { id: "1y", label: "1Y" },
  { id: "lifetime", label: "Lifetime" },
];

export default function ReviewPage() {
  const { user, accessToken } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [labelsByTask, setLabelsByTask] = useState<Record<string, Label[]>>({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>("lifetime");

  const canReview = user?.role === "validator" || user?.role === "admin";

  const request = async <T,>(path: string, init?: RequestInit): Promise<T> => {
    const session = await getSession();
    const token = session?.accessToken ?? accessToken;

    if (!token) {
      throw new Error("Missing session token. Please sign in again.");
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(init?.headers ?? {}),
      },
    });

    const payload = (await response.json()) as {
      success: boolean;
      message: string;
      data?: T;
    };

    if (!response.ok || !payload.success || payload.data === undefined) {
      throw new Error(payload.message || "Request failed");
    }

    return payload.data;
  };

  const loadReviewQueue = async () => {
    if (!canReview) {
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const tasksPayload = await request<{ tasks: Task[]; pagination: { total: number } }>("/tasks?limit=100");
      const reviewableTasks = tasksPayload.tasks.filter(
        (task) => task.submittedLabels > 0 && task.status !== "rejected"
      );
      setTasks(reviewableTasks);

      const nextLabelsByTask: Record<string, Label[]> = {};
      await Promise.all(
        reviewableTasks.map(async (task) => {
          const labels = await request<Label[]>(`/labels/task/${task.id}`);
          nextLabelsByTask[task.id] = labels.filter((label) => !label.isAccepted && !label.isRejected);
        })
      );
      setLabelsByTask(nextLabelsByTask);
      setFeedback("Review queue loaded.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to load review queue");
      setTasks([]);
      setLabelsByTask({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadReviewQueue();
  }, []);

  const pendingCount = useMemo(
    () => Object.values(labelsByTask).reduce((sum, labels) => sum + labels.length, 0),
    [labelsByTask]
  );

  const filteredTasks = useMemo(() => {
    return tasks
      .map((task) => {
        const rawLabels = labelsByTask[task.id] ?? [];
        const labels = rawLabels.filter((label) => {
          if (!isWithinDateRange(label.createdAt, dateRange)) return false;
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matches =
              task.title.toLowerCase().includes(q) ||
              task.description.toLowerCase().includes(q) ||
              label.value.toLowerCase().includes(q) ||
              Boolean(label.contributor?.email?.toLowerCase().includes(q));
            if (!matches) return false;
          }
          return true;
        });
        return { ...task, filteredLabels: labels };
      })
      .filter((task) => {
        if (task.filteredLabels.length > 0) return true;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            task.title.toLowerCase().includes(q) ||
            task.description.toLowerCase().includes(q)
          );
        }
        return false;
      });
  }, [tasks, labelsByTask, dateRange, searchQuery]);

  const moderate = async (labelId: string, action: "approve" | "reject") => {
    setLoading(true);
    setFeedback("");
    try {
      await request(`/labels/${labelId}/${action}`, {
        method: "POST",
        body: action === "reject" ? JSON.stringify({ reason: "Did not meet quality standards" }) : JSON.stringify({}),
      });
      await loadReviewQueue();
      setFeedback(`Label ${action}d successfully.`);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : `Failed to ${action} label`);
    } finally {
      setLoading(false);
    }
  };

  if (!canReview) {
    return (
      <article className="card rounded-[1.75rem] p-6 text-sm text-red-700">
        This page is only available for validators and admins.
      </article>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <article className="card rounded-[1.75rem] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-xs text-muted">Quality Control</p>
            <h1 className="mt-1 font-mono text-3xl font-semibold tracking-[-0.04em]">Review Labels</h1>
            <p className="mt-1 text-sm text-muted">
              {pendingCount} pending submission{pendingCount !== 1 ? "s" : ""} awaiting review
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date range filter pills */}
            <div className="flex flex-wrap items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1">
              {dateRangeOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDateRange(opt.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    dateRange === opt.id
                      ? "bg-black text-white shadow-xs"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              className="btn-secondary px-4 py-2 text-sm"
              disabled={loading}
              onClick={() => void loadReviewQueue()}
              type="button"
            >
              <RefreshCw className={`mr-2 inline-block size-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-5 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by task title, label value, or contributor..."
              className="field field-search w-full text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </article>

      {feedback ? <article className="card rounded-[1.75rem] p-4 text-sm">{feedback}</article> : null}

      {filteredTasks.length === 0 ? (
        <article className="card rounded-[1.75rem] p-10 text-center text-sm text-muted">
          {pendingCount === 0
            ? "No labels pending review right now."
            : "No pending labels match the active search query or date range."}
        </article>
      ) : (
        filteredTasks.map((task) => (
          <article key={task.id} className="card rounded-[1.75rem] p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-lg">{task.title}</h2>
                <p className="mt-1 text-sm text-muted">{task.description}</p>
                <p className="mt-2 text-xs text-muted">
                  Task labels: {task.submittedLabels}/{task.requiredLabels}
                  {task.reward ? ` | ${task.reward} SOL reward` : ""}
                </p>
              </div>
              <Link className="btn-secondary text-xs px-3 py-1.5" href={`/dashboard/tasks/${task.id}`}>
                Open task
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {task.filteredLabels.map((label) => (
                <div key={label.id} className="rounded-xl border border-black/10 bg-white/60 p-4 transition hover:border-black/20">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted">Value:</span>
                      <span className="font-mono font-semibold text-base">{label.value}</span>
                    </div>
                    <p className="text-xs text-muted">
                      {formatDistanceToNow(new Date(label.createdAt), { addSuffix: true })}
                    </p>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                    <span>Confidence: <strong className="text-foreground">{Math.round((label.confidence ?? 1) * 100)}%</strong></span>
                    <span>•</span>
                    <span>Contributor: <strong className="text-foreground">{label.contributor?.email ?? label.contributor?.id ?? "unknown"}</strong></span>
                    {label.timeSpentSeconds ? (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" />
                          {label.timeSpentSeconds}s
                        </span>
                      </>
                    ) : null}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn-primary text-xs px-4 py-2"
                      disabled={loading}
                      onClick={() => void moderate(label.id, "approve")}
                      type="button"
                    >
                      <CheckCircle2 className="mr-1.5 inline-block size-3.5" />
                      Approve Label
                    </button>
                    <button
                      className="btn-secondary text-xs px-4 py-2"
                      disabled={loading}
                      onClick={() => void moderate(label.id, "reject")}
                      type="button"
                    >
                      <XCircle className="mr-1.5 inline-block size-3.5 text-red-600" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}

              {task.filteredLabels.length === 0 ? (
                <p className="text-sm text-muted">No pending labels matching filter on this task.</p>
              ) : null}
            </div>
          </article>
        ))
      )}
    </section>
  );
}
