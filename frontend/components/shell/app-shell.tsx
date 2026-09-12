"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { RoleBadge, RoleIndicator } from "@/components/rbac/role-badge";
import { isAdmin, isContributor, isValidator } from "@/lib/role-utils";

type NavItem = {
  href: string;
  label: string;
  caption: string;
  roles?: string[]; // If undefined, show to all authenticated users
};

const navigationByRole: Record<string, NavItem[]> = {
  admin: [
    { href: "/dashboard", label: "Dashboard", caption: "Admin overview & analytics", roles: ["admin"] },
    { href: "/dashboard/tasks", label: "Tasks", caption: "Create & manage tasks", roles: ["admin"] },
    { href: "/dashboard/review", label: "Label Review", caption: "Review & approve labels", roles: ["admin"] },
    { href: "/dashboard/users", label: "Users", caption: "Manage contributors", roles: ["admin"] },
    { href: "/dashboard/payouts", label: "Payouts", caption: "Manage payouts", roles: ["admin"] },
    { href: "/dashboard/analytics", label: "Analytics", caption: "View metrics & insights", roles: ["admin"] },
  ],
  validator: [
    { href: "/dashboard", label: "Dashboard", caption: "Validator overview", roles: ["validator"] },
    { href: "/dashboard/upload-dataset", label: "Upload Dataset", caption: "Create dataset and set budget", roles: ["validator"] },
    { href: "/dashboard/review", label: "Review Labels", caption: "Approve or reject labels", roles: ["validator"] },
    { href: "/dashboard/analytics", label: "Analytics", caption: "View quality metrics", roles: ["validator"] },
  ],
  contributor: [
    { href: "/dashboard", label: "Dashboard", caption: "My workspace", roles: ["contributor"] },
    { href: "/dashboard/tasks", label: "Available Tasks", caption: "Browse & submit labels", roles: ["contributor"] },
    { href: "/dashboard/labels", label: "My Labels", caption: "View submissions", roles: ["contributor"] },
    { href: "/dashboard/earnings", label: "Earnings", caption: "View payouts & history", roles: ["contributor"] },
  ],
};

export function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();

  const navigation = useMemo(() => {
    if (!user?.role) return [];

    if (isAdmin(user.role)) {
      return navigationByRole.admin;
    }
    if (isValidator(user.role)) {
      return navigationByRole.validator;
    }
    if (isContributor(user.role)) {
      return navigationByRole.contributor;
    }

    return [];
  }, [user?.role]);

  const getWorkspaceDescription = () => {
    if (isAdmin(user?.role)) {
      return "Manage datasets, tasks, labels, validators, and payouts. Monitor platform metrics and quality indicators across all submissions.";
    }
    if (isValidator(user?.role)) {
      return "Review submitted labels from contributors. Approve high-quality work and provide feedback for improvement. Monitor quality metrics and consensus thresholds.";
    }
    if (isContributor(user?.role)) {
      return "Browse available labeling tasks, submit your annotations, track your accuracy rate, and manage your wallet for secure payouts in cryptocurrency.";
    }
    return "Manage assignments, submissions, validation outcomes, and payout-facing wallet data in one authenticated workspace.";
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="card m-4 md:m-6 w-80 shrink-0 overflow-y-auto rounded-4xl p-6 md:p-7">
        <div className="flex h-full flex-col justify-between gap-8">
          {/* Header */}
          <div className="space-y-8">
            <div>
              <p className="eyebrow text-xs text-muted">Annotex</p>
              <h1 className="mt-3 font-mono text-3xl font-semibold tracking-[-0.05em]">
                {isLoading ? "Loading..." : isAdmin(user?.role) ? "Admin Panel" : isValidator(user?.role) ? "Validator Hub" : "Contributor Workspace"}
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted">{getWorkspaceDescription()}</p>
            </div>

            {/* Role-aware Navigation */}
            <nav className="space-y-3">
              {navigation.map((item) => {
                // Exact match for /dashboard root; prefix match for all deeper paths
                const active =
                  item.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    className={`block rounded-[1.25rem] px-4 py-3 transition ${
                      active ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-white/55 text-foreground hover:bg-white/80"
                    }`}
                    href={item.href}
                  >
                    <div className={`font-semibold ${active ? "text-white" : "text-foreground"}`}>{item.label}</div>
                    <div className={`text-sm ${active ? "text-white/70" : "text-muted"}`}>{item.caption}</div>
                  </Link>
                );
              })}
              {navigation.length === 0 && (
                <p className="text-sm text-muted">Loading navigation...</p>
              )}
            </nav>
          </div>

          {/* Session Info */}
          <div className="rounded-3xl border border-black/8 bg-white/50 p-4">
            <p className="eyebrow text-xs text-muted">Session</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                {!isLoading && user?.role && <RoleIndicator role={user.role} />}
                <p className="font-semibold">{isLoading ? "Loading user..." : `${user?.firstName ?? "Unknown"} ${user?.lastName ?? ""}`.trim()}</p>
              </div>
              <p className="truncate text-sm text-muted">{user?.email ?? "No profile loaded"}</p>
              {user?.role && <RoleBadge role={user.role} size="sm" />}
            </div>
            <button className="btn-secondary mt-4 w-full" onClick={handleLogout} type="button">
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-6 space-y-5">
        {/* Header */}
        <header className="card shrink-0 rounded-4xl px-6 py-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow text-xs text-muted">Protected workspace</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {isAdmin(user?.role) && "Admin controls for platform management"}
                {isValidator(user?.role) && "Quality assurance and label validation"}
                {isContributor(user?.role) && "Task labeling and earnings"}
                {!user?.role && "Loading role information..."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                className="btn-secondary"
                href={process.env.NEXT_PUBLIC_API_DOCS_URL || "http://localhost:5000/api-docs"}
                rel="noreferrer"
                target="_blank"
              >
                API docs
              </a>
              {user?.role && <RoleBadge role={user.role} size="md" />}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div>{children}</div>
      </main>
    </div>
  );
}