import React, { useContext, useEffect, useState } from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import { CreateGameContext } from '../../providers/createGameProvider';
import { FinalScreenGuest } from './guest/finalScreenGuest';
import { WaitingGuests} from './guest/waitingGuests'
import {Answered} from './guest/answered'
import {AnswerChart} from './guest/answerChart'

export const GuestQuizz = () => {
  const [display, setDisplay] = useState();
  const [answers, setAnswers] = useState();
  const [screen, setScreen] = useState(true);
  const [user, setUser] = useState()
  const { socket, startTime, setstartTime } = useContext(CreateGameContext);
  let replyTime;


  useEffect(() => {
    socket.on('display', (state) => {
      setDisplay(state);
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
      { quizzid: room, name: e.target.name.value, session, totalQuestions: 0, answers: [], times: [], points: 0, state: true })
      .then((res) => {
        id = res.id;
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




  return (

    <div>

      {screen &&
        <div className='guestName'>
          <form onSubmit={sendName}>
            <h3>Tu nombre</h3>
            <div className='guestStartInput'><input name='name'></input></div>

            <div className='guestStart'>
              <button className="guestStartBtn" type='submit'>Ok</button>
            </div>

          </form>
        </div>
      }
      {display === "waiting" &&
        <WaitingGuests />
      }

      {display === "playing" &&
        <AnswerChart answers={answers} user={user} replyTime={replyTime} setDisplay={setDisplay} />
      }
      {display === "answered" &&

        <Answered />
      }

      {display === "final" &&
        <div>
          <FinalScreenGuest />
        </div>
      }
    </div>
  )
}
