'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

interface SubmissionFeedbackProps {
  status: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  autoClose?: boolean;
}

/** SubmissionFeedback — Monochromatic banner for label submission results */
export function SubmissionFeedback({
  status,
  title,
  message,
  action,
  onDismiss,
  autoClose = true,
}: SubmissionFeedbackProps) {
  React.useEffect(() => {
    if (autoClose && status === 'success') {
      const timer = setTimeout(() => { onDismiss?.(); }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status, autoClose, onDismiss]);

  const icons = { success: CheckCircle2, error: XCircle, warning: AlertCircle, info: Info };
  const Icon = icons[status];

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
      <Icon className="size-4 shrink-0 mt-0.5 text-foreground" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-sm text-muted">{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-xs font-semibold text-foreground underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 text-muted hover:text-foreground transition" aria-label="Dismiss">
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

/** SubmissionResult — Shows detailed result after a successful label submission */
interface SubmissionResultProps {
  labelValue: string;
  confidence: number;
  submittedAt: string;
  onContinue?: () => void;
}

export function SubmissionResult({ labelValue, confidence, submittedAt, onContinue }: SubmissionResultProps) {
  return (
    <div className="space-y-4">
      <SubmissionFeedback
        status="success"
        title="Label Submitted Successfully"
        message={`Your label "${labelValue}" has been recorded with ${Math.round(confidence * 100)}% confidence.`}
        onDismiss={() => onContinue?.()}
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-black/8 bg-white/60 p-4">
          <p className="eyebrow text-[0.65rem] text-muted">Label</p>
          <p className="mt-2 font-mono text-xl font-semibold tracking-[-0.04em] truncate">{labelValue}</p>
        </div>
        <div className="rounded-2xl border border-black/8 bg-white/60 p-4">
          <p className="eyebrow text-[0.65rem] text-muted">Confidence</p>
          <p className="mt-2 font-mono text-xl font-semibold tracking-[-0.04em]">{Math.round(confidence * 100)}%</p>
        </div>
      </div>

      <p className="text-xs text-muted">Submitted: {new Date(submittedAt).toLocaleString()}</p>

      {onContinue && (
        <button onClick={onContinue} className="btn-primary w-full py-3 text-sm">
          Continue Labeling
        </button>
      )}
    </div>
  );
}

/** SubmissionError — Shows a detailed error with retry/cancel actions */
interface SubmissionErrorProps {
  error: Error | string;
  onRetry?: () => void;
  onCancel?: () => void;
}

export function SubmissionError({ error, onRetry, onCancel }: SubmissionErrorProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  return (
    <div className="space-y-4">
      <SubmissionFeedback status="error" title="Submission Failed" message={errorMessage} />
      <div className="flex gap-3">
        {onRetry && <button onClick={onRetry} className="btn-primary flex-1 py-2.5 text-sm">Retry</button>}
        {onCancel && <button onClick={onCancel} className="btn-secondary flex-1 py-2.5 text-sm">Cancel</button>}
      </div>
    </div>
  );
}

/** ValidationError — Inline field validation error */
interface ValidationErrorProps { fieldName: string; errorMessage: string; }

export function ValidationError({ fieldName, errorMessage }: ValidationErrorProps) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-2">
      <AlertCircle className="size-4 shrink-0 text-foreground mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-xs font-semibold">{fieldName}</p>
        <p className="text-xs text-muted">{errorMessage}</p>
      </div>
    </div>
  );
}

/** SuccessCheckmark — Animated monochromatic success indicator */
export function SuccessCheckmark({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="45" />
        <path d="M30 50l15 15 25-25" className="animate-pulse" />
      </svg>
    </div>
  );
}
