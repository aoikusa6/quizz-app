import React, { useState } from "react";

export const Question = (props) => {
  const [answerList, setAnswerList] = useState([])
  const handleChange = (event) => {
    const {name, value} = event.target
    setAnswerList(prevAnswerList => {
      return {
        ...prevAnswerList,
        [name]: value
      }
    })
  }
  return (
    <form className="question-page">
      {props.gameQuestion.length
        ? props.gameQuestion.map((question, index) => (
            <div className="question-card" key={index}>
              <h3>
                Question no{index + 1} - Category: {question.category} -
                Difficulty: {question.difficulty}
              </h3>
              <p>{question.question}</p>
              <div className="answers-tab">
                {question.question_list.map((answer, index) => (
                  <div className="single-answer">
                    <input
                      type="radio"
                      id={answer}
                      name={`question${index + 1}`}
                      className={
                        answer === question.correct_answer
                          ? "answer correct"
                          : "answer incorrect"
                      }
                      value={answer}
                      key={index}
                      onChange={handleChange}
                    />
                    <label htmlFor={`question${index + 1}`}>{answer}</label>
                  </div>
                ))}
              </div>
            </div>
          ))
        : ""}
    </form>
  );
};
