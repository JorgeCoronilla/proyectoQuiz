import React, { useContext, useState } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider';

export const QuestionNavBar = ({fecha}) => {

    const { setDisplay, display, socket,
        setCurrentQ, currentQ,
        questions, hB1, sethB1, hB2, sethB2, hB3, sethB3, hB4, sethB4,
        rightN, setrightN, nextFunct, setNextFunct,
        setTimeOfReply, setPoints, setTimeName
    } = useContext(CreateGameContext);

    const room = localStorage.getItem('currentQuiz')
    const next = () => {
        if (nextFunct === 0) {
            if (rightN === 0) { sethB1(11) }
            if (rightN === 1) { sethB2(22) }
            if (rightN === 2) { sethB3(33) }
            if (rightN === 3) { sethB4(44) }
            setNextFunct(1)
        }

        if (nextFunct === 1) {
            setDisplay('stats')
            setNextFunct(2)
        }

        if (nextFunct === 2) {
            setDisplay('points')
            setNextFunct(3)
        }

        if (nextFunct === 3) {
            socket.emit('display', { room: room, state: "playing" })
            fecha = Date.now()
            localStorage.setItem("date", JSON.stringify(fecha))
            setTimeOfReply([]); setPoints([]); setTimeName([])
            setNextFunct(0)
            if (currentQ === (questions.length-1)) {
                setDisplay("final");
                socket.emit('display', { room: room, state: "final" })
            } else {
                setDisplay('playing');
                setCurrentQ((currentQ) => currentQ + 1)
            }
        }
    }

    return (
        <div>
            <div>
                <div className='navbarHome'>
                    <div className='linkNavbar2'><h6 onClick={next} className='navLink2'>Siguiente</h6></div>
                </div>
            </div>
        </div>
    )
}
