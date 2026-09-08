"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSession } from "next-auth/react";

import { useAuth } from "@/components/providers/auth-provider";
import { API_BASE_URL } from "@/lib/constants";

type PaymentRequest = {
  transactionId: string;
  paymentUrl: string;
  qrCode: string;
  reference: string;
  recipient: string;
  amountSOL: number;
  payoutCount?: number;
  network: string;
};

type Transaction = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function PayoutsPage() {
  const { user, accessToken } = useAuth();
  const [userId, setUserId] = useState("");
  const [datasetId, setDatasetId] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [requestData, setRequestData] = useState<PaymentRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const api = async <T,>(path: string, init?: RequestInit): Promise<T> => {
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

    const payload = (await response.json()) as { success: boolean; message: string; data?: T };
    if (!response.ok || !payload.success || payload.data === undefined) {
      throw new Error(payload.message || "Request failed");
    }

    return payload.data;
  };

  const loadTransactions = async () => {
    setLoading(true);
    setFeedback("");
    try {
      const data = await api<{ transactions: Transaction[]; pagination: { total: number } }>("/blockchain/transactions?limit=20&all=true");
      setTransactions(data.transactions ?? []);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to load transactions");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      void loadTransactions();
    }
  }, [user?.role]);

  const calculatePayouts = async () => {
    setLoading(true);
    setFeedback("");
    try {
      await api("/payouts/calculate", {
        method: "POST",
        body: JSON.stringify(datasetId.trim() ? { datasetId: datasetId.trim() } : {}),
      });
      setFeedback("Payout calculation completed.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to calculate payouts");
    } finally {
      setLoading(false);
    }
  };

  const triggerPayout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId.trim()) {
      setFeedback("Contributor user id is required.");
      return;
    }

    setLoading(true);
    setFeedback("");
    try {
      const payload = await api<PaymentRequest>("/payouts/trigger", {
        method: "POST",
        body: JSON.stringify({
          userId: userId.trim(),
          ...(datasetId.trim() ? { datasetId: datasetId.trim() } : {}),
        }),
      });
      setRequestData(payload);
      setFeedback("Payout request generated. Complete with admin wallet on devnet.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to trigger payout");
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "admin") {
    return <article className="card rounded-[1.75rem] p-6 text-sm text-red-700">This page is only available for admins.</article>;
  }

  return (
    <section className="space-y-6">
      <article className="card rounded-[1.75rem] p-6">
        <h1 className="font-mono text-3xl font-semibold tracking-[-0.04em]">Payouts</h1>
        <p className="mt-2 text-sm text-muted">Calculate payouts and generate Solana payout requests.</p>
      </article>

      {feedback ? <article className="card rounded-[1.75rem] p-4 text-sm">{feedback}</article> : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="card rounded-[1.75rem] p-6 space-y-3">
          <h2 className="font-semibold">Calculate payout amounts</h2>
          <input className="field" onChange={(e) => setDatasetId(e.target.value)} placeholder="Dataset ID (optional)" value={datasetId} />
          <button className="btn-secondary" disabled={loading} onClick={() => void calculatePayouts()} type="button">
            Calculate payouts
          </button>
        </article>

        <article className="card rounded-[1.75rem] p-6">
          <h2 className="font-semibold">Trigger payout request</h2>
          <form className="mt-3 space-y-3" onSubmit={triggerPayout}>
            <input className="field" onChange={(e) => setUserId(e.target.value)} placeholder="Contributor user ID" value={userId} />
            <button className="btn-primary" disabled={loading} type="submit">Generate payout QR</button>
          </form>
          {requestData ? (
            <div className="mt-4 rounded-xl border border-black/10 bg-white/70 p-4 text-sm">
              <p className="font-semibold">Payment request ({requestData.network})</p>
              <p className="mt-1 text-muted">Amount: {Number(requestData.amountSOL).toFixed(4)} SOL</p>
              <a className="mt-2 block break-all text-xs underline" href={requestData.paymentUrl}>{requestData.paymentUrl}</a>
              <img alt="Payout QR" className="mt-3 h-44 w-44 rounded-lg border border-black/10" src={requestData.qrCode} />
            </div>
          ) : null}
        </article>
      </div>

      <article className="card rounded-[1.75rem] p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Recent transactions</h2>
          <button className="btn-secondary" disabled={loading} onClick={() => void loadTransactions()} type="button">Refresh</button>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {transactions.map((tx) => (
            <div key={tx.id} className="rounded-lg border border-black/10 bg-white/60 p-3 text-sm">
              <p className="font-medium">{tx.status}</p>
              <p className="text-muted">{Number(tx.amount).toFixed(4)} SOL</p>
              <p className="text-xs text-muted">{new Date(tx.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {!transactions.length ? <p className="text-sm text-muted">No transactions yet.</p> : null}
        </div>
      </article>
    </section>
  );
}
