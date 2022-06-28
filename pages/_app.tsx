import { Fragment } from "react";
import type { AppProps } from "next/app";
// import { RecoilRoot } from 'recoil';

import GlobalStyle from "../styles/globals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <GlobalStyle />
    </Fragment>
  );
}

export default MyApp;
