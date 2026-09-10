'use client';

import { useCallback, useRef, useMemo, useEffect, useState } from 'react';
import { Label } from '@/hooks/use-labels';

/**
 * Cache entry type with timestamp
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

/**
 * Configuration for label caching
 */
interface LabelCacheConfig {
  maxSize?: number;
  ttl?: number; // Time to live in milliseconds
}

/**
 * Hook for caching label data with automatic expiration
 * Prevents unnecessary API calls for frequently accessed labels
 */
export function useLabelCache(config: LabelCacheConfig = {}) {
  const { maxSize = 100, ttl = 5 * 60 * 1000 } = config; // Default 5 minutes TTL
  
  const cacheRef = useRef<Map<string, CacheEntry<Label[]>>>(new Map());
  const [cacheSize, setCacheSize] = useState(0);
  const [cacheHit, setCacheHit] = useState(0);
  const [cacheMiss, setCacheMiss] = useState(0);

  const set = useCallback(
    (key: string, data: Label[]) => {
      const now = Date.now();
      cacheRef.current.set(key, {
        data,
        timestamp: now,
        expiresAt: now + ttl,
      });

      // Simple LRU eviction if cache gets too large
      if (cacheRef.current.size > maxSize) {
        const firstKey = cacheRef.current.keys().next().value;
        if (firstKey) cacheRef.current.delete(firstKey);
      }
      setCacheSize(cacheRef.current.size);
    },
    [maxSize, ttl]
  );

  const get = useCallback((key: string): Label[] | null => {
    const entry = cacheRef.current.get(key);
    
    if (!entry) {
      setCacheMiss((prev) => prev + 1);
      return null;
    }

    // Check if cache entry has expired
    if (Date.now() > entry.expiresAt) {
      cacheRef.current.delete(key);
      setCacheSize(cacheRef.current.size);
      setCacheMiss((prev) => prev + 1);
      return null;
    }

    setCacheHit((prev) => prev + 1);
    return entry.data;
  }, []);

  const clear = useCallback(() => {
    cacheRef.current.clear();
    setCacheSize(0);
    setCacheHit(0);
    setCacheMiss(0);
  }, []);

  const stats = useMemo(
    () => ({
      size: cacheSize,
      hits: cacheHit,
      misses: cacheMiss,
      hitRate: cacheHit + cacheMiss > 0 
        ? (cacheHit / (cacheHit + cacheMiss)) * 100 
        : 0,
    }),
    [cacheSize, cacheHit, cacheMiss]
  );

  return { get, set, clear, stats };
}

/**
 * Hook for debouncing label filter or search input
 * Reduces API calls while user is typing
 */
export function useDebouncedLabelFilter(value: string, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for infinite scroll / lazy loading labels
 * Loads labels in batches as user scrolls
 */
export function useLazyLoadLabels(
  labels: Label[],
  batchSize: number = 10
) {
  const [displayCount, setDisplayCount] = useState(batchSize);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && displayCount < labels.length) {
          setDisplayCount((prev) => Math.min(prev + batchSize, labels.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [displayCount, labels.length, batchSize]);

  const displayedLabels = useMemo(
    () => labels.slice(0, displayCount),
    [labels, displayCount]
  );

  const hasMore = displayCount < labels.length;

  return {
    displayedLabels,
    hasMore,
    displayCount,
    observerTarget,
    totalCount: labels.length,
    loadMore: () => setDisplayCount((prev) => prev + batchSize),
  };
}

/**
 * Comparator for sorting labels by various criteria
 */
export const LabelSorters = {
  byConfidenceDesc: (a: Label, b: Label) => b.confidence - a.confidence,
  byConfidenceAsc: (a: Label, b: Label) => a.confidence - b.confidence,
  byRecentFirst: (a: Label, b: Label) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  byOldestFirst: (a: Label, b: Label) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  byValueAlphabetical: (a: Label, b: Label) =>
    a.value.localeCompare(b.value),
} as const;

/**
 * Filters for label lists
 */
export const LabelFilters = {
  byMinConfidence: (minConfidence: number) => (label: Label) =>
    label.confidence >= minConfidence,
  byMaxConfidence: (maxConfidence: number) => (label: Label) =>
    label.confidence <= maxConfidence,
  byDateRange: (startDate: Date, endDate: Date) => (label: Label) => {
    const labelDate = new Date(label.createdAt);
    return labelDate >= startDate && labelDate <= endDate;
  },
  byValue: (searchTerm: string) => (label: Label) =>
    label.value.toLowerCase().includes(searchTerm.toLowerCase()),
  byRecentDays: (days: number) => (label: Label) => {
    const labelDate = new Date(label.createdAt);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return labelDate >= cutoffDate;
  },
} as const;

/**
 * Hook for optimized label list rendering with memoization
 */
export function useMemoizedLabels(
  labels: Label[],
  sorter?: (a: Label, b: Label) => number,
  filters?: Array<(label: Label) => boolean>
) {
  return useMemo(() => {
    let result = [...labels];

    // Apply filters
    if (filters) {
      result = result.filter((label) =>
        filters.every((filter) => filter(label))
      );
    }

    // Apply sorter
    if (sorter) {
      result.sort(sorter);
    }

    return result;
  }, [labels, sorter, filters]);
}

/**
 * Hook for tracking label submission performance metrics
 */
export function useLabelPerformance(labels: Label[]) {
  return useMemo(() => {
    if (!labels.length) {
      return {
        totalSubmissions: 0,
        averageConfidence: 0,
        confidenceDistribution: { high: 0, medium: 0, low: 0 },
        submissionRate: 0,
      };
    }

    const totalSubmissions = labels.length;
    const averageConfidence =
      labels.reduce((sum, label) => sum + label.confidence, 0) / totalSubmissions;

    const confidenceDistribution = {
      high: labels.filter((l) => l.confidence >= 0.8).length,
      medium: labels.filter((l) => l.confidence >= 0.5 && l.confidence < 0.8).length,
      low: labels.filter((l) => l.confidence < 0.5).length,
    };

    // Calculate submissions per day
    const oldestLabel = new Date(labels[labels.length - 1]?.createdAt || Date.now());
    const newestLabel = new Date(labels[0]?.createdAt || Date.now());
    const daysDiff = Math.max(
      1,
      Math.ceil((newestLabel.getTime() - oldestLabel.getTime()) / (1000 * 60 * 60 * 24))
    );
    const submissionRate = (totalSubmissions / daysDiff).toFixed(2);

    return {
      totalSubmissions,
      averageConfidence,
      confidenceDistribution,
      submissionRate: parseFloat(submissionRate),
    };
  }, [labels]);
}
