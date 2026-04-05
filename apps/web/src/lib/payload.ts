import type { Review, Service, BlogPost, PayloadResponse } from '@fusion-legal/shared'

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || 'http://localhost:3000'

async function fetchFromPayload<T>(endpoint: string): Promise<PayloadResponse<T>> {
  const res = await fetch(`${PAYLOAD_URL}/api/${endpoint}`)
  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function getReviews(): Promise<Review[]> {
  const data = await fetchFromPayload<Review>('reviews?sort=position&limit=100')
  return data.docs
}

export async function getServices(): Promise<Service[]> {
  const data = await fetchFromPayload<Service>('services?sort=position&limit=100')
  return data.docs
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchFromPayload<BlogPost>(
    'blog-posts?where[status][equals]=published&sort=-published_date&limit=100'
  )
  return data.docs
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const data = await fetchFromPayload<BlogPost>(
    `blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1`
  )
  return data.docs[0] ?? null
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const data = await fetchFromPayload<BlogPost>(
    'blog-posts?where[status][equals]=published&limit=100&depth=0'
  )
  return data.docs.map((post) => post.slug)
}
