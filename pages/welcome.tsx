import React, { ReactElement } from "react";
import { Widget } from "@typeform/embed-react";

interface Props {}

export default function Welcome({}: Props): ReactElement {
  return (
    <>
      <Widget id="n2dprafs" style={{ width: "100%" }} className="h-screen" />
    </>
  );
}
