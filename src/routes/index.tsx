import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [text, setText] = useState('')
  const addTodo = useMutation(api.todos.add)
  const todos = useQuery(api.todos.list)

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
      <ul className="mt-4 max-w-lg space-y-1">
        {todos?.map((todo) => (
          <li key={todo._id} className="rounded border border-gray-200 px-3 py-2 text-sm dark:border-gray-700">
            {todo.text}
          </li>
        ))}
      </ul>
    </main>
  )
}
