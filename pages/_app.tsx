/*
 *  /pages/_app.tsx
 *  The penultimate parent page, handles assigning layouts to pages and authentication
 */

import type { AppProps } from "next/app";
import { Fragment, useState, useEffect, ReactElement, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";

import { NextPageWithLayout, Page } from "../global";
import supabase from "../lib/supabase";
import "../styles/globals.css";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { NextPage } from "next";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type Props = AppProps & {
  Component: Page;
};
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  //#region Authentication
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");

  useEffect(() => {
    // A listener that fires when a user signs in or out
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);

        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          router.push("/app");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );

    // When we load in, check to see if we have a user (hide sign-in page)
    supabase.auth.user() ? setAuthenticatedState("authenticated") : null;

    // Clean up when we unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function handleAuthChange(
    event: AuthChangeEvent,
    session: Session | null
  ) {
    /* Supabase request that sets and removes the Supabase cookie */
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }
  //#endregion

  //#region Layout
  /* 
    See 
    https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
    https://stackoverflow.com/questions/62115518/persistent-layout-in-next-js-with-typescript-and-hoc
    https://nextjs.org/docs/basic-features/layouts
  */

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider attribute="class">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
  //#endregion
};

export default MyApp;
