import decodeHtml from "../fonctionUtils";
import {useEffect, useState} from "react";

function Question({label,answers,onAnswer}) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    function handleClick(index) {
        setSelectedIndex(index);
        if (onAnswer) {
            onAnswer(answers[index]);
        }
    }

    useEffect(() => {
        setSelectedIndex(null)
    }, [answers]);

    return(
        <>
            <label>
                {decodeHtml(label)}
            </label>
            <br/>
            {
                answers.map((answer,index) => {
                    return (
                        <button
                            type="button"
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`btn ${selectedIndex === index ? 'btn-info' : 'btn-outline-primary'} m-1`}
                        >
                            {decodeHtml(answer)}
                        </button>
                    )
                })
            }
            <br/>
        </>
    )
}

export default Question;