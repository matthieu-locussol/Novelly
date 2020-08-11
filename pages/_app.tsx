import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@contexts/ThemeProvider';

import '@styles/main.scss';

export default function MyApp(props: AppProps) {
   const { Component, pageProps } = props;

   return (
      <React.Fragment>
         <Head>
            <title>Novelly</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link rel="icon" type="image/png" href="/logo.png" />
         </Head>
         <ThemeProvider>
            <CssBaseline />
            <Component {...pageProps} />
         </ThemeProvider>
      </React.Fragment>
   );
}
