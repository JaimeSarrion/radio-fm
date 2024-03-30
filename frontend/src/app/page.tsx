'use client';
import RadioPlayer from '@/components/RadioPlayer';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Home() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RadioPlayer />
      </QueryClientProvider>
    </>
  );
}
