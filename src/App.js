import React from "react";
import Question from "./components/Question";
// import data from "./data";
import { nanoid } from "nanoid";

export default function App() {
  const [questions, setQuestions] = React.useState([]);
  const [mainMenu, setMainMenu] = React.useState(true);
  const [answers, setAnswers] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [showAnswers, setShowAnswers] = React.useState(false);

  React.useEffect(() => {
    console.log("effect ran");
    getQuestions();
  }, []);

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(() =>
          data.results.map((item) => ({
            question: item.question,
            choices: [...item.incorrect_answers, item.correct_answer].sort(
              (a, b) => 0.5 - Math.random()
            ),
            correct_answer: item.correct_answer,
            id: nanoid(),
            selected: "",
          }))
        );
      });
  }

  function startGame() {
    setMainMenu(false);
    setCount(0);
    setAnswers([]);
    getQuestions();
    setShowAnswers(false);
  }

  function handleClick(id, answer) {
    if (showAnswers) {
      return;
    }
    if (!answers.some((item) => item.id === id)) {
      setAnswers((prevAnswers) => [...prevAnswers, { id: id, answer: answer }]);
    } else {
      setAnswers((prevAnswers) =>
        prevAnswers.map((item) => (item.id === id ? { ...item, answer: answer } : item))
      );
    }
  }

  const questionElements = questions.map((question) => {
    return <Question key={question.id} {...question} onClick={handleClick} />;
  });

  function checkAnswers() {
    if (showAnswers) {
      setMainMenu(true);
      return;
    }
    answers.forEach((answer) => {
      let correct = questions.find((item) => item.id === answer.id);
      console.log(correct, answer.answer);

      if (correct.correct_answer === answer.answer) {
        setCount((prevCount) => prevCount + 1);
        console.log("correct");
      }
    });
    setShowAnswers(true);
  }

  return (
    <div className="App">
      {mainMenu ? (
        <div className="start-menu">
          <h1 className="title">Quizzical</h1>
          <p className="description">Fun Quiz Game</p>
          <button className="start-btn btn" onClick={startGame}>
            Start quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="questions">{questionElements}</div>
          <div className="result-box">
            {showAnswers && <h3>You scored {count}/5 correct answers</h3>}
            <button className="check-btn btn" onClick={checkAnswers}>
              {!showAnswers ? "Check answers" : "PlayAgain"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
