import React from 'react'

export const MainDash = ({setDisplay}) => {
    const account = () => { setDisplay("account") }
    const quizzes = () => { setDisplay("quizzes") }
  return (
    <div>
    <div className='quizzCuenta'>
                <h6 id='cuentaBtn' onClick={account}>Cuenta</h6>
                <h6 id='quizzesBtn' onClick={quizzes}>Quizzes</h6>
            </div>
    </div>
  )
}
