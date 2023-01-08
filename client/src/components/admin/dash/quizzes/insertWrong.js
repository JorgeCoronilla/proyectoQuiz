import React, { useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import Cookies from 'universal-cookie';
import { QuestionsCreated } from './questionsCreated';

export const InsertWrong = ({ editMode }) => {

  const cookies = new Cookies();
  const { setDisplay, question, rightAnswer,
    quizzName, questions, setQuestions
  } = useContext(CreateQuizzContext);

  const addWrong = e => {
    e.preventDefault();

    let quizz_id = localStorage.getItem("currentQuiz");
    let right = rightAnswer;
    let ques = question;
    let token = cookies.get('session')

    let body = {
      question: ques,
      right_answer: right,
      wrong_answer1: e.target.wrong1.value,
      wrong_answer2: e.target.wrong2.value,
      wrong_answer3: e.target.wrong3.value,
      quizz_id: quizz_id,
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

    fetch("http://localhost:3001/questions/new", metaData)
      .then((res) => console.log(res))

    e.target.wrong1.value = "";
    e.target.wrong2.value = "";
    e.target.wrong3.value = "";
    if (!editMode) {
      setDisplay("main")
    }
    setQuestions(false)

  }

  return (
    <div>
      {(questions && !editMode) &&
        <QuestionsCreated questions={questions} />
      }
      {!editMode &&
        <div className='AddQuestion'>
          <div className="titleClose">
            <div> <h5>Nombre del quizz:</h5></div>
            <div></div>
          </div>
          <h4>{quizzName.name_}</h4>
        </div>
      }
      <div className='AddQuestion'>
        <form onSubmit={addWrong}>
          <div className="titleClose">
            <div><h6>{question}</h6></div>
          </div>
          <div>
            <h5>Respuesta correcta</h5>
            <h6>{rightAnswer}</h6>
            <div>
              <p>Inserta las respuestas <span>incorrectas</span></p>
              <input type="text" name="wrong1" minLength="2" maxLength="60"></input>
              <input type="text" name="wrong2" minLength="2" maxLength="60"></input>
              <input type="text" name="wrong3" minLength="2" maxLength="60"></input>
              <button type="submit">Añadir</button>
            </div>
          </div>
        </form>
      </div>
      <div className='spacer'></div>
    </div>
  )
}
