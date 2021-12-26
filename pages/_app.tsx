/* 
  pages/_app.tsx
  ------------------------
  A wrapped page that attaches layouts to every page in this repo, landing and app
  Also handles authentication cross-app, and initializes mixpanel tracking.
 */

import type { AppProps } from "next/app";
import { useState, useEffect, ReactElement, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import supabase from "../lib/supabase";
import "../styles/globals.css";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { NextPage } from "next";
import mixpanel from "mixpanel-browser";
import { mixpanelInit } from "../lib/mixpanel";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  mixpanelInit();
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

          // Mixpanel tracking
          mixpanel.identify(session?.user?.id);
          mixpanel.people.set({
            $email: session?.user?.email,
          });
          mixpanel.track("Sign In", {
            email: session?.user?.email,
            user: session?.user,
          });

          console.log("_app directing to app");
          router.push("/app");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
          console.log("_app directing to signin");
          router.push("/signin");
        }
      }
    );

    // When we load in, check to see if we have a user (hide sign-in page)
    supabase.auth.user() ? setAuthenticatedState("authenticated") : null;

    // Clean up when we unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, [router]);

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
