import React from "react";
// { backgroundColor: "#d6dbf5", border: "none" };
export default function Question(props) {
  const answers = props.choices;

  const answerElements = answers.map((item) => {
    let className = "choice";
    if (item === props.selected) {
      className += " selected";
    }

    if (props.showAnswers) {
      if (item === props.selected && item !== props.correct_answer) {
        className += " wrong-answer";
      } else if (item === props.correct_answer) {
        className += " correct";
      } else {
        className += " not-correct";
      }
    }

    return (
      <button
        onClick={() => props.onClick(props.id, item)}
        key={item}
        className={className}
        // style={item === props.selected ? selected : {}}
      >
        {decodeURIComponent(item)}
      </button>
    );
  });

  return (
    <div className="question-box">
      <h4 className="question">{decodeURIComponent(props.question)}</h4>
      <div className="choices-container">{answerElements}</div>
    </div>
  );
}
