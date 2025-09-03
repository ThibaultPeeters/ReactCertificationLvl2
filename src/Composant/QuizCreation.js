import {useEffect, useState} from "react";
import Quiz from "./Quiz";

function QuizCreation() {

    const [listCategories, setListCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState('');
    const [difficultySelected, setDifficultySelected] = useState('');
    const [listQuestions, setListQuestions] = useState([]);

    useEffect(() => {

        fetch('https://opentdb.com/api_category.php')
            .then((response) => response.json())
            .then((data) => {
                setListCategories(data.trivia_categories);
            })
            .catch((error) => {
                console.error('Error while fetching categories:', error);
            });
    }, []);

    const handleChange = () => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${categorySelected}&difficulty=${difficultySelected}&type=multiple`)
            .then((response) => response.json())
            .then((data) => {
                setListQuestions(data.results);
            })
            .catch((error) => {
                console.error('Error while fetching questions:', error);
            });

    }

    return(
        <>
            <div className="container my-4">
                <h2 className="mb-4 text-primary">🎯 QUIZ MAKER</h2>

                <div className="row g-3 align-items-center">

                    <div className="col-md-6">
                        <label htmlFor="categorySelect" className="form-label fw-bold">
                            Category
                        </label>
                        <select
                            id="categorySelect"
                            className="form-select"
                            value={categorySelected}
                            onChange={(event) => setCategorySelected(event.target.value)}
                        >
                            <option value="">Select a category</option>
                            {listCategories.map((categorie) => (
                                <option key={categorie.id} value={categorie.id}>
                                    {categorie.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="difficultySelect" className="form-label fw-bold">
                            Difficulty
                        </label>
                        <select
                            id="difficultySelect"
                            className="form-select"
                            value={difficultySelected}
                            onChange={(event) => setDifficultySelected(event.target.value)}
                        >
                            <option value="">Select a difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <button id="createBtn" onClick={handleChange}>Create</button>
                    <br/>

                    {listQuestions && <Quiz listQuestions={listQuestions} />}

                </div>
            </div>


        </>
    )
}

export default QuizCreation;