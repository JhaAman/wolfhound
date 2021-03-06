/* 
  pages/_components/app/AnswerPanel.tsx
  ------------------------
  The question panel is where the user asks and submits a question. 
  It has a lot of functionality that should be put into seperate components later.
 */

import { createHash } from "crypto";
import mixpanel from "mixpanel-browser";
import React, { ReactElement, useEffect } from "react";

interface Props {
  // This method is from the QA object. QuestionPanel.tsx calls it in order to get an answer
  submitQuestion: (type: string, question: string) => void;
}

export default function QuestionPanel({ submitQuestion }: Props): ReactElement {
  // UseState to store the question
  const [type, setType] = React.useState("How to");
  const [oneLiner, setOneLiner] = React.useState("");
  const [details, setDetails] = React.useState("");

  /* Handlers */

  // set type based on `select` value
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setType(event.target.value);

  // set oneLiner based on `input` value
  const handleOneLinerChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOneLiner(event.target.value);

  // set details based on `textarea` value
  const handleDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDetails(event.target.value);

  // Handle submit button
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent reloading the page
    // Style the question for the AI API
    const question = createQuestion(oneLiner, details);
    submitQuestion(type, question); // Submit to QA Object

    // Send to mixpanel, but first, hash the question to match with the answer
    const hash = createHash("sha256");
    hash.update(question);

    mixpanel.track("Question Asked", {
      question_hash: hash.digest("hex"),
      question: question,
    });
  };

  return (
    <>
      <div className="p-4 bg-gray-700 rounded-lg shadow-lg ">
        <h1 className="mx-4 mt-2 mb-6 text-xl font-bold">Ask a Question</h1>

        {/* Question Input */}
        <div className="flex flex-wrap ">
          <div className="w-full mx-4 mb-4 ">
            {/* A form that asks for the question type, one liner and details */}
            <form onSubmit={(event) => handleSubmit(event)}>
              {/* Type */}
              {/* <label className="block mb-2 font-bold tracking-wide text-gray-200 ">
                Type of question
              </label>
              <div className="relative mb-4">
                <select className="p-2" onChange={handleTypeChange}>
                  <option>How to</option>
                  <option>Can I</option>
                  <option>Fix this</option>
                  <option>Error</option>
                </select>
              </div> */}

              {/* One Liner */}
              <label className="block mb-2 font-bold tracking-wide text-gray-200 ">
                One-Liner
              </label>
              <input
                className="w-full p-2 text-gray-200 border-2 border-gray-500 rounded-lg"
                type="text"
                placeholder="How would you ask a friend?"
                onChange={handleOneLinerChange}
              />

              {/* Description */}
              <label className="block mt-3 mb-2 font-bold tracking-wide text-gray-200 ">
                Description
              </label>
              <textarea
                className="w-full p-2 pb-20 text-gray-200 border-2 border-gray-500 rounded-lg"
                placeholder="Add details or code here - try to be specific!"
                onChange={handleDetailsChange}
              />

              {/* Submit button */}
              <button
                className="w-1/3 p-2 mt-4 text-white bg-blue-500 rounded-lg shadow-lg"
                type="submit"
              >
                Submit
              </button>

              {/* Clear button */}
              <button
                className="w-1/3 p-2 mt-4 ml-3 text-white bg-red-500 rounded-lg shadow-lg"
                type="reset"
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// A function to style the question for the AI API
function createQuestion(oneLiner: string, details: string): string {
  return `Question Subject:
${oneLiner}

Question Details:
${details}`;
}
