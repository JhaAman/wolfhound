/* pages/sign-in.js */
import { ReactElement, useState } from "react";
import { Page } from "../global";
import LandingLayout from "../layout/LandingLayout";

import supabase from "../lib/supabase";
import Meta from "./_components/landing/Meta";

const SignIn = () => {
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
      <div>
        <h1>Please check your email to sign in</h1>
      </div>
    );
  }

  return (
    <div>
      <main>
        <h1>Sign In</h1>
        <input className="m-3" onChange={(e) => setEmail(e.target.value)} />
        <button onClick={() => signIn()}>Sign In</button>
      </main>
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
SignIn.getLayout = (page: ReactElement) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={<Meta title="Title" description="Description" />}
      headerActive={true}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};

export default SignIn;
