"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

import { useAuth } from "@/components/providers/auth-provider";
import { API_BASE_URL } from "@/lib/constants";

type UserItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  tasksCompleted: number;
  accuracyRate: number;
  totalEarnings: number;
};

export default function UsersPage() {
  const { user, accessToken } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const loadUsers = async () => {
    if (user?.role !== "admin") {
      return;
    }

    setLoading(true);
    setFeedback("");
    try {
      const session = await getSession();
      const token = session?.accessToken ?? accessToken;

      if (!token) {
        throw new Error("Missing session token. Please sign in again.");
      }

      const response = await fetch(`${API_BASE_URL}/users?limit=100`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = (await response.json()) as {
        success: boolean;
        message: string;
        data?: { users: UserItem[]; pagination: { total: number } };
      };

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.message || "Failed to load users");
      }

      setUsers(payload.data.users ?? []);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
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
            <h1 className="mt-2 font-mono text-3xl font-semibold tracking-[-0.04em]">Users</h1>
            <p className="mt-2 text-sm text-muted">Manage contributors, validators, and admins.</p>
          </div>
          <button className="btn-secondary" disabled={loading} onClick={() => void loadUsers()} type="button">
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
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Tasks</th>
              <th className="py-2 pr-4">Accuracy</th>
              <th className="py-2 pr-4">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {users.map((row) => (
              <tr key={row.id} className="border-b border-black/5">
                <td className="py-2 pr-4">{row.firstName} {row.lastName}</td>
                <td className="py-2 pr-4">{row.email}</td>
                <td className="py-2 pr-4">{row.role}</td>
                <td className="py-2 pr-4">{row.tasksCompleted}</td>
                <td className="py-2 pr-4">{row.accuracyRate?.toFixed?.(2) ?? row.accuracyRate}%</td>
                <td className="py-2 pr-4">{(row.totalEarnings ?? 0).toFixed(4)} SOL</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && users.length === 0 ? <p className="text-sm text-muted mt-3">No users found.</p> : null}
      </article>
    </section>
  );
}
