import SearchableList from './tasks/01-searchable-list/SearchableList'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start py-12 px-4">
      <header className="mb-8 text-center max-w-xl">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Frontend Machine Coding Round
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Track 02: React 19 + TypeScript + Tailwind CSS (Vite)
        </p>
      </header>

      <main className="w-full">
        <SearchableList />
      </main>
    </div>
  )
}

