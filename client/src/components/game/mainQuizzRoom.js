import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { defaultFetch } from '../../helpers/defaultFetch';
import { CreateGameContext } from '../../providers/createGameProvider';
import { Logo } from '../logo';
import { AdminQuizz } from './adminQuizz';
import { GuessQuizz } from './guessQuizz';

export const MainQuizzRoom = () => {
    const cookies = new Cookies();
    const [userOk, setUserOk] = useState();
    const cookieCheck = cookies.get("session");
    const [quizz, setQuizz] = useState();
    const [questions, setQuestions] = useState();
    const quizzId = parseInt(localStorage.getItem('currentQuiz'))

    useEffect(() => {

        defaultFetch("http://localhost:3001/check", "POST",
            { token: cookieCheck })
            .then((res) => {
                if (res.mensaje) {
                    setUserOk(true);
                } else { setUserOk(false) }
            });
      

        if (userOk) {
            defaultFetch(`http://localhost:3001/quizz`, "post",
                { id: quizzId, token: cookieCheck })
                .then((res) => {
                    setQuizz(res)
                    console.log(res);
                })
        }
        if (userOk) {
            defaultFetch(`http://localhost:3001/questions`, "post",
            { token: cookieCheck, quizz_id: quizzId })
            .then((questions) => {
                setQuestions(questions);
                console.log(questions)
            })
        }
        

    }, [userOk])

    return (
        <CreateGameContext.Provider
        value={{quizz, questions }}>
        <div>
            <Logo />
            {userOk ? <AdminQuizz quizz={quizz} questions={questions}/> : <GuessQuizz />}
        </div>
        </CreateGameContext.Provider>
    )
}
