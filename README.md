# Frontend Machine Coding Round - 20 Practical Interview Assignments

A comprehensive repository for mastering frontend machine coding interviews across 4 foundational & modern tracks, fully typed in **TypeScript**:

1. **`01-html-css-js/`**: Vanilla HTML, CSS, TypeScript (compiled to zero-external-dependency JavaScript, core DOM & Web APIs).
2. **`02-react-tailwind/`**: React 19 + TypeScript + Tailwind CSS (Vite, custom hooks, typed state, atomic CSS).
3. **`03-nextjs-tailwind/`**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 (Route Handlers, URL param sync, SSR/Suspense).
4. **`04-nextjs-shadcn/`**: Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui design system (`cn`, `cva`, accessible primitives).

---

## 📋 Assignment Tracker (1 / 20 Completed Across All 4 Stacks)

| # | Assignment Name | Vanilla (HTML/CSS/TS) | React + Tailwind | Next.js + Tailwind | Next.js + shadcn | Key Interview Concepts Evaluated |
|---|-----------------|:---------------------:|:----------------:|:------------------:|:----------------:|-----------------------------------|
| 01 | Searchable list with debouncing | ✅ Completed | ✅ Completed | ✅ Completed | ✅ Completed | Generic debounce closure, typed input events, regex escaping, URL sync, `AbortController` |
| 02 | Autocomplete with API integration | ⬜ | ⬜ | ⬜ | ⬜ | Async caching, race condition prevention (`AbortController`), keyboard nav (ArrowUp/Down/Enter/Escape) |
| 03 | Reusable data table with sorting and filtering | ⬜ | ⬜ | ⬜ | ⬜ | Multi-column sorting, case-insensitive filter, column schema configuration, accessibility |
| 04 | Server-side pagination | ⬜ | ⬜ | ⬜ | ⬜ | Query params sync, page windowing, boundary limits, loading states |
| 05 | Multi-step form with validation | ⬜ | ⬜ | ⬜ | ⬜ | Form state preservation, schema validation, step guards, dirty tracking |
| 06 | Dynamic form builder | ⬜ | ⬜ | ⬜ | ⬜ | JSON-driven rendering, field dependencies, dynamic schema generation |
| 07 | Modal with keyboard accessibility | ⬜ | ⬜ | ⬜ | ⬜ | Focus trapping, `aria-modal`, body scroll lock, ESC closing, portal rendering |
| 08 | Tabs component | ⬜ | ⬜ | ⬜ | ⬜ | ARIA tablist/tab/tabpanel roles, active indicator animation, keyboard cycling |
| 09 | Accordion component | ⬜ | ⬜ | ⬜ | ⬜ | Single vs multi-expand, CSS transition auto-height, ARIA expanded state |
| 10 | Nested comments system | ⬜ | ⬜ | ⬜ | ⬜ | Recursive tree rendering, immutable state update (DFS), replying/editing inline |
| 11 | Infinite scrolling | ⬜ | ⬜ | ⬜ | ⬜ | `IntersectionObserver`, sentinel element, threshold tuning, debounce/throttle fallback |
| 12 | Shopping cart | ⬜ | ⬜ | ⬜ | ⬜ | State management (quantities/discounts/totals), localStorage persistence, optimistic updates |
| 13 | Drag-and-drop Kanban board | ⬜ | ⬜ | ⬜ | ⬜ | HTML5 Drag & Drop API vs pointer events, column reordering, task cards |
| 14 | File upload with progress | ⬜ | ⬜ | ⬜ | ⬜ | `XMLHttpRequest.upload.onprogress` or Fetch streams, drag-and-drop file target, validation |
| 15 | OTP input component | ⬜ | ⬜ | ⬜ | ⬜ | Auto-focus advance/backspace, clipboard paste multi-char, keyboard arrows |
| 16 | Calendar and date picker | ⬜ | ⬜ | ⬜ | ⬜ | Date math (month grids, leap years, UTC), disabled range constraints, dropdown portal |
| 17 | Toast notification system | ⬜ | ⬜ | ⬜ | ⬜ | Event emitter / PubSub / Context bus, auto-dismiss timers, stacking animations |
| 18 | Role-based dashboard navigation | ⬜ | ⬜ | ⬜ | ⬜ | RBAC permission matrix, route guards, dynamic menu filtering by permission |
| 19 | React dashboard with charts | ⬜ | ⬜ | ⬜ | ⬜ | SVG / Canvas data visualization, responsive resizing, KPI metric card summaries |
| 20 | Authentication flow with protected routes | ⬜ | ⬜ | ⬜ | ⬜ | Token storage strategy, auth context, redirect history, expired session handling |

---

## 📂 Repository Directory Layout

```text
machine-coding-round/
├── README.md
├── 01-html-css-js/
│   └── 01-searchable-list-debouncing/
│       ├── index.html
│       ├── style.css
│       ├── app.ts
│       └── app.js (compiled)
├── 02-react-tailwind/
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── hooks/useDebounce.ts
│       ├── tasks/01-searchable-list/SearchableList.tsx
│       └── App.tsx
├── 03-nextjs-tailwind/
│   ├── tsconfig.json
│   └── app/
│       ├── api/search/route.ts
│       ├── 01-searchable-list/page.tsx
│       └── 01-searchable-list/SearchableListContent.tsx
└── 04-nextjs-shadcn/
    ├── tsconfig.json
    ├── components/ui/
    │   ├── badge.tsx
    │   ├── card.tsx
    │   └── input.tsx
    ├── lib/utils.ts
    └── app/
        ├── api/search/route.ts
        ├── 01-searchable-list/page.tsx
        └── 01-searchable-list/SearchableListShadcnContent.tsx
```

---

## 🚀 Running the Projects

### Track 1: Vanilla HTML/CSS/TS
Open [index.html](file:///c:/Users/Signi/Documents/WorkSpace/WebApplications/machine-coding-round/01-html-css-js/01-searchable-list-debouncing/index.html) in your browser.

### Track 2: React + Tailwind CSS
```bash
cd 02-react-tailwind
pnpm dev
```

### Track 3: Next.js + Tailwind CSS
```bash
cd 03-nextjs-tailwind
pnpm dev
```

### Track 4: Next.js + shadcn/ui
```bash
cd 04-nextjs-shadcn
pnpm dev
```
