import React, { useState, useContext, useEffect } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import Cookies from 'universal-cookie';
import { defaultFetch } from '../../../../helpers/defaultFetch';
import { AddQuizzQuestion } from './addQuizzQuestion';
import { AddQuestionsFromEdit } from './addQuestionsFromEdit';
import { AddAnswers } from './addAnswers';

export const EditQuestions = ({ refresh, setRefresh, currentQuizz, setShowQuestions, showQuestions }) => {
    const [showEdit, setShowEdit] = useState(false);
    const cookies = new Cookies();
    const [addquestion, setAddQuestion] = useState("no");
    const [editMode, setEditMode] = useState(true)
    useEffect(() => {

        let value = cookies.get('session')
        defaultFetch(`http://localhost:3001/questions`, "post",
            { token: value, quizz_id: currentQuizz })
            .then((res) => {
                setQuestions(res);
            })
    }, [])

    const edit = () => {
        setShowEdit(!showEdit)
    }

    const { questions, setQuestions
    } = useContext(CreateQuizzContext);

    const deleteQuestion = e => {
        let token = cookies.get('session')


        defaultFetch("http://localhost:3001/questions/delete", "DELETE", { id: e.target.id, token: token })
            .then((res) => {
                if (res.mensaje) { console.log(res) }
            })
        setShowEdit(!showEdit);
    }
    const changeQuestion = e => {
        e.preventDefault();
        let token = cookies.get('session')

        let body = {
            question: e.target.question.value,
            right_answer: e.target.right.value,
            wrong_answer1: e.target.wrong1.value,
            wrong_answer2: e.target.wrong2.value,
            wrong_answer3: e.target.wrong3.value,
            id: e.target.question.id,
            token: token
        }

        let metaData = {
            method: 'post',
            body: JSON.stringify(body),
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
            },
        };

        fetch("http://localhost:3001/questions/update", metaData)
            .then((res) => console.log(res))
        setShowEdit(!showEdit)
        setRefresh(!refresh)
    }

    const showQ = () => {
        setShowQuestions(!showQuestions);
        setQuestions(false)
    }

    const addQ = () => {
        setAddQuestion("question")
    }

    return (
        <div className='quizzEdit-container'>
            <div className='questionEditList'>
                <div className="titleClose">
                    <div> <h4>Preguntas</h4></div>
                    <div ><button className='close' onClick={showQ}>&#x2715;</button></div>
                </div>
                {questions &&
                    <div>
                        {questions.map((question, index) => {
                            return <div className='questionEditListRow' key={index}>
                                {!showEdit ?
                                    <div>
                                        <div onClick={edit}>
                                            <p key={index}>{(index + 1)}-{question.question}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className='questionEdit'>
                                        <form onSubmit={changeQuestion}>
                                            <p>Pregunta</p>
                                            <input name="question" defaultValue={question.question} id={question.id} minLength="4" maxLength="10"></input>
                                            <p>Respuesta correcta</p>
                                            <input name="right" defaultValue={question.right_answer} ></input>
                                            <p>Respuestas incorrectas</p>
                                            <input name="wrong1" defaultValue={question.wrong_answer1} ></input>
                                            <input name="wrong2" defaultValue={question.wrong_answer2} ></input>
                                            <input name="wrong3" defaultValue={question.wrong_answer3} ></input>
                                            <button type="submit" >Modificar</button>
                                            <button onClick={edit} >volver</button>
                                            <button onClick={deleteQuestion} id={question.id}>Eliminar</button>
                                        </form>
                                    </div>
                                }
                            </div>
                        })}
                        {addquestion === "no" &&
                            <div className='questionEditListRow' onClick={addQ}><p>Añadir pregunta +</p></div>
                        }
                        {addquestion === "question" &&
                            <AddQuestionsFromEdit addquestion={addquestion} setAddQuestion={setAddQuestion} />
                        }

                        {addquestion === "answers" &&
                            <AddAnswers addquestion={addquestion} setAddQuestion={setAddQuestion} editMode={editMode} />}




                    </div>
                }
            </div>
            <div className='spacer'></div>
        </div>
    )
}

/*
  {questions &&
                <div>
                    {questions.map((question, index) => {
                        return <div className='questionsList' key={index}>
                            {!showEdit ?
                                <div onClick={edit}>
                                    <p key={index}>{(index + 1)}-{question.question}</p>
                                </div>
                                :
                                <div className='questionEdit'>
                                    <form onSubmit={changeQuestion}>
                                        <p>Pregunta</p>
                                        <input name="question" defaultValue={question.question} id={question.id}></input>
                                        <p>Respuesta correcta</p>
                                        <input name="right" defaultValue={question.right_answer} ></input>
                                        <p>Respuestas incorrectas</p>
                                        <input name="wrong1" defaultValue={question.wrong_answer1} ></input>
                                        <input name="wrong2" defaultValue={question.wrong_answer2} ></input>
                                        <input name="wrong3" defaultValue={question.wrong_answer3} ></input>

                                        <button type="submit" >Modificar</button>
                                        <button onClick={edit} >volver</button>
                                        <button onClick={deleteQuestion} id={question.id}>Eliminar</button>
                                    </form>
                                </div>
                            }
                        </div>
                    })}
                </div>
            }
*/