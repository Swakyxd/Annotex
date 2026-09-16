"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/constants";

// Backend base URL for serving uploaded static files (images)
const BACKEND_ORIGIN = API_BASE_URL.replace("/api/v1", "");

type RawData = Record<string, unknown>;

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  reward: number;
  requiredLabels: number;
  submittedLabels: number;
  dataset?: {
    name: string;
    labelType: string;
    labelOptions: string[] | null;
  };
  record?: {
    id: string;
    recordNumber: number;
    rawData: RawData;
  };
  labels?: Array<{
    id: string;
    value: string;
    contributorId: string;
    createdAt: string;
  }>;
};

function getImageUrl(rawData: RawData): string | null {
  const path =
    (rawData.imagePath as string | undefined) ??
    (rawData.image_path as string | undefined) ??
    (rawData.filePath as string | undefined);
  if (!path) return null;
  // path is relative like "uploads/..." or an absolute path — normalise to a URL
  const clean = path.replace(/\\/g, "/");
  if (clean.startsWith("http")) return clean;
  // strip leading slash so we can join cleanly
  return `${BACKEND_ORIGIN}/${clean.replace(/^\//, "")}`;
}

function LabelInput({
  labelType,
  labelOptions,
  value,
  onChange,
  disabled,
}: {
  labelType: string;
  labelOptions: string[] | null;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const options = labelOptions ?? [];

  if ((labelType === "category" || labelType === "multi-select") && options.length > 0) {
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = labelType === "multi-select"
            ? value.split(",").map((s) => s.trim()).includes(opt)
            : value === opt;

          const toggle = () => {
            if (disabled) return;
            if (labelType === "category") {
              onChange(selected ? "" : opt);
            } else {
              const current = value.split(",").map((s) => s.trim()).filter(Boolean);
              const next = selected
                ? current.filter((s) => s !== opt)
                : [...current, opt];
              onChange(next.join(", "));
            }
          };

          return (
            <button
              key={opt}
              type="button"
              onClick={toggle}
              disabled={disabled}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "border-black bg-black text-white"
                  : "border-black/15 bg-white/70 text-foreground hover:border-black/40"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  // Free-text fallback
  return (
    <input
      className="field w-full"
      placeholder="Enter label value…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      required
    />
  );
}

export default function TaskLabelingPage() {
  const params = useParams();
  const taskId = (params as { taskId?: string }).taskId;
  const { data: session } = useSession();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadTask = async () => {
    if (!taskId || !session?.accessToken) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      if (!res.ok) throw new Error(`Failed to load task (${res.status})`);
      const json = await res.json();
      const loaded: Task = json.data ?? json.task ?? null;
      setTask(loaded);

      if (loaded && (loaded.status === "pending" || loaded.status === "in_progress")) {
        await fetch(`${API_BASE_URL}/tasks/${taskId}/assign`, {
          method: "POST",
          headers: { Authorization: `Bearer ${session.accessToken}`, "Content-Type": "application/json" },
        }).catch(() => null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch task");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void loadTask(); }, [taskId, session?.accessToken]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken || !task) return;
    setIsSubmitting(true);
    setSubmitMessage(null);
    setSubmitError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/labels`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, value, confidence: 0.9, timeSpentSeconds: 15 }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message ?? `Submit failed (${res.status})`);
      }
      setSubmitMessage("Label submitted successfully.");
      setValue("");
      await loadTask();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submit failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!taskId) return <p className="text-red-600">Task ID is missing.</p>;

  const isOpen = task?.status === "pending" || task?.status === "in_progress";
  const imageUrl = task?.record?.rawData ? getImageUrl(task.record.rawData) : null;
  const rawText = task?.record?.rawData
    ? Object.entries(task.record.rawData)
        .filter(([k]) => k !== "imagePath" && k !== "image_path" && k !== "filePath" && k !== "fileName" && k !== "record_id")
        .map(([k, v]) => `${k}: ${String(v)}`)
        .join("\n")
    : null;

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="card rounded-[2rem] px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/tasks"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 p-2.5 transition hover:bg-white"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <p className="eyebrow text-xs text-muted">Task Labeling</p>
              <h1 className="mt-1 font-mono text-2xl font-semibold tracking-[-0.04em]">
                {isLoading ? "Loading…" : (task?.title ?? "Task not found")}
              </h1>
            </div>
          </div>
          {task && (
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 font-semibold">
                {task.reward.toFixed(4)} SOL
              </span>
              <span className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${
                isOpen ? "bg-black text-white" : "bg-black/8 text-muted"
              }`}>
                {task.status.replace("_", " ")}
              </span>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="card rounded-[2rem] p-10 text-center text-sm text-muted">Loading task…</div>
      ) : error ? (
        <div className="card rounded-[2rem] p-6 text-sm text-red-600">{error}</div>
      ) : !task ? (
        <div className="card rounded-[2rem] p-6 text-sm text-muted">Task not found.</div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
          {/* Left — data to label */}
          <article className="card rounded-[2rem] p-6">
            <p className="eyebrow text-xs text-muted">Record #{task.record?.recordNumber ?? "—"}</p>
            <h2 className="mt-2 font-mono text-xl font-semibold tracking-[-0.03em]">Data to label</h2>

            <div className="mt-5">
              {imageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={task.record?.rawData?.fileName as string ?? "Dataset image"}
                    className="max-h-[480px] w-full object-contain"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const next = img.nextElementSibling as HTMLElement | null;
                      if (next) next.style.display = "flex";
                    }}
                  />
                  <div
                    className="hidden h-40 items-center justify-center text-sm text-muted"
                  >
                    Image could not be loaded — check the backend /uploads route.
                  </div>
                </div>
              ) : rawText ? (
                <pre className="whitespace-pre-wrap rounded-2xl border border-black/10 bg-black/3 p-5 text-sm leading-7">
                  {rawText}
                </pre>
              ) : (
                <div className="rounded-2xl border border-dashed border-black/15 p-8 text-center text-sm text-muted">
                  No data content found in this record.
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-muted">
              <span>Dataset: <strong className="text-foreground">{task.dataset?.name ?? "Unknown"}</strong></span>
              <span>·</span>
              <span>Labels: <strong className="text-foreground">{task.submittedLabels}/{task.requiredLabels}</strong></span>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/8">
              <div
                className="h-full bg-black transition-all"
                style={{ width: `${Math.min(100, (task.submittedLabels / task.requiredLabels) * 100)}%` }}
              />
            </div>
          </article>

          {/* Right — label form */}
          <div className="space-y-4">
            <article className="card rounded-[2rem] p-6">
              <h2 className="font-mono text-xl font-semibold tracking-[-0.03em]">Submit label</h2>
              <p className="mt-1 text-sm text-muted">{task.description}</p>

              {!isOpen && (
                <div className="mt-4 rounded-xl bg-black/5 px-4 py-3 text-sm text-muted">
                  This task is not open for labeling ({task.status}).
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {task.dataset?.labelType === "multi-select"
                      ? "Select all that apply"
                      : task.dataset?.labelType === "category"
                      ? "Choose a label"
                      : "Your label"}
                  </label>
                  <LabelInput
                    labelType={task.dataset?.labelType ?? "text"}
                    labelOptions={task.dataset?.labelOptions ?? null}
                    value={value}
                    onChange={setValue}
                    disabled={isSubmitting || !isOpen}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting || !value.trim() || !isOpen}
                >
                  {isSubmitting ? "Submitting…" : "Submit Label"}
                </button>

                {submitMessage && (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    <CheckCircle2 className="size-4 shrink-0" />
                    {submitMessage}
                  </div>
                )}
                {submitError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{submitError}</p>
                )}
              </form>
            </article>

            {/* Previous labels */}
            {(task.labels?.length ?? 0) > 0 && (
              <article className="card rounded-[2rem] p-6">
                <h3 className="font-mono text-sm font-semibold">
                  Previous labels ({task.labels!.length})
                </h3>
                <ul className="mt-3 space-y-2">
                  {task.labels!.map((label) => (
                    <li key={label.id} className="flex items-center justify-between rounded-xl border border-black/8 bg-white/60 px-4 py-2.5 text-sm">
                      <span className="font-semibold">{label.value}</span>
                      <span className="text-xs text-muted">{new Date(label.createdAt).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        </div>
      )}
    </section>
  );
}