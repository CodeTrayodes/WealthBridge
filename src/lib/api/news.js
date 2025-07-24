// Mock data - in production, this would come from your CMS/Database
const MOCK_ARTICLES = [
  {
    id: "1",
    title:
      "RBI Announces New Guidelines for NRI Account Opening - Simplified KYC Process",
    slug: "rbi-nri-account-opening-guidelines-2025",
    excerpt:
      "The Reserve Bank of India (RBI) has revolutionized the NRI account onboarding process with a paperless, video-KYC system and a 7-day approval window.",
    content: `
<h2>📢 RBI Rolls Out Digital Reforms for NRIs</h2>
<p><strong>Mumbai, January 17, 2025</strong> — In a landmark move to accelerate financial inclusion and digitize banking services, the <strong>Reserve Bank of India (RBI)</strong> has issued a new set of simplified guidelines for <em>Non-Resident Indians (NRIs)</em> to open accounts in India.</p>

<div class="inline-comment">💡 <strong>NRI:</strong> An Indian citizen residing abroad for more than 182 days in a financial year.</div>

<h2>🚀 What’s New?</h2>
<ul>
  <li>📉 <strong>Reduced Approval Time:</strong> From 15–21 days to <strong>7 working days</strong></li>
  <li>📄 <strong>Digital Documentation:</strong> Soft copies now accepted – no notarization needed</li>
  <li>📹 <strong>Video-Based KYC:</strong> Verify identity from anywhere in the world</li>
  <li>🌐 <strong>Remote Access:</strong> Entire process is <em>100% online</em></li>
</ul>

<h3>📁 Required Documents (Digitally Accepted)</h3>
<table>
  <thead>
    <tr>
      <th>Document</th>
      <th>Format</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Passport (first & last page)</td>
      <td>PDF / JPG</td>
      <td>Must be digitally certified</td>
    </tr>
    <tr>
      <td>Visa / Work Permit</td>
      <td>PDF / JPG</td>
      <td>Must be valid on date of submission</td>
    </tr>
    <tr>
      <td>Proof of Overseas Address</td>
      <td>Utility Bill / Govt ID</td>
      <td>Issued within the last 3 months</td>
    </tr>
  </tbody>
</table>

<h2>🧭 How It Works: KYC Flow</h2>
<div class="flowchart">
  <ul>
    <li>📤 Upload Documents Online</li>
    <li>🧑‍💻 Schedule Video KYC Call</li>
    <li>✅ Identity Verified by Officer</li>
    <li>📬 Receive Confirmation & Account Info</li>
  </ul>
</div>

<div class="inline-comment">🔍 <strong>KYC:</strong> “Know Your Customer” is a process by which banks verify identity to prevent fraud.</div>

<h3>✅ Example: Real-Life NRI Experience</h3>
<blockquote>
  “I completed my onboarding from Singapore in just 6 days via video call. The process was smooth, intuitive, and fully digital.”  
  <br>– <strong>Rohan Mehta, NRI Software Engineer</strong>
</blockquote>

<h2>🎯 RBI’s Vision</h2>
<p>The RBI's directive aligns with its <strong>Digital India</strong> mission to empower overseas Indians by removing red tape and enabling seamless banking access.</p>

<h3>🏦 Supported Account Types</h3>
<ul>
  <li><strong>NRE Account:</strong> Repatriable account for foreign income</li>
  <li><strong>NRO Account:</strong> For income earned in India (rent, dividends, etc.)</li>
  <li><strong>FCNR Account:</strong> Fixed deposit in foreign currency</li>
</ul>

<h2>📌 Key Takeaways</h2>
<div class="highlight-box">
  <ul>
    <li>🕒 <strong>7-Day Turnaround:</strong> Drastic improvement from prior norms</li>
    <li>📂 <strong>No Hard Copies:</strong> All documents digitally accepted</li>
    <li>📞 <strong>Global Access:</strong> Start-to-finish from your phone or laptop</li>
    <li>💰 <strong>Zero Courier Fees:</strong> Save on international notarization</li>
  </ul>
</div>

<h2>💬 FAQ</h2>
<p><strong>Q:</strong> Is video KYC safe?<br>
<strong>A:</strong> Yes, all calls are end-to-end encrypted and recorded with your consent.</p>

<p><strong>Q:</strong> What if I don’t have digital copies?<br>
<strong>A:</strong> Most banks now offer scanning tools within their app or web portal.</p>

<h3>🔗 Useful Resources</h3>
<p>Visit the official circular at <a href="https://rbi.org.in" target="_blank" rel="noopener">rbi.org.in</a> or your preferred bank's NRI page for step-by-step walkthroughs.</p>
    `,
    category: "banking",
    tags: ["RBI", "NRI Banking", "KYC", "Policy Update", "Digital India"],
    author: {
      id: "author-1",
      name: "Priya Sharma",
      bio: "Senior Financial Analyst with 10+ years experience in NRI banking",
      avatar: "/images/authors/priya-sharma.jpg"
    },
    publishedAt: "2025-01-17T10:30:00Z",
    updatedAt: "2025-01-17T10:30:00Z",
    readTime: 8,
    views: 2874,
    likes: 160,
    trending: true,
    featured: true,
    urgent: true,
    status: "published",
    sourceUrl: "https://rbi.org.in",
    seo: {
      metaTitle:
        "RBI Simplifies NRI Account Opening - New 2025 Guidelines & Video KYC",
      metaDescription:
        "RBI enables digital onboarding for NRI accounts with video KYC, 7-day approval, and paperless verification. Full 2025 guideline breakdown.",
      keywords: [
        "RBI NRI account rules",
        "Digital KYC 2025",
        "NRI account video onboarding",
        "India banking for NRIs",
        "Simplified KYC guidelines"
      ]
    }
  },
  {
    id: "2",
    title:
      "Mumbai Real Estate: Bandra-Kurla Complex Sees 12% Price Appreciation in Q4 2024",
    slug: "mumbai-bkc-real-estate-price-appreciation-q4-2024",
    excerpt:
      "Commercial and residential properties in BKC continue to outperform other Mumbai markets, driven by infrastructure development and IT sector growth.",
    content: `
      <p>The Bandra-Kurla Complex has emerged as one of Mumbai's most sought-after real estate destinations, with properties seeing a remarkable 12% price appreciation in Q4 2024.</p>
      
      <p>This growth is primarily attributed to the ongoing infrastructure development projects, including the Mumbai Metro expansion and the upcoming financial district developments.</p>
    `,
    category: "real-estate",
    tags: ["Mumbai", "Real Estate", "BKC", "Price Trends", "Investment"],
    author: {
      id: "author-2",
      name: "Rajesh Kumar",
      bio: "Real Estate Market Analyst and Property Investment Advisor"
    },
    publishedAt: "2025-01-17T08:15:00Z",
    updatedAt: "2025-01-17T08:15:00Z",
    readTime: 6,
    views: 1923,
    likes: 89,
    trending: true,
    featured: false,
    urgent: false,
    status: "published",
    seo: {
      metaTitle:
        "Mumbai BKC Real Estate Price Rise 12% in Q4 2024 - Investment Analysis",
      metaDescription:
        "Bandra-Kurla Complex property prices surge 12% in Q4 2024. Complete analysis of Mumbai real estate trends for NRI investors.",
      keywords: [
        "Mumbai real estate",
        "BKC property prices",
        "NRI property investment"
      ]
    }
  }
  // Add more mock articles...
]

