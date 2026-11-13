import { NextRequest, NextResponse } from 'next/server'

export interface NextConceptItem {
  id: number
  name: string
  category: string
  tag: string
}

export interface SearchApiResponse {
  results: NextConceptItem[]
  total: number
  query: string
}

const DB: NextConceptItem[] = [
  { id: 1, name: 'Server Components', category: 'Next.js App Router', tag: 'Zero Client Bundle' },
  { id: 2, name: 'Client Components', category: 'Next.js App Router', tag: 'Interactive hooks & state' },
  { id: 3, name: 'Server Actions', category: 'Next.js Mutations', tag: 'RPC-style server mutations' },
  { id: 4, name: 'Route Handlers', category: 'Next.js API', tag: 'Web Request & Response standard' },
  { id: 5, name: 'Parallel Routes', category: 'Routing', tag: 'Simultaneous view slots' },
  { id: 6, name: 'Intercepting Routes', category: 'Routing', tag: 'Contextual modal overlays' },
  { id: 7, name: 'Tailwind CSS v4', category: 'Styling', tag: 'LightningCSS engine' },
  { id: 8, name: 'Turbopack', category: 'Bundler', tag: 'Incremental Rust-based compiler' },
  { id: 9, name: 'Dynamic OG Images', category: 'Metadata', tag: '@vercel/og / Satori' },
  { id: 10, name: 'Streaming SSR', category: 'Rendering', tag: 'Suspense boundaries' },
  { id: 11, name: 'Incremental Static Regeneration', category: 'Caching', tag: 'Stale-while-revalidate' },
  { id: 12, name: 'Edge Middleware', category: 'Edge Runtime', tag: 'V8 request rewrites & auth' },
]

export async function GET(request: NextRequest): Promise<NextResponse<SearchApiResponse>> {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') || '').trim().toLowerCase()

  // Simulate minimal server processing time
  await new Promise((resolve) => setTimeout(resolve, 80))

  if (!q) {
    return NextResponse.json({ results: DB, total: DB.length, query: '' })
  }

  const filtered = DB.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
  )

  return NextResponse.json({ results: filtered, total: filtered.length, query: q })
}

