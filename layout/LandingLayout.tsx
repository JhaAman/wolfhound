/* 
  layout/LandingLayout.tsx
  ------------------------
  This layout component wraps around all the root pages (in pages/).
  It has an header and footer component, and each page decides on whether it displays that header or footer.
  The meta component is for the favicons and SEO. Each page will create a new Meta component and pass
  it to this layout, then this layout will add it to the page.
 */

import React, { ReactElement, ReactNode } from "react";

import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";

// TODO: add fathom client, etc.

type LandingProps = {
  // Accept a Meta component (components/landing/Meta.tsx) from each page.
  meta: ReactNode;
  // The actual page itself. Must be named 'children'.
  children: ReactNode;
  // Booleans for whether to display the header or footer.
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
    // TODO: re-add in command bar later

    // <KBarProvider
    //   options={{
    //     enableHistory: true,
    //   }}
    //   actions={actions}
    // >
    <>
      {meta}
      {headerActive && <Header />}
      <main className="text-black dark:text-white">{children}</main>
      {footerActive && <Footer />}
    </>
    // </KBarProvider>
  );
}
