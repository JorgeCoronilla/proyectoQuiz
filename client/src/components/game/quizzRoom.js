import React, {useState} from 'react'
import { AdminRoom } from './adminRoom';
import { GuestRoom } from './guestRoom';

export const QuizzRoom = () => {
    const [user, setUser] = useState('');
    const change = (e) => {
        e.preventDefault();
       setUser(e.target.role.value)
       console.log(e.target.role.value)
       console.log(user)
    }
    return (
        <div>
            {!user &&
                <div>
                    <form onSubmit={change}>
                        <select name="role">
                            <option value="admin">admin</option>
                            <option value="guest">guest</option>
                        </select>
                        <button type='submit'>enviar</button>
                    </form>
                </div>
            }
            {user==="admin" && <AdminRoom/>}
             {user==="guest" && <GuestRoom/>}
        </div>

    )
}
