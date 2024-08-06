import { useState } from "react";
import { QuestionItemTypes } from "../../utils/types";

const QuestionItem = ({ question, answer }: QuestionItemTypes) => {
  const [answerShown, setAnswerShown] = useState<boolean>(() => false);
  let updatedAnswer = answer;
  if (answer.includes("*")) {
    updatedAnswer = (
      <>
        <p>{answer.split("*")[0]}</p>
        <br />
        <p>*{answer.split("*")[1]}</p>
      </>
    );
  }

  return (
    <div
      className={`question ${answerShown && "answer-open"}`}
      onClick={() => setAnswerShown(!answerShown)}
    >
      {question}
      <img src="/assets/icons/arrow-down-icon.svg" alt="" />
      <div className="answer">{updatedAnswer}</div>
    </div>
  );
};

export default QuestionItem;
