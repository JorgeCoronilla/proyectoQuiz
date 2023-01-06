import React, { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client';
import { defaultFetch } from '../../helpers/defaultFetch';
import { CreateGameContext } from '../../providers/createGameProvider';
import { GameNavBar } from './admin/gameNavBar';
import { QuestionNavBar } from './admin/questionNavBar';
import { QuizzIntro } from './admin/quizzIntro';
import { UserList } from './admin/userList';
import { checkReply, mixAnswers } from './gameHelpers/helpers';

const socket = io.connect('http://localhost:4000');

export const AdminQuizz = () => {

    const { quizz, questions,
        display, setDisplay,
        userList, setUserList,
        currentQuestion, setCurrentQuestion,
        // currentAnswer1, setCurrentAnswer1,
        // currentAnswer2, setCurrentAnswer2,
        //  currentAnswer3, setCurrentAnswer3,
        //  currentAnswer4, setCurrentAnswer4
    } = useContext(CreateGameContext);

    const [reply, setReply] = useState();
    const [refresh, setRefresh] = useState(true);
    const [newUser, setNewUser] = useState();
    const [answers, setAnswers] = useState();
    const [currentAnswer1, setCurrentAnswer1] = useState(0);
    const [currentAnswer2, setCurrentAnswer2] = useState(0);
    const [currentAnswer3, setCurrentAnswer3] = useState(0);
    const [currentAnswer4, setCurrentAnswer4] = useState(0);
    const [bar1, setBar1] = useState({ height: "10px" });
    const [bar2, setBar2] = useState({ height: "10px" });
    const [bar3, setBar3] = useState({ height: "10px" });
    const [bar4, setBar4] = useState({ height: "10px" });
    const [heightValue, setHeightValue] = useState()
    const [sessionID, setSessionID] = useState(localStorage.getItem('sessionID'));
    var count1 = 0, count2 = 0, count3 = 0, count4 = 0;


    useEffect(() => {
        if (newUser) {
            setUserList([...userList, newUser]);

            defaultFetch(`http://localhost:3001/game/session/add_user`, "post",
                { _id: sessionID, guest: newUser.user })
                .then((res) => {
                    console.log(res)

                });
            setNewUser(null);
        }
    }, [newUser])

    useEffect(() => {

    }, [currentAnswer1, currentAnswer2, currentAnswer3, currentAnswer4])

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
        })
        setDisplay("waiting")
    }

    const changeDisplay = () => {
        const room = JSON.stringify(quizz.id);
        socket.emit('display', { room: room, state: "connect" })
    }

    const mixAnswers = (questions, currentQuestion) => {
        let xNum = Math.floor(Math.random() * 4);
        let wAnswers;
        if (questions) {
            wAnswers = [questions[currentQuestion].wrong_answer1,
            questions[currentQuestion].wrong_answer2,
            questions[currentQuestion].wrong_answer3]
            wAnswers.splice(xNum, 0, questions[currentQuestion].right_answer);
        }
        return (wAnswers)
    }

    const start = () => {
        const wAnswers = mixAnswers(questions, currentQuestion);
        setAnswers(wAnswers)
        setDisplay("playing");
        const room = JSON.stringify(quizz.id);
        socket.emit('display', { room: room, state: "playing" })
        socket.emit('answers', { room: room, answers: wAnswers })
        socket.on('guestReply', (reply) => {
            const right = questions[currentQuestion].right_answer;
            (checkReply(reply, right))
            setReply(reply)
            setRefresh(!refresh)
            manageAnswer(reply)
        })
    }

    const manageAnswer = (reply) => {
        if (reply.answerID === "0") {
            setCurrentAnswer1((currentAnswer1) => currentAnswer1 + 1);
         setHeightValue((currentAnswer1 * 25))
            setBar1({ height: `${heightValue}px` })
            console.log(heightValue)
        }
        if (reply.answerID === "1") {
            setCurrentAnswer2((currentAnswer2) => currentAnswer2 + 1);
            setBar2({ height: `${currentAnswer2 * 25}px` })
        }
        if (reply.answerID === "2") {
            setCurrentAnswer3((currentAnswer3) => currentAnswer3 + 1);
            setBar3({ height: `${currentAnswer3 * 25}px` })
        }
        if (reply.answerID === "3") {
            setCurrentAnswer4((currentAnswer4) => currentAnswer4 + 1);
            setBar4({ height: `${currentAnswer4 * 25}px` })
        }
        const right = questions[currentQuestion].right_answer;
        let answer;

        (checkReply(reply, right)) ? answer = 1 : answer = 0;
        defaultFetch(`http://localhost:3001/game/session/add_answer`, "post",
            { _id: reply.idUser, answer })

    }

    return (
        <div>
            {display === "start" &&
                <div>
                    <QuizzIntro />
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
                    <QuestionNavBar />
                    <div className='questionContainer'>
                        <h4>{questions[currentQuestion].question}</h4>
                    </div>
                    <div className='statsContainer'>
                        <div className='barsContainer'>
                            <div style={bar1} className='bar1'></div>
                            <div style={bar2} className='bar2'></div>
                            <div style={bar3} className='bar3'></div>
                            <div style={bar4} className='bar4'></div>
                        </div>
                        <div className='tagsContainer'>
                            <div > <p>{currentAnswer1}</p></div>
                            <div >  <p>{currentAnswer2}</p></div>
                            <div >  <p>{currentAnswer3}</p></div>
                            <div >  <p>{currentAnswer4}</p></div>
                        </div>
                    </div>


                </div>
            }

            {display === "stats" &&
                <div>
                </div>
            }
            <button onClick={changeDisplay}>Cambiar estado</button>
        </div>
    )
}
