/* pages/sign-in.js */
import mixpanel from "mixpanel-browser";
import Link from "next/link";
import { ReactElement, useState } from "react";
import LandingLayout from "../layout/LandingLayout";

import supabase from "../lib/supabase";
import Meta from "./_components/landing/Meta";

const redirect_url = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function signIn() {
    const { user, error } = await supabase.auth.signIn(
      {
        email,
      },
      { redirectTo: redirect_url }
    );
    if (error) {
      console.log("Supabase magic link sending error", error);

      mixpanel.track("Magic Link Error", {
        email: email,
        error: error,
      });
    } else {
      console.log("Sent a magic link to " + email);
      setSubmitted(true);

      mixpanel.track("Sent Magic Link", {
        email: email,
      });
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-3xl font-bold text-gray-200">Sign into Rosie</h2>
        {submitted ? (
          <p className="m-3 text-gray-200">
            We sent you an email with a link to sign in. Please check your email
            to sign in.
          </p>
        ) : (
          <form
            className="flex flex-col m-5"
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <input
              className=""
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required={true}
            />
            <button
              className="px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              // onClick={}
              type="submit"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
      {/* <main>
        <h1>Sign In</h1>
        <input className="m-3" onChange={(e) => setEmail(e.target.value)} />
        <button onClick={() => signIn()}>Sign In</button>
      </main> */}
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
SignIn.getLayout = (page: ReactElement) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={<Meta title="Title" description="Description" />}
      headerActive={false}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};

export default SignIn;
