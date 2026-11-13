import SearchableListPage from './01-searchable-list/page'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start py-12 px-4">
      <header className="mb-8 text-center max-w-xl">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Frontend Machine Coding Round
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Track 04: Next.js 16 + shadcn/ui + TypeScript + Tailwind CSS
        </p>
      </header>

      <main className="w-full">
        <SearchableListPage />
      </main>
    </div>
  )
}
