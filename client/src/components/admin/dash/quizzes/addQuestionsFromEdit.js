
import React, { useContext, useEffect, useState } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import Cookies from 'universal-cookie';
import { defaultFetch } from '../../../../helpers/defaultFetch';


export const AddQuestionsFromEdit = ({ setAddQuestion }) => {
    const [refresh, setRefresh] = useState(false);
    const cookies = new Cookies();
    useEffect(() => {
        setRightAnswer("")
        let value = cookies.get('session');
        const id = parseInt(localStorage.getItem("currentQuiz"))
        if (id !== null) {
            defaultFetch(`http://localhost:3001/questions`, "post", { token: value, quizz_id: id }).then((questions) => {
                setQuestions(questions);
            })
        }

    }, [refresh])

    const { setquestion, setQuestions,
        questionsArray, setQuestionsArray,
        setRightAnswer } = useContext(CreateQuizzContext);

    const addQuestion = e => {
        e.preventDefault();
        let arrayAux = [];
        setquestion(e.target.question.value)
        setAddQuestion("answers")
        
        if (questionsArray.length < 1) {
            setQuestionsArray([e.target.question.value]);
        } else {
            arrayAux = questionsArray;
            arrayAux = arrayAux.filter((item) => item != '');
            arrayAux.push(e.target.question.value);
            setQuestionsArray(arrayAux);
        }
    }

    return (
        <div>
            <div className='AddQuestion'>
                {questionsArray.length >= 1 &&
                    <div>{questionsArray.map(question => {
                        <p>{question.name}</p>
                    })}</div>
                }
                <h5>Pregunta nueva</h5>
                <form onSubmit={addQuestion}>
                    <textarea placeholder="Escribe la pregunta" required name="question" minLength="5" maxLength="80" />
                    <button type="submit" className='addList'>Añadir</button>
                </form>
            </div>
        </div>
    )
}
