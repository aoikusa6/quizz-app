import { useState } from "react";
import "./App.css";
import { Question } from "./components/Question";
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
        <Question gameQuestion={gameQuestion}/>
      )}
    </div>
  );
}

export default App;
