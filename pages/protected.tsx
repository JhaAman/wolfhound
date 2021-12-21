import supabase from "../lib/supabase";
import { User } from "@supabase/supabase-js";

import React, { ReactElement } from "react";

interface Props {
  user: User;
}

export default function Protected({ user }: Props) {
  console.log({ user });

  return (
    <div style={{ maxWidth: "420px", margin: "96px auto" }}>
      <h2>Hello from protected route</h2>
    </div>
  );
}

interface SSRProps {
  req: any;
}
export async function getServerSideProps({ req }: SSRProps) {
  /* check to see if a user is set */
  const { user } = await supabase.auth.api.getUserByCookie(req);

  /* if no user is set, redirect to the sign-in page */
  if (!user) {
    return { props: {}, redirect: { destination: "/signin" } };
  }

  /* if a user is set, pass it to the page via props */
  return { props: { user } };
}
