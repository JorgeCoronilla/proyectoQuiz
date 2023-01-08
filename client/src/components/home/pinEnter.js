import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultFetch } from '../../helpers/defaultFetch';
import { Alert } from '../modals/alert';
export const PinEnter = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(false);
    const goQuizz = (e) => {
        e.preventDefault();
     
       defaultFetch (`http://localhost:3001/game/session/check`, "post",
        { quizzid: e.target.pin.value})
        .then ((data, error)=> {
            if (data.mensaje === false) {
                setMessage("El pin no es correcto o el Quizz está cerrado")
                setShowAlert(true)
    
                setTimeout(()=>{ 
                    setShowAlert(false);
                },2000)
            } else {
                localStorage.setItem("sessionID",data.id );
                navigate("/quizz");
                localStorage.setItem("currentQuiz", JSON.stringify(e.target.pin.value));
            }
        
        })
       
    }
    return (
        <div>
             {showAlert &&
            <Alert message={message}/>
            }
            <div className='pinContainer'>
                <form onSubmit={goQuizz}>
                    <input className='pinInput' placeholder='PIN de juego' name="pin" minLength="1" maxLength="4"></input>
                    <button className='pinButton'>Comenzar</button>
                </form>
            </div>
        </div>
    )
}
