/* 
  layout/AppLayout.tsx
  ------------------------
  This layout component wraps around all the core webapp pages (in pages/app/).
 */

import Head from "next/head";
import React, { ReactElement, ReactNode } from "react";
import Header from "../components/app/Header";

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
