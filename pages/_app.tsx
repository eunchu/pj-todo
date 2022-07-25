import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@styles/globals";
import { defaultTheme } from "@styles/theme";
import Header from "@components/Header";

import "../styles/css/avatar.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={defaultTheme}>
        <Header />
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
