import React from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultFetch } from '../../helpers/defaultFetch';
export const PinEnter = () => {
    const navigate = useNavigate();

    const goQuizz = (e) => {
        e.preventDefault();
     
       defaultFetch (`http://localhost:3001/game/session/check`, "post",
        { quizzid: e.target.pin.value})
        .then ((data, error)=> {
          localStorage.setItem("sessionID",data.id );
          console.log(data.id)
          navigate("/quizz");
        })
        localStorage.setItem("currentQuiz", JSON.stringify(e.target.pin.value));
    }
    return (
        <div>
            <div className='pinContainer'>
                <form onSubmit={goQuizz}>
                    <input className='pinInput' placeholder='PIN de juego' name="pin" ></input>
                    <button className='pinButton'>Comenzar</button>
                </form>
            </div>
        </div>
    )
}
