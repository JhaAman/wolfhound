import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";

import LandingLayout from "../layout/LandingLayout";
import DarkMode from "./_components/landing/DarkMode";
import Meta from "./_components/landing/Meta";

const Home = () => {
  return (
    <div className="bg-gray-900 ">
      {/* <DarkMode /> */}
      {/* A auth component that's centered with a sign up button */}
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-gray-200">Welcome to Rosie</h1>
        <p className="text-gray-200">
          Rosie is an oracle that can answer React questions.
        </p>
        <p className="text-gray-200">
          Just like StackOverflow, except Rosie is instant, specific, and
          non-judgemental.
        </p>
        {/* The sign up button */}
        <div className="flex flex-col mt-10">
          <Link href="/signin">
            <a className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
              Join the Waitlist
            </a>
          </Link>
          <Link href="/signin">
            <a className="mt-2" href="">
              <span className="text-gray-200">Sign in</span>
            </a>
          </Link>
        </div>
      </div>

      {/* The Auth testing */}
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
Home.getLayout = (page: ReactElement) => {
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

export default Home;
