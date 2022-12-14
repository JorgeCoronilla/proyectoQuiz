import React, { useContext, useEffect, useState } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { QuestionsCreated } from './questionsCreated';
import Cookies from 'universal-cookie';
import { defaultFetch } from '../../../../helpers/defaultFetch';
import { FinishQuizzCreation } from './finishQuizzCreation';


export const AddQuizzQuestion = () => {
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

    const { setDisplay, setquestion,
        quizzName, questions, setQuestions,
        questionsArray, setQuestionsArray,
        setRightAnswer, showInput, setShowInput,
        setLogo, logo } = useContext(CreateQuizzContext);

    const add = () => {
        setShowInput(!showInput);
        setLogo(!logo)
    }

    const addQuestion = e => {
        e.preventDefault();
        let arrayAux = [];
        setquestion(e.target.question.value)
        setDisplay("adding")
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
                <div className="titleClose">
                    <div>
                        <h5>Nombre del quizz:</h5>
                    </div>
                    <div>
                        <button className='close' onClick={add}>&#x2715;</button>
                    </div>
                </div>
                <h4>{quizzName.name_}</h4>
            </div>
            {questions &&
                <div>
                    <QuestionsCreated questions={questions} refresh={refresh} setRefresh={setRefresh} />
                </div>
            }

            <div className='AddQuestion'>
                {questionsArray.length >= 1 &&
                    <div>{questionsArray.map(question => {
                        <p>{question.name}</p>
                    })}
                    </div>
                }
                <h5>Pregunta nueva</h5>
                <form onSubmit={addQuestion}>
                    <textarea placeholder="Escribe la pregunta" required name="question" minLength="5" maxLength="80" />
                    <button type="submit" className='addList'>A??adir</button>
                </form>
            </div>
            {questions &&
                <FinishQuizzCreation setLogo={setLogo} logo={logo} />
            }
        </div>
    )
}
