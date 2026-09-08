"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

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
  topPerformers: Array<{ id: string; firstName: string; lastName: string; accuracyRate: number; tasksCompleted: number }>;
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
            <h2 className="font-semibold">Quality metrics</h2>
            <p className="mt-2 text-sm text-muted">Average consensus score: {quality?.averageConsensusScore ?? "0"}</p>
            <p className="text-sm text-muted">Validated tasks: {quality?.validatedTasks ?? 0}</p>
            <div className="mt-3 space-y-2">
              {(quality?.topPerformers ?? []).slice(0, 10).map((u) => (
                <div key={u.id} className="rounded-lg border border-black/10 bg-white/60 p-3 text-sm">
                  <p className="font-medium">{u.firstName} {u.lastName}</p>
                  <p className="text-muted">Accuracy: {u.accuracyRate}% | Tasks: {u.tasksCompleted}</p>
                </div>
              ))}
              {!quality?.topPerformers?.length ? <p className="text-sm text-muted">No performer data yet.</p> : null}
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
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">Accuracy: {performance?.statistics?.accuracyRate ?? "0"}%</div>
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">Avg time: {performance?.statistics?.averageTimePerLabel ?? 0}s</div>
            <div className="rounded-lg border border-black/10 bg-white/60 p-3">Earnings: {performance?.statistics?.totalEarnings ?? 0} SOL</div>
          </div>
        </article>
      )}
    </section>
  );
}
