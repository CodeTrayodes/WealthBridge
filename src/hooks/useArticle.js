// src/hooks/useArticle.js
import { useState, useEffect } from "react"
import { newsAPI } from "@/lib/api/news"

export const useArticle = slug => {
  const [state, setState] = useState({
    article: null,
    loading: true,
    error: null,
    relatedArticles: []
  })

  useEffect(() => {
    if (!slug) return

    const fetchArticle = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))

        const article = await newsAPI.getArticleBySlug(slug)

        if (!article) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: "Article not found"
          }))
          return
        }

        // Fetch related articles
        const related = await newsAPI.getRelatedArticles(
          article.id,
          article.category,
          4
        )

        setState(prev => ({
          ...prev,
          article,
          relatedArticles: related,
          loading: false
        }))
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error ? error.message : "Failed to fetch article"
        }))
      }
    }

    fetchArticle()
  }, [slug])

  return state
}
