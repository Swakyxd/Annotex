import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { authOptions } from "@/lib/auth-options";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="card w-full max-w-xl rounded-4xl p-8 md:p-10">
      <div className="mb-8 space-y-3">
        <p className="eyebrow text-sm text-muted">Create account</p>
        <h2 className="font-mono text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Join the labeling workspace.
        </h2>
        <p className="text-sm leading-6 text-muted md:text-base">
          Register as a contributor, then move directly into the authenticated workspace.
        </p>
      </div>
      <AuthForm mode="register" />
      <p className="mt-6 text-sm text-muted">
        Already have access? <Link className="font-semibold text-brand-deep" href="/login">Sign in</Link>
      </p>
    </div>
  );
}