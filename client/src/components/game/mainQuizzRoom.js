import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'

import { defaultFetch } from '../../helpers/defaultFetch';
import { CreateGameContext } from '../../providers/createGameProvider';
import { Logo } from '../logo';
import { AdminQuizz } from './adminQuizz';
import { GuestQuizz } from './guestQuizz';

export const MainQuizzRoom = () => {
    const cookies = new Cookies();
    const [userOk, setUserOk] = useState(false);
    const cookieCheck = cookies.get("session");
    const [quizz, setQuizz] = useState();
    const [questions, setQuestions] = useState();
    const quizzId = parseInt(localStorage.getItem('currentQuiz'))
    const [display, setDisplay] = useState("start");
    const [userList, setUserList] = useState(["list"]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer1, setCurrentAnswer1] = useState(0);
    const [currentAnswer2, setCurrentAnswer2] = useState(0);
    const [currentAnswer3, setCurrentAnswer3] = useState(0);
    const [currentAnswer4, setCurrentAnswer4] = useState(0);
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
                quizz, questions,
                display, setDisplay,
                userList, setUserList,
                currentQuestion, setCurrentQuestion,
                currentAnswer1, setCurrentAnswer1,
                currentAnswer2, setCurrentAnswer2,
                currentAnswer3, setCurrentAnswer3,
                currentAnswer4, setCurrentAnswer4
            }}>
            <div>
                <Logo />
                {userOk ? <AdminQuizz /> : <GuestQuizz />}
            </div>
        </CreateGameContext.Provider>
    )
}
