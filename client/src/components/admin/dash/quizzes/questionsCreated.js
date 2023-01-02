import React, { useState, useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import Cookies from 'universal-cookie';


export const QuestionsCreated = () => {
    const [showEdit, setShowEdit] = useState(false);
    const cookies = new Cookies();

    const edit = () => {
        setShowEdit(!showEdit)
    }

    const { setDisplay,
        questions
    } = useContext(CreateQuizzContext);

    const deleteQuestion = e => {

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

    }

    return (
        <div className='questionsListContainer'>
            <h4>Preguntas ya creadas</h4>
            {questions &&
                <div>
                    {questions.map((question, index) => {
                        return <div className='questionsList' key={index}>
                            {!showEdit ?
                                <div>
                                    <p key={index}>{(index + 1)}-{question.question}</p>
                                    <div className='linksRow'>
                                        <div><p id={question.id} onClick={edit} className="editar">editar</p></div>
                                        <div><p id={question.id} onClick={deleteQuestion} className="eliminar">eliminar</p></div>
                                    </div>

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
                                        <p onClick={edit}>volver</p>
                                        <button type="submit" className='addList'>Modificar</button>
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
