import React, { useState, useEffect, useRef } from 'react';

const quizQuestions = [
  {
    question: "Who won the first ever IPL title in 2008?",
    options: [
      "Chennai Super Kings",
      "Rajasthan Royals",
      "Mumbai Indians",
      "Kolkata Knight Riders"
    ],
    answer: "Rajasthan Royals"
  },
  {
    question: "Who is the highest run-scorer in IPL history (as of 2024)?",
    options: [
      "David Warner",
      "Virat Kohli",
      "Rohit Sharma",
      "Shikhar Dhawan"
    ],
    answer: "Virat Kohli"
  },
  {
    question: "Which team has won the most IPL titles (as of 2024)?",
    options: [
      "Chennai Super Kings",
      "Kolkata Knight Riders",
      "Mumbai Indians",
      "Rajasthan Royals"
    ],
    answer: "Mumbai Indians"
  },
  {
    question: "Who was the captain of Chennai Super Kings in the inaugural IPL season?",
    options: [
      "Suresh Raina",
      "Michael Hussey",
      "MS Dhoni",
      "Matthew Hayden"
    ],
    answer: "MS Dhoni"
  },
  {
    question: "Which player holds the record for the fastest century in IPL history?",
    options: [
      "Chris Gayle",
      "AB de Villiers",
      "Yusuf Pathan",
      "KL Rahul"
    ],
    answer: "Chris Gayle"
  },
  {
    question: "In which year was the IPL suspended midway due to the COVID-19 pandemic?",
    options: [
      "2019",
      "2020",
      "2021",
      "2022"
    ],
    answer: "2021"
  },
  {
    question: "Which IPL team is also known as the 'Orange Army'?",
    options: [
      "Punjab Kings",
      "Gujarat Titans",
      "Sunrisers Hyderabad",
      "Delhi Capitals"
    ],
    answer: "Sunrisers Hyderabad"
  },
  {
    question: "Who won the Purple Cap in IPL 2023?",
    options: [
      "Mohammed Shami",
      "Rashid Khan",
      "Yuzvendra Chahal",
      "Harshal Patel"
    ],
    answer: "Mohammed Shami"
  },
  {
    question: "What is the maximum number of overseas players allowed in an IPL playing XI?",
    options: [
      "3",
      "4",
      "5",
      "6"
    ],
    answer: "4"
  },
  {
    question: "Which venue hosted the IPL 2023 final?",
    options: [
      "Wankhede Stadium",
      "Eden Gardens",
      "Narendra Modi Stadium",
      "M. Chinnaswamy Stadium"
    ],
    answer: "Narendra Modi Stadium"
  }
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    if (quizCompleted) {
      clearInterval(timerRef.current);
      return;
    }
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex, quizCompleted]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (autoSubmit = false) => {
    if (!selectedOption && !autoSubmit) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedbackMessage('Correct!');
    } else {
      setFeedbackMessage(`Incorrect! The correct answer is "${currentQuestion.answer}".`);
    }
    setShowFeedback(true);
    clearInterval(timerRef.current);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption('');
    setTimeLeft(15);
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
    setTimeLeft(15);
  };

  return (
    <div className="quiz-container">
      <h1>Interactive Quiz</h1>
      {!quizCompleted ? (
        <>
          <div className="progress">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
          <div className="timer">Time Left: {timeLeft} seconds</div>
          <div className="question">{currentQuestion.question}</div>
          <div className="options">
            {currentQuestion.options.map((option) => {
              let className = 'option-label';
              if (showFeedback) {
                if (option === currentQuestion.answer) {
                  className += ' correct';
                } else if (option === selectedOption && option !== currentQuestion.answer) {
                  className += ' incorrect';
                }
              } else if (selectedOption === option) {
                className += ' selected';
              }
              return (
                <label key={option} className={className}>
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
              );
            })}
          </div>
          {!showFeedback ? (
            <button className="submit-btn" onClick={() => handleSubmit(false)} disabled={!selectedOption}>
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
