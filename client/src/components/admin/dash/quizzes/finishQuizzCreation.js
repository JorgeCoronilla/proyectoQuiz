import React, { useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider'

export const FinishQuizzCreation = ({logo, setLogo}) => {
    const {setDisplay, setQuizzName, setShowInput, setQuestionsArray} = useContext(CreateQuizzContext)
    const finish = () => {
        setDisplay("main");
        setQuizzName("none");
        setShowInput(false);
        setLogo(true);
        setQuestionsArray([])
        localStorage.setItem("currentQuiz", "none");
    }
  return (
    <div> <div className='finish'>
    <h6 className='login' onClick={finish}>Terminar Quizz</h6>
</div></div>
  )
}