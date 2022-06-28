import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../styles/globals";
import { defaultTheme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
