// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import Head from "next/head";
import React from "react";
import Header from "@components/Header";
import Meta from "@components/Meta";
import "owl.carousel/dist/assets/owl.carousel.css";
import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css/style.css";
import dynamic from "next/dynamic";
dynamic(() => import("owl.carousel"), { ssr: false });

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <title>Votre création de sites web - Création site web - Application mobile</title>
        <Meta />

        <link rel="icon" href="assets/img/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="assets/css/templatemo-space-dynamic.css" />

        <script src="assets/js/bootquery.min.js"></script>
        <script src="assets/js/templatemo-custom.js"></script>
      </Head>
      {router.route !== "/404" && <Header />}

      <Component {...pageProps} />
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
