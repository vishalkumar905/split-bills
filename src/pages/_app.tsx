import type { AppProps } from 'next/app'
import Layout from '@/app/components/layout';
import { AppProviders } from '@/context/AppProviders';

import "@/app/globals.css";
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <AppProviders>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AppProviders>
}