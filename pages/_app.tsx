/*
 *  /pages/_app.tsx
 *  The penultimate parent page, handles assigning layouts to pages and authentication
 */

import type { AppProps } from "next/app";
import { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";

import { Page } from "../global";
import supabase from "../lib/supabase";
import "../styles/globals.css";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

type Props = AppProps & {
  Component: Page;
};
const MyApp = ({ Component, pageProps }: Props) => {
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

  /* 
    Manage layouts for pages
    
    See 
    https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
    https://stackoverflow.com/questions/62115518/persistent-layout-in-next-js-with-typescript-and-hoc
    https://nextjs.org/docs/basic-features/layouts
  */

  const getLayout = Component.getLayout ?? ((page) => page); // adjust these two if I disable a layout rendering option
  const Layout = Component.layout ?? Fragment;
  // or swap the layout rendering priority
  // return getLayout(<Layout><Component {...pageProps} /></Layout>)

  return (
    <ThemeProvider attribute="class">
      {/* Header */}
      <div className="text-black dark:text-white">
        <nav className="m-5">
          <Link href="/">
            <a className="m-2.5">Home</a>
          </Link>
          <Link href="/profile">
            <a className="m-2.5">Profile</a>
          </Link>
          {authenticatedState === "not-authenticated" && (
            <Link href="/signin">
              <a className="m-2.5">Sign In</a>
            </Link>
          )}
          <Link href="/protected">
            <a className="m-2.5">Protected</a>
          </Link>
        </nav>
      </div>

      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </ThemeProvider>
  );
};

export default MyApp;
