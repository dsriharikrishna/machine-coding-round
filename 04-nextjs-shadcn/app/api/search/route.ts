import { NextRequest, NextResponse } from 'next/server'

export interface ShadcnConceptItem {
  id: number
  name: string
  category: string
  tag: string
}

export interface SearchApiResponse {
  results: ShadcnConceptItem[]
  total: number
  query: string
}

const SHADCN_DB: ShadcnConceptItem[] = [
  { id: 1, name: 'Radix UI Primitives', category: 'Accessibility', tag: 'WAI-ARIA compliant unstyled core' },
  { id: 2, name: 'CVA (Class Variance Authority)', category: 'Component Architecture', tag: 'Variant pattern for design systems' },
  { id: 3, name: 'Tailwind Merge + Clsx', category: 'Styling Utilities', tag: 'cn() conflict resolution' },
  { id: 4, name: 'Command Palette (cmdk)', category: 'Components', tag: 'Fast keyboard combobox & fuzzy search' },
  { id: 5, name: 'Dialog & Sheet Modals', category: 'Accessible Overlays', tag: 'Focus trapping & Portal rendering' },
  { id: 6, name: 'Data Table with TanStack', category: 'Complex UI', tag: 'Headless sorting, filtering & pagination' },
  { id: 7, name: 'Form with React Hook Form + Zod', category: 'Form Management', tag: 'Schema-driven validated inputs' },
  { id: 8, name: 'Toast (Sonner)', category: 'Notifications', tag: 'Stackable non-blocking alerts' },
  { id: 9, name: 'Dropdown & Context Menus', category: 'Interactive Menus', tag: 'Full keyboard navigation' },
  { id: 10, name: 'Theme Toggle (next-themes)', category: 'Dark Mode', tag: 'System / light / dark CSS variables' },
]

export async function GET(request: NextRequest): Promise<NextResponse<SearchApiResponse>> {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') || '').trim().toLowerCase()

  // Small delay to simulate server latency
  await new Promise((resolve) => setTimeout(resolve, 80))

  if (!q) {
    return NextResponse.json({ results: SHADCN_DB, total: SHADCN_DB.length, query: '' })
  }

  const filtered = SHADCN_DB.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
  )

  return NextResponse.json({ results: filtered, total: filtered.length, query: q })
}

