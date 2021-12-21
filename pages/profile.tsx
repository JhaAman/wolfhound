/* pages/profile.js */
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";

export default function Profile() {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

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
}
