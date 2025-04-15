'use client';

import Link from "next/link";

const adultKeywords = ["xxx", "porn", "tube", "sex", "nude", "explicit", "fetish"];

export default function KeywordListPage() {
  return (
    <main className="min-h-screen bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-500">
        🔞 Adult Keyword List
      </h1>
      <p className="text-gray-700 mb-2">
        These are the keywords currently used to flag potentially explicit URLs:
      </p>
      <ul className="list-disc list-inside text-red-600 text-lg mb-6">
        {adultKeywords.map((word, i) => (
          <li key={i}>{word}</li>
        ))}
      </ul>

      <Link
        href="/"
        className="text-blue-500 hover:underline"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
