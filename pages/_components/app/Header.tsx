import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import supabase from "../../../lib/supabase";

interface Props {
  user: User;
}

export default function Header({ user }: Props): ReactElement {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/signin");
  }

  return (
    <header>
      {/* Header */}
      <button onClick={signOut} className="text-gray-400">
        Sign Out
      </button>
    </header>
  );
}

export async function getServerSideProps(props: { req: any }) {
  const { req } = props;

  /* check to see if a user is set */
  const { user } = await supabase.auth.api.getUserByCookie(req);

  /* if no user is set, redirect to the sign-in page */
  if (!user) {
    return { props: {}, redirect: { destination: "/signin" } };
  }

  /* if a user is set, pass it to the page via props */
  return { props: { user } };
}
