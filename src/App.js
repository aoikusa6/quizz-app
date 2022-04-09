import { useState } from "react";
import "./App.css";
import { QuestionPage } from "./components/QuestionPage";
import { StartingPage } from "./components/StartingPage";

function App() {
  const [gameQuestion, setGameQuestion] = useState([]);
  const [isStarted, setIsStarted] = useState(true);
  
  return (
    <div className="game-container">
      {isStarted ? (
        <StartingPage
          setGameQuestion={setGameQuestion}
          setIsStarted={setIsStarted}
        />
      ) : (
        <QuestionPage gameQuestion={gameQuestion}/>
      )}
    </div>
  );
}

export default App;
