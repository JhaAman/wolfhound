/* The base layout for the core webapp */

import Head from "next/head";
import React, { ReactElement, ReactNode } from "react";
import Header from "../pages/_components/app/Header";

// TODO: add mixpanel, dock component, etc.

type AppProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppProps): ReactElement {
  return (
    <div>
      <Head>
        <title>Rosie</title>
      </Head>
      <Header />

      <main>{children}</main>
    </div>
  );
}
