import React, { useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { QuestionsCreated } from './questionsCreated';

export const InsertRight = () => {

    const { setDisplay,
        setquestion, question,
        rightAnswer, setRightAnswer,
        wrongAnswers, setWrongAnswers,
        quizzName, questions, setQuestions
    } = useContext(CreateQuizzContext);  


    const addRight = e => {
        console.log("Entra")
        e.preventDefault();
        console.log(e.target.right.value)
        setRightAnswer(e.target.right.value)
        e.target.right.value="";
    }

    const close = () => {
        setDisplay("main")
    }


    return (
        <div>
            {questions &&
             <QuestionsCreated questions={questions}/>
            }
              <div className='AddQuestion'>
                <div className="titleClose">
                    <div> <h5>Nombre del quizz:</h5></div>
                    <div></div>
                </div>
                <h4>{quizzName.name_}</h4>
            </div>
        <div className='AddQuestion'>   
        <form onSubmit={addRight}>  
            <div className="titleClose">
                <div><h6>{question}</h6></div>
            </div>
                <div>
                    <p>Inserta la respuesta correcta</p>
                    <input type="text" name="right"></input>
                    <button type="submit" className='addList'>Añadir</button>
                </div> 
        </form>
        </div>
        </div>
    )
}
