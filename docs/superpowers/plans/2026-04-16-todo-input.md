# Todo List - Step 1: Input Field & Add Button

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a text input and "Add" button to the home page that creates a new todo in Convex when submitted.

**Architecture:** The home page (`src/routes/index.tsx`) will hold local React state for the input value. On submit (button click or Enter key), it calls the Convex `add` mutation, then clears the input. No new files needed — this is a self-contained change to one route file.

**Tech Stack:** React 19, Convex (`useMutation` from `convex/react`), Tailwind CSS v4, TanStack Start

---

### Task 1: Add input state and mutation hook to the home page

**Files:**
- Modify: `src/routes/index.tsx`

**What's happening:** We use two Convex primitives here:
- `useMutation(api.todos.add)` — returns a function we can call to insert a todo into the DB. Convex handles optimistic updates and real-time sync automatically.
- `useState` — local React state to track what the user has typed.

- [ ] **Step 1: Replace `src/routes/index.tsx` with this**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [text, setText] = useState('')
  const addTodo = useMutation(api.todos.add)

  async function handleAdd() {
    const trimmed = text.trim()
    if (!trimmed) return
    await addTodo({ text: trimmed })
    setText('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <div className="flex gap-2 max-w-lg">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800"
        />
        <button
          onClick={handleAdd}
          className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          disabled={!text.trim()}
        >
          Add
        </button>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Start the dev servers (two terminals)**

Terminal 1:
```bash
npx convex dev
```

Terminal 2:
```bash
npm run dev
```

- [ ] **Step 3: Open the app and verify**

Go to `http://localhost:3000`.

You should see:
- A text input with placeholder "What needs to be done?"
- An "Add" button to its right (grayed out when input is empty)
- Typing text enables the button
- Pressing Enter or clicking Add should submit (no visible confirmation yet — that comes in the next step when we add the list)
- The input clears after submission

- [ ] **Step 4: Verify in Convex dashboard**

Go to your Convex dashboard → Data → `todos` table. After adding items, you should see rows appearing with `text` and `completed: false`.

- [ ] **Step 5: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: add todo input field and add button"
```

---

## What's next (future steps)

- **Step 2:** Display the list of todos below the input (using `useQuery(api.todos.list)`)
- **Step 3:** Add toggle (complete/uncomplete) on each todo
- **Step 4:** Add delete button on each todo
