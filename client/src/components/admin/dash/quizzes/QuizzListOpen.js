import React from 'react'
import { FiPlay } from "react-icons/fi";

export const QuizzListOpen = ({ setDisplay, quizzes }) => {
const playQuizz = e => {
 console.log(e.target.id)
}
const quizzStats = e => {
  console.log(e.target.id)
 }
 const editQuizz = e => {
  console.log(e.target.id)
 }
 const deleteQuizz = e => {
  console.log(e.target.id)
 }
  return (

    <div className='quizzListOpen'>
      {quizzes.map((quizz, index) => { 
        return(
          <div className='quizzListRow' key={index}>
          <h5 id={quizz.id} onClick={playQuizz}><span><FiPlay /></span>{quizz.name_}</h5>
          <div><h6>Dificultad: {quizz.level_} | tema: {quizz.topic}</h6></div>
          <div className='linksRow'>
            <div><p id={quizz.id} onClick={quizzStats}>stats</p></div>
            <div><p id={quizz.id} onClick={editQuizz}>editar</p></div>
            <div><p id={quizz.id} onClick={deleteQuizz}>eliminar</p></div>
            </div>
        </div>
        )})}
    </div>

  )
}
