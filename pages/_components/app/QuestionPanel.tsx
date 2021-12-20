import React, { ReactElement } from "react";

interface Props {}

export default function QuestionPanel({}: Props): ReactElement {
  return (
    <>
      <h1>Question</h1>
      <div className="h-full p-4 py-48 bg-white rounded-lg shadow-lg" />
    </>
  );
}
