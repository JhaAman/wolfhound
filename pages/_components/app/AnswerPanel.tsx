import React, { ReactElement } from "react";

interface Props {
  answer: string;
}

export default function AnswerPanel({ answer }: Props): ReactElement {
  return (
    <>
      <div className="p-4 bg-gray-700 rounded-lg shadow-lg ">
        <h1 className="mx-4 mt-2 mb-6 text-xl font-bold">Our Answer</h1>

        {/* Answer to the question generated by AI */}
        <div className="flex flex-wrap ">
          <div className="w-full mx-4 mb-4 ">
            <p className="text-gray-200">The answer to your question is:</p>
            <p className="text-gray-200">{answer}</p>
          </div>
        </div>
      </div>
    </>
  );
}
