import React, { useEffect, useState, useContext } from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import { CreateGameContext } from '../../providers/createGameProvider';
import { FinalScreen } from './admin/finalScreen';
import { GameNavBar } from './admin/gameNavBar';
import { LiveStats } from './admin/liveStats';
import { QuestionNavBar } from './admin/questionNavBar';
import { QuizzIntro } from './admin/quizzIntro';
import { Scores } from './admin/scores';
import { TimeStats } from './admin/timeStats';
import { UserList } from './admin/userList';
import { checkArray, checkReply, mixAnswers, timeNow } from './gameHelpers/helpers';


export const AdminQuizz = () => {

    const { quizz, questions, socket,
        display, setDisplay,
        userList, setUserList,
        currentQ, setCurrentQ,
        cA1, setcA1, cA2, setcA2, cA3, setcA3, cA4, setcA4,
        chA1, setchA1, chA2, setchA2, chA3, setchA3, chA4, setchA4,
        hB1, sethB1, hB2, sethB2, hB3, sethB3, hB4, sethB4,
        rightN, setrightN, nextFunct, startTime, setstartTime,
        timeName, setTimeName, timeOfReply, setTimeOfReply,
        points, setPoints, lastQ, setLastQ
    } = useContext(CreateGameContext);
    const quizzId = parseInt(localStorage.getItem('currentQuiz'))
    const room = localStorage.getItem('currentQuiz')
    const [reply1, setReply1] = useState();
    const [refresh, setRefresh] = useState(true);
    const [newUser, setNewUser] = useState();
    const [answers, setAnswers] = useState();
    let fecha;
    var startQTime, previousName = "None", previousTime = 1673085959576;

    const [sessionID, setSessionID] = useState(localStorage.getItem('sessionID'));
    
    ///De aquí para abajo


    useEffect(() => {
        if (currentQ > 0) {
            localStorage.setItem("currentQuestion", currentQ)
            if (currentQ === (questions.length)) {
                setDisplay("final");
            } else {
                setcA1(0); setcA2(0); setcA3(0); setcA4(0);
                setchA1(5); setchA2(5); setchA3(5); setchA4(5);
                sethB1(1); sethB2(2); sethB3(3); sethB4(4);
                setTimeOfReply([]); setPoints([]); setTimeName([])
                startQTime = 0;
                startQTime = timeNow();
                setstartTime(startQTime)
                const wAnswers = mixAnswers(questions, currentQ);
                setAnswers(wAnswers)
                setDisplay("playing");
                const room = JSON.stringify(quizz.id);
                socket.emit('display', { room: room, state: "playing" })
                socket.emit('answers', { room: room, answers: wAnswers })
                defaultFetch(`http://localhost:3001/game/session/question`, "post",
                { session: sessionID, quizzid:quizz.id , questionid:questions[currentQ].id,right_replies:[], 
                    wrong1_replies:[], wrong2_replies:[], wrong3_replies:[],users:[],times:[],points:[] })
            }
        }

    }, [currentQ])

    useEffect(() => {
        if (newUser) {
            setUserList([...userList, newUser]);

            defaultFetch(`http://localhost:3001/game/session/add_user`, "post",
                { _id: sessionID, guest: newUser.user })

            setNewUser(null);
        }
    }, [newUser])

    const connect = () => {
        const room = JSON.stringify(quizz.id);
        var user_data = {
            user: quizz.fk_user_name,
            room: room,
            role: "admin"
        }
        socket.emit('join', room);
        socket.emit('first_conn', user_data);
        socket.on('first_conn', (user_data) => {
            setNewUser(user_data);
            localStorage.setItem(user_data.user, "0")
        })

        setDisplay("waiting")
    }

    const mixAnswers = (questions, currentQ) => {
        let xNum = Math.floor(Math.random() * 4);
        setrightN(xNum)
        console.log(rightN)
        let wAnswers;
        if (questions) {
            wAnswers = [questions[currentQ].wrong_answer1,
            questions[currentQ].wrong_answer2,
            questions[currentQ].wrong_answer3]
            wAnswers.splice(xNum, 0, questions[currentQ].right_answer);
        }
        return (wAnswers)
    }

    const start = () => {

        defaultFetch(`http://localhost:3001/game/session/question`, "post",
        { session: sessionID, quizzid:quizz.id , questionid:questions[currentQ].id,right_replies:[], 
            wrong1_replies:[], wrong2_replies:[], wrong3_replies:[],users:[],times:[],points:[] })

        setLastQ(questions.length);
        console.log(questions)
        startQTime = timeNow();
        setstartTime(startQTime)
        const wAnswers = mixAnswers(questions, currentQ);
        setAnswers(wAnswers)
        setDisplay("playing");
        const room = JSON.stringify(quizz.id);
        socket.emit('display', { room: room, state: "playing" })
        socket.emit('answers', { room: room, answers: wAnswers })
        socket.on('guestReply', (reply) => {
            manageAnswer(reply)
        })
    }

    const manageAnswer = (reply) => {
        let usertime;
        if (((reply.time - previousTime) < 5) && (previousName === reply.user.user)) {
            console.log("No Debería pasar")
        } else {
            let q = parseInt(localStorage.getItem("currentQuestion"))
            let answer;
            if (reply) {
                let cQ = localStorage.getItem("currentQuestion");
                if (cQ==="0") {
                    usertime = (reply.time - startQTime);
                } else {
                    let dateNew = JSON.parse(localStorage.getItem('date'))
                    usertime = (reply.time - dateNew);
                }
               

                setTimeOfReply((timeOfReply) => ([...timeOfReply, usertime]));
                setTimeName((timeName) => ([...timeName, reply.user.user]));
                if (checkReply(reply, questions[q].right_answer)) {
                    answer = 1;
                    let calPoints = Math.floor(((15000 - usertime)/10))
                    let previous = JSON.parse(localStorage.getItem(reply.user.user))
                    previous = calPoints + previous;
                    localStorage.setItem(reply.user.user, JSON.stringify(previous))
                    
                    defaultFetch(`http://localhost:3001/game/session/question/adding_answers`, "post",
                    {questionid:questions[q].id, user: reply.user.user,time: usertime ,points:(answer)})
                    setPoints((points) => ([...points, (previous)]));
                } else {
                    answer = 0;
                    let previous = JSON.parse(localStorage.getItem(reply.user.user))
                    defaultFetch(`http://localhost:3001/game/session/question/adding_answers`, "post",
                    {questionid:questions[q].id, user: reply.user.user,time: usertime ,points:0})
                    setPoints((points) => ([...points, previous]))
                }

                defaultFetch(`http://localhost:3001/game/session/add_answer`, "post",
                    { _id: reply.idUser, answer, time: usertime })
                   
            }

        }
        previousTime = reply.time
        previousName = reply.user.user

        if (reply.answerID === "0") {
            setcA1((cA1) => cA1 + 1);
            setchA1((chA1) => chA1 + 15);
        }
        if (reply.answerID === "1") {
            setcA2((cA2) => cA2 + 1);
            setchA2((chA2) => chA2 + 15);
        }
        if (reply.answerID === "2") {
            setcA3((cA3) => cA3 + 1);
            setchA3((chA3) => chA3 + 15);
        }
        if (reply.answerID === "3") {
            setcA4((cA4) => cA4 + 1);
            setchA4((chA4) => chA4 + 15);
        }

    }

    return (
        <div>
            {display === "start" &&
                <div>
                    <div className='startQuizz'>
                        <button id="startQuizz" onClick={connect}>Comenzar</button>
                    </div>
                </div>
            }

            {display === "waiting" &&
                <div>
                    <div className='navbarHome'>
                        <div className='linkNavbar2'>
                            <h6 onClick={start} className='navLink2'>Comenzar QUIZZ</h6>
                        </div>
                    </div>
                    <QuizzIntro />
                    <UserList />

                </div>
            }
            {display === "playing" &&
                <div>
                    <QuestionNavBar socket={socket} fecha={fecha}/>
                    <div className='questionContainer'>
                        <h4>{questions[currentQ].question}</h4>
                    </div>
                    {nextFunct < 2 &&
                        <LiveStats />
                    }
                </div>
            }

            {display === "stats" &&
                <div>
                    <QuestionNavBar fecha={fecha}/>
                    <TimeStats />
                </div>
            }

            {display === "points" &&
                <div>
                    <QuestionNavBar fecha={fecha}/>
                    <Scores />
                </div>
            }

            {display === "final" &&
                <div>
                    <FinalScreen />
                </div>
            }
        </div>
    )
}

