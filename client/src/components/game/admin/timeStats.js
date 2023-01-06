import React, { useContext, useEffect } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider';

export const TimeStats = () => {

    const {
        timeName, timeOfReply
    } = useContext(CreateGameContext);

    return (
        <div>
            <h3 className='timeStatsTitle'>Tiempos</h3>
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
                    {timeOfReply.map((timeMs, index) =>
                        <div key={index}>
                            {timeMs &&
                                <div className={`barTime${Math.floor(timeMs / 100)}`} >
                                    <p key={index}>{timeMs}ms</p>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
