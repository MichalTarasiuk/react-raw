import {RawProvider} from '@react-raw/core';

import type {AppProps} from 'next/app';

export default function App({Component, pageProps}: AppProps) {
  return (
    <RawProvider>
      <Component {...pageProps} />
    </RawProvider>
  );
}
