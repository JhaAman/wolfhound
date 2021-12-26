/* 
  pages/index.tsx
  ------------------------
  SSG, will use client-side auth to redirect
  ------------------------
  The main landing page - rosieos.com
 */

import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";
import LandingLayout from "@/layout/LandingLayout";
import Meta from "@/components/landing/Meta";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";

interface Props {}

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  });

  async function fetchProfile() {
    const user = supabase.auth.user();
    if (user) {
      console.log("Redirecting from / to app");
      router.push("/app");
    }
  }

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

// Attach the landing layout (and other nested layouts) to the page
Index.getLayout = (page: ReactElement) => {
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

export default Index;
