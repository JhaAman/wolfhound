import type { AppProps } from "next/app";
import { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";

import { Page } from "../global";
import supabase from "../lib/supabase";
import "../styles/globals.css";

// TODO: add supabase auth and theme provider

type Props = AppProps & {
  Component: Page;
};
const MyApp = ({ Component, pageProps }: Props) => {
  /* See 
    https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
    https://stackoverflow.com/questions/62115518/persistent-layout-in-next-js-with-typescript-and-hoc
    https://nextjs.org/docs/basic-features/layouts
  */

  // adjust accordingly if you disabled a layout rendering option
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <ThemeProvider attribute="class">
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </ThemeProvider>
  );

  // or swap the layout rendering priority
  // return getLayout(<Layout><Component {...pageProps} /></Layout>)
};

export default MyApp;
