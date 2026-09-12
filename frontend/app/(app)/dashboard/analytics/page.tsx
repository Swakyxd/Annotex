"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Activity, CheckCircle2, Gauge, Users } from "lucide-react";
import type { ReactNode } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { API_BASE_URL } from "@/lib/constants";

type DashboardStats = {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalTasks: number;
    completedTasks: number;
    totalDatasets: number;
    totalLabels: number;
    overallAccuracy: string;
  };
  taskDistribution: { status: string; count: number }[];
  recentActivity: { labelsLastWeek: number };
};

type QualityMetrics = {
  averageConsensusScore: string;
  validatedTasks: number;
  activeContributors: number;
  topPerformers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    accuracyRate: number | null;
    tasksCompleted: number;
    labelsSubmitted: number;
    reviewedLabels: number;
  }>;
};

type UserPerformance = {
  statistics?: {
    totalLabels: number;
    acceptedLabels: number;
    rejectedLabels: number;
    accuracyRate: string;
    averageTimePerLabel: number;
    totalEarnings: number;
  };
};

export default function AnalyticsPage() {
  const { user, accessToken } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [quality, setQuality] = useState<QualityMetrics | null>(null);
  const [performance, setPerformance] = useState<UserPerformance | null>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

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

  const loadAnalytics = async () => {
    setLoading(true);
    setFeedback("");

    try {
      if (user?.role === "admin" || user?.role === "validator") {
        const promises: [Promise<DashboardStats> | null, Promise<QualityMetrics>] = [
          user.role === "admin" ? request<DashboardStats>("/analytics/dashboard") : Promise.resolve(null as unknown as DashboardStats),
          request<QualityMetrics>("/analytics/quality-metrics"),
        ];
        const [dashboardData, qualityData] = await Promise.all(promises);
        setDashboardStats(dashboardData);
        setQuality(qualityData);
        setPerformance(null);
      } else {
        const userData = await request<UserPerformance>("/analytics/user-performance");
        setPerformance(userData);
        setDashboardStats(null);
        setQuality(null);
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to load analytics");
      setDashboardStats(null);
      setQuality(null);
      setPerformance(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAnalytics();
  }, [user?.role]);

  return (
    <section className="space-y-6">
      <article className="card rounded-[1.75rem] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-xs text-muted">Insights</p>
            <h1 className="mt-2 font-mono text-3xl font-semibold tracking-[-0.04em]">Analytics</h1>
            <p className="mt-2 text-sm text-muted">Platform and quality metrics for your role.</p>
          </div>
          <button className="btn-secondary" disabled={loading} onClick={() => void loadAnalytics()} type="button">Refresh</button>
        </div>
      </article>

      {feedback ? <article className="card rounded-[1.75rem] p-4 text-sm">{feedback}</article> : null}

      {(user?.role === "admin" || user?.role === "validator") ? (
        <>
          {user?.role === "admin" && (
            <article className="card rounded-[1.75rem] p-6">
              <h2 className="font-semibold">Overview</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                <div className="rounded-lg border border-black/10 bg-white/60 p-3">Users: {dashboardStats?.overview.totalUsers ?? 0}</div>
                <div className="rounded-lg border border-black/10 bg-white/60 p-3">Tasks: {dashboardStats?.overview.totalTasks ?? 0}</div>
                <div className="rounded-lg border border-black/10 bg-white/60 p-3">Datasets: {dashboardStats?.overview.totalDatasets ?? 0}</div>
                <div className="rounded-lg border border-black/10 bg-white/60 p-3">Accuracy: {dashboardStats?.overview.overallAccuracy ?? "0"}%</div>
              </div>
            </article>
          )}

          <article className="card rounded-[1.75rem] p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow text-xs text-muted">Platform quality</p>
                <h2 className="mt-2 text-xl font-semibold">Quality metrics</h2>
              </div>
              <p className="text-sm text-muted">Live validation performance</p>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <KpiCard
                icon={<CheckCircle2 className="h-5 w-5" />}
                label="Total validated tasks"
                value={quality?.validatedTasks ?? 0}
              />
              <KpiCard
                icon={<Gauge className="h-5 w-5" />}
                label="Avg consensus score"
                value={`${formatConsensus(quality?.averageConsensusScore)}%`}
              />
              <KpiCard
                icon={<Users className="h-5 w-5" />}
                label="Active contributors"
                value={quality?.activeContributors ?? 0}
              />
            </div>
          </article>

          <article className="card rounded-[1.75rem] overflow-hidden">
            <div className="border-b border-black/10 bg-black/[0.03] px-6 py-5">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-semibold">Contributor performance</h2>
              </div>
              <p className="mt-1 text-sm text-muted">Active contributors ranked by accuracy.</p>
            </div>
            <div className="overflow-x-auto px-6 py-2">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-black/10 text-left text-muted">
                    <th className="py-3 pr-6 font-medium">Contributor</th>
                    <th className="py-3 pr-6 font-medium">Accuracy</th>
                    <th className="py-3 pr-6 font-medium">Completed tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {(quality?.topPerformers ?? []).map((contributor) => (
                    <tr key={contributor.id} className="border-b border-black/5 last:border-0">
                      <td className="py-4 pr-6">
                        <p className="font-medium">{contributor.firstName} {contributor.lastName}</p>
                        <p className="mt-1 text-xs text-muted">Contributor</p>
                      </td>
                      <td className="min-w-48 py-4 pr-6">
                        <div className="flex items-center gap-3">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
                            <div
                              className="h-full rounded-full bg-black transition-all"
                              style={{
                                width: `${Math.min(100, Math.max(0, contributor.accuracyRate ?? 0))}%`,
                              }}
                            />
                          </div>
                          <span className="w-14 text-right font-semibold">
                            {contributor.accuracyRate === null ? "N/A" : `${contributor.accuracyRate.toFixed(1)}%`}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted">
                          {contributor.reviewedLabels} reviewed labels
                        </p>
                      </td>
                      <td className="py-4 pr-6">
                        <span className="inline-flex rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-xs font-semibold">
                          {contributor.labelsSubmitted} labels submitted
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!quality?.topPerformers?.length ? (
                <p className="py-8 text-center text-sm text-muted">No active contributor data yet.</p>
              ) : null}
            </div>
          </article>
        </>
      ) : (
        <article className="card rounded-[1.75rem] p-6">
          <h2 className="font-semibold">Your performance</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">Total labels: {performance?.statistics?.totalLabels ?? 0}</div>
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">Accepted: {performance?.statistics?.acceptedLabels ?? 0}</div>
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">Rejected: {performance?.statistics?.rejectedLabels ?? 0}</div>
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">
              Accuracy: {performance?.statistics?.accuracyRate === "N/A"
                ? "N/A"
                : `${performance?.statistics?.accuracyRate ?? "0"}%`}
            </div>
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">Avg time: {performance?.statistics?.averageTimePerLabel ?? 0}s</div>
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">Earnings: {performance?.statistics?.totalEarnings ?? 0} SOL</div>
          </div>
        </article>
      )}
    </section>
  );
}

function formatConsensus(value?: string) {
  const score = Number(value);
  return Number.isFinite(score) ? (score * 100).toFixed(1) : "0.0";
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-xl bg-black/[0.06] p-2" aria-hidden="true">{icon}</span>
        <span className="text-right text-2xl font-semibold tracking-[-0.04em]">{value}</span>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
    </div>
  );
}
