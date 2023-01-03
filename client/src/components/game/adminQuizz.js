import React, { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

export const AdminQuizz = ({ quizz, questions }) => {

    const [currentQuestion, setCurrentQuestion] = useState();
    const [questionNumber, SetQuestionNumber] = useState(0);
    const [refresh, setRefresh] = useState();
    const [newUser, setNewUser] = useState();


    useEffect(() => {


    }, [])

    const connect = () => {
        const room=quizz.id;
        var user_data = {
            user: quizz.fk_user_name,
            room: room,
            role: "admin"
        }
        socket.emit('join', user_data)
        socket.on('first_conn', (user_data) => {
            setNewUser(user_data)
            socket.to(room).emit('first_conn', user_data)
        })
        
    }
    return (
        <div>
            {quizz &&
                <div>
                    <h1>{quizz.name_}</h1>
                    <h4>Tema: {quizz.topic}</h4>
                    <h5>Dificultad: {quizz.level_}</h5>
                </div>
            }
            <h2>Usuarios conectados</h2>
            <p>Uno</p>
            <p>Dos</p>
            <p>Otro</p>
            <button onClick={connect}>Comenzar</button>
        </div>
    )
}