const MOCK_CATEGORIES = [
  {
    id: "all",
    name: "All News",
    slug: "all",
    icon: "Globe",
    color: "text-orange-400",
    description: "Latest updates for NRIs",
    count: 127,
    isActive: true
  },
  {
    id: "india-markets",
    name: "India Markets",
    slug: "india-markets",
    icon: "TrendingUp",
    color: "text-green-400",
    description: "Stock market & economic updates",
    count: 34,
    isActive: true
  },
  {
    id: "real-estate",
    name: "Real Estate",
    slug: "real-estate",
    icon: "Home",
    color: "text-blue-400",
    description: "Property market & regulations",
    count: 28,
    isActive: true
  },
  {
    id: "investment-opportunities",
    name: "Investment Opportunities",
    slug: "investment-opportunities",
    icon: "PiggyBank",
    color: "text-purple-400",
    description: "New schemes & opportunities",
    count: 22,
    isActive: true
  },
  {
    id: "tax-updates",
    name: "Tax & Regulatory",
    slug: "tax-updates",
    icon: "Calculator",
    color: "text-yellow-400",
    description: "Policy changes & compliance",
    count: 19,
    isActive: true
  },
  {
    id: "banking",
    name: "Banking & Remittance",
    slug: "banking",
    icon: "Briefcase",
    color: "text-cyan-400",
    description: "Banking updates & money transfer",
    count: 15,
    isActive: true
  }
]

// Simulated API delay for realistic performance testing
const simulateNetworkDelay = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms))

export class NewsAPI {
  cache = new Map()

  constructor() {}

  static getInstance() {
    if (!NewsAPI.instance) {
      NewsAPI.instance = new NewsAPI()
    }
    return NewsAPI.instance
  }

  getCacheKey(method, params) {
    return `${method}:${JSON.stringify(params || {})}`
  }

  isValidCache(cacheEntry) {
    return Date.now() - cacheEntry.timestamp < cacheEntry.ttl
  }

