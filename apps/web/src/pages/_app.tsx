import "../styles/global.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount: number, error: any) => {
              if (error.response && error.response.status === 401) return false;
              if (failureCount === 3) return false;
              return true;
            },
            onError: (err: any) => {
              if (err.response.status === 401) {
                queryClient.setQueriesData(["user"], (data: any) => null);
              }
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="/favicons/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
