import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { defaultFetch } from '../../helpers/defaultFetch';
import { WaitingGuests } from '../guest/waitingGuests';
const socket = io.connect('http://localhost:4000');

export const GuestQuizz = () => {
  const [display, setDisplay] = useState();
  const [answers, setAnswers] = useState();
  const [screen, setScreen] = useState(true);
  const [user, setUser] = useState()
  
  useEffect(() => {
    socket.on('display', (state) => {
      setDisplay(state);
      console.log(state)
    });
    socket.on('answers', (answers) => {
      setAnswers(answers);
    })

   

  }, [display])


  const sendName = (e) => {
    e.preventDefault();
    var room = JSON.parse(localStorage.getItem('currentQuiz'));
    var session = localStorage.getItem('sessionID')
    let id;

    defaultFetch(`http://localhost:3001/game/session/start_guest`, "post",
    {quizzid: room, name: e.target.name.value, session,totalQuestions: 0, answers: [], state: true})
    .then((res) => {
      id= res.id;
      localStorage.setItem('guestID', res.id)

    });


    var user_data = {
      user: e.target.name.value,
      room: room,
      id: id,
      role: "guest"
    }

    socket.emit('join', room);
    socket.emit('first_conn', user_data);
    setUser(user_data)

    setDisplay("waiting")
    setScreen(false)
  }

  const reply = (e) => {
    console.log(e.currentTarget.textContent)
    console.log(e.currentTarget.id)
    const idUser = localStorage.getItem('guestID')
    const room = JSON.parse(localStorage.getItem('currentQuiz'));
    socket.emit('guestReply', { room: room, answer: e.currentTarget.textContent ,answerID:e.currentTarget.id, user: user, idUser: idUser})
  }

  return (

    <div>

      {screen &&
        <div className='guestName'>
          <form onSubmit={sendName}>
            <h3>Tu nombre</h3>
            <input name='name'></input>
            <div className='startQuizz'>
              <button id="startQuizz" type='submit'>Ok</button>
            </div>

          </form>
        </div>
      }
      {display === "waiting" &&
        <WaitingGuests />
      }

      {display === "playing" &&
        <div className='answerContainer'>
          {answers &&
            <div >
              {answers.map((answer, index) => 
                <div key={index} id={index} className='answerBtn'onClick={reply}>
                  <h6 onClick={reply}>{answer}</h6>
                  </div>
              )}
            </div>
          }
        </div>
      }

    </div>
  )
}
