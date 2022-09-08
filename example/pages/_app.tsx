import { QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { queryClient } from '../src/queryClient';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
