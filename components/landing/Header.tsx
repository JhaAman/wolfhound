/* 
  pages/_components/landing/Header.tsx
  ------------------------
  Header for the landing pages. Not really used yet.
 */

import Link from "next/link";
import React, { ReactElement } from "react";

interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <header>
      {/* Header */}
      <div className="">
        <nav className="m-5">
          <Link href="/">
            <a className="m-2.5">Home</a>
          </Link>
          <Link href="/profile">
            <a className="m-2.5">Profile</a>
          </Link>
          {/* {authenticatedState === "not-authenticated" && (
            <Link href="/signin">
              <a className="m-2.5">Sign In</a>
            </Link>
          )} */}
          <Link href="/signin">
            <a className="m-2.5">Sign In</a>
          </Link>
          <Link href="/protected">
            <a className="m-2.5">Protected</a>
          </Link>
          <Link href="/app">
            <a className="m-2.5">App</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
