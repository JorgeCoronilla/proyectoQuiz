import React, { useContext, useState,useEffect } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { AddQuizzName } from './addQuizzName';
import { AddQuizzQuestion } from './addQuizzQuestion';
export const AddQuizz = () => {
  const [showInput, setShowInput] = useState(false);
  const { quizzName } = useContext(CreateQuizzContext);

  const add = () => {
    setShowInput(!showInput)
  }

  useEffect(() => {}, [showInput])

  if (showInput) {
    return (
      <div>
        {quizzName === "none" ? <AddQuizzName showInput={showInput} setShowInput={setShowInput}/> 
        : <AddQuizzQuestion  showInput={showInput} setShowInput={setShowInput}/>}
        <div className='spacer'></div>
      </div>
    )
  }
  return (
    <div onClick={add} className='AddQuizz'>
      <p >Añadir quizz</p>
      <p>&#10009;</p>
    </div>
  )
}
