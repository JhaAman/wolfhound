import React, { ReactElement } from "react";
import supabase from "../../lib/supabase";

interface Props {}

export default function Auth({}: Props): ReactElement {
  async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
  }

  return (
    <button
      className="p-3 text-white bg-red-500 rounded"
      onClick={signInWithGithub}
    >
      Sign in with Github
    </button>
  );
}
