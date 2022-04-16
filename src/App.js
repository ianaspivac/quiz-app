import { Routes, Route } from "react-router-dom";
import './App.css';
import QuizList from './quiz/QuizList';
import Quiz from './quiz/Quiz';
import Header from "./ui/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<QuizList />} exact />
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
