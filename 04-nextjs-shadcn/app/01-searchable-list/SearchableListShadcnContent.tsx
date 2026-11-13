'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Loader2, Sparkles } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { ShadcnConceptItem, SearchApiResponse } from '../api/search/route'

interface HighlightedTextProps {
  text: string
  query: string
}

function HighlightedText({ text, query }: HighlightedTextProps) {
  if (!query) return <span>{text}</span>

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-amber-300 text-amber-950 px-0.5 rounded-xs font-semibold">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  )
}

export function SearchableListShadcnContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get('q') || ''
  const [inputValue, setInputValue] = useState<string>(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery)
  const [delay, setDelay] = useState<number>(300)
  const [results, setResults] = useState<ShadcnConceptItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, startTransition] = useTransition()

  // Debounce input to local debounced query and URL sync
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue)

      startTransition(() => {
        const params = new URLSearchParams(window.location.search)
        if (inputValue.trim()) {
          params.set('q', inputValue.trim())
        } else {
          params.delete('q')
        }
        router.replace(`?${params.toString()}`, { scroll: false })
      })
    }, delay)

    return () => clearTimeout(timer)
  }, [inputValue, delay, router])

  // Fetch results when debounced query changes
  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)

    const controller = new AbortController()

    async function fetchSearch() {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error('Failed to fetch')
        const data: SearchApiResponse = await res.json()
        if (!isCancelled) {
          setResults(data.results || [])
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error(err)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchSearch()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [debouncedQuery])

  const isDebouncing = inputValue !== debouncedQuery

  return (
    <Card className="w-full max-w-2xl mx-auto border-slate-800 bg-slate-900 shadow-2xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-violet-400 border-violet-800 bg-violet-950/60 font-mono">
            Task #01 • Next.js + shadcn/ui + TypeScript
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          Searchable List with Debouncing & Design System
        </CardTitle>
        <CardDescription className="text-slate-400">
          Built with composable shadcn <code>Card</code>, <code>Input</code>, <code>Badge</code>, and URL sync.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Input Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search shadcn components & design tokens..."
              className="pl-9 pr-10 bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
            />
            {inputValue && (
              <button
                onClick={() => setInputValue('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Debounce delay control */}
          <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
            <span>Debounce Delay: <strong className="text-violet-400">{delay}ms</strong></span>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="accent-violet-500 cursor-pointer w-48"
            />
          </div>
        </div>

        {/* Telemetry / Status */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block">Query</span>
            <span className="font-mono text-violet-400 font-bold truncate block">
              {debouncedQuery ? `"${debouncedQuery}"` : '<all>'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">URL Synced</span>
            <span className="font-mono text-slate-300 truncate block">
              ?q={searchParams.get('q') || ''}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Matches</span>
            <span className="font-mono font-bold text-sky-400 text-sm">{results.length}</span>
          </div>
          <div>
            <span className="text-slate-500 block">State</span>
            <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-[11px] ${
              isLoading || isDebouncing
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {isLoading || isDebouncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              {isDebouncing ? 'Debouncing...' : isLoading ? 'Fetching...' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {results.length === 0 && !isLoading ? (
            <div className="text-center py-10 text-slate-400 bg-slate-950/30 rounded-xl border border-slate-800/50">
              No matching components found for "<span className="text-white font-medium">{debouncedQuery}</span>"
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-violet-500/50 rounded-xl transition-all"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-100">
                    <HighlightedText text={item.name} query={debouncedQuery.trim()} />
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
                </div>
                <Badge variant="secondary" className="text-xs font-normal">
                  {item.tag}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

