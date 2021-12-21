import type { AppProps } from "next/app";
import { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";

import { Page } from "../global";
import supabase from "../lib/supabase";
import "../styles/globals.css";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

// TODO: add supabase auth and theme provider

type Props = AppProps & {
  Component: Page;
};
const MyApp = ({ Component, pageProps }: Props) => {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");

  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          router.push("/profile");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );

    checkUser();

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    const user = supabase.auth.user();
    if (user) {
      setAuthenticatedState("authenticated");
    }
  }

  async function handleAuthChange(
    event: AuthChangeEvent,
    session: Session | null
  ) {
    /* sets and removes the Supabase cookie */
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

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
      <div>
        <nav style={navStyle}>
          <Link href="/">
            <a style={linkStyle}>Home</a>
          </Link>
          <Link href="/profile">
            <a style={linkStyle}>Profile</a>
          </Link>
          {authenticatedState === "not-authenticated" && (
            <Link href="/signin">
              <a style={linkStyle}>Sign In</a>
            </Link>
          )}
          <Link href="/protected">
            <a style={linkStyle}>Protected</a>
          </Link>
        </nav>
        <Component {...pageProps} />
      </div>

      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </ThemeProvider>
  );

  // or swap the layout rendering priority
  // return getLayout(<Layout><Component {...pageProps} /></Layout>)
};

const navStyle = {
  margin: 20,
};
const linkStyle = {
  marginRight: 10,
};

export default MyApp;
