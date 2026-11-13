"use strict";
/**
 * Task 01: Searchable List with Debouncing (Vanilla TypeScript)
 * Key Interview Concepts:
 * 1. Debounce implementation via Closures and setTimeout
 * 2. Generic typing with cancel interface
 * 3. Case-insensitive substring matching & regex escaping
 * 4. Substring highlighting without innerHTML XSS vulnerabilities
 * 5. Interactive telemetry (keystrokes vs debounced executions)
 */
// Sample dataset of technologies & libraries
const DATASET = [
    { id: 1, name: "JavaScript", category: "Language", tag: "Frontend / Fullstack" },
    { id: 2, name: "TypeScript", category: "Language", tag: "Typed JS" },
    { id: 3, name: "React", category: "Library", tag: "UI Components" },
    { id: 4, name: "Next.js", category: "Framework", tag: "React Fullstack" },
    { id: 5, name: "Vue.js", category: "Framework", tag: "Progressive UI" },
    { id: 6, name: "Nuxt", category: "Framework", tag: "Vue Fullstack" },
    { id: 7, name: "Angular", category: "Framework", tag: "Enterprise SPA" },
    { id: 8, name: "Svelte", category: "Framework", tag: "Compile-time UI" },
    { id: 9, name: "Tailwind CSS", category: "CSS", tag: "Utility First" },
    { id: 10, name: "Node.js", category: "Runtime", tag: "Server JS" },
    { id: 11, name: "PostgreSQL", category: "Database", tag: "Relational SQL" },
    { id: 12, name: "GraphQL", category: "API", tag: "Query Language" },
    { id: 13, name: "Redux Toolkit", category: "State Management", tag: "Predictable State" },
    { id: 14, name: "Zustand", category: "State Management", tag: "Minimal State" },
    { id: 15, name: "Vite", category: "Build Tool", tag: "Fast Bundler" },
    { id: 16, name: "Docker", category: "DevOps", tag: "Containers" },
    { id: 17, name: "Rust", category: "Language", tag: "Systems / WASM" },
    { id: 18, name: "Python", category: "Language", tag: "Backend / AI" }
];
// DOM Element references with strict typing
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const delayRange = document.getElementById("delayRange");
const delayValue = document.getElementById("delayValue");
const keystrokeCountEl = document.getElementById("keystrokeCount");
const searchCountEl = document.getElementById("searchCount");
const resultCountEl = document.getElementById("resultCount");
const searchStatusEl = document.getElementById("searchStatus");
const itemsList = document.getElementById("itemsList");
const emptyState = document.getElementById("emptyState");
const emptyQuery = document.getElementById("emptyQuery");
let keystrokeCount = 0;
let searchCount = 0;
let currentDelay = 350;
/**
 * Type-safe debounce utility function with cancel support
 */
function debounce(func, wait) {
    let timeoutId = null;
    const debounced = function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
            timeoutId = null;
        }, wait);
    };
    debounced.cancel = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };
    return debounced;
}
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function createHighlightedFragment(text, query) {
    const fragment = document.createDocumentFragment();
    if (!query) {
        fragment.appendChild(document.createTextNode(text));
        return fragment;
    }
    const escaped = escapeRegExp(query);
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(regex);
    parts.forEach((part) => {
        if (part.toLowerCase() === query.toLowerCase()) {
            const mark = document.createElement("mark");
            mark.className = "highlight";
            mark.textContent = part;
            fragment.appendChild(mark);
        }
        else if (part.length > 0) {
            fragment.appendChild(document.createTextNode(part));
        }
    });
    return fragment;
}
function renderList(items, query = "") {
    itemsList.innerHTML = "";
    resultCountEl.textContent = String(items.length);
    if (items.length === 0) {
        emptyState.hidden = false;
        emptyQuery.textContent = query;
        return;
    }
    emptyState.hidden = true;
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-item";
        const info = document.createElement("div");
        info.className = "item-info";
        const name = document.createElement("div");
        name.className = "item-name";
        name.appendChild(createHighlightedFragment(item.name, query));
        const category = document.createElement("div");
        category.className = "item-category";
        category.textContent = item.category;
        info.appendChild(name);
        info.appendChild(category);
        const tag = document.createElement("span");
        tag.className = "item-tag";
        tag.textContent = item.tag;
        li.appendChild(info);
        li.appendChild(tag);
        fragment.appendChild(li);
    });
    itemsList.appendChild(fragment);
}
function performSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    searchCount++;
    searchCountEl.textContent = String(searchCount);
    searchStatusEl.textContent = "Searched";
    searchStatusEl.className = "status-indicator searched";
    const filtered = DATASET.filter((item) => {
        return (item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            item.tag.toLowerCase().includes(query));
    });
    renderList(filtered, query);
}
let debouncedSearch = debounce(performSearch, currentDelay);
searchInput.addEventListener("input", (e) => {
    const target = e.target;
    const query = target.value;
    keystrokeCount++;
    keystrokeCountEl.textContent = String(keystrokeCount);
    clearBtn.hidden = query.length === 0;
    searchStatusEl.textContent = "Typing...";
    searchStatusEl.className = "status-indicator typing";
    debouncedSearch(query);
});
clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.hidden = true;
    debouncedSearch.cancel();
    performSearch("");
    searchInput.focus();
});
delayRange.addEventListener("input", (e) => {
    const target = e.target;
    currentDelay = Number(target.value);
    delayValue.textContent = `${currentDelay}ms`;
    debouncedSearch.cancel();
    debouncedSearch = debounce(performSearch, currentDelay);
});
// Initial Render
renderList(DATASET, "");
