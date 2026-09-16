"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  Check,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/providers/auth-provider";
import { AdminOnly, ContributorOnly, ValidatorOnly } from "@/components/rbac";
import { usePermissions } from "@/components/rbac/use-permissions";
import { API_BASE_URL } from "@/lib/constants";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  reward: number;
  requiredLabels: number;
  submittedLabels: number;
  assignedToId?: string | null;
};

type Transaction = {
  id: string;
  amount: number;
  status: string;
  transactionHash?: string | null;
  createdAt: string;
};

type UserPerformance = {
  statistics?: {
    totalLabels: number;
    acceptedLabels: number;
    rejectedLabels?: number;
    accuracyRate: string;
    averageTimePerLabel: number;
    totalEarnings: number;
  };
};

type PlatformStats = {
  totalUsers: number;
  activeUsers: number;
  totalTasks: number;
  completedTasks: number;
  totalDatasets: number;
  totalLabels: number;
  acceptedLabels: number;
  rejectedLabels: number;
  totalAccepted?: number;
  totalRejected?: number;
  overallAccuracy: string;
};

type PendingPayoutSummary = {
  totalPendingSOL: number;
  totalPendingCount: number;
};

type DatasetSummary = {
  id: string;
  name: string;
  format: string;
  totalRecords: number;
  createdAt: string;
  createdBy?: {
    firstName?: string;
    lastName?: string;
  };
};

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

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export default function DashboardPage() {
  const { user, accessToken, isLoading } = useAuth();
  const router = useRouter();
  const permissions = usePermissions();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [performance, setPerformance] = useState<UserPerformance | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>(user?.walletAddress ?? "");
  const [isBusy, setIsBusy] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [newTaskReward, setNewTaskReward] = useState<string>("");
  const [fundingDatasetId, setFundingDatasetId] = useState<string>("");
  const [fundingAmount, setFundingAmount] = useState<string>("0.1");
  const [payoutUserId, setPayoutUserId] = useState<string>("");
  const [latestPaymentRequest, setLatestPaymentRequest] = useState<PaymentRequest | null>(null);
  const [pendingPayoutSummary, setPendingPayoutSummary] = useState<PendingPayoutSummary | null>(null);
  const [datasets, setDatasets] = useState<DatasetSummary[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const [taskSearch, setTaskSearch] = useState<string>("");
  const [taskStatusFilter, setTaskStatusFilter] = useState<string>("all");
  const [validatorSearch, setValidatorSearch] = useState<string>("");
  const [copiedDatasetId, setCopiedDatasetId] = useState<string | null>(null);

  const copyDatasetId = (id: string) => {
    void navigator.clipboard.writeText(id).then(() => {
      setCopiedDatasetId(id);
      setTimeout(() => setCopiedDatasetId(null), 1500);
    });
  };
  const canCallApi = Boolean(accessToken);


  const request = async <T,>(path: string, init?: RequestInit): Promise<T> => {
    if (!accessToken) {
      throw new Error("Missing session token. Please sign in again.");
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...(init?.headers ?? {}),
      },
    });

    const payload = (await response.json()) as ApiEnvelope<T>;

    if (!response.ok || !payload.success || payload.data === undefined) {
      throw new Error(payload.message || "Request failed");
    }

    return payload.data;
  };

  const requestVoid = async (path: string, init?: RequestInit): Promise<void> => {
    if (!accessToken) {
      throw new Error("Missing session token. Please sign in again.");
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...(init?.headers ?? {}),
      },
    });

    const payload = (await response.json()) as ApiEnvelope<unknown>;

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Request failed");
    }
  };

  const withFeedback = async (action: () => Promise<void>, successText: string) => {
    setIsBusy(true);
    setFeedback("");

    try {
      await action();
      setFeedback(successText);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Operation failed");
    } finally {
      setIsBusy(false);
    }
  };

  const fetchTasks = async () => {
    await withFeedback(async () => {
      const data = await request<{ tasks: Task[] }>("/tasks?limit=25");
      setTasks(data.tasks ?? []);
    }, "Tasks refreshed from backend.");
  };

  const openTask = async (taskId: string) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) {
      return;
    }

    await withFeedback(async () => {
      // Only assign when the task is pending; in_progress tasks are already assigned
      if (task.status === "pending") {
        await request(`/tasks/${taskId}/assign`, { method: "POST" });
      }
      router.push(`/dashboard/tasks/${taskId}`);
    }, "Task opened.");
  };

  /** Returns human-readable label + monochromatic classes for a task status */
  const getTaskStatusDisplay = (status: string): { label: string; badgeClass: string; cardClass: string } => {
    switch (status) {
      // Active — full opacity, clearly actionable
      case "pending":
        return {
          label: "Pending",
          badgeClass: "bg-black/8 text-foreground",
          cardClass: "border-black/15 bg-white/65",
        };
      case "in_progress":
        return {
          label: "In Progress",
          badgeClass: "bg-black/10 text-foreground",
          cardClass: "border-black/15 bg-white/70",
        };
      // Done — all greyed out equally
      case "labeled":
        return {
          label: "Labeled",
          badgeClass: "bg-black/5 text-black/35",
          cardClass: "border-black/6 bg-white/30 opacity-45",
        };
      case "validated":
        return {
          label: "Accepted",
          badgeClass: "bg-black/5 text-black/35",
          cardClass: "border-black/6 bg-white/30 opacity-45",
        };
      case "rejected":
        return {
          label: "Rejected",
          badgeClass: "bg-black/5 text-black/35",
          cardClass: "border-black/6 bg-white/30 opacity-45",
        };
      case "completed":
        return {
          label: "Completed",
          badgeClass: "bg-black/5 text-black/35",
          cardClass: "border-black/6 bg-white/30 opacity-45",
        };
      default:
        return {
          label: status.replace("_", " "),
          badgeClass: "bg-black/5 text-muted",
          cardClass: "border-black/8 bg-white/65",
        };
    }
  };

  const connectWallet = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!walletAddress.trim()) {
      setFeedback("Enter a wallet address.");
      return;
    }

    await withFeedback(async () => {
      await request("/blockchain/connect-wallet", {
        method: "POST",
        body: JSON.stringify({ walletAddress: walletAddress.trim() }),
      });
    }, "Wallet connected.");
  };

  const fetchUserPerformance = async () => {
    await withFeedback(async () => {
      const data = await request<UserPerformance>("/analytics/user-performance");
      setPerformance(data);
    }, "Performance metrics loaded.");
  };

  const fetchTransactions = async () => {
    await withFeedback(async () => {
      const data = await request<{ transactions: Transaction[] }>("/blockchain/transactions?limit=10");
      setTransactions(data.transactions ?? []);
    }, "Transactions loaded.");
  };

  const fetchPendingPayouts = async () => {
    await withFeedback(async () => {
      const data = await request<PendingPayoutSummary>("/payouts/pending");
      setPendingPayoutSummary(data);
    }, "Pending earnings loaded.");
  };

  const fetchDatasets = async () => {
    await withFeedback(async () => {
      const data = await request<{ datasets: DatasetSummary[] }>("/datasets?limit=25");
      setDatasets(data.datasets ?? []);
    }, "Datasets loaded.");
  };

  const fetchPlatformStats = async () => {
    await withFeedback(async () => {
      const data = await request<{ overview: PlatformStats }>("/analytics/dashboard");
      setPlatformStats(data.overview);
    }, "Platform statistics loaded.");
  };

  useEffect(() => {
    if (!accessToken) return;
    void fetchTasks();
    if (permissions.isContributor()) {
      void fetchUserPerformance();
      void fetchPendingPayouts();
      void fetchTransactions();
    }
    if (permissions.isValidator()) {
      void fetchPlatformStats();
      void fetchUserPerformance();
    }
    if (permissions.isAdmin()) {
      void fetchDatasets();
      void fetchPlatformStats();
      void fetchUserPerformance();
      void fetchTransactions();
    }
  }, [accessToken, user?.role]);

  useEffect(() => {
    if (user?.walletAddress) {
      setWalletAddress(user.walletAddress);
    }
  }, [user?.walletAddress]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (taskStatusFilter !== "all" && task.status !== taskStatusFilter) return false;
      if (taskSearch.trim()) {
        const q = taskSearch.toLowerCase();
        const matches =
          task.title.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q) ||
          String(task.reward).includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [tasks, taskStatusFilter, taskSearch]);

  const filteredValidatorTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!validatorSearch.trim()) return true;
      const q = validatorSearch.toLowerCase();
      return (
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q)
      );
    });
  }, [tasks, validatorSearch]);

  const deleteDataset = async (dataset: DatasetSummary) => {
    const confirmed = window.confirm(`Delete dataset \"${dataset.name}\"? This will remove its records, tasks, and labels.`);
    if (!confirmed) {
      return;
    }

    await withFeedback(async () => {
      await requestVoid(`/datasets/${dataset.id}`, { method: "DELETE" });
      await fetchDatasets();
    }, `Dataset \"${dataset.name}\" deleted.`);
  };

  const createProjectFundingRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fundingDatasetId.trim() || !fundingAmount.trim()) {
      setFeedback("Enter dataset id and funding amount.");
      return;
    }

    await withFeedback(async () => {
      const data = await request<PaymentRequest>("/blockchain/project-funding-request", {
        method: "POST",
        body: JSON.stringify({
          datasetId: fundingDatasetId.trim(),
          amountSOL: Number(fundingAmount),
          label: "Annotex Project Funding",
          message: "Fund dataset rewards on Solana devnet",
        }),
      });

      setLatestPaymentRequest(data);
    }, "Funding request generated. Scan QR in a Solana wallet on devnet.");
  };

  const confirmTransfer = async (transactionId: string) => {
    await withFeedback(async () => {
      const result = await request<{ status: string; signature?: string }>("/blockchain/confirm-transfer", {
        method: "POST",
        body: JSON.stringify({ transactionId }),
      });

      if (result.status === "confirmed") {
        await fetchTransactions();
      }
    }, "Transfer confirmation check completed.");
  };

  const createTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTaskTitle.trim() || !newTaskDescription.trim() || !newTaskReward.trim()) {
      setFeedback("Fill in all task fields.");
      return;
    }

    await withFeedback(async () => {
      await request("/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: newTaskTitle.trim(),
          description: newTaskDescription.trim(),
          reward: parseFloat(newTaskReward),
        }),
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskReward("");
      await fetchTasks();
    }, "Task created successfully.");
  };

  const approveLabel = async (labelId: string) => {
    await withFeedback(async () => {
      await request(`/labels/${labelId}/approve`, { method: "POST" });
      setFeedback("Label approved.");
    }, "Label approved.");
  };

  const rejectLabel = async (labelId: string) => {
    await withFeedback(async () => {
      await request(`/labels/${labelId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason: "Did not meet quality standards" }),
      });
      setFeedback("Label rejected.");
    }, "Label rejected.");
  };

  const triggerPayout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!payoutUserId.trim()) {
      setFeedback("Enter a contributor user id for payout.");
      return;
    }

    await withFeedback(async () => {
      const data = await request<PaymentRequest>("/payouts/trigger", {
        method: "POST",
        body: JSON.stringify({ userId: payoutUserId.trim() }),
      });

      setLatestPaymentRequest(data);
    }, "Payout request generated. Use admin wallet on devnet to complete payment.");
  };

  return (
    <section className={permissions.isContributor() ? "space-y-5" : "space-y-8"}>
      {/* Welcome Section */}
      {!permissions.isContributor() && <div className="rounded-[2rem] bg-black p-6 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:px-8 md:py-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow text-sm text-white/50">
              {permissions.isAdmin() ? "Admin Dashboard" : "Validator Hub"}
            </p>
            <h1 className="font-mono text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
              {isLoading ? "Loading..." : `Welcome, ${user?.firstName ?? "User"}`}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-white/60 md:text-base">
              {permissions.isAdmin() && "Manage tasks, review labels, approve quality work, and process contributor payouts."}
              {permissions.isValidator() && "Review submitted labels, approve quality work, and monitor platform metrics."}
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm">
            <div className="text-white/50">Role</div>
            <div className="mt-1 font-mono text-lg font-semibold text-white">{user?.role ?? "unknown"}</div>
          </div>
        </div>
      </div>}

      {/* Admin Dashboard */}
      <AdminOnly role={user?.role}>
        <div className="space-y-5">
          {/* Admin Action Buttons */}
          <div className="grid gap-4 md:grid-cols-3">
            <button className="btn-secondary" disabled={!canCallApi || isBusy} onClick={fetchTasks} type="button">
              Fetch all tasks
            </button>
            <button className="btn-secondary" disabled={!canCallApi || isBusy} onClick={fetchTransactions} type="button">
              View transactions
            </button>
            <button className="btn-secondary" disabled={!canCallApi || isBusy} onClick={fetchDatasets} type="button">
              Manage datasets
            </button>
          </div>

          {feedback ? <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm">{feedback}</div> : null}

          {/* Task List — full width overview */}
          <article className="card rounded-[1.75rem] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono text-2xl font-semibold tracking-[-0.04em]">Tasks</h2>
              <span className="text-sm text-muted">{tasks.length}</span>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {tasks.slice(0, 10).map((task) => (
                <div key={task.id} className="rounded-lg border border-black/10 bg-white/50 p-3 text-sm">
                  <p className="font-semibold truncate">{task.title}</p>
                  <p className="text-xs text-muted">
                    Status: {task.status} | Reward: {task.reward} | {task.submittedLabels}/{task.requiredLabels} labels
                  </p>
                </div>
              ))}
              {!tasks.length ? <p className="text-sm text-muted">No tasks yet. Click "Fetch all tasks" above.</p> : null}
            </div>
          </article>

          {/* Dataset Management */}
          <article className="card rounded-[1.75rem] p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-mono text-2xl font-semibold tracking-[-0.04em]">Dataset management</h2>
                <p className="mt-2 text-sm text-muted">Delete mistaken uploads from here (admin only).</p>
              </div>
              <button className="btn-secondary" disabled={!canCallApi || isBusy} onClick={fetchDatasets} type="button">
                Refresh datasets
              </button>
            </div>

            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {datasets.map((dataset) => (
                <div key={dataset.id} className="rounded-lg border border-black/10 bg-white/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate font-semibold">{dataset.name}</p>
                        <button
                          type="button"
                          title="Copy Dataset ID"
                          onClick={() => copyDatasetId(dataset.id)}
                          className="shrink-0 rounded-md p-0.5 text-muted transition hover:text-foreground"
                        >
                          {copiedDatasetId === dataset.id
                            ? <Check className="size-3.5 text-emerald-600" />
                            : <Copy className="size-3.5" />}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {dataset.totalRecords} records | format: {dataset.format} | by {dataset.createdBy?.firstName ?? "Unknown"} {dataset.createdBy?.lastName ?? ""}
                      </p>
                    </div>
                    <button
                      className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={!canCallApi || isBusy}
                      onClick={() => deleteDataset(dataset)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {!datasets.length ? <p className="text-sm text-muted">No datasets loaded yet. Click Refresh datasets.</p> : null}
            </div>
          </article>

          {/* Payout Management */}
          <article className="card rounded-[1.75rem] p-6">
            <h2 className="font-mono text-2xl font-semibold tracking-[-0.04em]">Payout management</h2>
            <p className="mt-2 text-sm text-muted">Create Solana Pay requests on devnet for project funding and contributor payouts.</p>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <form className="space-y-3 rounded-xl border border-black/10 bg-white/60 p-4" onSubmit={createProjectFundingRequest}>
                <h3 className="font-semibold">1. Fund project wallet</h3>
                <input
                  className="field"
                  onChange={(event) => setFundingDatasetId(event.target.value)}
                  placeholder="Dataset ID"
                  value={fundingDatasetId}
                />
                <input
                  className="field"
                  min="0.000001"
                  onChange={(event) => setFundingAmount(event.target.value)}
                  placeholder="Amount in SOL"
                  step="0.000001"
                  type="number"
                  value={fundingAmount}
                />
                <button className="btn-secondary w-full" disabled={!canCallApi || isBusy} type="submit">
                  Generate funding QR
                </button>
              </form>

              <form className="space-y-3 rounded-xl border border-black/10 bg-white/60 p-4" onSubmit={triggerPayout}>
                <h3 className="font-semibold">2. Pay contributor earnings</h3>
                <input
                  className="field"
                  onChange={(event) => setPayoutUserId(event.target.value)}
                  placeholder="Contributor user ID"
                  value={payoutUserId}
                />
                <button className="btn-primary w-full" disabled={!canCallApi || isBusy} type="submit">
                  Generate payout QR
                </button>
              </form>
            </div>

            {latestPaymentRequest ? (
              <div className="mt-4 rounded-xl border border-black/10 bg-white/70 p-4 text-sm">
                <p className="font-semibold">Latest request ({latestPaymentRequest.network})</p>
                <p className="mt-1 text-muted">Recipient: {latestPaymentRequest.recipient}</p>
                <p className="text-muted">Amount: {latestPaymentRequest.amountSOL} SOL</p>
                <p className="text-muted">Reference: {latestPaymentRequest.reference}</p>
                <a className="mt-2 block break-all text-xs underline" href={latestPaymentRequest.paymentUrl}>
                  {latestPaymentRequest.paymentUrl}
                </a>
                <img alt="Solana payment QR" className="mt-3 h-44 w-44 rounded-lg border border-black/10" src={latestPaymentRequest.qrCode} />
                <button
                  className="btn-secondary mt-3"
                  disabled={!canCallApi || isBusy}
                  onClick={() => confirmTransfer(latestPaymentRequest.transactionId)}
                  type="button"
                >
                  Confirm on-chain payment
                </button>
              </div>
            ) : null}

            <div className="mt-4 rounded-lg border border-black/10 bg-white/50 p-4 text-sm text-muted">
              <p>Use a Solana wallet set to devnet and scan the QR to complete transfers.</p>
            </div>
          </article>
        </div>
      </AdminOnly>

      {/* Validator Dashboard */}
      <ValidatorOnly role={user?.role}>
        <div className="space-y-6">
          {/* Platform-wide Metrics Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-black/8 bg-white/65 p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-xs text-muted">Platform Total</p>
                <ClipboardList className="size-4 text-muted" aria-hidden="true" />
              </div>
              <p className="mt-3 font-mono text-2xl font-semibold tracking-[-0.04em]">
                {platformStats?.totalLabels ?? "—"}
              </p>
              <p className="mt-1 text-xs text-muted">Total platform labels</p>
            </div>

            <div className="rounded-3xl border border-black/8 bg-white/65 p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-xs text-muted">Platform</p>
                <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
              </div>
              <p className="mt-3 font-mono text-2xl font-semibold tracking-[-0.04em] text-emerald-700">
                {platformStats?.totalAccepted ?? platformStats?.acceptedLabels ?? "—"}
              </p>
              <p className="mt-1 text-xs text-muted">Total accepted labels</p>
            </div>

            <div className="rounded-3xl border border-black/8 bg-white/65 p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-xs text-muted">Platform</p>
                <XCircle className="size-4 text-red-600" aria-hidden="true" />
              </div>
              <p className="mt-3 font-mono text-2xl font-semibold tracking-[-0.04em] text-red-700">
                {platformStats?.totalRejected ?? platformStats?.rejectedLabels ?? "—"}
              </p>
              <p className="mt-1 text-xs text-muted">Total rejected labels</p>
            </div>

            <div className="rounded-3xl border border-black/8 bg-white/65 p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-xs text-muted">Platform</p>
                <Award className="size-4 text-muted" aria-hidden="true" />
              </div>
              <p className="mt-3 font-mono text-2xl font-semibold tracking-[-0.04em]">
                {platformStats?.overallAccuracy ? `${platformStats.overallAccuracy}%` : "—"}
              </p>
              <p className="mt-1 text-xs text-muted">Overall accuracy</p>
            </div>
          </div>

          {/* Validator Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="btn-secondary" disabled={!canCallApi || isBusy} onClick={fetchTasks} type="button">
              <RefreshCw className={`mr-2 inline-block size-4 ${isBusy ? "animate-spin" : ""}`} />
              Refresh review queue
            </button>
            <button className="btn-secondary" disabled={!canCallApi || isBusy} onClick={fetchPlatformStats} type="button">
              Refresh platform metrics
            </button>
            <button className="btn-secondary" disabled={!canCallApi || isBusy} onClick={fetchUserPerformance} type="button">
              My reviewer metrics
            </button>
          </div>

          {feedback ? <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm">{feedback}</div> : null}

          {/* Label Review Queue */}
          <article className="card rounded-[1.75rem] p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-mono text-2xl font-semibold tracking-[-0.04em]">Labels pending review</h2>
                <p className="mt-1 text-sm text-muted">Review submitted labels and approve quality work from contributors.</p>
              </div>
              <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-muted">
                {filteredValidatorTasks.length} pending
              </span>
            </div>

            {/* Validator task search */}
            <div className="relative mt-4">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={validatorSearch}
                onChange={(e) => setValidatorSearch(e.target.value)}
                placeholder="Search pending tasks by title or description..."
                className="field field-search w-full text-sm"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.25rem" }}
              />
              {validatorSearch && (
                <button
                  type="button"
                  onClick={() => setValidatorSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="mt-4 space-y-3 max-h-[30rem] overflow-y-auto pr-1">
              {filteredValidatorTasks.length > 0 ? (
                filteredValidatorTasks.map((task) => (
                  <div key={task.id} className="rounded-lg border border-black/10 bg-white/50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">{task.title}</p>
                        <p className="mt-1 text-sm text-muted">{task.description}</p>
                        <p className="mt-2 text-xs text-muted">
                          Labels: {task.submittedLabels}/{task.requiredLabels} | Reward: {task.reward} SOL
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          className="btn-primary px-3 py-1 text-sm"
                          disabled={!canCallApi || isBusy}
                          onClick={() => approveLabel(task.id)}
                          type="button"
                        >
                          Approve
                        </button>
                        <button
                          className="btn-secondary px-3 py-1 text-sm"
                          disabled={!canCallApi || isBusy}
                          onClick={() => rejectLabel(task.id)}
                          type="button"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">No labels pending review matching your criteria.</p>
              )}
            </div>
          </article>

          {/* Quality Metrics */}
          <article className="card rounded-[1.75rem] p-6">
            <h2 className="font-mono text-2xl font-semibold tracking-[-0.04em]">Platform Quality Metrics</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              <div className="rounded-2xl bg-black/[0.035] p-4">
                <dt className="text-xs text-muted">Platform Tasks</dt>
                <dd className="mt-1 text-xl font-semibold">{platformStats?.totalTasks ?? "—"}</dd>
              </div>
              <div className="rounded-2xl bg-black/[0.035] p-4">
                <dt className="text-xs text-muted">Completed Tasks</dt>
                <dd className="mt-1 text-xl font-semibold">{platformStats?.completedTasks ?? "—"}</dd>
              </div>
              <div className="rounded-2xl bg-black/[0.035] p-4">
                <dt className="text-xs text-muted">Total Accepted</dt>
                <dd className="mt-1 text-xl font-semibold text-emerald-700">{platformStats?.totalAccepted ?? platformStats?.acceptedLabels ?? "—"}</dd>
              </div>
              <div className="rounded-2xl bg-black/[0.035] p-4">
                <dt className="text-xs text-muted">Total Rejected</dt>
                <dd className="mt-1 text-xl font-semibold text-red-700">{platformStats?.totalRejected ?? platformStats?.rejectedLabels ?? "—"}</dd>
              </div>
            </dl>
          </article>
        </div>
      </ValidatorOnly>

      {/* Contributor Dashboard */}
      <ContributorOnly role={user?.role}>
        <div className="flex flex-col gap-4">
          <div className="shrink-0 rounded-[2rem] bg-brand p-5 text-white shadow-[0_20px_44px_rgba(0,0,0,0.18)] md:px-7 md:py-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow text-xs text-white/60">Contributor workbench</p>
                <h2 className="mt-3 font-mono text-3xl font-semibold tracking-[-0.05em] md:text-4xl">Your next great label starts here.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">Pick a task from the queue, submit precise work, and keep your payout details ready.</p>
              </div>
              <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60" disabled={!canCallApi || isBusy} onClick={fetchTasks} type="button">
                <RefreshCw className={`mr-2 inline-block size-4 ${isBusy ? "animate-spin" : ""}`} aria-hidden="true" />
                Refresh queue
              </button>
            </div>
          </div>

          <div className="grid shrink-0 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="rounded-3xl border border-black/8 bg-white/65 p-3"><ClipboardList className="size-4 text-muted" aria-hidden="true" /><p className="mt-3 text-xl font-semibold">{tasks.length}</p><p className="mt-1 text-xs text-muted">Open tasks</p></div>
            <div className="rounded-3xl border border-black/8 bg-white/65 p-3"><CheckCircle2 className="size-4 text-muted" aria-hidden="true" /><p className="mt-3 text-xl font-semibold">{performance?.statistics?.acceptedLabels ?? 0}</p><p className="mt-1 text-xs text-muted">Accepted labels</p></div>
            <div className="rounded-3xl border border-black/8 bg-white/65 p-3"><BarChart3 className="size-4 text-muted" aria-hidden="true" /><p className="mt-3 text-xl font-semibold">{performance?.statistics?.accuracyRate ? `${performance.statistics.accuracyRate}%` : "0%"}</p><p className="mt-1 text-xs text-muted">Accuracy rate</p></div>
            <div className="rounded-3xl border border-black/8 bg-white/65 p-3"><Clock className="size-4 text-muted" aria-hidden="true" /><p className="mt-3 text-xl font-semibold">{performance?.statistics?.averageTimePerLabel ? `${performance.statistics.averageTimePerLabel}s` : "—"}</p><p className="mt-1 text-xs text-muted">Avg. labeling time</p></div>
            <div className="rounded-3xl border border-black/8 bg-white/65 p-3"><CircleDollarSign className="size-4 text-muted" aria-hidden="true" /><p className="mt-3 text-xl font-semibold">{pendingPayoutSummary?.totalPendingSOL ?? 0} SOL</p><p className="mt-1 text-xs text-muted">Ready for payout</p></div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button className="btn-secondary px-4 py-2.5 text-sm" disabled={!canCallApi || isBusy} onClick={fetchUserPerformance} type="button">View performance</button>
            <button className="btn-secondary px-4 py-2.5 text-sm" disabled={!canCallApi || isBusy} onClick={fetchPendingPayouts} type="button">Check earnings</button>
            <button className="btn-secondary px-4 py-2.5 text-sm" disabled={!canCallApi || isBusy} onClick={fetchTransactions} type="button">Transaction history</button>
          </div>

          {feedback ? <div aria-live="polite" className="shrink-0 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm">{feedback}</div> : null}

          {/* Main 2-col: Available Tasks (left) + Payout Wallet (right) */}
          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            {/* Available Tasks */}
            <article className="card flex flex-col rounded-[2rem] p-5 md:p-6">
              <div className="flex shrink-0 items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-xs text-muted">Task queue</p>
                  <h2 className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em]">Available tasks</h2>
                </div>
                <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-semibold text-muted">
                  {filteredTasks.length} / {tasks.length}
                </span>
              </div>

              {/* Search & filter */}
              <div className="mt-4 flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={taskSearch}
                    onChange={(e) => setTaskSearch(e.target.value)}
                    placeholder="Search tasks..."
                    className="field w-full text-sm"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.25rem" }}
                  />
                  {taskSearch && (
                    <button type="button" onClick={() => setTaskSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {["all", "pending", "in_progress"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setTaskStatusFilter(status)}
                      className={`rounded-xl border px-2.5 py-1 text-xs font-semibold capitalize transition ${
                        taskStatusFilter === status
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white/60 text-muted hover:text-foreground"
                      }`}
                    >
                      {status === "all" ? "All" : status.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task list — show ~4 tasks then scroll */}
              <div className="mt-4 max-h-[22rem] space-y-3 overflow-y-auto pr-1">
                {filteredTasks.map((task) => {
                  const progress = task.requiredLabels ? Math.min((task.submittedLabels / task.requiredLabels) * 100, 100) : 0;
                  const statusDisplay = getTaskStatusDisplay(task.status);
                  const canOpen = task.status === "pending" || task.status === "in_progress";
                  return (
                    <div key={task.id} className={`rounded-[1.5rem] border p-4 transition hover:shadow-sm ${statusDisplay.cardClass}`}>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold">{task.title}</p>
                            <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] ${statusDisplay.badgeClass}`}>
                              {statusDisplay.label}
                            </span>
                          </div>
                          <p className="mt-1.5 line-clamp-1 text-sm text-muted">{task.description}</p>
                          <div className="mt-3 flex items-center gap-3 text-xs">
                            <span className="font-semibold">{task.reward} SOL</span>
                            <span className="text-muted">{task.submittedLabels}/{task.requiredLabels} labels</span>
                          </div>
                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/8">
                            <div className="h-full bg-black" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                        {canOpen && (
                          <button
                            className="btn-primary shrink-0 px-4 py-2 text-sm"
                            disabled={!canCallApi || isBusy}
                            onClick={() => openTask(task.id)}
                            type="button"
                          >
                            Select task
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {!filteredTasks.length ? (
                  <div className="rounded-3xl border border-dashed border-black/15 p-8 text-center text-sm text-muted">
                    {tasks.length === 0 ? "Refresh to look for new tasks." : "No tasks match your filter."}
                  </div>
                ) : null}
              </div>
            </article>

            {/* Payout Wallet (right column) */}
            <article className="rounded-[2rem] border border-black/10 bg-white p-5 md:p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-black p-2.5 text-white"><Wallet className="size-5" aria-hidden="true" /></span>
                <div>
                  <h3 className="font-semibold">Payout wallet</h3>
                  <p className="text-xs text-muted">Solana address for earnings</p>
                </div>
              </div>
              <form className="mt-5 space-y-3" onSubmit={connectWallet}>
                <div className="relative">
                  <input
                    className="field pr-10 font-mono text-sm"
                    onChange={(event) => setWalletAddress(event.target.value)}
                    placeholder="Solana wallet address (base58)"
                    type={showWallet ? "text" : "password"}
                    value={walletAddress}
                  />
                  {walletAddress ? (
                    <button
                      type="button"
                      onClick={() => setShowWallet(!showWallet)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition hover:text-foreground"
                    >
                      {showWallet ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  ) : null}
                </div>
                <button className="btn-secondary w-full" disabled={!canCallApi || isBusy} type="submit">Save wallet address</button>
              </form>
            </article>
          </div>


          {/* Earnings & Performance */}
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="card rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div><p className="eyebrow text-xs text-muted">Quality snapshot</p><h2 className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em]">Performance</h2></div>
                <BarChart3 className="size-5 text-muted" aria-hidden="true" />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-black/[0.035] p-4"><dt className="text-xs text-muted">Total labels</dt><dd className="mt-2 text-xl font-semibold">{performance?.statistics?.totalLabels ?? "—"}</dd></div>
                <div className="rounded-2xl bg-black/[0.035] p-4"><dt className="text-xs text-muted">Avg. time</dt><dd className="mt-2 text-xl font-semibold">{performance?.statistics?.averageTimePerLabel ?? "—"}<span className="ml-1 text-sm font-medium text-muted">sec</span></dd></div>
              </dl>
            </article>
            <article className="card rounded-[2rem] p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div><p className="eyebrow text-xs text-muted">Payout activity</p><h2 className="mt-2 font-mono text-2xl font-semibold tracking-[-0.04em]">Earnings</h2></div>
                <p className="text-xl font-semibold">{performance?.statistics?.totalEarnings ?? 0} SOL</p>
              </div>
              <div className="mt-5 space-y-2">
                {transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between rounded-2xl border border-black/8 bg-white/60 px-4 py-3 text-sm">
                    <div><p className="font-semibold capitalize">{transaction.status}</p><p className="mt-0.5 text-xs text-muted">{new Date(transaction.createdAt).toLocaleDateString()}</p></div>
                    <p className="font-semibold">{transaction.amount} SOL</p>
                  </div>
                ))}
                {!transactions.length ? <p className="rounded-2xl border border-dashed border-black/15 px-4 py-5 text-center text-sm text-muted">No recent payout activity.</p> : null}
              </div>
            </article>
          </div>
        </div>
      </ContributorOnly>
    </section>
  );
}
