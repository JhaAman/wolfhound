import React, { ReactElement } from "react";
import { Page } from "../../global";
import AppLayout from "../../layout/AppLayout";

interface Props {}

const MainApp: Page = () => {
  return <div className="text-black dark:text-white">Hello World</div>;
};

// Attach the landing layout (and other nested layouts) to the page
MainApp.getLayout = (page) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <AppLayout>{page}</AppLayout>
  );
};

export default MainApp;