  setCache(key, data, ttl = 300000) {
    // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  getCache(key) {
    const cacheEntry = this.cache.get(key)
    if (cacheEntry && this.isValidCache(cacheEntry)) {
      return cacheEntry.data
    }
    this.cache.delete(key)
    return null
  }

  async getArticles(filters = {}) {
    const cacheKey = this.getCacheKey("getArticles", filters)
    const cachedData = this.getCache(cacheKey)

    if (cachedData) {
      return cachedData
    }

    await simulateNetworkDelay(300)

    const {
      category,
      search,
      tags,
      featured,
      trending,
      page = 1,
      limit = 10,
      sortBy = "publishedAt",
      sortOrder = "desc"
    } = filters

    let filteredArticles = [...MOCK_ARTICLES].filter(
      article => article.status === "published"
    )

    // Apply filters
    if (category && category !== "all") {
      filteredArticles = filteredArticles.filter(
        article => article.category === category
      )
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredArticles = filteredArticles.filter(
        article =>
          article.title.toLowerCase().includes(searchLower) ||
          article.excerpt.toLowerCase().includes(searchLower) ||
          article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    if (tags && tags.length > 0) {
      filteredArticles = filteredArticles.filter(article =>
        tags.some(tag => article.tags.includes(tag))
      )
    }

    if (featured !== undefined) {
      filteredArticles = filteredArticles.filter(
        article => article.featured === featured
      )
    }

    if (trending !== undefined) {
      filteredArticles = filteredArticles.filter(
        article => article.trending === trending
      )
    }

    // Apply sorting
    filteredArticles.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "views":
          aValue = a.views
          bValue = b.views
          break
        case "likes":
          aValue = a.likes
          bValue = b.likes
          break
        case "publishedAt":
        default:
          aValue = new Date(a.publishedAt).getTime()
          bValue = new Date(b.publishedAt).getTime()
          break
      }

      if (sortOrder === "asc") {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })

    // Apply pagination
    const total = filteredArticles.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    const result = {
      data: paginatedArticles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }

    this.setCache(cacheKey, result)
    return result
  }

  async getArticleBySlug(slug) {
    const cacheKey = this.getCacheKey("getArticleBySlug", { slug })
    const cachedData = this.getCache(cacheKey)

    if (cachedData) {
      return cachedData
    }

    await simulateNetworkDelay(200)

    const article = MOCK_ARTICLES.find(
      article => article.slug === slug && article.status === "published"
    )

    if (article) {
      // Increment view count (in real app, this would be a separate API call)
      article.views += 1
      this.setCache(cacheKey, article, 600000) // 10 minutes cache for articles
    }

    return article || null
  }

  async getCategories() {
    const cacheKey = this.getCacheKey("getCategories")
    const cachedData = this.getCache(cacheKey)

    if (cachedData) {
      return cachedData
    }

    await simulateNetworkDelay(100)

    const categories = MOCK_CATEGORIES.filter(category => category.isActive)
    this.setCache(cacheKey, categories, 900000) // 15 minutes cache for categories

    return categories
  }

  async getFeaturedArticles(limit = 3) {
    const cacheKey = this.getCacheKey("getFeaturedArticles", { limit })
    const cachedData = this.getCache(cacheKey)

    if (cachedData) {
      return cachedData
    }

    await simulateNetworkDelay(150)

    const featured = MOCK_ARTICLES.filter(
      article => article.featured && article.status === "published"
    )
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, limit)

    this.setCache(cacheKey, featured)
    return featured
  }

  async getTrendingArticles(limit = 5) {
    const cacheKey = this.getCacheKey("getTrendingArticles", { limit })
    const cachedData = this.getCache(cacheKey)

    if (cachedData) {
      return cachedData
    }

    await simulateNetworkDelay(150)

    const trending = MOCK_ARTICLES.filter(
      article => article.trending && article.status === "published"
    )
      .sort((a, b) => b.views - a.views)
      .slice(0, limit)

    this.setCache(cacheKey, trending)
    return trending
  }

  async getRelatedArticles(articleId, category, limit = 4) {
    const cacheKey = this.getCacheKey("getRelatedArticles", {
      articleId,
      category,
      limit
    })
    const cachedData = this.getCache(cacheKey)

    if (cachedData) {
      return cachedData
    }

    await simulateNetworkDelay(100)

    const related = MOCK_ARTICLES.filter(
      article =>
        article.id !== articleId &&
        article.category === category &&
        article.status === "published"
    )
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, limit)

    this.setCache(cacheKey, related)
    return related
  }

  // Method to clear cache (useful for admin operations)
  clearCache() {
    this.cache.clear()
  }

  // Method to get cache stats (useful for monitoring)
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

// Export singleton instance
export const newsAPI = NewsAPI.getInstance()
