import { useState } from 'react';
import API from '../api/axios'; // Ensure path theek hai

export default function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ❌ Yahan se 'export' hata diya hai. Ye sirf 'const' se shuru hoga.
  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await API.post('/ai/rag-assistant', { 
        query: prompt 
      });

      setResponse(res.data?.response || JSON.stringify(res.data));
    } catch (err) {
      console.error('AI Error:', err);
      setError(err.response?.data?.message || 'AI request fail ho gayi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4 bg-slate-800 rounded-xl text-white my-6">
      <h2 className="text-lg font-bold text-indigo-400">AI Assistant</h2>
      
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          placeholder="Apna question yahan likhein..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-medium transition"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {error && <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}

      {response && (
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700/80 text-xs text-slate-200">
          <p className="font-semibold text-indigo-300 mb-1">Response:</p>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}