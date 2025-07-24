import { useState, useEffect, useCallback } from "react"
import { newsAPI } from "@/lib/api/news"

export const useNews = (initialFilters = {}) => {
  const [state, setState] = useState({
    articles: [],
    loading: true,
    error: null,
    pagination: null,
    hasMore: false
  })

  const [filters, setFilters] = useState(initialFilters)

  const fetchArticles = useCallback(
    async (newFilters = {}, append = false) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))

        const response = await newsAPI.getArticles({
          ...filters,
          ...newFilters
        })

        setState(prev => ({
          ...prev,
          articles: append
            ? [...prev.articles, ...response.data]
            : response.data,
          pagination: response.pagination,
          hasMore: response.pagination.hasNext,
          loading: false
        }))
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error ? error.message : "Failed to fetch articles"
        }))
      }
    },
    [filters]
  )

  const loadMore = useCallback(() => {
    if (state.pagination && state.hasMore && !state.loading) {
      fetchArticles({ page: state.pagination.page + 1 }, true)
    }
  }, [state.pagination, state.hasMore, state.loading, fetchArticles])

  const updateFilters = useCallback(
    newFilters => {
      const updatedFilters = { ...filters, ...newFilters, page: 1 }
      setFilters(updatedFilters)
      fetchArticles(updatedFilters, false)
    },
    [filters, fetchArticles]
  )

  const refresh = useCallback(() => {
    fetchArticles(filters, false)
  }, [filters, fetchArticles])

  useEffect(() => {
    fetchArticles(filters, false)
  }, [])

  return {
    ...state,
    filters,
    updateFilters,
    loadMore,
    refresh
  }
}
