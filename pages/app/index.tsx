import React, { ReactElement } from "react";
import { Page } from "../../global";
import AppLayout from "../../layout/AppLayout";

interface Props {}

const MainApp: Page = () => {
  return (
    <div className="text-black dark:text-white">
      <div className="flex flex-row items-center justify-center">
        {/* Question Panel */}
        <div className="w-full h-screen max-w-xl mx-12 mt-20 mb-20 text-center bg-gray-500 max-h-72 ">
          Question
        </div>
        <div className="w-full max-w-xl mx-12 mt-20 mb-20 text-center bg-gray-400 h-96">
          Answer
        </div>

        {/* Answer Panel */}
      </div>

      {/* Dock */}
    </div>
  );
};

// Attach the landing layout (and other nested layouts) to the page
MainApp.getLayout = (page) => {
  return (
    // Attach the Landing layout with a meta component, decide on header/footer
    <AppLayout>{page}</AppLayout>
  );
};

export default MainApp;
