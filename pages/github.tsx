/* 
  pages/github.tsx
  ------------------------
  Github based sign-in
 */

import React, { ReactElement } from "react";
import Meta from "../components/landing/Meta";
import LandingLayout from "../layout/LandingLayout";
import supabase from "../lib/supabase";

interface Props {
  beta_list: any;
}

const Github = ({ beta_list }: Props) => {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState("prompt_email");
  /*
    The four states are:
  */

  async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

  return <div></div>;
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

export default Github;
