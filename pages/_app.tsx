import React, { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';

import { LangProvider } from '@contexts/LangProvider';
import { TextProvider } from '@contexts/TextProvider';
import { ThemeProvider } from '@contexts/ThemeProvider';

export default function MyApp(props: AppProps) {
   const { Component, pageProps } = props;

   useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side');
      jssStyles?.parentElement?.removeChild(jssStyles);
   }, []);

   return (
      <React.Fragment>
         <Head>
            <title>Novelly</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
         </Head>
         <LangProvider>
            <TextProvider>
               <ThemeProvider>
                  <CssBaseline />
                  <Component {...pageProps} />
               </ThemeProvider>
            </TextProvider>
         </LangProvider>
      </React.Fragment>
   );
}
