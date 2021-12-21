/* pages/sign-in.js */
import { useState } from "react";

import supabase from "../lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function signIn() {
    const { user, error } = await supabase.auth.signIn({
      email,
    });
    if (error) {
      console.log("supabase magic link sending error", { error });
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-black dark:text-white">
        <h1>Please check your email to sign in</h1>
      </div>
    );
  }

  return (
    <div className="text-black dark:text-white">
      <main className="">
        <h1 className="">Sign In</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
        <button onClick={() => signIn()}>Sign In</button>
      </main>
    </div>
  );
}
