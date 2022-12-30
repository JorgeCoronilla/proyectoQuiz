import React, { useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';

export const InsertRight = () => {

    const { setDisplay,
        setquestion, question,
        rightAnswer, setRightAnswer,
        wrongAnswers, setWrongAnswers
    } = useContext(CreateQuizzContext);  


    const addRight = e => {
        console.log("Entra")
        e.preventDefault();
        console.log(e.target.right.value)
        setRightAnswer(e.target.right.value)
    }

    const close = () => {
        setDisplay("main")
    }
    return (
        <div className='AddQuestion'>   
        <form onSubmit={addRight}>  
            <div className="titleClose">
                <div><h5>Pregunta</h5></div>
                <div><button className='close' onClick={close}>&#x2715;</button></div>
            </div>
            <h6>{question}</h6>
           
                <div>
                    <p>Inserta la respuesta correcta</p>
                    <input type="text" name="right"></input>
                    <button type="submit" className='addList'>Añadir</button>
                </div> 
        </form>
        </div>
    )
}
