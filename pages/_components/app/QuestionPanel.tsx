import React, { ReactElement } from "react";

interface Props {}

export default function QuestionPanel({}: Props): ReactElement {
  // UseState to store the question
  const [type, setType] = React.useState("How to");
  const [oneLiner, setOneLiner] = React.useState("");
  const [details, setDetails] = React.useState("");

  // set type based on `select` value
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  // set oneLiner based on `input` value
  const handleOneLinerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOneLiner(event.target.value);
  };

  // set details based on `textarea` value
  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetails(event.target.value);
  };

  return (
    <>
      <div className="p-4 bg-gray-700 rounded-lg shadow-lg ">
        <h1 className="mx-4 mt-2 mb-6 text-xl font-bold">Ask a Question</h1>

        {/* Question Input */}
        <div className="flex flex-wrap ">
          <div className="w-full mx-4 mb-4 ">
            {/* Create react form with type, one liner and details, all required */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              {/* Type */}
              <label className="block mb-2 font-bold tracking-wide text-gray-200 ">
                Type of question
              </label>
              <div className="relative mb-4">
                <select className="p-2" onChange={handleTypeChange}>
                  <option>How to</option>
                  <option>Can I</option>
                  <option>Fix this</option>
                  <option>Error</option>
                </select>
              </div>

              {/* One Liner */}
              <label className="block mb-2 font-bold tracking-wide text-gray-200 ">
                One-Liner
              </label>
              <input
                className="w-full p-2 border-2 border-gray-500 rounded-lg"
                type="text"
                placeholder="How would you ask a friend?"
                onChange={handleOneLinerChange}
              />

              {/* Description */}
              <label className="block mt-3 mb-2 font-bold tracking-wide text-gray-200 ">
                Description
              </label>
              <textarea
                className="w-full p-2 pb-20 border-2 border-gray-500 rounded-lg"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
