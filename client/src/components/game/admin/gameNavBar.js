import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider'

export const GameNavBar = () => {
 
  const start = () => { setDisplay("playing") }
  const { setDisplay } = useContext(CreateGameContext);

  return (
    <div>
      <div className='navbarHome'>
        <div className='linkNavbar2'>
          <h6 onClick={start} className='navLink2'>Comenzar QUIZZ</h6>
        </div>
      </div>
    </div>
  )
}

