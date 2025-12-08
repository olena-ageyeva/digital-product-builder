'use client';

import { useState } from 'react';

export default function AssistantPage() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'You are a digital product assistant helping users create a launch-ready digital product step by step.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();

    setMessages([...newMessages, data.reply]);
    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Digital Product Assistant</h1>
      <div className="border rounded p-4 h-96 overflow-y-auto bg-white">
        {messages.slice(1).map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={msg.role === 'user' ? 'text-blue-600' : 'text-gray-800'}>
              <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-gray-400 italic">Thinking...</div>}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="border flex-1 p-2 rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </main>
  );
}

