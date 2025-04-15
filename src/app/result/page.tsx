'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Link from "next/link";

const adultKeywords = ["xxx", "porn", "tube", "sex", "nude", "explicit", "fetish"];

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const canvasRef = useRef(null);

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [matchedKeyword, setMatchedKeyword] = useState('');
  const [detected, setDetected] = useState(false);

  const url = searchParams.get('url')?.toLowerCase() || '';

  useEffect(() => {
    if (!url) return;
    setInput(url);
    setResult('');
    setMatchedKeyword('');
    setDetected(false);
  
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
for (let keyword of adultKeywords) {
      if (url.includes(keyword)) {
       setResult("🔞 Accepted: Adult keyword detected.");
        setMatchedKeyword(keyword);
        setDetected(true);
        setTimeout(() => drawDFA(keyword), 100);
        return;
      }
    }

    const regex = new RegExp(adultKeywords.join("|"), "i");
const match = url.match(regex);

{/*
if (match) {
  const keyword = match[0];
  setResult("🔞 Accepted: Adult keyword detected.");
  setMatchedKeyword(keyword);
  setDetected(true);
  setTimeout(() => drawDFA(keyword), 100);
  return;
}
  */}

    setResult("✅ Rejected: No adult keyword.");
  }, [url]);

  const drawDFA = (word: string) => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radius = 25;
    const startX = 50;
    const gap = 70;
    const states = word.length + 1;

    for (let i = 0; i < states; i++) {
      const x = startX + i * gap;
      const y = canvas.height / 2;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      if (i === states - 1) {
        ctx.beginPath();
        ctx.arc(x, y, radius - 5, 0, 2 * Math.PI);
        ctx.stroke();
      }

      ctx.fillText(`q${i}`, x - 8, y + 5);

      if (i < states - 1) {
        const nextX = startX + (i + 1) * gap;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(nextX - radius, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(nextX - radius, y);
        ctx.lineTo(nextX - radius - 6, y - 6);
        ctx.lineTo(nextX - radius - 6, y + 6);
        ctx.closePath();
        ctx.fill();

        ctx.fillText(`"${word[i]}"`, x + gap / 2 - 8, y - 10);
      }
    }

    ctx.beginPath();
    ctx.moveTo(startX - 30, canvas.height / 2);
    ctx.lineTo(startX - radius, canvas.height / 2);
    ctx.stroke();
    ctx.fillText("Start", startX - 60, canvas.height / 2 - 10);
  };

  const handleSearch = () => {
    if (!input.trim()) return;
    const encodedUrl = encodeURIComponent(input.trim());
    router.push(`/result?url=${encodedUrl}`);
  };

  return (
    <main className="min-h-screen bg-white text-black px-6 pt-6">
      {/* Top bar: Logo + Search Bar */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-red-500">
            <Link href="/" >🔞 Website Filter</Link>
        </h1>
        <div className="flex w-full max-w-xl items-center border border-gray-300 rounded-full shadow px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            placeholder="Enter URL here..."
            className="flex-1 px-4 py-2 text-lg outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Check
          </button>
        </div>
        <div>
        <Link
            href="/keywords"
            className="text-sm text-blue-600 hover:underline ml-4"
            >
            View keyword list
        </Link>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />

      {/* Result Section */}
      <div className="mt-12 flex flex-col items-center px-4">
        <p className={`text-xl font-semibold ${detected ? 'text-red-600' : 'text-green-600'}`}>
          {result}
        </p>

        {detected && (
          <div className="mt-6 w-full max-w-3xl text-center">
            <p className="text-md text-gray-800 mb-2">
              Matched keyword: <span className="text-red-600 font-bold">"{matchedKeyword}"</span>
            </p>
            <canvas ref={canvasRef} width={600} height={150} className="border border-gray-300 mx-auto" />
          </div>
        )}
      </div>
    </main>
  );
}
