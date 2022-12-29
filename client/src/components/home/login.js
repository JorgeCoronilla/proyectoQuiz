import React from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import Cookies from 'universal-cookie';
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {

    const cookies = new Cookies();
    //const navigate = useNavigate();
    const [login_err, setLogin_err] = useState(false)
    const sendLogin = async e => {
       e.preventDefault();

        var user = {
            email: e.target.email.value,
            pass: e.target.pass.value
        };

      await defaultFetch("http://localhost:3001/login", "POST", user).then((res) => {
            if (res.validation) {
                localStorage.setItem("user", JSON.stringify(res.user));
                cookies.set('session', res.token, { path: '/' }); 
            }         
                //navigate("/home");
        });
    }
    return (
        <div>
            <div className='registro'>
                <form onSubmit={sendLogin}>
                    <p>Login</p>
                    <input type="email" name='email' placeholder='Correo electrónico' required></input>
                    <br />
                    <input type="password" name='pass' required></input>
                    <br />
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    )
}
