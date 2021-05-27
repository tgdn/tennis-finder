import "styles/index.css";

import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetcher from "lib/fetch";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />;
    </SWRConfig>
  );
}

export default MyApp;
