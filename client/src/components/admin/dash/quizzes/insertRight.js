import React, { useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { QuestionsCreated } from './questionsCreated';

export const InsertRight = ({ editMode }) => {

    const { question, setRightAnswer, quizzName, questions
    } = useContext(CreateQuizzContext);

    const addRight = e => {
        e.preventDefault();
        setRightAnswer(e.target.right.value)
        e.target.right.value = "";
    }

    return (
        <div>
            {(questions && !editMode) &&
                <QuestionsCreated questions={questions} />
            }
            {!editMode &&
                <div className='AddQuestion'>
                    <div className="titleClose">
                        <div> <h5>Nombre del quizz:</h5></div>
                        <div></div>
                    </div>
                    <h4>{quizzName.name_}</h4>
                </div>
            }

            <div className='AddQuestion'>
                <form onSubmit={addRight}>
                    <div className="titleClose">
                        <div><h6>{question}</h6></div>
                    </div>
                    <div>
                        <p>Inserta la respuesta correcta</p>
                        <input type="text" name="right" minLength="2" maxLength="60"></input>
                        <button type="submit" className='addList'>Añadir</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
