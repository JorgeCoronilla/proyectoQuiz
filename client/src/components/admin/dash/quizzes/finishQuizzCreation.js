import React, { useContext, useState } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider'
import { Alert } from '../../../modals/alert';

export const FinishQuizzCreation = () => {
  const { setDisplay, setQuizzName, setShowInput, setQuestionsArray, setLogo } = useContext(CreateQuizzContext)
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(false);

  const finish = () => {
    setMessage("Quizz registrado correctamente")
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false);
      setDisplay("main");
      setQuizzName("none");
      setShowInput(false);
      setLogo(true);
      setQuestionsArray([])
      localStorage.setItem("currentQuiz", "none");
    }, 3000)
  }

  return (
    <div>
      {showAlert &&
        <Alert message={message} />
      }
      <div className='finish'>
        <h6 className='login' onClick={finish}>Terminar Quizz</h6>
      </div>
    </div>
  )
}
