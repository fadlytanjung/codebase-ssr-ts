import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
/* eslint-disable import/named */
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../material-ui/theme';
import createEmotionCache from '../material-ui/createEmotionCache';
import store from '../store';
import React from 'react';
import '@/styles/global.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

function MyApp(props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

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

      {/* Component yang dirender */}
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
