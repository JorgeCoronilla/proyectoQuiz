import React, { useState } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { AddAnswers } from './addAnswers';
import { AddQuizz } from './addQuizz'
import { AddQuizzQuestion } from './addQuizzQuestion';
import { FinishQuizzCreation } from './finishQuizzCreation';
import { QuizzesList } from './quizzesList'

export const Quizzes = ({setLogo, logo}) => {
  const [display, setDisplay] = useState("main");
  const [quizzName, setQuizzName] = useState("none")
  const [question, setquestion] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [currentQuizz, setCurrentQuizz] = useState([]);
  const [questions, setQuestions] = useState();
  const [showInput, setShowInput] = useState(false);
  return (
    <CreateQuizzContext.Provider
      value={{
        setDisplay,
        question, setquestion,
        rightAnswer,setRightAnswer,
        wrongAnswers,setWrongAnswers,
        quizzName, setQuizzName,
        questionsArray, setQuestionsArray,
        questions, setQuestions,
        showInput, setShowInput
      }}>

      <div className='quizzContainer'>
        {display === "main" &&
          <div>
            <QuizzesList setLogo={setLogo} logo={logo}/>
            <AddQuizz setLogo={setLogo} logo={logo}  />
          </div>
        }
        {display === "adding" &&
          <div>
            <QuizzesList setLogo={setLogo}logo={logo}/>
            <AddAnswers setLogo={setLogo} logo={logo}/>
          </div>
        }
{display === "re-start" &&
          <div>
            <QuizzesList setLogo={setLogo}logo={logo}/>
            <AddQuizzQuestion setLogo={setLogo}logo={logo}/>
          </div>
        }


      </div>
    </CreateQuizzContext.Provider>
  )
}
