import React, { ReactElement } from "react";
import { Page } from "../../global";
import AppLayout from "../../layout/AppLayout";
import AnswerPanel from "../_components/app/AnswerPanel";
import QuestionPanel from "../_components/app/QuestionPanel";

interface Props {}

const MainApp: Page = () => {
  // UseState to store the question
  const [answer, setAnswer] = React.useState("Waiting for a question...");

  return (
    <div className="text-black dark:text-white">
      <div className="container mx-auto mt-24 md:max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-6">
          {/* Question Panel */}
          <div className="px-4 md:col-start-1 md:col-end-4 mb-14">
            <QuestionPanel />
          </div>

          {/* Answer Panel */}
          <div className="px-4 md:col-start-4 md:col-end-7 mb-14">
            <AnswerPanel answer="answer" />
          </div>
        </div>
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
