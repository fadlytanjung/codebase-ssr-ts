import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
/* eslint-disable import/named */
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../material-ui/theme';
import createEmotionCache from '../material-ui/createEmotionCache';
import { wrapper, store } from '../store';
import { SessionProvider } from 'next-auth/react';
import type { NextComponentType } from 'next';
import '@/styles/global.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }
}

interface MyAppProps extends CustomAppProps {
  emotionCache: EmotionCache;
}

function MyApp(props: MyAppProps) {

  const {
    Component, emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps }
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Codebase SSR with Typescript</title>
        <meta
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
          name="viewport"
        />
        <meta
          content="Standar codebase yang ditentukan untuk Frontend yang menggunakan SSR."
          name="description"
        />

        {/* Favicon */}
        <link href="/favicon.ico" rel="shortcut icon" />

        {/* Meta OG Open Graph; Membagikan konten SEO kepada Facebook */}
        <meta content="Codebase Frontend SSR - TelkomDev" name="og:title" />
        <meta
          content="Standar codebase yang ditentukan untuk Frontend yang menggunakan SSR."
          name="og:description"
        />
        <meta content="Codebase Frontend SSR - TelkomDev" name="og:site_name" />
        <meta content="website" name="og:type" />
        <meta
          content="https://gitlab.playcourt.id/telkomdev/codebase-frontend-ssr"
          name="og:url"
        />

        {/* Meta Twitter; Membagikan konten SEO kepada Twitter */}
        <meta content="summary" name="twitter:card" />
        <meta
          content="Codebase Frontend SSR Typescript- TelkomDev"
          name="twitter:title"
        />
        <meta
          content="https://gitlab.playcourt.id/telkomdev/codebase-frontend-ssr"
          name="twitter:url"
        />
        <meta
          content="Standar codebase yang ditentukan untuk Frontend yang menggunakan SSR."
          name="twitter:description"
        />
      </Head>

      {/* Rendered Component */}
      <Provider store={store}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
