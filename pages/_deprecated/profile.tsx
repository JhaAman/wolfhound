/* 
  pages/profile.tsx
  ------------------------
  A temporary page that shows how to do client-side auth protection
 */

import { useState, useEffect, ReactElement } from "react";
import supabase from "../../lib/supabase";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";
import LandingLayout from "../../layout/LandingLayout";
import Meta from "../../components/landing/Meta";

const Profile = () => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  });

  async function fetchProfile() {
    const user = supabase.auth.user();
    if (!user) {
      router.push("/signin");
    } else {
      setUser(user);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/signin");
  }

  if (!user) return null;

  return (
    <div className="max-w-xl m-auto text-black dark:text-white">
      <h2>Hello, {user.email}</h2>
      <p>User ID: {user.id}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
Profile.getLayout = (page: ReactElement) => {
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

export default Profile;
