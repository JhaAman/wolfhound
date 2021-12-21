import { ReactElement, useEffect, useState } from "react";

import LandingLayout from "../layout/LandingLayout";
import DarkMode from "./_components/landing/DarkMode";
import Meta from "./_components/landing/Meta";

const Home = () => {
  return (
    <div className="px-6 py-8 bg-gray-900 rounded-lg shadow-xl ring-1 ring-gray-900/5">
      {/* <DarkMode /> */}

      {/* The Auth testing */}
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
Home.getLayout = (page: ReactElement) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <LandingLayout
      meta={<Meta title="Title" description="Description" />}
      headerActive={true}
      footerActive={false}
    >
      {page}
    </LandingLayout>
  );
};

export default Home;
