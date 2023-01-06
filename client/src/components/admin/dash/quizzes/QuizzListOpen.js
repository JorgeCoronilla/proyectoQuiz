import React, { useState } from 'react'
import { FiPlay } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { defaultFetch } from '../../../../helpers/defaultFetch';
import { EditQuizz } from './editQuizz';
export const QuizzListOpen = ({ setDisplay, quizzes }) => {

  const [showEdit, setShowEdit] = useState(false);
  const [currentQuizz, setCurrentQuizz] = useState()
  const cookies = new Cookies();
  const navigate = useNavigate();

  const playQuizz = e => {
    localStorage.setItem("currentQuiz", JSON.stringify(e));
    defaultFetch(`http://localhost:3001/game/session`, "post",
    { quizzid: e, total_questions:0, guests:[], state:true })
    .then ((data, error)=> {
      localStorage.setItem("sessionID",data.id );
      navigate("/test");
    })

  }
  const editQuizz = e => {
    setShowEdit(!showEdit)
    setCurrentQuizz(e.target.id)

  }

  return (
    <div>
      <div className='quizzListOpen'>
        {quizzes.map((quizz, index) => {
          return (
            <div className='quizzListRow' key={index} >

              <div>
                <div className='titleClose'>
                  <div>
                    <h5 id={quizz.id} onClick={editQuizz}>{quizz.name_}</h5>
                  </div>
                  <div>
                    <h5 onClick={()=>playQuizz(quizz.id)}><span><FiPlay /></span></h5>
                  </div>
                  </div>
                <div>
                  <h6>Dificultad: {quizz.level_} | tema: {quizz.topic}</h6>
                </div>
              </div>
            </div>
          )
        })}
        {showEdit && <EditQuizz quizzes={quizzes} showEdit={showEdit} setShowEdit={setShowEdit} currentQuizz={currentQuizz} />
        }
      </div>

    </div>
  )
}