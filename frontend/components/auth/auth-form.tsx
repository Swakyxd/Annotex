"use client";

import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import type { AuthMode, RegisterRequest } from "@/lib/types";

type AuthFormProps = {
  mode: AuthMode;
};

type FormState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RegisterRequest["role"];
};

const defaultState: FormState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role: "contributor",
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(defaultState);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isRegister = mode === "register";

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        mode: isRegister ? "register" : "login",
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
      });

      if (!result || result.error) {
        setError(result?.error || "Authentication failed. Please try again.");
        return;
      }

      startTransition(() => {
        router.push("/dashboard");
        router.refresh();
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Authentication failed.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {isRegister ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            First name
            <input
              autoComplete="given-name"
              className="field"
              onChange={(event) => updateField("firstName", event.target.value)}
              placeholder="Ava"
              required
              value={form.firstName}
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Last name
            <input
              autoComplete="family-name"
              className="field"
              onChange={(event) => updateField("lastName", event.target.value)}
              placeholder="Patel"
              required
              value={form.lastName}
            />
          </label>
        </div>
      ) : null}

      <label className="block space-y-2 text-sm font-medium">
        Email
        <input
          autoComplete="email"
          className="field"
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="you@annotex.dev"
          required
          type="email"
          value={form.email}
        />
      </label>

      <label className="block space-y-2 text-sm font-medium">
        Password
        <span className="relative block">
          <input
            autoComplete={isRegister ? "new-password" : "current-password"}
            className="field pr-12"
            minLength={8}
            onChange={(event) => updateField("password", event.target.value)}
            placeholder={isRegister ? "At least 8 characters, mixed case, one number" : "Enter your password"}
            required
            type={isPasswordVisible ? "text" : "password"}
            value={form.password}
          />
          <button
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            type="button"
          >
            {isPasswordVisible ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
          </button>
        </span>
      </label>

      {isRegister ? (
        <label className="block space-y-2 text-sm font-medium">
          Role
          <select
            className="field"
            onChange={(event) => updateField("role", event.target.value as RegisterRequest["role"])}
            value={form.role}
          >
            <option value="contributor">Contributor</option>
            <option value="validator">Validator</option>
          </select>
        </label>
      ) : null}

      <div className="rounded-[1.25rem] border border-black/8 bg-white/56 px-4 py-3 text-xs leading-6 text-muted">
        {isRegister ? (
          <span>
            Passwords must match the backend validator: at least 8 characters, including an uppercase letter, lowercase letter, and number.
          </span>
        ) : (
          <span>
            This uses NextAuth credentials with backend auth routes at <code className="font-mono text-foreground">/api/v1/auth</code>.
          </span>
        )}
      </div>

      {error ? (
        <div className="rounded-[1.25rem] border border-danger/20 bg-danger/8 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      ) : null}

      <button className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70" disabled={isPending} type="submit">
        {isPending ? "Working..." : isRegister ? "Create account" : "Sign in"}
      </button>

      {isPending ? (
        <div aria-live="polite" className="auth-loading-bar" role="status">
          <span className="sr-only">Signing in…</span>
        </div>
      ) : null}

      <p className="text-sm text-muted">
        {isRegister ? "Accounts go straight into the protected shell after registration." : "Session is managed by secure NextAuth cookies."}
      </p>
    </form>
  );
}
