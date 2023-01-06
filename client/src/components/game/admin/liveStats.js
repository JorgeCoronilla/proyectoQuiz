import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider';

export const LiveStats = () => {


    const { quizz, questions,
        display, setDisplay,
        userList, setUserList,
        currentQ, setCurrentQ,
        cA1, setcA1, cA2, setcA2, cA3, setcA3, cA4, setcA4,
        chA1, setchA1, chA2, setchA2, chA3, setchA3, chA4, setchA4,
        hB1, sethB1, hB2, sethB2, hB3, sethB3, hB4, sethB4,
        rightN, setrightN
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
                        <div > <p>{cA1}</p></div>
                        <div >  <p>{cA2}</p></div>
                        <div >  <p>{cA3}</p></div>
                        <div >  <p>{cA4}</p></div>
                    </div>
                </div>
            </div></div>
    )
}
