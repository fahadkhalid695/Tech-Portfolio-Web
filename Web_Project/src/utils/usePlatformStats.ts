import { useState, useEffect, useCallback } from 'react';
import { PlatformStat } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// PLATFORM STATS HOOK
// Intelligent fetcher with caching to respect API rate limits
// Strategy: localStorage cache (1hr TTL) → API → static fallback
// ═══════════════════════════════════════════════════════════════════════════

interface CachedData {
  value: number | string;
  timestamp: number;
  source: 'api' | 'cache' | 'fallback';
}

interface StatResult {
  value: number | string;
  source: 'api' | 'cache' | 'fallback';
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isLive: boolean; // True if data is less than 1 hour old
}

// Cache TTL: 1 hour (in milliseconds)
const CACHE_TTL = 60 * 60 * 1000;

// API request timeout: 5 seconds
const API_TIMEOUT = 5000;

/**
 * Get cached data from localStorage
 */
const getCachedData = (key: string): CachedData | null => {
  try {
    const cached = localStorage.getItem(`platform_stats_${key}`);
    if (!cached) return null;
    
    const data: CachedData = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - data.timestamp < CACHE_TTL) {
      return data;
    }
    
    // Cache expired, but return it as fallback
    return { ...data, source: 'cache' };
  } catch {
    return null;
  }
};

/**
 * Set cached data to localStorage
 */
const setCachedData = (key: string, value: number | string, source: 'api' | 'cache' | 'fallback'): void => {
  try {
    const data: CachedData = {
      value,
      timestamp: Date.now(),
      source,
    };
    localStorage.setItem(`platform_stats_${key}`, JSON.stringify(data));
  } catch {
    // localStorage might be full or disabled
    console.warn('Failed to cache platform stats');
  }
};

/**
 * Extract nested value from object using dot notation path
 * e.g., "public_repos" from { public_repos: 15 }
 */
const extractValue = (obj: unknown, path: string): number | string | null => {
  try {
    const value = path.split('.').reduce((acc: unknown, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
    
    if (typeof value === 'number' || typeof value === 'string') {
      return value;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Fetch with timeout
 */
const fetchWithTimeout = async (url: string, timeout: number): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

/**
 * Main hook for fetching platform stats with intelligent fallback
 */
export const usePlatformStats = (platform: PlatformStat, statIndex: number = 0): StatResult => {
  const [result, setResult] = useState<StatResult>({
    value: platform.stats[statIndex]?.value || 0,
    source: 'fallback',
    loading: true,
    error: null,
    lastUpdated: null,
    isLive: false,
  });

  const fetchStats = useCallback(async () => {
    const cacheKey = `${platform.platform}_${platform.username}_${statIndex}`;
    const fallbackValue = platform.stats[statIndex]?.value || 0;

    // Step 1: Check cache first
    const cached = getCachedData(cacheKey);
    if (cached && cached.source === 'api') {
      // Valid cache from API
      const isLive = Date.now() - cached.timestamp < CACHE_TTL;
      setResult({
        value: cached.value,
        source: 'cache',
        loading: false,
        error: null,
        lastUpdated: new Date(cached.timestamp),
        isLive,
      });
      return;
    }

    // Step 2: If platform has API config, try to fetch
    if (platform.apiConfig) {
      try {
        const response = await fetchWithTimeout(platform.apiConfig.endpoint, API_TIMEOUT);
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        
        const data = await response.json();
        const value = extractValue(data, platform.apiConfig.valuePath);
        
        if (value !== null) {
          // Successfully fetched from API
          setCachedData(cacheKey, value, 'api');
          setResult({
            value,
            source: 'api',
            loading: false,
            error: null,
            lastUpdated: new Date(),
            isLive: true,
          });
          return;
        }
      } catch (error) {
        console.warn(`Failed to fetch ${platform.displayName} stats:`, error);
        // Continue to fallback
      }
    }

    // Step 3: Use expired cache if available
    if (cached) {
      setResult({
        value: cached.value,
        source: 'cache',
        loading: false,
        error: 'Using cached data',
        lastUpdated: new Date(cached.timestamp),
        isLive: false,
      });
      return;
    }

    // Step 4: Use static fallback
    setResult({
      value: fallbackValue,
      source: 'fallback',
      loading: false,
      error: null,
      lastUpdated: platform.stats[statIndex]?.lastUpdated 
        ? new Date(platform.stats[statIndex].lastUpdated + ' 1, 2026')
        : null,
      isLive: false,
    });
  }, [platform, statIndex]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return result;
};

/**
 * Hook to fetch all stats for a platform
 */
export const useAllPlatformStats = (platform: PlatformStat): StatResult[] => {
  const [results, setResults] = useState<StatResult[]>(
    platform.stats.map(stat => ({
      value: stat.value,
      source: 'fallback' as const,
      loading: true,
      error: null,
      lastUpdated: null,
      isLive: false,
    }))
  );

  useEffect(() => {
    const fetchAllStats = async () => {
      const newResults = await Promise.all(
        platform.stats.map(async (stat, index) => {
          const cacheKey = `${platform.platform}_${platform.username}_${index}`;
          const cached = getCachedData(cacheKey);

          // For GitHub, we can fetch from API
          if (platform.apiConfig && index === 0) {
            try {
              const response = await fetchWithTimeout(platform.apiConfig.endpoint, API_TIMEOUT);
              if (response.ok) {
                const data = await response.json();
                
                // GitHub API returns multiple values we might want
                const valueMap: Record<string, string> = {
                  'Repositories': 'public_repos',
                  'Followers': 'followers',
                };
                
                const valuePath = valueMap[stat.label] || platform.apiConfig.valuePath;
                const value = extractValue(data, valuePath);
                
                if (value !== null) {
                  setCachedData(cacheKey, value, 'api');
                  return {
                    value,
                    source: 'api' as const,
                    loading: false,
                    error: null,
                    lastUpdated: new Date(),
                    isLive: true,
                  };
                }
              }
            } catch {
              // Fall through to cache/fallback
            }
          }

          // Use cache or fallback
          if (cached) {
            return {
              value: cached.value,
              source: cached.source,
              loading: false,
              error: null,
              lastUpdated: new Date(cached.timestamp),
              isLive: Date.now() - cached.timestamp < CACHE_TTL,
            };
          }

          return {
            value: stat.value,
            source: 'fallback' as const,
            loading: false,
            error: null,
            lastUpdated: stat.lastUpdated ? new Date(stat.lastUpdated + ' 1, 2026') : null,
            isLive: false,
          };
        })
      );

      setResults(newResults);
    };

    fetchAllStats();
  }, [platform]);

  return results;
};

/**
 * Clear all cached platform stats
 */
export const clearPlatformCache = (): void => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('platform_stats_')) {
      localStorage.removeItem(key);
    }
  });
};

/**
 * Get cache age for a platform
 */
export const getCacheAge = (platform: PlatformStat): number | null => {
  const cacheKey = `${platform.platform}_${platform.username}_0`;
  const cached = getCachedData(cacheKey);
  if (!cached) return null;
  return Date.now() - cached.timestamp;
};
