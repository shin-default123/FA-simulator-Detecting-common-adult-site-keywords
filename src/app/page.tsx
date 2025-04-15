'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LandingPage() {
  const [urlInput, setUrlInput] = useState('');
  const router = useRouter();

  const handleCheck = () => {
    if (!urlInput.trim()) return;
    const encodedUrl = encodeURIComponent(urlInput.trim());
    router.push(`/result?url=${encodedUrl}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-4xl font-bold text-red-500 mb-6">🔞 Website Filter</div>

      <div className="flex w-full max-w-xl items-center border border-gray-300 rounded-full shadow px-4 py-2">
      <input
          type="text"
          placeholder="Enter URL here..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCheck();
          }}
          className="flex-1 px-4 py-2 text-lg text-black outline-none"
        />
        <button
          onClick={handleCheck}
          className="bg-blue-500 text-white px-5 py-2 rounded-full text-lg hover:bg-blue-600 transition"
        >
          Check
        </button>
      </div>
    </main>
  );
}
