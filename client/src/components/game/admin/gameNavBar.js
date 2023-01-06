import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider'

export const GameNavBar = () => {
    const account = () => { setDisplay("account") }
    const start = () => { setDisplay("playing") }
    const {setDisplay, display}=useContext(CreateGameContext);
  return (
    <div>
          <div className='navbarHome'>
    <div className='linkNavbar2'>
      <h6 onClick={start}className='navLink2'>Comenzar QUIZZ</h6>
      </div>
  </div>
    </div>
  )
}

