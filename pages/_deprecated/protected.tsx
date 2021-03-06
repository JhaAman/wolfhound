/* 
  pages/protected.tsx
  ------------------------
  A temporary page that shows how to do server-side auth protection
 */

import supabase from "../../lib/supabase";
import { User } from "@supabase/supabase-js";

import React, { ReactElement } from "react";
import LandingLayout from "../../layout/LandingLayout";
import Meta from "../../components/landing/Meta";

const Protected = (props: { user: User }) => {
  const { user } = props;

  console.log({ user });

  return (
    <div style={{ maxWidth: "420px", margin: "96px auto" }}>
      <h2>Hello from protected route</h2>
    </div>
  );
};

export async function getServerSideProps(ctx: { req: any }) {
  const { req } = ctx;

  /* check to see if a user is set */
  const { user } = await supabase.auth.api.getUserByCookie(req);

  /* if no user is set, redirect to the sign-in page */
  if (!user) {
    return { props: {}, redirect: { destination: "/signin" } };
  }

  /* if a user is set, pass it to the page via props */
  return { props: { user } };
}

// Attach the landing layout (and other nested layouts) to the page
Protected.getLayout = (page: ReactElement) => {
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

export default Protected;
