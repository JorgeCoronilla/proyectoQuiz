import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider';


export const AnswerChart = ({ answers, user, setDisplay }) => {
  const { socket, startTime, setstartTime } = useContext(CreateGameContext);
  let time, replyTime

  const reply = (e) => {
    setDisplay("answered")
    replyTime = Date.now()

      time = replyTime
      const room = JSON.parse(localStorage.getItem('currentQuiz'));
      const idUser = localStorage.getItem('guestID')
      socket.emit('guestReply', { room: room, answer: e.currentTarget.textContent, answerID: e.currentTarget.id, user: user, idUser: idUser, time: time })
    


  }
  return (
    <div>     <div className='answerContainer'>
      {answers &&
        <div >
          {answers.map((answer, index) =>
            <div key={index} id={index} className='answerBtn' onClick={reply}>
              <h6 onClick={reply}>{answer}</h6>
            </div>
          )}
        </div>
      }
    </div></div>
  )
}
