"use client";

import { useEffect, useMemo, useState } from "react";
import { getSession } from "next-auth/react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { API_BASE_URL } from "@/lib/constants";

type UserItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tasksCompleted: number;
  accuracyRate: number;
};

const PAGE_SIZE = 5;

function Pagination({
  total,
  page,
  onPage,
}: {
  total: number;
  page: number;
  onPage: (p: number) => void;
}) {
  const pages = Math.ceil(total / PAGE_SIZE);
  if (pages <= 1) return null;

  // Show at most 5 page numbers centred around current page
  const range: number[] = [];
  const delta = 2;
  for (let i = Math.max(1, page - delta); i <= Math.min(pages, page + delta); i++) {
    range.push(i);
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>

      {range[0] > 1 && (
        <>
          <button type="button" onClick={() => onPage(1)} className="flex size-8 items-center justify-center rounded-lg text-sm transition hover:bg-black/5">1</button>
          {range[0] > 2 && <span className="px-1 text-sm text-muted">…</span>}
        </>
      )}

      {range.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPage(p)}
          className={`flex size-8 items-center justify-center rounded-lg text-sm font-semibold transition ${
            p === page ? "bg-black text-white" : "hover:bg-black/5"
          }`}
        >
          {p}
        </button>
      ))}

      {range[range.length - 1] < pages && (
        <>
          {range[range.length - 1] < pages - 1 && <span className="px-1 text-sm text-muted">…</span>}
          <button type="button" onClick={() => onPage(pages)} className="flex size-8 items-center justify-center rounded-lg text-sm transition hover:bg-black/5">{pages}</button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPage(page + 1)}
        disabled={page === pages}
        className="flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

function UserTable({
  rows,
  actionId,
  actionLabel,
  busyLabel,
  buttonClass,
  onAction,
}: {
  rows: UserItem[];
  actionId: string | null;
  actionLabel: string;
  busyLabel: string;
  buttonClass: string;
  onAction: (row: UserItem) => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
    );
  }, [rows, search]);

  // Reset to page 1 when search changes
  useEffect(() => { setPage(1); }, [search]);
  // Reset to page 1 if rows changes (e.g. after promote/demote)
  useEffect(() => { setPage(1); }, [rows.length]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="field field-search w-full text-sm"
        />
      </div>

      {paged.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted">
          {search ? "No users match your search." : "No users found."}
        </p>
      ) : (
        <>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-xs text-muted">
                <th className="pb-2 pr-4 font-medium">Name</th>
                <th className="pb-2 pr-4 font-medium">Email</th>
                <th className="w-16 pb-2 pr-4 font-medium">Tasks</th>
                <th className="w-20 pb-2 pr-4 font-medium">Accuracy</th>
                <th className="w-28 pb-2 text-right font-medium" />
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} className="border-b border-black/5 last:border-0">
                  <td className="max-w-[160px] py-2.5 pr-4">
                    <span className="block truncate font-medium">
                      {row.firstName} {row.lastName}
                    </span>
                  </td>
                  <td className="max-w-[200px] py-2.5 pr-4">
                    <span className="block truncate text-muted">{row.email}</span>
                  </td>
                  <td className="w-16 py-2.5 pr-4">{row.tasksCompleted}</td>
                  <td className="w-20 py-2.5 pr-4">
                    {row.accuracyRate?.toFixed?.(2) ?? row.accuracyRate}%
                  </td>
                  <td className="w-28 py-2.5 text-right">
                    <button
                      type="button"
                      disabled={actionId === row.id}
                      onClick={() => onAction(row)}
                      className={buttonClass}
                    >
                      {actionId === row.id ? busyLabel : actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex items-center justify-between text-xs text-muted">
            <span>
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <Pagination total={filtered.length} page={page} onPage={setPage} />
          </div>
        </>
      )}
    </div>
  );
}

