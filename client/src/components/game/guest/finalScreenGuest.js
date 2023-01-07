import React from 'react'
import congrats from '../../../media/congrats.gif'
import { useNavigate } from 'react-router-dom'
export const FinalScreenGuest = () => {

  const navigate = useNavigate();
  const finish = () => {

    localStorage.setItem("sessionID", "0");
    localStorage.setItem("guestID", "0");
    localStorage.setItem("currentQuiz", "none")
    localStorage.setItem("currentQuestion", "0")
    navigate("/");
  } 

  return (
    <div>
          <div className='answeredgif'>
        <h3>¡Terminado!</h3>
        <h6>Ahora las puntuaciones finales ;)</h6>
        <img src={congrats} alt="loading..." />
        <button onClick={finish}>Terminar</button>
    </div>
    
    </div>
  )
}
