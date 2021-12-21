/* The base layout for the core webapp */

import React, { ReactElement, ReactNode } from "react";
import Header from "../pages/_components/app/Header";

// TODO: add mixpanel, dock component, etc.

type AppProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppProps): ReactElement {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
