import React, { useId, useMemo, useState } from 'react'
import { Search, X, Zap, Activity } from 'lucide-react'
import { useDebounce } from '../../hooks/useDebounce'

export interface SearchItem {
  id: number
  name: string
  category: string
  tag: string
}

const ITEMS_DATA: SearchItem[] = [
  { id: 1, name: 'React', category: 'Library', tag: 'UI Components' },
  { id: 2, name: 'Next.js', category: 'Framework', tag: 'React SSR / Fullstack' },
  { id: 3, name: 'Tailwind CSS', category: 'Styling', tag: 'Atomic CSS' },
  { id: 4, name: 'TypeScript', category: 'Language', tag: 'Typed JavaScript' },
  { id: 5, name: 'Zustand', category: 'State Management', tag: 'Minimal Store' },
  { id: 6, name: 'TanStack Query', category: 'Data Fetching', tag: 'Server State' },
  { id: 7, name: 'Vite', category: 'Build Tool', tag: 'ESM Bundler' },
  { id: 8, name: 'Radix UI', category: 'Component Library', tag: 'Unstyled Accessible Primitives' },
  { id: 9, name: 'shadcn/ui', category: 'Component System', tag: 'Copy-paste Components' },
  { id: 10, name: 'Redux Toolkit', category: 'State Management', tag: 'Predictable Global State' },
  { id: 11, name: 'React Hook Form', category: 'Forms', tag: 'Performant Form Validation' },
  { id: 12, name: 'Zod', category: 'Validation', tag: 'TypeScript Schema Validation' },
  { id: 13, name: 'Playwright', category: 'Testing', tag: 'End-to-End Testing' },
  { id: 14, name: 'Vitest', category: 'Testing', tag: 'Fast Unit Testing' },
]

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

interface HighlightedTextProps {
  text: string
  query: string
}

function HighlightedText({ text, query }: HighlightedTextProps) {
  if (!query) return <span>{text}</span>

  const escaped = escapeRegExp(query)
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-amber-300 text-amber-950 font-semibold px-0.5 rounded-xs">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  )
}

export default function SearchableList() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [delay, setDelay] = useState<number>(350)
  const [keystrokeCount, setKeystrokeCount] = useState<number>(0)

  const debouncedSearchTerm = useDebounce<string>(searchTerm, delay)
  const searchInputId = useId()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setKeystrokeCount((prev) => prev + 1)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const isPendingDebounce = searchTerm !== debouncedSearchTerm

  const filteredItems = useMemo(() => {
    const q = debouncedSearchTerm.trim().toLowerCase()
    if (!q) return ITEMS_DATA

    return ITEMS_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
    )
  }, [debouncedSearchTerm])

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/70 border border-sky-800 px-2.5 py-1 rounded-full">
            Task #01 • React 19 + TypeScript + Tailwind
          </span>
          <h2 className="text-2xl font-bold text-white mt-2">Searchable List with Debouncing</h2>
          <p className="text-sm text-slate-400">Custom hook <code>useDebounce&lt;T&gt;</code> with telemetry & highlight</p>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <label htmlFor={searchInputId} className="sr-only">Search items</label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            id={searchInputId}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Type to search (e.g., React, Testing, State)..."
            className="w-full pl-11 pr-10 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              aria-label="Clear input"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Debounce delay slider */}
        <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300">
          <span>Debounce Delay: <strong className="text-sky-400">{delay}ms</strong></span>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="accent-sky-400 cursor-pointer w-48"
          />
        </div>
      </div>

      {/* Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs mb-6">
        <div>
          <span className="text-slate-500 block">Raw Input Events</span>
          <span className="font-mono font-bold text-sky-400 text-sm">{keystrokeCount}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Debounced Query</span>
          <span className="font-mono text-slate-300 truncate block">
            {debouncedSearchTerm ? `"${debouncedSearchTerm}"` : '<empty>'}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Matches</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">{filteredItems.length}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Status</span>
          <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-[11px] ${
            isPendingDebounce ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
          }`}>
            {isPendingDebounce ? <Zap className="w-3 h-3 animate-pulse" /> : <Activity className="w-3 h-3" />}
            {isPendingDebounce ? 'Waiting debounce...' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Result Items */}
      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-slate-950/30 rounded-xl border border-slate-800/50">
            No items found matching "<span className="text-white font-medium">{debouncedSearchTerm}</span>"
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-sky-500/50 rounded-xl transition-all"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  <HighlightedText text={item.name} query={debouncedSearchTerm.trim()} />
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md">
                {item.tag}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

