"use client";

import { getSession } from "next-auth/react";
import { FormEvent, useMemo, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { DatePicker } from "@/components/ui/date-picker";
import { API_BASE_URL } from "@/lib/constants";

type UploadResponse = {
  id: string;
  name: string;
  totalRecords: number;
  rewardPerRecord: number;
  totalRewardSOL: number;
};

type PublishResponse = {
  datasetId: string;
  tasksCreated: number;
  rewardPerRecord: number;
  totalRewardSOL: number;
};

export default function UploadDatasetPage() {
  const { accessToken, user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [labelType, setLabelType] = useState("category");
  const [labelOptions, setLabelOptions] = useState("positive,negative,neutral");
  const [totalRewardSOL, setTotalRewardSOL] = useState("50");
  const [maxLabelsPerRecord, setMaxLabelsPerRecord] = useState("3");
  const [consensusThreshold, setConsensusThreshold] = useState("0.67");
  const [deadline, setDeadline] = useState("");
  const [autoPublish, setAutoPublish] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [uploaded, setUploaded] = useState<UploadResponse | null>(null);

  const optionsAsArray = useMemo(
    () =>
      labelOptions
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    [labelOptions]
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const session = await getSession();
    const sessionAccessToken = session?.accessToken ?? accessToken;

    if (!sessionAccessToken) {
      setFeedback("Please sign in first.");
      return;
    }

    if (!file) {
      setFeedback("Please select a dataset file.");
      return;
    }

    if (!name.trim()) {
      setFeedback("Dataset name is required.");
      return;
    }

    setIsSubmitting(true);
    setFeedback("");
    setUploaded(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("labelType", labelType);
      formData.append("labelOptions", JSON.stringify(optionsAsArray));
      formData.append("labelSchema", JSON.stringify({ type: labelType, options: optionsAsArray }));
      formData.append("totalRewardSOL", totalRewardSOL);
      formData.append("maxLabelsPerRecord", maxLabelsPerRecord);
      formData.append("consensusThreshold", consensusThreshold);
      if (deadline) {
        formData.append("deadline", new Date(deadline).toISOString());
      }

      const response = await fetch(`${API_BASE_URL}/datasets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionAccessToken}`,
        },
        body: formData,
      });

      const payload = (await response.json()) as {
        success: boolean;
        message: string;
        data?: UploadResponse;
      };

      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again and retry the upload.");
      }

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.message || "Dataset upload failed");
      }

      let publishMessage = "";
      if (autoPublish) {
        const publishResponse = await fetch(`${API_BASE_URL}/datasets/${payload.data.id}/publish`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionAccessToken}`,
          },
          body: JSON.stringify({}),
        });

        const publishPayload = (await publishResponse.json()) as {
          success: boolean;
          message: string;
          data?: PublishResponse;
        };

        if (!publishResponse.ok || !publishPayload.success) {
          throw new Error(publishPayload.message || "Dataset uploaded, but publish failed");
        }

        publishMessage = ` ${publishPayload.data?.tasksCreated ?? 0} tasks created.`;
      }

      setUploaded(payload.data);
      setFeedback(`Dataset uploaded successfully.${autoPublish ? publishMessage : " Publish it to generate tasks."}`);
      setFile(null);
      setName("");
      setDescription("");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const role = user?.role ?? "unknown";
  const isAllowed = role === "validator" || role === "admin";

  return (
    <section className="space-y-6">
      <article className="card rounded-[1.75rem] p-6">
        <p className="eyebrow text-xs text-muted">Validator Pipeline</p>
        <h1 className="mt-2 font-mono text-3xl font-semibold tracking-[-0.04em]">Upload Dataset With Budget</h1>
              <p className="mt-2 text-sm text-muted">
          Upload CSV, JSON, image files, or image bundles (.zip), define label schema, and lock the total SOL budget to auto-calculate reward per record.
        </p>
      </article>

      {!isAllowed ? (
        <article className="card rounded-[1.75rem] p-6 text-sm text-red-700">
          This page is only available for validators and admins.
        </article>
      ) : (
        <article className="card rounded-[1.75rem] p-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <input className="field" onChange={(event) => setName(event.target.value)} placeholder="Dataset name" value={name} />

            <textarea
              className="field min-h-25"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Short description"
              value={description}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <select className="field" onChange={(event) => setLabelType(event.target.value)} value={labelType}>
                <option value="text">Text</option>
                <option value="category">Category</option>
                <option value="multi-select">Multi Select</option>
              </select>

              <input
                className="field"
                onChange={(event) => setLabelOptions(event.target.value)}
                placeholder="Options (comma separated)"
                value={labelOptions}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <input
                className="field"
                min="0"
                onChange={(event) => setTotalRewardSOL(event.target.value)}
                placeholder="Total reward (SOL)"
                step="0.001"
                type="number"
                value={totalRewardSOL}
              />

              <input
                className="field"
                max="10"
                min="1"
                onChange={(event) => setMaxLabelsPerRecord(event.target.value)}
                placeholder="Max labels / record"
                type="number"
                value={maxLabelsPerRecord}
              />

              <input
                className="field"
                max="1"
                min="0.5"
                onChange={(event) => setConsensusThreshold(event.target.value)}
                placeholder="Consensus threshold"
                step="0.01"
                type="number"
                value={consensusThreshold}
              />
            </div>

            {/* Deadline */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">
                Labeling Deadline
                <span className="ml-1.5 text-xs font-normal text-muted">(optional)</span>
              </label>
              <DatePicker
                value={deadline}
                onChange={setDeadline}
                min={new Date().toISOString().split("T")[0]}
                placeholder="Pick a deadline date…"
              />
              <p className="text-xs text-muted">
                Tasks from this dataset will be removed after this date.
              </p>
            </div>

            <input
              accept=".csv,.json,.zip,.jpg,.jpeg,.png,.gif,.webp"
              className="field"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              type="file"
            />

            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                checked={autoPublish}
                onChange={(event) => setAutoPublish(event.target.checked)}
                type="checkbox"
              />
              Auto-publish dataset after upload (create tasks immediately)
            </label>

            <button className="btn-primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Uploading..." : "Upload Dataset"}
            </button>
          </form>

          {feedback ? <p className="mt-4 rounded-xl bg-white/70 px-3 py-2 text-sm">{feedback}</p> : null}

          {uploaded ? (
            <div className="mt-4 rounded-xl border border-black/10 bg-white/70 p-4 text-sm">
              <p>
                <span className="font-semibold">Dataset ID:</span> {uploaded.id}
              </p>
              <p>
                <span className="font-semibold">Records:</span> {uploaded.totalRecords}
              </p>
              <p>
                <span className="font-semibold">Total Reward:</span> {uploaded.totalRewardSOL} SOL
              </p>
              <p>
                <span className="font-semibold">Reward/Record:</span> {uploaded.rewardPerRecord} SOL
              </p>
            </div>
          ) : null}
        </article>
      )}
    </section>
  );
}
