import React from 'react'
import { NavBarDash } from './navBarDash'

export const MainDash = ({setDisplay}) => {

    const account = () => { setDisplay("account") }
    const quizzes = () => { setDisplay("quizzes") }
    
  return (
    <div>
      <NavBarDash/>
    <div className='quizzCuenta'>
                <h6 id='cuentaBtn' onClick={account}>Cuenta</h6>
                <h6 id='quizzesBtn' onClick={quizzes}>Quizzes</h6>
            </div>
    </div>
  )
}
