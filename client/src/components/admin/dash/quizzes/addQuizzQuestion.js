import React, { useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';


export const AddQuizzQuestion = ({showInput, setShowInput}) => {
    const { setDisplay, setquestion,
        question, quizzName,
        questionsArray, setQuestionsArray
    } = useContext(CreateQuizzContext);

    const add = () => {
        setShowInput(!showInput)
    }

    const addQuestion = e => {
        e.preventDefault();
        let arrayAux = [];
        setquestion(e.target.question.value)
        setDisplay("adding")
        if (questionsArray.length < 1) {
            setQuestionsArray([e.target.question.value]);
        } else {
            arrayAux = questionsArray;
            arrayAux = arrayAux.filter((item) => item != '');
            arrayAux.push(e.target.question.value);
            setQuestionsArray(arrayAux);
        }
    }

    return (
        <div>
            <div className='AddQuestion'>
                <div className="titleClose">
                    <div> <h5>{quizzName.name}</h5></div>
                    <div><button className='close' onClick={add}>&#x2715;</button></div>
                </div>
                {questionsArray.length >= 1 &&
                    <div>{questionsArray.map(question => {
                        <p>{question.name}</p>
                    })}</div>
                }
                <h5>Pregunta</h5>
                <form onSubmit={addQuestion}>
                    <textarea placeholder="Escribe la pregunta" required name="question" />
                    <button type="submit" className='addList'>Añadir pregunta </button>
                </form>
            </div>
        </div>
    )
}
