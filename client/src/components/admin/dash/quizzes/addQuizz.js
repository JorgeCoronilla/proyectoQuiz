import React, { useContext, useState,useEffect } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { AddQuizzName } from './addQuizzName';
import { AddQuizzQuestion } from './addQuizzQuestion';
export const AddQuizz = ({setLogo, logo}) => {
 
  const { quizzName, showInput, setShowInput } = useContext(CreateQuizzContext);
 
  const add = () => {
    setShowInput(!showInput)
    setLogo(!logo)
  }

  useEffect(() => {
    var currentQuizz=localStorage.getItem("currentQuiz");
    if (currentQuizz!=="none") {var currentQuizz=parseInt(currentQuizz)};
  }, [showInput])

  if (showInput) {
    return (
      <div>
        {quizzName === "none" ? <AddQuizzName /> 
        : <AddQuizzQuestion />}
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
