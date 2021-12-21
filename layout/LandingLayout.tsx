/* Basic site layout for all landing pages, like home, pricing etc */

import { KBarProvider } from "kbar";
import React, { ReactElement, ReactNode } from "react";
import CommandBar, {
  actions,
} from "../pages/_components/landing/LandingCmdBar";

import Footer from "../pages/_components/landing/Footer";
import Header from "../pages/_components/landing/Header";

// TODO: add fathom client, etc.

type LandingProps = {
  meta: ReactNode;
  children: ReactNode;
  headerActive: boolean;
  footerActive: boolean;
};

export default function LandingLayout({
  meta,
  children,
  headerActive,
  footerActive,
}: LandingProps): ReactElement {
  /*
    Meta component is passed in from the page
    Children is the page itself (react keyword)
    headerActive and footerActive are bools decided by the page
  */
  return (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}
    >
      {meta}
      {headerActive && <Header />}
      <LandingCmdBar />
      <main className="text-black dark:text-white">{children}</main>
      {footerActive && <Footer />}
    </KBarProvider>
  );
}
