"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import type { Task, Label } from "@/app/(app)/dashboard/dashboard.types";

// The API occasionally returns tasks with labels arrays, so this local type is used for rendering.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TaskWithLabels = Task & { labels: Label[] };


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

  useEffect(() => {
    if (!taskId || !session?.accessToken) return;

    const fetchTask = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`Failed to load task: ${res.status}`);

        const json = await res.json();
        const loadedTask = json.data || json.task || null;
        setTask(loadedTask);

        if (loadedTask && (loadedTask.status === "pending" || loadedTask.status === "in_progress")) {
          await fetch(`${API_BASE_URL}/tasks/${taskId}/assign`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              "Content-Type": "application/json",
            },
          }).catch(() => null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to fetch task");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTask();
  }, [taskId, session?.accessToken]);

  if (!taskId) return <p className="text-red-600">Task id is missing.</p>;

  const formatTimestamp = (timestamp: string) => new Date(timestamp).toLocaleString();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!session?.accessToken) return;

    if (!task) {
      setSubmitMessage("No task available for submission.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/labels`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          value,
          confidence: 0.9,
          timeSpentSeconds: 15,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to submit label: ${res.status}`);
      }

      setSubmitMessage("Label submitted successfully.");
      setValue("");

      // refresh task details to update submittedLabels / labels
      const reload = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const reloadJson = await reload.json();
      setTask(reloadJson.data || reloadJson.task || null);
    } catch (err) {
      setSubmitMessage(err instanceof Error ? err.message : "Submit failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Labeling Task</h1>
        <Link href="/dashboard/tasks" className="btn-secondary">
          Back to tasks
        </Link>
      </div>

      {isLoading ? (
        <p>Loading task...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : task ? (
        <article className="rounded-xl border p-5 space-y-4">
          {(() => {
            const isOpenForLabeling = task.status === "pending" || task.status === "in_progress";
            return (
              <>
          <div className="flex justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-muted">{task.description}</p>
              <p className="text-xs text-muted">Dataset: {task.dataset?.name ?? "Unknown"}</p>
            </div>
            <span className="text-xs font-medium text-slate-700">{task.status}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <span>Reward: {task.reward.toFixed(3)} SOL</span>
            <span>
              Progress: {task.submittedLabels}/{task.requiredLabels} ({Math.min(100, Math.round((task.submittedLabels / task.requiredLabels) * 100))}% completed)
            </span>
          </div>
          {task.submittedLabels >= task.requiredLabels && task.status !== "completed" && (
            <p className="text-xs text-amber-700">Task has sufficient labels and may be awaiting validator review.</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-sm font-medium">Your label</label>
            <input
              className="input w-full"
              placeholder="Enter label value (e.g. positive, negative)"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={isSubmitting || !isOpenForLabeling}
              required
            />
            <button
              className="btn-primary"
              disabled={isSubmitting || !value.trim() || !isOpenForLabeling}
            >
              {!isOpenForLabeling ? "Task not open" : isSubmitting ? "Submitting..." : "Submit Label"}
            </button>
            {!isOpenForLabeling && (
              <p className="text-xs text-muted">This task is not in an active labeling state.</p>
            )}
          </form>

          {submitMessage && <p className="text-sm text-green-600">{submitMessage}</p>}

          <div className="text-sm text-muted">
            <h3 className="font-semibold text-sm">Previous labels ({task.labels?.length ?? 0})</h3>
            {task.labels?.length ? (
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {task.labels.map((label) => (
                  <li key={label.id}>
                    {label.value} (by {label.contributorId.slice(0, 8)}..., {formatTimestamp(label.createdAt)})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No labels yet.</p>
            )}
          </div>
              </>
            );
          })()}
        </article>
      ) : (
        <p>Task not found.</p>
      )}
    </section>
  );
}