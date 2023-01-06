import React from 'react'
import answeredgif from '../../media/answeredgif.gif'
export const Answered = () => {
  return (
    <div className='answeredgif'>
        <h3>¡Muy bien!</h3>
        <h6>Pero espera a los demás a ver qué tal ha ido.</h6>
        <img src={answeredgif} alt="loading..." />
    </div>
  )
}
