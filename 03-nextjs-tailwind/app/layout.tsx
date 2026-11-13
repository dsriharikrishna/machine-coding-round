import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Frontend Machine Coding Round | Next.js Track',
  description: '20 practical frontend interview assignments in Next.js + Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  )
}

