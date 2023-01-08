
import React from 'react'
import { defaultFetch } from '../../../helpers/defaultFetch'
import congrats from '../../../media/congrats.gif'
import { useNavigate } from 'react-router-dom'

export const FinalScreen = () => {

  const navigate = useNavigate();

  const finish = () => {
    let _id = localStorage.getItem("sessionID")
    defaultFetch(`http://localhost:3001/game/session/close`, "post", { _id })

    localStorage.setItem("sessionID", "0");
    localStorage.setItem("currentQuiz", "none")
    localStorage.setItem("currentQuestion", "0")
    navigate("/dash");
  }
  return (
    <div className='answeredgif'>
      <h3>¡Terminado!</h3>
      <h6>Muchas gracias por haber participado ;)</h6>
      <img src={congrats} alt="loading..." />
      <button onClick={finish}>Terminar</button>
    </div>
  )
}
