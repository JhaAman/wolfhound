/* pages/sign-in.js */
import mixpanel from "mixpanel-browser";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import LandingLayout from "../layout/LandingLayout";

import supabase from "../lib/supabase";
import Meta from "./_components/landing/Meta";

const redirect_url = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

const SignIn = (props: { beta_list: any }) => {
  const { beta_list } = props;

  const isEmail = (email: string, obj: { Email: string }) => {
    return email === obj.Email;
  };

  const [email, setEmail] = useState("");
  const [state, setState] = useState("no_submit");
  const [jsx, setJsx] = useState<JSX.Element | null>(null);
  // const [submitted, setSubmitted] = useState(false);

  async function signIn() {
    // Check if email is on the beta list using isEmail
    const isOnBetaList = beta_list.some((obj: { Email: string }) =>
      isEmail(email, obj)
    );
    if (isOnBetaList) {
      // If email is on the beta list, send a magic link
      const { error } = await supabase.auth.signIn({
        email,
      });

      if (error) {
        console.log("Supabase magic link sending error", error);

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
    }
  }

  useEffect(() => {
    switch (state) {
      case "no_submit":
        setJsx(
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
        );
        break;
      case "sent":
        setJsx(
          <p className="m-3 text-gray-200">
            We sent you an email with a link to sign in. Please check your email
            to sign in.
          </p>
        );
        break;
      case "no_beta":
        setJsx(
          <p className="m-3 text-gray-200">
            Sorry, we do not have that email on the beta list.
          </p>
        );
        break;
      default:
        setJsx(null);
    }
  }, [state]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-3xl font-bold text-gray-200">Sign into Rosie</h2>
        {jsx}
        {/* {submitted ? (
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
        )} */}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: { req: any }) {
  const { req } = ctx;

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
