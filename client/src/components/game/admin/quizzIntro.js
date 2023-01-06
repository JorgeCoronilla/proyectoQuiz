import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider'

export const QuizzIntro = () => {
  const { quizz } = useContext(CreateGameContext);
  return (
    <div>
      <div>
        {quizz &&
          <div className='quizzIntro'>
            <h2>{quizz.name_}</h2>
            <h3>Introduce el código: {quizz.id}</h3>
            <h4>Tema: {quizz.topic}</h4>
            <h5>Dificultad: {quizz.level_}</h5>
          </div>
        }
      </div>
    </div>
  )
}
