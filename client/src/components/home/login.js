import React, { useState } from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { BackHome } from './backHome';
import { RecoverPass } from './recoverPass';

export const Login = ({setDisplay}) => {
const [recover, setRecover] = useState(false);
    const cookies = new Cookies();
    const navigate = useNavigate();
    const recoverPass = () => {
        setRecover(true);
    }
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
                console.log("logueado");
                navigate("/dash");
            }   
        });
        localStorage.setItem("currentQuiz", "none")
    }
    if (!recover){
        return (
            <div>
                <div className='formContainer'>
                    <form onSubmit={sendLogin}>
                        <div><h5>Login</h5></div>
                        <div><input type="email" name='email' placeholder='Correo electrónico' required ></input>
                        </div>
                        <div> <input type="password" name='pass' required placeholder='Contraseña'></input></div>
                        <div><button type="submit">Log in</button></div>
                    </form>
                    <p onClick={recoverPass}>¿Olvidaste tu contraseña? Recupérala aquí.</p>
                </div>
                <BackHome setDisplay={setDisplay}/>
            </div>
        )
    } else{
        return ( 
        
        <RecoverPass setRecover={setRecover}/>
        )
       
    }
 
}
