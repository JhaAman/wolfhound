/* Basic site layout for all landing pages, like home, pricing etc */

import React, { ReactElement, ReactNode } from "react";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";

type ILandingProps = {
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
}: ILandingProps): ReactElement {
  /*
    Meta component is passed in from the page
    Children is the page itself (react keyword)
    headerActive and footerActive are bools decided by the page
  */
  return (
    <div>
      {meta}
      {headerActive && <Header />}
      <main>{children}</main>
      {footerActive && <Footer />}
    </div>
  );
}
