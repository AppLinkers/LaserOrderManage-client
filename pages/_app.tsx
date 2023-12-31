import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import Layout from "@/src/components/shared/layout";
import { globalStyles } from "@/src/styles/globalStyles";
import { Roboto } from "next/font/google";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilEnv, RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import AuthInitializer from "@/src/components/shared/auth/AuthInitializer.index";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  queryClient.setDefaultOptions({
    queries: { retry: false },
    mutations: { retry: false },
  });

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Global styles={globalStyles} />
            <AuthInitializer>
              <Layout className={roboto.className}>
                <Component {...pageProps} />
              </Layout>
            </AuthInitializer>
          </HydrationBoundary>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
