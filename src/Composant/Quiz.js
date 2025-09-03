import {useEffect, useState} from "react";
import Question from "./Question";
import shuffle from "lodash.shuffle";
import {useNavigate} from "react-router-dom";

function Quiz({ listQuestions }) {
    const [answersGiven, setAnswersGiven] = useState({});
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const navigate = useNavigate();

    function handleAnswer(questionIndex, answer) {
        setAnswersGiven((prev) => ({ ...prev, [questionIndex]: answer }));
    }

    const allAnswered = Object.keys(answersGiven).length === (listQuestions.length ? listQuestions.length : 5);

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/results", { state: { questions: listQuestions, answers: answersGiven } });
    }

    useEffect(() => {
        const answers = listQuestions.map((question) => ({
               ...question,
            shuffledAnswers: shuffle([question.correct_answer, ...question.incorrect_answers]),
        }));
        setShuffledQuestions([...answers]);
    }, [listQuestions]);

    return (
        <form onSubmit={handleSubmit}>
            <br />
            {shuffledQuestions.map((question, index) => (
                <Question
                    key={index}
                    label={question.question}
                    answers={question.shuffledAnswers}
                    onAnswer={(answer) => handleAnswer(index, answer)}
                />
            ))}

            {allAnswered && (
                <button
                    type="submit"
                    style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}
                >
                    Submit
                </button>
            )}
        </form>
    );
}

export default Quiz;
