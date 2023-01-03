import React, { useContext, useEffect, useState } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { QuestionsCreated } from './questionsCreated';
import Cookies from 'universal-cookie';
import { defaultFetch } from '../../../../helpers/defaultFetch';
import { FinishQuizzCreation } from './finishQuizzCreation';


export const AddQuizzQuestion = ({setLogo, logo}) => {
    const [refresh, setRefresh] = useState(false);
    const cookies = new Cookies();
    useEffect(() => {
        setRightAnswer("")
        let value = cookies.get('session');
        const id = parseInt(localStorage.getItem("currentQuiz"))
        if (id !== null) {  
            defaultFetch(`http://localhost:3001/questions`, "post", { token: value, quizz_id: id }).then((questions) => {
            setQuestions(questions);
            console.log(questions)
        })}
      
    }, [refresh])
    
    const { setDisplay, setquestion,
        question, quizzName,
        questions, setQuestions,
        questionsArray, setQuestionsArray,
        setRightAnswer,
        showInput, setShowInput
    } = useContext(CreateQuizzContext);

    const add = () => {
        setShowInput(!showInput)
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
                    <div> <h5>Nombre del quizz:</h5></div>
                    <div><button className='close' onClick={add}>&#x2715;</button></div>
                </div>
                <h4>{quizzName.name_}</h4>
            </div>
            {questions &&
            <div>
             <QuestionsCreated questions={questions}refresh={refresh} setRefresh={setRefresh}/>
             </div>
            }

            <div className='AddQuestion'>
                {questionsArray.length >= 1 &&
                    <div>{questionsArray.map(question => {
                        <p>{question.name}</p>
                    })}</div>
                }
                <h5>Pregunta nueva</h5>
                <form onSubmit={addQuestion}>
                    <textarea placeholder="Escribe la pregunta" required name="question" />
                    <button type="submit" className='addList'>Añadir</button>
                </form>
            </div>
            {questions &&
            <FinishQuizzCreation setLogo={setLogo} logo={logo}/>
            }
        </div>
    )
}
