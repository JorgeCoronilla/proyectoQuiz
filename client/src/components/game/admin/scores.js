import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider';

export const Scores = () => {

    const { 
        timeName, points
    } = useContext(CreateGameContext);


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
                                    <div className={`barTime${Math.floor((score + 0.1) / 500)}`} >
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
