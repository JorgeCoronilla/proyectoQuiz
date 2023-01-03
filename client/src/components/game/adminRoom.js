import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {quizz} from './quizz';
var socket = io.connect('http://localhost:4000');


export const AdminRoom = () => {

     const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [msgReceived, setMsgReceived] = useState('')
    const [currentQuizz,setCurrentQuizz]=useState();
    const [currentQuestion, setCurrentQuestion] = useState();
    const [questionNumber, SetQuestionNumber]=useState(0);

   useEffect(() => {
    setCurrentQuizz(quizz)
    setCurrentQuestion(quizz.results[questionNumber])
    console.log(quizz)
    console.log(currentQuizz)
    console.log(currentQuestion)
    socket.on('message', (msg) => {
            setMsgReceived(msg)
        })
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', message )
        setMessages([...messages, message])
        //Limpiamos el mensaje
        setMessage('');

    }

    const next = () => {
       SetQuestionNumber(questionNumber+1)
        setCurrentQuestion(quizz.results[questionNumber])
        socket.emit('answers', currentQuestion)
    }
    return (
        <div>
        <div className="container mt-3">
            <div className="card mt-3 mb-3 shadow border-0" id="content-chat">
                <div className="card-body">
                    <h1>Admin</h1>
                    <div id="mensajes">
                        {messages.map((message, index) => (
                            <h3 key={index}>{message}</h3>
                        ))}
                        <h6>Mensaje: {msgReceived}</h6>
                    </div>
                    <form id="inputchat" onSubmit={handlerSubmit}>
                        <div className="d-flex">
                            <input type="text" className="form-control" placeholder="Mensaje..." onChange={e => setMessage(e.target.value)} value={message} />
                            <button className="btn btn-primary mx-3" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div>
            <h1>Quizz</h1>
            {currentQuestion &&
            <div>
            <h3>Pregunta: {currentQuestion.question}</h3>
            <button onClick={next}>next</button>
            </div>
            }
            
        </div>
        </div>
        )
}