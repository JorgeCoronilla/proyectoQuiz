import React, { useContext, useState } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import Cookies from 'universal-cookie';
import { Alert } from '../../../modals/alert';

export const AddQuizzName = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(false);

    const { setQuestions, setQuizzName, showInput, setShowInput, logo, setLogo } = useContext(CreateQuizzContext);
    const cookies = new Cookies();

    const add = () => {
        setShowInput(!showInput);
        setLogo(!logo);
    }
    const addQuizz = async e => {
        e.preventDefault();
        setQuestions(false)
        let token = cookies.get('session')
        let body = {
            name_: e.target.name.value,
            topic: e.target.topic.value,
            level_: e.target.level.value,
            token: token
        }
        setQuizzName(body)

        let metaData = {
            method: 'post',
            body: JSON.stringify(body),
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json",
            },
        };

        fetch("http://localhost:3001/quizzes/new", metaData).then(res => res.json())
            .then((res) => {
                localStorage.setItem("currentQuiz", JSON.stringify(res))
                setMessage("Quizz creado correctamente")
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000)
            })
    }

    return (
        <div>
            {showAlert &&
                <Alert message={message} />
            }
            <div className='AddQuestion'>
                <div className="titleClose">
                    <div><h5 className='quizzName'>Nombre del Quizz</h5></div>
                    <div><button className='close' onClick={add}>&#x2715;</button></div>
                </div>
                <form onSubmit={addQuizz}>
                    <input placeholder="Escribe el título" required name="name" minLength="5" maxLength="60" />
                    <h4>Tema del quizz</h4>
                    <input placeholder="Tema" required name="topic" minLength="5" maxLength="40"></input>
                    <h4>Dificultad</h4>
                    <select name="level">
                        <option>fácil</option>
                        <option>normal</option>
                        <option>difícil</option>
                    </select>
                    <button type="submit" className='addList'>Continuar</button>
                </form>
            </div>
        </div>
    )
}
