import React, { ReactElement } from "react";

interface Props {}

export default function AnswerPanel({}: Props): ReactElement {
  return (
    <>
      <div className="p-4 bg-gray-700 rounded-lg shadow-lg ">
        <h1 className="mx-4 mt-2 mb-6 text-xl font-bold">Ask a Question</h1>

        {/* Question Input */}
        <div className="flex flex-wrap ">
          <div className="w-full mx-4 mb-4 ">
            {/* Type */}
            <label className="block mb-2 font-bold tracking-wide text-gray-200 ">
              Type of question
            </label>
            <div className="relative mb-4">
              <select className="p-2">
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
            />

            {/* Description */}
            <label className="block mt-3 mb-2 font-bold tracking-wide text-gray-200 ">
              Description
            </label>
            <textarea
              className="w-full p-2 pb-20 border-2 border-gray-500 rounded-lg"
              placeholder="Add details or code here - try to be specific!"
            />

            {/* Submit button */}
            <button
              className="w-1/3 p-2 mt-4 text-white bg-blue-500 rounded-lg shadow-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
