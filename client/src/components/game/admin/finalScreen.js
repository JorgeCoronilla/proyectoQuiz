
import React from 'react'
import congrats from '../../../media/congrats.gif'
export const FinalScreen = () => {
  return (
    <div className='answeredgif'>
        <h3>¡Terminado!</h3>
        <h6>Ahora las puntuaciones finales ;)</h6>
        <img src={congrats} alt="loading..." />
    </div>
  )
}
