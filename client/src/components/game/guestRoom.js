import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
var socket = io.connect('http://localhost:4000');

export const GuestRoom = () => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [msgReceived, setMsgReceived] = useState('')
    const [currentAnswers, SetCurrentAnswers] = useState()

    useEffect(() => {
        socket.on('message', (msg) => {
            setMsgReceived(msg)
            //SetCurrentAnswers(msg.currentQuestion)
           

        })

        socket.on('answers', (currentQuestion) => {
            // setMsgReceived(msg.message)
            console.log(currentQuestion)
            SetCurrentAnswers(currentQuestion.incorrect_answers)
            
        })
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', message)
        setMessages([...messages, message])
        //Limpiamos el mensaje
        setMessage('');

    }
    return (
        <div>
            <div className="container mt-3">
                <div className="card mt-3 mb-3 shadow border-0" id="content-chat">
                    <div className="card-body">
                        <h1>Guest</h1>
                        <div id="mensajes">
                            {messages.map((message, index) => (
                                <p key={index}>{message}</p>
                            ))}
                            {<h6>Mensaje: {msgReceived}</h6>}
                        </div>
                        <form id="inputchat" onSubmit={handlerSubmit}>
                            <div className="d-flex">
                                <input type="text" className="form-control" placeholder="Mensaje..." onChange={e => setMessage(e.target.value)} value={message} />
                                <button className="btn btn-primary mx-3" type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <h1>Quizz</h1>
                {currentAnswers &&
                    <div>
                        {currentAnswers.map((answer, index) =>{ return     <p key={index}>{answer}</p>
                        })}
                    </div>}


            </div>
        </div>
    )
}