import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider';

export const QuestionNavBar = () => {
    const {setDisplay, display, 
        setCurrentQuestion, currentQuestion,
        questions
    } = useContext(CreateGameContext);
    const next = () => { setCurrentQuestion(currentQuestion+1) }


    return (
        <div>  <div>
            <div className='navbarHome'>
                <div className='linkNavbar2'><h6 onClick={next} className='navLink2'>Siguiente</h6></div>
            </div>
        </div></div>
    )
}
