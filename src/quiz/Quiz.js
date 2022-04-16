import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../quiz/Quiz.css";
import {useParams} from "react-router-dom";

function Quiz(props) {
	const [quiz, setQuiz] = useState({});
	const [submited, setSubmited] = useState(false);
	const [result, setResult] = useState(0);
	const [answer, setAnswer] = useState("");
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [userId, setUserId] = useState("");
	const {quizId} = useParams()

	useEffect(() => {
		setUserId(localStorage.getItem("userId"));
		console.log(userId)
		axios.get(`https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/${quizId}`, { params:{ user_id: 719}, headers: { "X-Access-Token": process.env.REACT_APP_ACCESS_TOKEN }})
			.then(res => {
				setQuiz(res.data);
				setLoaded(true);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [userId]);

	const handleSubmit = (event, questionId) => {
		event.preventDefault(event);
		axios.post(`https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/${quizId}/submit?`, {
			data: {
        question_id: questionId,
        answer,
        user_id: userId
    	}
		},
		{
			headers: { "X-Access-Token": "9aa385e7947e1426162b7efdddc2cb0dd8021517ec36930eb3009eb6efecc076" }
		})
		.then(function (res) {
			if (res.data.correct) setResult((prevState) => prevState + 1)
			if (currentQuestion + 1 < quiz.questions.length) {setCurrentQuestion((prevState) => prevState + 1)}
			else setSubmited(true);
		})
		.catch(function (error) {
			console.log(error);
		});
	};

	const handleAnswers = (event) => {
		setAnswer(event.target.value)
	};

  return (
		<div className="Quiz">
	{loaded ?	<div><h1 className="quiz-title-page">{quiz.title}</h1>
		{submited ? <div className="quiz-result"><h2>Results: {result}/{quiz.questions.length}</h2></div> :
		<form className="questions-list-container" onSubmit={(event) => handleSubmit(event, quiz.questions[currentQuestion].id)}>
			<div className="question-container">
				<div className="question-title">
					<p>{currentQuestion + 1}. {quiz.questions[currentQuestion].question}</p>
				</div>

				{quiz.questions[currentQuestion].answers.map((answer, index)=>
					<div className="question-answers" key={`${quiz.questions[currentQuestion].question}-${answer}-${index}`} >
						<input type="radio" name={quiz.questions[currentQuestion].question} value={answer} onClick={(event) => handleAnswers(event)} required/>
						<label htmlFor={answer}>{answer}</label>
					</div>)}				
			</div>
			<div className="question-submit-btn">
				<input type="submit" value={currentQuestion + 1 < quiz.questions.length ? "Next question" : "Finish attempt"}/>
			</div>
    </form>}</div> : <p className="quiz-title-page">Loading quiz...</p>}
		</div>
  );
}

export default Quiz;

