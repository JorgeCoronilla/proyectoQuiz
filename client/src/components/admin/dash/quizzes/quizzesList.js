import React, { useState, useEffect, useContext } from 'react'
import { QuizzListOpen } from './QuizzListOpen';
import Cookies from 'universal-cookie';
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { defaultFetch } from '../../../../helpers/defaultFetch';

export const QuizzesList = () => {
  const { setLogo, logo, setQuestions } = useContext(CreateQuizzContext)
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState();
  const cookies = new Cookies();

  useEffect(() => {
    let value = cookies.get('session')
    defaultFetch(`http://localhost:3001/quizzes`, "post", { token: value }).then((res) => {
      setQuizzes(res);
    })}, [showQuizzes])

  const checkQuizzes = () => {
    setShowQuizzes(!showQuizzes)
    setLogo(!logo)
    setQuestions(false)
  }
  return (
    <div>
      <div className='quizzListClose' onClick={checkQuizzes}>
        <p>Ver quizzes</p>
      </div>
      {showQuizzes && <QuizzListOpen quizzes={quizzes} setQuizzes={setQuizzes} />}
    </div>
  )
}
