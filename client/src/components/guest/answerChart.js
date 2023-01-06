import React from 'react'


export const AnswerChart = ({socket, answers, user}) => {


    
const reply = (e) => {
    let replyTime = Date.now()
    const idUser = localStorage.getItem('guestID')
    const room = JSON.parse(localStorage.getItem('currentQuiz'));
      socket.emit('guestReply', { room: room, answer: e.currentTarget.textContent ,answerID:e.currentTarget.id, user: user, idUser: idUser, time: replyTime })
   }


  return (
    <div>     <div className='answerContainer'>
    {answers &&
      <div >
        {answers.map((answer, index) => 
          <div key={index} id={index} className='answerBtn'onClick={reply}>
            <h6 onClick={reply}>{answer}</h6>
            </div>
        )}
      </div>
    }
  </div></div>
  )
}
