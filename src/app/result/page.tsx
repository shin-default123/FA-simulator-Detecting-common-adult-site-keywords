import { Suspense } from 'react';
import ResultClient from './ResultClient';

export default function ResultPageWrapper() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <ResultClient />
    </Suspense>
  );
}
