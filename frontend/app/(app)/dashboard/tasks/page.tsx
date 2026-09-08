"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { useTasks } from "@/hooks/use-tasks";

export default function TasksPage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("");

  const { tasks, loading, error, refetch } = useTasks(
    statusFilter ? { status: statusFilter, limit: 100 } : { limit: 100 }
  );

  const filtered = useMemo(() => {
    if (!statusFilter) return tasks;
    return tasks.filter((t) => t.status === statusFilter);
  }, [tasks, statusFilter]);

  const role = user?.role ?? "unknown";

  const getStatusStyle = (status: string): { label: string; cardClass: string; badgeClass: string } => {
    switch (status) {
      // Active — fully visible and actionable
      case "pending":
        return { label: "Pending",     cardClass: "border-black/15 bg-white/65",          badgeClass: "border-black/10 bg-white/70 text-foreground" };
      case "in_progress":
        return { label: "In Progress", cardClass: "border-black/15 bg-white/70",          badgeClass: "border-black/10 bg-black/5 text-foreground" };
      // Done — all greyed out equally
      case "labeled":
        return { label: "Labeled",     cardClass: "border-black/6 bg-white/30 opacity-45", badgeClass: "border-black/5 bg-white/50 text-black/35" };
      case "validated":
        return { label: "Accepted",    cardClass: "border-black/6 bg-white/30 opacity-45", badgeClass: "border-black/5 bg-white/50 text-black/35" };
      case "rejected":
        return { label: "Rejected",    cardClass: "border-black/6 bg-white/30 opacity-45", badgeClass: "border-black/5 bg-white/50 text-black/35" };
      case "completed":
        return { label: "Completed",   cardClass: "border-black/6 bg-white/30 opacity-45", badgeClass: "border-black/5 bg-white/50 text-black/35" };
      default:
        return { label: status.replace("_", " "), cardClass: "border-black/8 bg-white/65", badgeClass: "border-black/10 bg-white/70 text-muted" };
    }
  };

  return (
    /* flex-1 + min-h-0: fills the space the shell reserves for page content without extending beyond the viewport */
    <div className="flex min-h-0 flex-1 flex-col gap-4">

      {/* ── Sticky header ── */}
      <article className="card shrink-0 rounded-[2rem] px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-xs text-muted">Task Queue</p>
            <h1 className="mt-2 font-mono text-3xl font-semibold tracking-[-0.04em]">Available Tasks</h1>
            <p className="mt-1 text-sm text-muted">Browse tasks and open details to submit labels.</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              className="field py-2 text-sm"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="labeled">Labeled</option>
              <option value="validated">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
            <button
              className="btn-secondary px-4 py-2 text-sm"
              onClick={() => void refetch()}
              type="button"
            >
              <RefreshCw className={`mr-2 inline-block size-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </div>
      </article>

      {/* ── Error banner ── */}
      {error && (
        <div className="shrink-0 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm">
          Failed to load tasks: {error.message}
        </div>
      )}

      {/* ── Scrollable task list — fills remaining height, scrolls internally ── */}
      <article className="card flex min-h-0 flex-1 flex-col rounded-[2rem] p-5 md:p-6">
        <div className="flex shrink-0 items-center justify-between gap-3 pb-4">
          <span className="eyebrow text-xs text-muted">
            {loading ? "Loading…" : `${filtered.length} task${filtered.length !== 1 ? "s" : ""}`}
          </span>
          {(role === "validator" || role === "admin") && (
            <Link className="text-xs text-muted underline hover:text-foreground transition" href="/dashboard/review">
              Review Labels →
            </Link>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-black/[0.05]" />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="rounded-3xl border border-dashed border-black/15 p-10 text-center text-sm text-muted">
              No tasks found for this filter. Try changing the status filter or refresh.
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="space-y-3">
              {filtered.map((task) => {
                const progress = task.requiredLabels
                  ? Math.min((task.submittedLabels / task.requiredLabels) * 100, 100)
                  : 0;
                const { label, cardClass, badgeClass } = getStatusStyle(task.status);
                const canOpen = task.status === 'pending' || task.status === 'in_progress';

                return (
                  <div
                    key={task.id}
                    className={`rounded-[1.5rem] border p-4 transition hover:shadow-sm ${cardClass}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold">{task.title}</p>
                          <span className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] ${badgeClass}`}>
                            {label}
                          </span>
                        </div>
                        <p className="line-clamp-1 text-sm text-muted">{task.description}</p>
                        <div className="flex items-center gap-3 pt-1 text-xs text-muted">
                          <span className="font-semibold text-foreground">◎ {task.reward.toFixed(2)} SOL</span>
                          <span>{task.submittedLabels} / {task.requiredLabels} labels</span>
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/8">
                          <div className="h-full rounded-full bg-black/40 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>

                      {canOpen && (
                        <Link
                          className="btn-primary shrink-0 px-4 py-2 text-sm"
                          href={`/dashboard/tasks/${task.id}`}
                        >
                          Open task
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
