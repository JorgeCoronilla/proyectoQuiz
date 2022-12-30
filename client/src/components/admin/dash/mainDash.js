import React from 'react'

export const MainDash = ({setDisplay}) => {
    const account = () => { setDisplay("account") }
    const quizzes = () => { setDisplay("quizzes") }
  return (
    <div>
    <div className='linkContainer'>
                <h6 className='login' onClick={account}>Cuenta</h6>
                <h6 className='signin' onClick={quizzes}>Quizzes</h6>
            </div>
    </div>
  )
}
