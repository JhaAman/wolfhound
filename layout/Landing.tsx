import React, { ReactElement, ReactNode } from "react";

import Link from "next/link";

type ILandingProps = {
  meta: ReactNode;
  children: ReactNode;
  headerActive?: true;
  footerActive?: true;
};

export default function Landing({}: ILandingProps): ReactElement {
  return <div></div>;
}
