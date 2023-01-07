import React, { useContext, useEffect } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider';

export const Scores = () => {

    const { 
        timeName, points
    } = useContext(CreateGameContext);

    /*const [totalPoints]
    useEffect(()=> {

        defaultFetch(`http://localhost:3001/game/session/question/adding_answers`, "post",
        {questionid:questions[q].id, user: reply.user.user,time: usertime ,points:0})
        
    },[])
*/
    return (
        <div>

            <div>
                <h3 className='timeStatsTitle'>Puntuación</h3>
                <div className='timeStatsContainer'>
                    <div className='timeStatsNames'>
                        {timeName.map((user, index) =>
                            <div key={index}>
                                {user &&
                                    <p key={index}>{user}</p>
                                }
                            </div>
                        )}
                    </div>
                    <div className='timeStatsBars'>
                        {points.map((score, index) =>
                            <div key={index}>
                                {score >= 0 &&
                                    
                                    <div className={`barTime${Math.floor((score + 0.1) / 100)}`} >
                                        <p key={index}>{score}pts</p>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

//{/*<div className={`barTime${(score * 10)}`} >*/}