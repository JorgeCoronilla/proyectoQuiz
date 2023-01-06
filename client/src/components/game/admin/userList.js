import React, { useContext } from 'react'
import { CreateGameContext } from '../../../providers/createGameProvider'

export const UserList = () => {
    const { userList }=useContext(CreateGameContext);

    return (
        <div>
            <div className='connectedUsers'>
                <h5>Usuarios conectados</h5>
                {userList &&
                    <div className='usersContainer'>
                        {userList.map((user, index) =>
                            <div key={index}>
                                {user.user &&
                                 <p key={index}>{user.user}</p>
                                }
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}
