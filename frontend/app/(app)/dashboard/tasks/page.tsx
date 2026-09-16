"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Plus, RefreshCw, Search, Trash2, X } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { isAdmin, isContributor, isValidator } from "@/lib/role-utils";
import { useTasks } from "@/hooks/use-tasks";
import { API_BASE_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";

export default function TasksPage() {
  const { user } = useAuth();
  const { data: session } = useSession();
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  // Create task form state
  const [title, setTitle]         = useState("");
  const [description, setDesc]    = useState("");
  const [datasetId, setDatasetId] = useState("");
  const [reward, setReward]       = useState("");
  const [requiredLabels, setReqLabels] = useState("3");
  const [creating, setCreating]   = useState(false);
  const [createMsg, setCreateMsg] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { tasks, loading, error, refetch } = useTasks(
    statusFilter ? { status: statusFilter, limit: 100 } : { limit: 100 }
  );

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter && t.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          String(t.reward).includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [tasks, statusFilter, searchQuery]);

  const role = user?.role ?? "unknown";
  const canAdmin = isAdmin(user?.role);

  const getStatusStyle = (status: string): { label: string; cardClass: string; badgeClass: string } => {
    switch (status) {
      case "pending":    return { label: "Pending",     cardClass: "border-black/15 bg-white/65",           badgeClass: "border-black/10 bg-white/70 text-foreground" };
      case "in_progress":return { label: "In Progress", cardClass: "border-black/15 bg-white/70",           badgeClass: "border-black/10 bg-black/5 text-foreground" };
      case "labeled":    return { label: "Labeled",     cardClass: "border-black/6 bg-white/30 opacity-45", badgeClass: "border-black/5 bg-white/50 text-black/35" };
      case "validated":  return { label: "Accepted",    cardClass: "border-black/6 bg-white/30 opacity-45", badgeClass: "border-black/5 bg-white/50 text-black/35" };
      case "rejected":   return { label: "Rejected",    cardClass: "border-black/6 bg-white/30 opacity-45", badgeClass: "border-black/5 bg-white/50 text-black/35" };
      case "completed":  return { label: "Completed",   cardClass: "border-black/6 bg-white/30 opacity-45", badgeClass: "border-black/5 bg-white/50 text-black/35" };
      default:           return { label: status.replace("_", " "), cardClass: "border-black/8 bg-white/65", badgeClass: "border-black/10 bg-white/70 text-muted" };
    }
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) return;
    setCreating(true);
    setCreateMsg(null);
    try {
      const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          datasetId: datasetId.trim(),
          reward: parseFloat(reward),
          requiredLabels: parseInt(requiredLabels, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? `Failed (${res.status})`);
      setCreateMsg("✓ Task created successfully.");
      setTitle(""); setDesc(""); setDatasetId(""); setReward(""); setReqLabels("3");
      void refetch();
    } catch (err) {
      setCreateMsg(err instanceof Error ? err.message : "Failed to create task.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (taskId: string, taskTitle: string) => {
    if (!session?.accessToken) return;
    if (!window.confirm(`Delete task "${taskTitle}"? This cannot be undone.`)) return;
    setDeletingId(taskId);
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? `Failed (${res.status})`);
      }
      void refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete task.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">

      {/* ── Header ── */}
      <article className="card shrink-0 rounded-[2rem] px-6 py-5">
        {/* Title */}
        <div className="mb-4">
          <p className="eyebrow text-xs text-muted">Task Queue</p>
          <h1 className="mt-1 font-mono text-3xl font-semibold tracking-[-0.04em]">
            {canAdmin ? "Manage Tasks" : "Available Tasks"}
          </h1>
        </div>

        {/* Controls — stacked into two rows */}
        <div className="flex flex-col gap-3">
          {/* Row 1: Search + Buttons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="field w-full text-sm"
                style={{ paddingLeft: "2.5rem", paddingRight: "2rem" }}
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Buttons */}
            {canAdmin && (
              <button
                className="btn-primary flex shrink-0 items-center gap-2 px-4 py-2 text-sm"
                onClick={() => setShowCreate((v) => !v)}
                type="button"
              >
                <Plus className="size-4" />
                {showCreate ? "Cancel" : "New task"}
              </button>
            )}
            <button className="btn-secondary shrink-0 px-4 py-2 text-sm" onClick={() => void refetch()} type="button">
              <RefreshCw className={`mr-2 inline-block size-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </button>
          </div>

          {/* Row 2: Status filter */}
          <div>
            <select className="field w-full py-2 text-sm" onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="labeled">Labeled</option>
              <option value="validated">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </article>

      {/* ── Admin: Create Task Panel ── */}
      {canAdmin && showCreate && (
        <article className="card shrink-0 rounded-[2rem] p-6">
          <h2 className="font-mono text-xl font-semibold tracking-[-0.04em]">Create new task</h2>
          <p className="mt-1 text-sm text-muted">Set up a labeling task linked to an existing dataset.</p>

          <form onSubmit={handleCreate} className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Task title</label>
              <input className="field w-full" placeholder="e.g. Classify sentiment in tweets" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Description / instructions</label>
              <textarea className="field min-h-[6rem] w-full" placeholder="Describe what contributors should do…" value={description} onChange={(e) => setDesc(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Dataset ID</label>
              <input className="field w-full font-mono text-sm" placeholder="UUID of the dataset" value={datasetId} onChange={(e) => setDatasetId(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Reward (SOL per label)</label>
              <input className="field w-full" type="number" step="0.001" min="0" placeholder="0.05" value={reward} onChange={(e) => setReward(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Required labels per record</label>
              <input className="field w-full" type="number" min="1" max="10" value={requiredLabels} onChange={(e) => setReqLabels(e.target.value)} />
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <button className="btn-primary px-6 py-2.5 text-sm" type="submit" disabled={creating}>
                {creating ? "Creating…" : "Create task"}
              </button>
              {createMsg && (
                <p className={`text-sm ${createMsg.startsWith("✓") ? "text-emerald-600" : "text-red-600"}`}>
                  {createMsg}
                </p>
              )}
            </div>
          </form>
        </article>
      )}

      {/* ── Error banner ── */}
      {error && (
        <div className="shrink-0 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm">
          Failed to load tasks: {error.message}
        </div>
      )}

      {/* ── Task list ── */}
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
              No tasks found. Try changing the status filter or refresh.
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="space-y-3">
              {filtered.map((task) => {
                const progress = task.requiredLabels
                  ? Math.min((task.submittedLabels / task.requiredLabels) * 100, 100)
                  : 0;
                const { label, cardClass, badgeClass } = getStatusStyle(task.status);
                const canOpen =
                  isAdmin(user?.role) || isValidator(user?.role)
                    ? true
                    : isContributor(user?.role)
                      ? task.status === "pending" || task.status === "in_progress"
                      : false;

                return (
                  <div key={task.id} className={`rounded-[1.5rem] border p-4 transition hover:shadow-sm ${cardClass}`}>
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
                          <span className="font-semibold text-foreground">◎ {task.reward.toFixed(3)} SOL</span>
                          <span>{task.submittedLabels} / {task.requiredLabels} labels</span>
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/8">
                          <div className="h-full rounded-full bg-black/40 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {canAdmin && (
                          <button
                            type="button"
                            onClick={() => void handleDelete(task.id, task.title)}
                            disabled={deletingId === task.id}
                            className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                            title="Delete task"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
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
