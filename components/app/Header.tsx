/* 
  pages/_components/app/Header.tsx
  ------------------------
  A header component used by the core webapp. Currently only used to sign out
 */

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import supabase from "../../lib/supabase";

export default function Header(): ReactElement {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    console.log("Redirecting from app header to signin");
    router.push("/signin");
  }

  return (
    <header>
      {/* Header */}
      {/* <p>Welcome, {user.email}</p> */}
      <button onClick={signOut} className="mt-5 ml-5 text-gray-400">
        Sign Out
      </button>
    </header>
  );
}

// TODO: components don't get serverside props, but they may be able to get
// TODO: initial props, according to Rosie, anyway. So see if I can display user info that way

export async function getServerSideProps(props: { req: any }) {
  const { req } = props;

  /* check to see if a user is set */
  const { user } = await supabase.auth.api.getUserByCookie(req);

  /* if no user is set, redirect to the sign-in page */
  if (!user) {
    return { props: {}, redirect: { destination: "/signin" } };
  } else {
    /* if a user is set, pass it to the page via props */
    return { props: { user } };
  }
}
