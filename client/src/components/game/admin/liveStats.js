import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider';

export const LiveStats = () => {


    const { cA1, cA2, cA3, cA4,
        chA1, chA2, chA3, chA4,
        hB1, hB2, hB3, hB4,
    } = useContext(CreateGameContext);

    return (
        <div>
            <div>
                <div className='statsContainer'>
                    <div className='barsContainer'>
                        <div className={`riseH${chA1}`} id={`bar${hB1}`}></div>
                        <div className={`riseH${chA2}`} id={`bar${hB2}`}></div>
                        <div className={`riseH${chA3}`} id={`bar${hB3}`}></div>
                        <div className={`riseH${chA4}`} id={`bar${hB4}`}></div>
                    </div>
                    <div className='tagsContainer'>
                        <div > <p>1</p></div>
                        <div >  <p>2</p></div>
                        <div >  <p>3</p></div>
                        <div >  <p>4</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
