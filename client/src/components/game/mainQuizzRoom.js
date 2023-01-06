import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'

import { defaultFetch } from '../../helpers/defaultFetch';
import { CreateGameContext } from '../../providers/createGameProvider';
import { Logo } from '../logo';
import { AdminQuizz } from './adminQuizz';
import { GuestQuizz } from './guestQuizz';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

export const MainQuizzRoom = () => {
    const cookies = new Cookies();
    const [userOk, setUserOk] = useState(false);
    const cookieCheck = cookies.get("session");
    const [quizz, setQuizz] = useState();
    const [questions, setQuestions] = useState();
    const quizzId = parseInt(localStorage.getItem('currentQuiz'))
    const [display, setDisplay] = useState("start");
    const [userList, setUserList] = useState(["list"]);
    const [currentQ, setCurrentQ] = useState(0);
    const [cA1, setcA1] = useState(0);
    const [cA2, setcA2] = useState(0);
    const [cA3, setcA3] = useState(0);
    const [cA4, setcA4] = useState(0);
    const [chA1, setchA1] = useState(5);
    const [chA2, setchA2] = useState(5);
    const [chA3, setchA3] = useState(5);
    const [chA4, setchA4] = useState(5);
    const [hB1, sethB1] = useState(1);
    const [hB2, sethB2] = useState(2);
    const [hB3, sethB3] = useState(3);
    const [hB4, sethB4] = useState(4);
    const [rightN, setrightN] = useState();
    const [nextFunct, setNextFunct] = useState(0);
    const [startTime, setstartTime] = useState(0);
    const [timeName, setTimeName] = useState([]);
    const [timeOfReply, setTimeOfReply] = useState([]);
    const [ points, setPoints] = useState([]);
    const [ lastQ, setLastQ] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        if (cookieCheck) {
            defaultFetch("http://localhost:3001/check", "POST",
                { token: cookieCheck })
                .then((res) => {
                    if (res.mensaje) {
                        defaultFetch(`http://localhost:3001/quizz`, "post",
                            { id: quizzId, token: cookieCheck })
                            .then((res) => {
                                setQuizz(res)
                            });
                        defaultFetch(`http://localhost:3001/questions`, "post",
                            { token: cookieCheck, quizz_id: quizzId })
                            .then((res) => {
                                setQuestions(res);
                            })
                        setUserOk(true);
                    } else {
                        setUserOk(false);
                        navigate("/");
                    }
                });
        } else {
            let sessionCheck = localStorage.getItem('sessionID')

            if (sessionCheck) {
                defaultFetch(`http://localhost:3001/game/session/check_byid`, "post",
                    { id: sessionCheck })
                    .then((data, error) => {
                        if (!data.state) {
                            console.log("Ese quizz está finalizado")
                            navigate("/");
                        }
                    })
            }
        }


    }, [])

    return (
        <CreateGameContext.Provider
            value={{
                socket,
                quizz, questions,
                display, setDisplay,
                userList, setUserList,
                currentQ, setCurrentQ,
                cA1, setcA1, cA2, setcA2, cA3, setcA3, cA4, setcA4,
                chA1, setchA1, chA2, setchA2, chA3, setchA3, chA4, setchA4,
                hB1, sethB1, hB2, sethB2, hB3, sethB3, hB4, sethB4, rightN, setrightN,
                nextFunct, setNextFunct, startTime, setstartTime,
                timeName, setTimeName, timeOfReply, setTimeOfReply,
                points, setPoints, lastQ, setLastQ
            }}>
            <div>
                <Logo />
                {userOk ? <AdminQuizz socket={socket}/> : <GuestQuizz socket={socket}/>}
            </div>
        </CreateGameContext.Provider>
    )
}
