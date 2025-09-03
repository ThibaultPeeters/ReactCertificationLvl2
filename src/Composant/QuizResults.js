import { useLocation, useNavigate } from "react-router-dom";
import decodeHtml from "../fonctionUtils";

function QuizResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const { questions, answers } = location.state || {};

    if (!questions || !answers) {
        return (
            <div>
                <p>No results to display.</p>
                <button onClick={() => navigate("/")}>Go back to quiz</button>
            </div>
        );
    }

    const correctCount = questions.reduce((count, question, i) => {
        return count + (answers[i] === question.correct_answer ? 1 : 0);
    }, 0);

    let scoreColor = "red";
    if (correctCount >= 2 && correctCount <= 3) scoreColor = "yellow";
    else if (correctCount >= 4) scoreColor = "green";

    return (
        <>
            <div className="container my-4">
                <h2 className="mb-4 text-primary">🎯 QUIZ MAKER</h2>

                <div className="row g-3 align-items-center">

                    <h2>Results</h2>
                    {questions.map((question, i) => {
                        const userAnswer = answers[i];
                        const correctAnswer = question.correct_answer;

                        return (
                            <div key={i} style={{ marginBottom: 20 }}>
                                <p><strong>Question:</strong> {decodeHtml(question.question)}</p>

                                {[correctAnswer, ...question.incorrect_answers].map((answer, idx) => {
                                    const isUserAnswer = answer === userAnswer;
                                    const isCorrectAnswer = answer === correctAnswer;

                                    const color = isCorrectAnswer
                                        ? "green"
                                        : isUserAnswer
                                            ? "red"
                                            : "black";

                                    return (
                                        <span
                                            key={idx}
                                            className="badge border me-2"
                                            style={{
                                                color,
                                                borderColor: color,
                                                marginLeft: 5,
                                                backgroundColor: 'transparent',
                                                fontSize: "1rem",
                                                padding: "0.6em 1em",
                                                borderRadius: "1em",
                                            }}
                                        >
                                            {decodeHtml(answer)}
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    })}

                    <hr />

                    <h3
                        style={{
                            backgroundColor: scoreColor,
                            color: "black",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            display: "inline-block",
                            marginTop: "20px"
                        }}
                    >
                        Your score: {correctCount} / {questions.length}
                    </h3>

                    <br />

                    <button
                        onClick={() => navigate("/")}
                        style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}
                    >
                        Create a new quiz
                    </button>
                </div>
            </div>


        </>
    );
}

export default QuizResults;
