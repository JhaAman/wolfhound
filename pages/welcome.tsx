import React, { ReactElement } from "react";
import { Widget } from "@typeform/embed-react";
import LandingLayout from "../layout/LandingLayout";
import Meta from "./_components/landing/Meta";

interface Props {}

export default function Welcome({}: Props): ReactElement {
  return (
    <>
      <Widget id="n2dprafs" style={{ width: "100%" }} className="h-screen" />
    </>
  );
}

// Attach the landing layout (and other nested layouts) to the page
Welcome.getLayout = (page: ReactElement) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={
        <Meta
          title="Sign into Rosie"
          description="Ready to code 10x faster? Get in there!"
        />
      }
      headerActive={false}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};
