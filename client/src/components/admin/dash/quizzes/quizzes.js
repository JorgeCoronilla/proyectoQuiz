import React, { useState } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { AddAnswers } from './addAnswers';
import { AddQuizz } from './addQuizz'
import { QuizzesList } from './quizzesList'

export const Quizzes = () => {
  const [display, setDisplay] = useState("main");
  const [quizzName, setQuizzName] = useState("none")
  const [question, setquestion] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([]);
  return (
    <CreateQuizzContext.Provider
      value={{
        setDisplay,
        question, setquestion,
        rightAnswer,setRightAnswer,
        wrongAnswers,setWrongAnswers,
        quizzName, setQuizzName,
        questionsArray, setQuestionsArray
      }}>

      <div>
        {display === "main" &&
          <div>
            <QuizzesList />
            <AddQuizz  />
          </div>
        }
        {display === "adding" &&
          <div>
            <QuizzesList  />
            <AddAnswers />
          </div>
        }
      </div>
    </CreateQuizzContext.Provider>
  )
}
