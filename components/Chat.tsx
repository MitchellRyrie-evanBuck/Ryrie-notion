'use client'

import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="flex flex-col py-24 mx-auto w-full max-w-md stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? '用户: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-0 p-2 mb-8 w-full max-w-md rounded-lg border border-gray-300">
        <input
          className="p-2 mb-8 w-full rounded border border-gray-300"
          value={input}
          placeholder="说点什么..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
