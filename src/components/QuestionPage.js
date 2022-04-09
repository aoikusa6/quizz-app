import React, { useState } from "react";

export const QuestionPage = (props) => {
  const hasQuestion = Boolean(props.gameQuestion.length);
  const [answerList, setAnswerList] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnswerList((prevAnswerList) => {
      return {
        ...prevAnswerList,
        [name]: value,
      };
    });
  };
  console.log(answerList);
  return (
    <form className="question-page">
      {hasQuestion &&
        props.gameQuestion.map((question, index) => (
          <div className="question-page__card" key={index}>
            <h4 className="card-title">
              Question {index + 1} - Category: {question.category} -
              Difficulty: {question.difficulty}
            </h4>
            <p className="card-info">{question.question}</p>
            <div className="card-answers">
              {question.answer_list.map((answer) => (
                <div className="answers__single-answer" key={answer}>
                  <input
                    type="radio"
                    id={answer}
                    name={`question${index + 1}`}
                    className={
                      answer === question.correct_answer
                        ? "answer correct"
                        : "answer incorrect"
                    }
                    value={answer === question.correct_answer ? "correct" : "incorrect"}
                    key={index}
                    onChange={handleChange}
                  />
                  <label htmlFor={answer}>{answer}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
    </form>
  );
};
