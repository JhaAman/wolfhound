import React, { ReactElement, ReactNode } from "react";

import Link from "next/link";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import { Page } from "./page";

type ILandingProps = {
  meta: ReactNode;
  children: ReactNode;
  headerActive?: true;
  footerActive?: true;
};

export default function LandingLayout({
  meta,
  children,
  headerActive,
  footerActive,
}: ILandingProps): ReactElement {
  return (
    <div>
      {meta}
      {headerActive && <Header />}
      <main>{children}</main>
      {footerActive && <Footer />}
    </div>
  );
}
