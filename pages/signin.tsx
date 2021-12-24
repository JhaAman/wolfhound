/* 
  pages/signin.tsx
  ------------------------
  The page where people sign-in, and where they go when they sign-out
 */

import mixpanel from "mixpanel-browser";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import LandingLayout from "../layout/LandingLayout";

import supabase from "../lib/supabase";
import Meta from "./_components/landing/Meta";

const redirect_url = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

const SignIn = (props: { beta_list: any }) => {
  const { beta_list } = props;

  const isEmail = (email: string, obj: { email: string }) => {
    return email === obj.email;
  };

  const [email, setEmail] = useState("");
  const [state, setState] = useState("no_submit");
  /*
    The four states are:
    no_submit    (default)
    loading      (user submitted email, but supabase hasn't send a link)
    error        (supabase couldn't send a link)
    sent         (supabase sent a link)
    no_beta      (user submitted email, but they're not in the beta list)
  */

  async function signIn() {
    // Check if email is on the beta list using isEmail
    const isOnBetaList = beta_list.some((obj: { email: string }) =>
      isEmail(email, obj)
    );

    if (isOnBetaList) {
      setState("loading");

      // If email is on the beta list, send a magic link
      const { error } = await supabase.auth.signIn({
        email,
      });

      if (error) {
        console.log("Supabase magic link sending error", error);
        setState("error");

        mixpanel.track("Magic Link Error", {
          email: email,
          error: error,
        });
      } else {
        console.log("Sent a magic link to " + email);
        setState("sent");
        // setSubmitted(true);

        mixpanel.track("Sent Magic Link", {
          email: email,
        });
      }
    } else {
      setState("no_beta");
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-3xl font-bold text-gray-200">Sign into Rosie</h2>
        {state === "no_submit" && (
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
        {state === "sent" && (
          <p className="m-3 text-gray-200">
            Successfully sent you a magic link! Please check your email to sign
            in.
          </p>
        )}
        {state === "no_beta" && (
          <>
            <p className="m-3 text-gray-200">
              {`Hmm, you're not on the beta list yet. Please `}
              <Link href="/welcome">
                <a className="text-red-400">sign up</a>
              </Link>
              {`, and we'll get you on the list ASAP. Thanks!`}
              <br /> Or, try signing in with a different email.
            </p>
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
          </>
        )}
        {state === "loading" && (
          <p className="m-3 text-gray-200">Sending you a magic link...</p>
        )}
        {state === "error" && (
          <p className="m-3 text-gray-200">
            We had some trouble sending you an email. Please email us at
            aman@rosieos.com
          </p>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: { req: any }) {
  const { req } = ctx;

  // Check if user is logged in
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // If we have a user logged in, then nav to app
  if (user) {
    return { props: {}, redirect: { destination: "/app" } };
  }

  // If we don't have a user logged in, then continue sign in process
  const { data, error } = await supabase.from("Beta List").select();

  /* if a user is set, pass it to the page via props */
  return { props: { beta_list: data } };
}

// Attach the landing layout (and other nested layouts) to the page
SignIn.getLayout = (page: ReactElement) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={
        <Meta
          title="Sign into Rosie"
          description="Ready to code 10x faster? Get in there!"
        />
      }
      headerActive={false}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};

export default SignIn;
