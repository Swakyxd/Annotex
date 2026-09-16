"use client";

import { useEffect, useMemo, useState } from "react";
import { getSession } from "next-auth/react";
import {
  ArrowUpRight,
  CircleDollarSign,
  Clock,
  ExternalLink,
  History,
  RefreshCw,
  Search,
  Wallet,
  X,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { DateRange, isWithinDateRange } from "@/components/label-history";
import { API_BASE_URL } from "@/lib/constants";

type PendingPayout = {
  totalPendingSOL: number;
  totalPendingCount: number;
};

type Transaction = {
  id: string;
  amount: number;
  status: string;
  transactionHash?: string | null;
  createdAt: string;
};

const dateRangeOptions: Array<{ id: DateRange; label: string }> = [
  { id: "1d", label: "1D" },
  { id: "1w", label: "1W" },
  { id: "1m", label: "1M" },
  { id: "6m", label: "6M" },
  { id: "1y", label: "1Y" },
  { id: "lifetime", label: "Lifetime" },
];

const statusOptions = ["all", "completed", "confirmed", "pending", "failed"];

export default function EarningsPage() {
  const { user, accessToken } = useAuth();
  const [pending, setPending] = useState<PendingPayout | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>("lifetime");
  const [statusFilter, setStatusFilter] = useState("all");

  const request = async <T,>(path: string): Promise<T> => {
    const session = await getSession();
    const token = session?.accessToken ?? accessToken;

    if (!token) {
      throw new Error("Missing session token. Please sign in again.");
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = (await response.json()) as { success: boolean; message: string; data?: T };
    if (!response.ok || !payload.success || payload.data === undefined) {
      throw new Error(payload.message || "Request failed");
    }

    return payload.data;
  };

  const loadData = async () => {
    setLoading(true);
    setFeedback("");
    try {
      const [pendingData, txData] = await Promise.allSettled([
        request<PendingPayout>("/payouts/pending"),
        request<{ transactions: Transaction[]; pagination: { total: number } }>(
          "/blockchain/transactions?limit=100"
        ),
      ]);

      if (pendingData.status === "fulfilled") {
        setPending(pendingData.value);
      } else {
        setPending({ totalPendingSOL: 0, totalPendingCount: 0 });
      }

      if (txData.status === "fulfilled") {
        setTransactions(txData.value.transactions ?? []);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to load earnings data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      void loadData();
    }
  }, [accessToken, user?.role]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Date range filter
      if (!isWithinDateRange(tx.createdAt, dateRange)) return false;

      // Status filter
      if (statusFilter !== "all" && tx.status.toLowerCase() !== statusFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          tx.status.toLowerCase().includes(q) ||
          String(tx.amount).includes(q) ||
          Boolean(tx.transactionHash?.toLowerCase().includes(q)) ||
          tx.id.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [transactions, dateRange, statusFilter, searchQuery]);

  const totalFilteredSOL = useMemo(() => {
    return filteredTransactions
      .filter((tx) => tx.status === "completed" || tx.status === "confirmed")
      .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  }, [filteredTransactions]);

  const roleTitle =
    user?.role === "validator"
      ? "Validator Payouts & Earnings"
      : user?.role === "admin"
      ? "Platform Earnings & Payouts"
      : "Contributor Earnings";

  const roleSubtitle =
    user?.role === "validator"
      ? "Track validation rewards, transactions, and settlement history on Solana devnet."
      : "Track pending payouts, earnings rate, and recent micro-reward transactions.";

  return (
    <section className="space-y-6">
      {/* Header */}
      <article className="card rounded-[1.75rem] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-xs text-muted">Financial Overview</p>
            <h1 className="mt-1 font-mono text-3xl font-semibold tracking-[-0.04em]">{roleTitle}</h1>
            <p className="mt-1 text-sm text-muted">{roleSubtitle}</p>
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
              onClick={() => void loadData()}
              type="button"
            >
              <RefreshCw className={`mr-2 inline-block size-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </article>

      {feedback ? <article className="card rounded-[1.75rem] p-4 text-sm">{feedback}</article> : null}

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="card rounded-[1.75rem] p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-xs text-muted">Ready for Payout</p>
            <CircleDollarSign className="size-4 text-muted" aria-hidden="true" />
          </div>
          <p className="mt-3 font-mono text-3xl font-bold">{pending?.totalPendingSOL ?? 0} SOL</p>
          <p className="mt-1 text-xs text-muted">Across {pending?.totalPendingCount ?? 0} payout items</p>
        </article>

        <article className="card rounded-[1.75rem] p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-xs text-muted">Settled ({dateRange.toUpperCase()})</p>
            <Wallet className="size-4 text-emerald-600" aria-hidden="true" />
          </div>
          <p className="mt-3 font-mono text-3xl font-bold text-emerald-700">
            {totalFilteredSOL.toFixed(4)} SOL
          </p>
          <p className="mt-1 text-xs text-muted">Completed in selected timeframe</p>
        </article>

        <article className="card rounded-[1.75rem] p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-xs text-muted">Transactions ({dateRange.toUpperCase()})</p>
            <History className="size-4 text-muted" aria-hidden="true" />
          </div>
          <p className="mt-3 font-mono text-3xl font-bold">{filteredTransactions.length}</p>
          <p className="mt-1 text-xs text-muted">Total transaction entries</p>
        </article>
      </div>

      {/* Transactions Section */}
      <article className="card rounded-[1.75rem] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-mono text-2xl font-semibold tracking-[-0.04em]">Transaction History</h2>
            <p className="mt-1 text-sm text-muted">On-chain Solana devnet settlement logs</p>
          </div>
          <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-muted">
            {filteredTransactions.length} of {transactions.length} records
          </span>
        </div>

        {/* Filter Bar: Search & Status Filter */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by status, amount, or transaction hash..."
              className="field w-full pl-9 pr-8 text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {statusOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  statusFilter === s
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white/60 text-muted hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction list */}
        <div className="mt-5 space-y-2.5 max-h-[32rem] overflow-y-auto pr-1">
          {filteredTransactions.map((tx) => {
            const isSuccess = tx.status === "completed" || tx.status === "confirmed";
            const isFailed = tx.status === "failed";
            const badgeClass = isSuccess
              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
              : isFailed
              ? "bg-red-100 text-red-800 border-red-300"
              : "bg-black/8 text-muted border-black/10";

            return (
              <div
                key={tx.id}
                className="flex flex-col gap-3 rounded-2xl border border-black/8 bg-white/60 p-4 transition hover:border-black/15 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] ${badgeClass}`}>
                      {tx.status}
                    </span>
                    <p className="text-xs text-muted">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {tx.transactionHash ? (
                    <a
                      href={`https://explorer.solana.com/tx/${tx.transactionHash}?cluster=devnet`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-foreground hover:underline"
                    >
                      <span>Tx: {tx.transactionHash.slice(0, 10)}…{tx.transactionHash.slice(-8)}</span>
                      <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <p className="mt-1 font-mono text-xs text-muted">ID: {tx.id.slice(0, 8)}</p>
                  )}
                </div>

                <div className="text-right">
                  <p className="font-mono text-lg font-semibold text-foreground">
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount} SOL
                  </p>
                </div>
              </div>
            );
          })}

          {!filteredTransactions.length ? (
            <div className="rounded-3xl border border-dashed border-black/15 p-10 text-center text-sm text-muted">
              {transactions.length === 0
                ? "No transaction history recorded yet."
                : "No transactions match your search query or timeframe filter."}
            </div>
          ) : null}
        </div>
      </article>
    </section>
  );
}
