/* 
  pages/github.tsx
  ------------------------
  Github based sign-in
 */

import { Session } from "@supabase/supabase-js";
import React, { ReactElement, useEffect } from "react";
import Auth from "../components/landing/Auth";
import Meta from "../components/landing/Meta";
import LandingLayout from "../layout/LandingLayout";
import supabase from "../lib/supabase";

interface Props {
  beta_list: any;
  session: Session;
}

const Github = ({ beta_list, session }: Props) => {
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [state, setState] = React.useState("prompt_email");

  useEffect(() => {
    setLoggedIn(!!session);
  }, [session]);
  /*
    The four states are:
  */

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div className="flex items-center justify-center h-screen text-white ">
      {loggedIn ? <button onClick={signout}>Sign out</button> : <Auth />}
    </div>
  );
};

const isEmail = (email: string, obj: { email: string }) => {
  return email === obj.email;
};

// Attach the landing layout (and other nested layouts) to the page
Github.getLayout = (page: ReactElement) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={
        <Meta
          title="Sign in with Github"
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

export default Github;
