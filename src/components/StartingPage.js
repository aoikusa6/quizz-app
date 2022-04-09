import React, { useEffect, useState } from "react";

export const StartingPage = (props) => {
  const [category, setCategory] = useState([]);
  const [gameSetting, setGameSetting] = useState({
    amount: 10,
    category: 0,
    difficulty: "",
    type: "",
  });

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategory(data.trivia_categories));
  }, []);

  const categoryElements = category.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameSetting((prevGameSetting) => {
      return {
        ...prevGameSetting,
        [name]: value,
      };
    });
  };

  const handleGameStart = (event) => {
    event.preventDefault();
    const amount = gameSetting.amount
      ? `amount=${gameSetting.amount}`
      : "amount=10";
    const category = gameSetting.category
      ? `&category=${gameSetting.category}`
      : "";
    const difficulty = gameSetting.difficulty
      ? `&difficulty=${gameSetting.difficulty}`
      : "";
    const type = gameSetting.type ? `&type=${gameSetting.type}` : "";
    const gameAPI = `https://opentdb.com/api.php?${amount}${category}${difficulty}${type}`;
    fetch(gameAPI)
      .then((res) => res.json())
      .then((data) =>
        props.setGameQuestion(
          data.results.map((question) => ({
            ...question,
            answer_list: question.incorrect_answers.concat(
              question.correct_answer
            ),
            isChecked: false,
          }))
        )
      )
      .then(props.setIsStarted((prevData) => !prevData));
  };

  return (
    <div className="starting-page">
      <h2 className="starting-page__title">
        Welcome to Quizzical, please pick your setting then click start button.
      </h2>
      <form className="starting-page__setting">
        <div className="setting__number-of-questions">
          <label htmlFor="amount">Number of questions (max 50):</label>
          <input
            name="amount"
            type="text"
            onChange={handleChange}
            value={gameSetting.amount}
          />
        </div>
        <div className="setting__category">
          <label htmlFor="category">Select Category: </label>
          <select
            id="category"
            value={gameSetting.category}
            onChange={handleChange}
            name="category"
          >
            <option id="0" value={0}>
              ---Choose your category---
            </option>
            {categoryElements}
          </select>
        </div>
        <div className="setting__difficulty">
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select
            id="difficulty"
            value={gameSetting.difficulty}
            onChange={handleChange}
            name="difficulty"
          >
            <option value="">---Choose your difficulty---</option>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="setting__type">
          <label htmlFor="type">Type of questions:</label>
          <select
            id="type"
            value={gameSetting.type}
            onChange={handleChange}
            name="type"
          >
            <option value="">---Choose your questions type---</option>
            <option value="multiple">Multiple choices</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <button className="form__submit" onClick={handleGameStart}>
          Start game
        </button>
      </form>
    </div>
  );
};
