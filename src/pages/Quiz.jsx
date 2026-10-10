import React, { useState } from "react";

const questions = [
  {
    question: "Which Pokémon is known as Pikachu's evolution?",
    options: ["Raichu", "Pichu", "Electabuzz", "Jolteon"],
    answer: "Raichu",
  },
  {
    question: "Which type is super effective against Water?",
    options: ["Fire", "Electric", "Ground", "Rock"],
    answer: "Electric",
  },
  {
    question: "Which Pokémon is known as the Fire-type starter in Kanto?",
    options: ["Squirtle", "Bulbasaur", "Charmander", "Pikachu"],
    answer: "Charmander",
  },
  {
    question: "Which Poké Ball is traditionally red and white?",
    options: ["Master Ball", "Ultra Ball", "Great Ball", "Poké Ball"],
    answer: "Poké Ball",
  },
  {
    question: "Which type is strong against Grass?",
    options: ["Water", "Ground", "Flying", "Electric"],
    answer: "Flying",
  },
  {
    question: "What is the evolved form of Charmander?",
    options: ["Blastoise", "Charmeleon", "Dragonite", "Arcanine"],
    answer: "Charmeleon",
  },
  {
    question: "Which Pokémon is famous for sleeping frequently?",
    options: ["Snorlax", "Mewtwo", "Pidgey", "Machop"],
    answer: "Snorlax",
  },
  {
    question: "Which type is immune to Electric attacks?",
    options: ["Water", "Flying", "Ground", "Steel"],
    answer: "Ground",
  },
  {
    question: "Which Pokémon is known as the Genetic Pokémon?",
    options: ["Mew", "Mewtwo", "Ditto", "Eevee"],
    answer: "Mewtwo",
  },
  {
    question: "What is the Pokédex number of Bulbasaur?",
    options: ["001", "004", "007", "025"],
    answer: "001",
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  function submitAnswer() {
    if (!selectedAnswer) return;

    const correct =
      selectedAnswer === questions[currentQuestion].answer;

    if (correct) setScore((previous) => previous + 1);

    setAnswers((previous) => [
      ...previous,
      {
        question: questions[currentQuestion].question,
        selected: selectedAnswer,
        correct: questions[currentQuestion].answer,
        isCorrect: correct,
      },
    ]);

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer("");
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setAnswers([]);
  }

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">TEST YOUR KNOWLEDGE</p>
        <h1>Pokémon Quiz</h1>
        <p>Answer the questions and prove you are a Pokémon expert!</p>
      </section>

      {!finished ? (
        <section className="quiz-card">
          <div className="quiz-top">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>Score: {score}</span>
          </div>

          <div className="quiz-progress">
            <div
              className="quiz-progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h2>{questions[currentQuestion].question}</h2>

          <div className="quiz-options">
            {questions[currentQuestion].options.map((option) => (
              <button
                type="button"
                key={option}
                className={
                  selectedAnswer === option
                    ? "quiz-option selected"
                    : "quiz-option"
                }
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="primary-button quiz-submit"
            onClick={submitAnswer}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </section>
      ) : (
        <section className="quiz-result">
          <p className="eyebrow">QUIZ COMPLETED</p>
          <h2>Your Result</h2>

          <div className="quiz-score-circle">
            <strong>{score}/{questions.length}</strong>
            <span>{percentage}%</span>
          </div>

          <h3>
            {percentage >= 80
              ? "Pokémon Master!"
              : percentage >= 50
              ? "Great Job, Trainer!"
              : "Keep Training!"}
          </h3>

          <p>
            You answered {score} out of {questions.length} questions correctly.
          </p>

          <button className="primary-button" onClick={restartQuiz}>
            Try Again
          </button>

          <div className="quiz-review">
            <h3>Answer Review</h3>

            {answers.map((item, index) => (
              <div className="quiz-review-item" key={index}>
                <p><strong>{index + 1}. {item.question}</strong></p>
                <p className={item.isCorrect ? "answer-correct" : "answer-wrong"}>
                  Your answer: {item.selected}
                </p>
                {!item.isCorrect && (
                  <p>Correct answer: {item.correct}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Quiz;
