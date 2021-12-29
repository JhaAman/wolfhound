/* 
  pages/index.tsx
  ------------------------
  The main landing page - rosieos.com
 */

import Link from "next/link";
import Image from 'next/image';
import Router from 'next/router';
import { ReactElement, useEffect, useState } from "react";
import useEventListener from '../hooks/useEventListener';
import logo from '../public/static/favicon_io/android-chrome-192x192.png';


import LandingLayout from "../layout/LandingLayout";
import supabase from "../lib/supabase";
import DarkMode from "./_components/landing/DarkMode";
import Meta from "./_components/landing/Meta";
import Demo from './demo'


function Home() {

  const [popup, setPopup] = useState(false)

  const handler = ({ key }) => {
    let pressedKey = String(key)
    if ('Enter' === pressedKey) {
      // Router.push('/demo')
      setPopup(true)
    }
    if ('S' === pressedKey.toUpperCase()) {
      Router.push('/welcome')
    }
  };

  if (typeof window !== "undefined") {
    useEventListener("keydown", handler);
  }

  return (
    <div className='container'>
      <main className='main'>
        <div style={{ borderRadius: '20%', overflow: 'hidden', maxWidth: '150px', maxHeight: '150px', margin: '2rem' }}>
          <Image
            src={logo}
            alt='rosie logo'
            layout="intrinsic"
            priority
          />
        </div>
        <h1 className="text-3xl text-white font-bold text-center">Welcome to <span className="text-3xl font-bold text-rose-500">Rosie</span></h1>
        <p className="mt-3 text-gray-300 max-w-prose text-center">
          Rosie is an oracle that can answer React questions.
        </p>
        <p className="text-gray-300 max-w-prose text-center">
          Just like StackOverflow, except Rosie is instant, specific, and
          non-judgemental.
        </p>
        <div className='shine flex flex-col'>
          <button className="shine-btn">Press Enter to see a demo</button>
          <button className="shine-btn">Press S to sign up</button>
        </div>
        <Demo trigger={popup} setPopup={setPopup}></Demo>
      </main>
    </div>
  )
}

// If the user is already logged in, we should send them to the app straightaway
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
