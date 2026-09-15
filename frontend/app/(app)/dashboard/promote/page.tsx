"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

import { useAuth } from "@/components/providers/auth-provider";
import { API_BASE_URL } from "@/lib/constants";

type ContributorItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tasksCompleted: number;
  accuracyRate: number;
};

export default function PromotePage() {
  const { user, accessToken } = useAuth();
  const [contributors, setContributors] = useState<ContributorItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [promotingId, setPromotingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const getToken = async () => {
    const session = await getSession();
    const token = session?.accessToken ?? accessToken;

    if (!token) {
      throw new Error("Missing session token. Please sign in again.");
    }

    return token;
  };

  const loadContributors = async () => {
    if (user?.role !== "admin") {
      return;
    }

    setLoading(true);
    setFeedback("");
    try {
      const token = await getToken();

      const response = await fetch(`${API_BASE_URL}/users?role=contributor&limit=100`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = (await response.json()) as {
        success: boolean;
        message: string;
        data?: { users: ContributorItem[]; pagination: { total: number } };
      };

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.message || "Failed to load contributors");
      }

      setContributors(payload.data.users ?? []);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to load contributors");
      setContributors([]);
    } finally {
      setLoading(false);
    }
  };

  const promoteContributor = async (contributor: ContributorItem) => {
    setPromotingId(contributor.id);
    setFeedback("");
    try {
      const token = await getToken();

      const response = await fetch(`${API_BASE_URL}/users/${contributor.id}/promote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = (await response.json()) as { success: boolean; message: string };

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Failed to promote contributor");
      }

      setContributors((current) => current.filter((row) => row.id !== contributor.id));
      setFeedback(`${contributor.firstName} ${contributor.lastName} promoted to validator.`);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to promote contributor");
    } finally {
      setPromotingId(null);
    }
  };

  useEffect(() => {
    void loadContributors();
  }, [user?.role]);

  if (user?.role !== "admin") {
    return <article className="card rounded-[1.75rem] p-6 text-sm text-red-700">This page is only available for admins.</article>;
  }

  return (
    <section className="space-y-6">
      <article className="card rounded-[1.75rem] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow text-xs text-muted">Admin Directory</p>
            <h1 className="mt-2 font-mono text-3xl font-semibold tracking-[-0.04em]">Promote</h1>
            <p className="mt-2 text-sm text-muted">Promote a contributor to validator. Takes effect on their next login.</p>
          </div>
          <button className="btn-secondary" disabled={loading} onClick={() => void loadContributors()} type="button">
            Refresh
          </button>
        </div>
      </article>

      {feedback ? <article className="card rounded-[1.75rem] p-4 text-sm">{feedback}</article> : null}

      <article className="card rounded-[1.75rem] p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-black/10">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Tasks</th>
              <th className="py-2 pr-4">Accuracy</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((row) => (
              <tr key={row.id} className="border-b border-black/5">
                <td className="py-2 pr-4">{row.firstName} {row.lastName}</td>
                <td className="py-2 pr-4">{row.email}</td>
                <td className="py-2 pr-4">{row.tasksCompleted}</td>
                <td className="py-2 pr-4">{row.accuracyRate?.toFixed?.(2) ?? row.accuracyRate}%</td>
                <td className="py-2 pr-4 text-right">
                  <button
                    className="btn-secondary"
                    disabled={promotingId === row.id}
                    onClick={() => void promoteContributor(row)}
                    type="button"
                  >
                    {promotingId === row.id ? "Promoting..." : "Promote"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && contributors.length === 0 ? <p className="text-sm text-muted mt-3">No contributors found.</p> : null}
      </article>
    </section>
  );
}
