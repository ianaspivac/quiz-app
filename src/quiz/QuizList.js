import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import placeholder from "../assets/placeholder.jpg";
import "../quiz/Quiz.css";
import User from "../ui/User";

function QuizList() {
  const [quizList, setQuizList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState("");

	useEffect(() => {
		setUserId(localStorage.getItem("userId"))
		axios.get("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes", { headers: { "X-Access-Token": process.env.REACT_APP_ACCESS_TOKEN }})
			.then(res => {
				setQuizList(res.data);
				setLoaded(true);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

  const handleUserId = (id) => {
    setUserId(id);
  };

  return (
    <div className="QuizzList"> 
    <div className="app-title"><h1>Quizy</h1><h2>Take it easy</h2></div>
    {!userId && <User userIdGet={handleUserId}/>}
    { userId && loaded &&
    <div className="quiz-list-container">
      <ul>
      {
        quizList.map((quiz) =>
        <li>
           <Link to={`/quiz/${quiz.id}`}>
            <div className="quiz-container">
              <div className="quiz-image-container"><img className="quiz-image" src={placeholder} /></div>
              <p className="quiz-name">{quiz.title}</p>
            </div>
          </Link>
        </li>
      )
      }
      </ul>
    </div>}
    {userId && !loaded && <p className="quiz-title-page">Loading quizes...</p>}
    </div>
  );
}

export default QuizList;
