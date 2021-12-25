import Link from "next/link";
import s from "./Navbar.module.css";

import Logo from "../../icons/Logo";
import { useRouter } from "next/router";
import supabase from "../../../lib/supabase";

const Navbar = () => {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/signin");
  }

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="hidden ml-6 space-x-2 lg:block">
              <Link href="/">
                <a className={s.link}>Pricing</a>
              </Link>
              <Link href="/account">
                <a className={s.link}>Account</a>
              </Link>
            </nav>
          </div>

          <div className="flex justify-end flex-1 space-x-8">
            {user ? (
              <Link href="#">
                <a className={s.link} onClick={() => signOut()}>
                  Sign out
                </a>
              </Link>
            ) : (
              <Link href="/signin">
                <a className={s.link}>Sign in</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
