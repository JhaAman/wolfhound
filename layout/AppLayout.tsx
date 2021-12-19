/* The base layout for the core webapp */

import React, { ReactElement, ReactNode } from "react";

// TODO: add mixpanel, dock component, etc.

type IAppProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: IAppProps): ReactElement {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
