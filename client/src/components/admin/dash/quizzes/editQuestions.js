import React, { useState, useContext, useEffect } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import Cookies from 'universal-cookie';
import { defaultFetch } from '../../../../helpers/defaultFetch';

export const EditQuestions = ({ refresh, setRefresh, currentQuizz }) => {
    const [showEdit, setShowEdit] = useState(false);
    const cookies = new Cookies();

    useEffect(()=>{
        let value = cookies.get('session')
        console.log(currentQuizz)
        defaultFetch(`http://localhost:3001/questions`, "post",
        { token: value, quizz_id: 66 })
        .then((res) => {
            setQuestions(res);
            console.log(res)
        })
    },[] )
    const edit = () => {
        setShowEdit(!showEdit)
    }

    const { setDisplay,
        questions, setQuestions
    } = useContext(CreateQuizzContext);

    const deleteQuestion = e => {
        let token = cookies.get('session')
        console.log(e.target.id)

        defaultFetch("http://localhost:3001/questions/delete", "DELETE", {id: e.target.id,token: token })
        .then((res) => {
          if (res.mensaje) {console.log(res)}
        })
        setShowEdit(!showEdit);
        setRefresh(!refresh);
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
        console.log(body)
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

    return (
        <div className='questionsLists2Container'>
            <h4>Preguntas ya creadas</h4>
            {questions &&
                <div>
                    {questions.map((question, index) => {
                        return <div className='questionsList2' key={index}>
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