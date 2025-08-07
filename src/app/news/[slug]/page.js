import { notFound } from "next/navigation"
import ArticleView from "@/components/community/ArticleView"
import { newsAPI } from "@/lib/api/news"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const revalidate = 3600

export default async function Page({ params }) {
  const { slug } = params

  try {
    const article = await newsAPI.getArticleBySlug(slug)
    if (!article) notFound()

    return (
      <>
        
        <ArticleView initialArticle={article} />
      
      </>
    )
  } catch (error) {
    console.error("Error loading article:", error)
    notFound()
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params

  try {
    const article = await newsAPI.getArticleBySlug(slug)
    if (!article) {
      return {
        title: "Article Not Found | WealthBridge News",
        description: "The requested article could not be found."
      }
    }

    return {
      title: article.seo.metaTitle || `${article.title} | WealthBridge News`,
      description: article.seo.metaDescription || article.excerpt,
      keywords: article.seo.keywords?.join(", ") || article.tags.join(", "),
      authors: [{ name: article.author.name }],
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: "article",
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        authors: [article.author.name],
        tags: article.tags,
        images: article.imageUrl
          ? [
              {
                url: article.imageUrl,
                width: 1200,
                height: 630,
                alt: article.title
              }
            ]
          : []
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: article.imageUrl ? [article.imageUrl] : []
      }
    }
  } catch (error) {
    return {
      title: "Error | WealthBridge News",
      description: "An error occurred while loading the article."
    }
  }
}

// ✅ Static params
export async function generateStaticParams() {
  try {
    const response = await newsAPI.getArticles({ limit: 50, featured: true })

    return response.data.map(article => ({
      slug: article.slug
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}