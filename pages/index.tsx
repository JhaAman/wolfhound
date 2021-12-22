import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";

import LandingLayout from "../layout/LandingLayout";
import supabase from "../lib/supabase";
import DarkMode from "./_components/landing/DarkMode";
import Meta from "./_components/landing/Meta";

const Home = () => {
  return (
    <div className="bg-gray-900 ">
      {/* <DarkMode /> */}
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-gray-200">Welcome to Rosie</h1>
        <p className="mt-3 text-gray-300">
          Rosie is an oracle that can answer React questions.
        </p>
        <p className="text-gray-300">
          Just like StackOverflow, except Rosie is instant, specific, and
          non-judgemental.
        </p>
        {/* The sign up button */}
        <div className="flex flex-col mt-10">
          <Link href="/welcome">
            <a className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
              Join the Waitlist
            </a>
          </Link>
          <Link href="/signin">
            <a className="mt-2 text-gray-200" href="">
              Sign in
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: { req: any }) {
  const { req } = ctx;

  /* check to see if a user is set */
  const { user } = await supabase.auth.api.getUserByCookie(req);

  // If we have a user logged in, then nav to app
  if (user) {
    return { props: {}, redirect: { destination: "/app" } };
  }

  // If there is no user logged in, then let them see the home page
  return {
    props: {},
  };
}

// Attach the landing layout (and other nested layouts) to the page
Home.getLayout = (page: ReactElement) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={
        <Meta
          title="Rosie"
          description="Welcome to Rosie - code React apps 10x faster"
        />
      }
      headerActive={false}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};

export default Home;
