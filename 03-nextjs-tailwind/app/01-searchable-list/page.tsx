import { Suspense } from 'react'
import { SearchableListContent } from './SearchableListContent'

export default function SearchableListPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400">
          Loading Searchable List...
        </div>
      }
    >
      <SearchableListContent />
    </Suspense>
  )
}

