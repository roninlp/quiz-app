import React from "react";

export default function Question(props) {
  const answers = props.choices;

  const answerElements = answers.map((item) => (
    <button onClick={() => props.onClick(props.id, item)} key={item} className="choice">
      {decodeURIComponent(item)}
    </button>
  ));

  return (
    <div className="question-box">
      <h4 className="question">{decodeURIComponent(props.question)}</h4>
      <div className="choices-container">{answerElements}</div>
    </div>
  );
}