export default function PromotePage() {
  const { user, accessToken } = useAuth();
  const [contributors, setContributors] = useState<UserItem[]>([]);
  const [validators, setValidators] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const getToken = async () => {
    const session = await getSession();
    const token = session?.accessToken ?? accessToken;
    if (!token) throw new Error("Missing session token. Please sign in again.");
    return token;
  };

  const loadUsers = async () => {
    if (user?.role !== "admin") return;
    setLoading(true);
    setFeedback("");
    try {
      const token = await getToken();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const [cRes, vRes] = await Promise.all([
        fetch(`${API_BASE_URL}/users?role=contributor&limit=100`, { headers }),
        fetch(`${API_BASE_URL}/users?role=validator&limit=100`, { headers }),
      ]);
      const cPayload = (await cRes.json()) as { success: boolean; message: string; data?: { users: UserItem[] } };
      const vPayload = (await vRes.json()) as { success: boolean; message: string; data?: { users: UserItem[] } };

      if (!cRes.ok || !cPayload.success || !cPayload.data)
        throw new Error(cPayload.message || "Failed to load contributors");
      if (!vRes.ok || !vPayload.success || !vPayload.data)
        throw new Error(vPayload.message || "Failed to load validators");

      setContributors(cPayload.data.users ?? []);
      setValidators(vPayload.data.users ?? []);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const promote = async (row: UserItem) => {
    setActionId(row.id);
    setFeedback("");
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE_URL}/users/${row.id}/promote`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const payload = (await res.json()) as { success: boolean; message: string };
      if (!res.ok || !payload.success) throw new Error(payload.message || "Failed to promote");
      setContributors((prev) => prev.filter((u) => u.id !== row.id));
      setValidators((prev) => [{ ...row, role: "validator" }, ...prev]);
      setFeedback(`✓ ${row.firstName} ${row.lastName} promoted to Validator.`);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to promote");
    } finally {
      setActionId(null);
    }
  };

  const demote = async (row: UserItem) => {
    setActionId(row.id);
    setFeedback("");
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE_URL}/users/${row.id}/demote`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const payload = (await res.json()) as { success: boolean; message: string };
      if (!res.ok || !payload.success) throw new Error(payload.message || "Failed to demote");
      setValidators((prev) => prev.filter((u) => u.id !== row.id));
      setContributors((prev) => [{ ...row, role: "contributor" }, ...prev]);
      setFeedback(`✓ ${row.firstName} ${row.lastName} demoted back to Contributor.`);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to demote");
    } finally {
      setActionId(null);
    }
  };

  useEffect(() => { void loadUsers(); }, [user?.role]);

  if (user?.role !== "admin") {
    return (
      <article className="card rounded-[1.75rem] p-6 text-sm text-red-700">
        This page is only available for admins.
      </article>
    );
  }

  return (
    <section className="space-y-5">
      {/* Header */}
      <article className="card rounded-[1.75rem] p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-xs text-muted">Admin Directory</p>
            <h1 className="mt-2 font-mono text-3xl font-semibold tracking-[-0.04em]">
              Promote / Demote
            </h1>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Promote contributors to Validator or demote Validators back to Contributor.
              Role changes take effect on their next login.
            </p>
          </div>
          <button
            className="btn-secondary"
            disabled={loading}
            onClick={() => void loadUsers()}
            type="button"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </article>

      {feedback && (
        <div className="rounded-2xl border border-black/10 bg-white/80 px-5 py-3 text-sm">
          {feedback}
        </div>
      )}

      <div className="space-y-5">
        {/* Contributors → Promote */}
        <article className="card rounded-[1.75rem] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-mono text-xl font-semibold tracking-[-0.03em]">Contributors</h2>
              <p className="mt-0.5 text-sm text-muted">{contributors.length} users · promote to Validator</p>
            </div>
            <span className="rounded-full bg-black/6 px-3 py-1 text-xs font-semibold text-muted">↑ Promote</span>
          </div>
          <UserTable
            rows={contributors}
            actionId={actionId}
            actionLabel="Promote ↑"
            busyLabel="Promoting…"
            buttonClass="btn-secondary text-xs px-4 py-1.5"
            onAction={promote}
          />
        </article>

        {/* Validators → Demote */}
        <article className="card rounded-[1.75rem] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-mono text-xl font-semibold tracking-[-0.03em]">Validators</h2>
              <p className="mt-0.5 text-sm text-muted">{validators.length} users · demote to Contributor</p>
            </div>
            <span className="rounded-full bg-black/6 px-3 py-1 text-xs font-semibold text-muted">↓ Demote</span>
          </div>
          <UserTable
            rows={validators}
            actionId={actionId}
            actionLabel="Demote ↓"
            busyLabel="Demoting…"
            buttonClass="rounded-xl border border-black/12 bg-white/70 px-4 py-1.5 text-xs font-semibold transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            onAction={demote}
          />
        </article>
      </div>
    </section>
  );
}
