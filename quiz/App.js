import React, { useState } from 'react';
import './App.css';

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    answer: "Au"
  }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedOption) return; // Do nothing if no option selected

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedbackMessage('Correct!');
    } else {
      setFeedbackMessage(`Incorrect! The correct answer is "${currentQuestion.answer}".`);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption('');
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setScore(0);
    setShowFeedback(false);
    setFeedbackMessage('');
    setQuizCompleted(false);
  };

  return (
    <div className="quiz-container">
      <h1>Interactive Quiz</h1>
      {!quizCompleted ? (
        <>
          <div className="progress">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
          <div className="question">{currentQuestion.question}</div>
          <div className="options">
            {currentQuestion.options.map((option) => (
              <label key={option} className={`option-label ${selectedOption === option ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  disabled={showFeedback}
                />
                {option}
              </label>
            ))}
          </div>
          {!showFeedback ? (
            <button className="submit-btn" onClick={handleSubmit} disabled={!selectedOption}>
              Submit
            </button>
          ) : (
            <>
              <div className={`feedback ${feedbackMessage === 'Correct!' ? 'correct' : 'incorrect'}`}>
                {feedbackMessage}
              </div>
              <button className="next-btn" onClick={handleNext}>
                {currentQuestionIndex + 1 === quizQuestions.length ? 'Finish' : 'Next'}
              </button>
            </>
          )}
        </>
      ) : (
        <div className="result-section">
          <h2>Quiz Completed!</h2>
          <p>Your final score is {score} out of {quizQuestions.length}.</p>
          <button className="restart-btn" onClick={handleRestart}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
}

export default App;
