'use client';

import { useCallback, useState } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';

export interface Label {
  id: string;
  value: string;
  confidence: number;
  contributorId: string;
  taskId: string;
  createdAt: string;
  isAccepted?: boolean;
  isRejected?: boolean;
  rejectionReason?: string;
  contributor?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  task?: {
    id: string;
    title: string;
  };
}

export interface SubmitLabelRequest {
  value: string;
  confidence: number;
  recordId?: string;
  timeSpentSeconds?: number;
}

export interface SubmitLabelResponse {
  success: boolean;
  message: string;
  data: Label;
  timestamp: string;
}

/**
 * Hook for submitting labels to tasks
 * Handles submission state, errors, and success feedback
 */
export function useSubmitLabel() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [lastSubmittedLabel, setLastSubmittedLabel] = useState<Label | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const submitLabel = useCallback(
    async (taskId: string, labelData: SubmitLabelRequest): Promise<Label | null> => {
      try {
        setIsSubmitting(true);
        setError(null);
        setFeedback(null);

        const response = await apiClient.post<SubmitLabelResponse>(
          '/labels',
          {
            taskId,
            ...labelData,
          }
        );

        if (response.data) {
          setLastSubmittedLabel(response.data);
          setFeedback(`Label submitted successfully! Confidence: ${(response.data.confidence * 100).toFixed(0)}%`);
          return response.data;
        }

        return null;
      } catch (err) {
        const apiError = err instanceof ApiError
          ? err
          : new ApiError('Failed to submit label', 0, err);
        setError(apiError);
        setFeedback(null);
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const clearFeedback = useCallback(() => {
    setFeedback(null);
    setError(null);
  }, []);

  const resetState = useCallback(() => {
    setIsSubmitting(false);
    setError(null);
    setLastSubmittedLabel(null);
    setFeedback(null);
  }, []);

  return {
    submitLabel,
    isSubmitting,
    error,
    lastSubmittedLabel,
    feedback,
    clearFeedback,
    resetState,
  };
}

/**
 * Hook for fetching task labels
 * Gets all labels submitted for a specific task
 */
export function useTaskLabels(taskId: string) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchLabels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get<{
        success: boolean;
        data: Label[];
      }>(`/labels/task/${taskId}`);

      setLabels(response.data || []);
    } catch (err) {
      const apiError = err instanceof ApiError
        ? err
        : new ApiError('Failed to fetch labels', 0, err);
      setError(apiError);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  // Initial fetch
  React.useEffect(() => {
    if (taskId) {
      void fetchLabels();
    }
  }, [taskId, fetchLabels]);

  return {
    labels,
    loading,
    error,
    refetch: fetchLabels,
  };
}

// Import React for useEffect
import React from 'react';

/**
 * Hook for fetching user's label submission history
 * Gets all labels submitted by the current user across all tasks
 */
export function useLabelHistory() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get<{
        success: boolean;
        data: Label[];
      }>('/labels/history');

      setLabels(response.data || []);
    } catch (err) {
      const apiError = err instanceof ApiError
        ? err
        : new ApiError('Failed to fetch label history', 0, err);
      setError(apiError);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  React.useEffect(() => {
    void fetchHistory();
  }, [fetchHistory]);

  return {
    labels,
    loading,
    error,
    refetch: fetchHistory,
  };
}
