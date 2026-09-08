'use client';

import { apiClient, ApiError } from '@/lib/api-client';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'labeled' | 'completed' | 'validated' | 'rejected';
  reward: number;
  requiredLabels: number;
  submittedLabels: number;
  consensusThreshold: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  datasetId: string;
  assignedToId?: string;
  dataset?: {
    id: string;
    name: string;
    labelType?: string;
    labelOptions?: unknown;
    labelSchema?: unknown;
  };
  record?: {
    id: string;
    recordNumber: number;
    rawData: unknown;
  };
  assignedTo?: { id: string; name: string };
  labels?: Label[];
}

export interface Label {
  id: string;
  value: string;
  confidence: number;
  contributorId: string;
  taskId: string;
  createdAt: string;
}

export interface TasksResponse {
  success: boolean;
  message: string;
  data: {
    tasks: Task[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  timestamp: string;
}

export interface FetchTasksOptions {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
}

/**
 * Hook for fetching tasks with error handling and loading states
 */
export function useTasks(options?: FetchTasksOptions) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [pagination, setPagination] = useState<TasksResponse['data']['pagination'] | undefined>(undefined);

  // Keep a stable options object so inline object literals in callers don't trigger request loops.
  const stableOptions = useMemo(
    () => ({
      page: options?.page,
      limit: options?.limit,
      status: options?.status,
      sortBy: options?.sortBy,
    }),
    [options?.page, options?.limit, options?.status, options?.sortBy]
  );

  // Build query string from options
  const buildQueryString = useCallback((opts?: FetchTasksOptions) => {
    if (!opts) return '';
    
    const params = new URLSearchParams();
    if (opts.page) params.append('page', opts.page.toString());
    if (opts.limit) params.append('limit', opts.limit.toString());
    if (opts.status) params.append('status', opts.status);
    if (opts.sortBy) params.append('sortBy', opts.sortBy);
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }, []);

  // Fetch tasks
  const fetchTasks = useCallback(async (fetchOptions?: FetchTasksOptions) => {
    try {
      setLoading(true);
      setError(null);

      const queryString = buildQueryString(fetchOptions || stableOptions);
      const response = await apiClient.get<TasksResponse>(`/tasks${queryString}`);

      setTasks(response.data?.tasks || []);
      setPagination(response.data?.pagination);
    } catch (err) {
      const apiError = err instanceof ApiError
        ? err
        : new ApiError('Failed to fetch tasks', 0, err);
      setError(apiError);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [stableOptions, buildQueryString]);

  // Initial fetch
  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  // Retry function
  const retry = useCallback(() => {
    void fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    pagination,
    refetch: retry,
    setTasks, // For manual updates
  };
}
