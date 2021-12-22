import { User } from "@supabase/supabase-js";
import { createHash } from "crypto";
import mixpanel from "mixpanel-browser";
import React, { ReactElement, useEffect } from "react";
import AppLayout from "../../layout/AppLayout";
import supabase from "../../lib/supabase";
import AnswerPanel from "../_components/app/AnswerPanel";
import QuestionPanel from "../_components/app/QuestionPanel";

const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const MainApp = (props: { user: User }) => {
  const { user } = props;
  // console.log(user);

  // UseState to store the question submission and answer repsonse
  const [answer, setAnswer] = React.useState("Waiting for a question...");

  /* on getting submit from Question Panel, fetch from API */
  const submitQuestion = (type: string, question: string) => {
    const email = user.email;

    // use fetch to get the answer
    fetch(`${api_base_url}` + "howto", {
      method: "POST",
      body: JSON.stringify({ question, email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const hash = createHash("sha256");
        hash.update(question);
        console.log(hash.digest("hex"));

        mixpanel.track("Question Answered", {
          question_hash: hash.digest("hex"),
          question: question,
          answer: data.answer,
        });

        setAnswer(data.answer);
      })
      .catch((error) => {
        console.log("Question could not be answered", error);

        const hash = createHash("sha256");
        hash.update(question);
        console.log(hash.digest("hex"));

        mixpanel.track("Question Not Answered", {
          question_hash: hash.digest("hex"),
          question: question,
          error: error,
        });
      });
  };

  return (
    <div className="text-white ">
      <div className="container mx-auto mt-12 md:max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-6">
          {/* Question Panel */}
          <div className="px-4 md:col-start-1 md:col-end-4 mb-14">
            <QuestionPanel submitQuestion={submitQuestion} />
          </div>

          {/* Answer Panel */}
          <div className="px-4 md:col-start-4 md:col-end-7 mb-14">
            <AnswerPanel answer={answer} />
          </div>
        </div>
      </div>

      {/* Dock */}
    </div>
  );
};

export async function getServerSideProps(ctx: { req: any }) {
  const { req } = ctx;

  /* check to see if a user is set */
  const { user } = await supabase.auth.api.getUserByCookie(req);

  /* if no user is set, redirect to the sign-in page */
  if (!user) {
    return { props: {}, redirect: { destination: "/signin" } };
  }

  /* if a user is set, pass it to the page via props */
  return { props: { user } };
}

// Attach the app layout (and other nested layouts) to the page
MainApp.getLayout = (page: ReactElement) => {
  return (
    // Attach the app layout
    <AppLayout>{page}</AppLayout>
  );
};

export default MainApp;
