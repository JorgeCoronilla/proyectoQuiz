import React, { useContext } from 'react'
import { CreateQuizzContext } from '../../../../providers/createQuizProvider';
import { InsertRight } from './insertRight';
import { InsertWrong } from './insertWrong';

export const AddAnswers = () => {

    const { setDisplay,
        setquestion, question,
        rightAnswer, setRightAnswer,
        wrongAnswers, setWrongAnswers
    } = useContext(CreateQuizzContext);  

    return (
        <div>
             {rightAnswer === "" ? 
            <InsertRight/> 
            :<InsertWrong />
                }
        </div>
    )
}
