import React, { useState } from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { BackHome } from './backHome';
import { RecoverPass } from './recoverPass';
import { Alert } from '../modals/alert';

export const Login = ({setDisplay}) => {
const [recover, setRecover] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [message, setMessage] = useState(false);
const cookies = new Cookies();
const navigate = useNavigate();
    
    const recoverPass = () => {setRecover(true);}

    //Login
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
                navigate("/dash");
            }   else {
                setMessage("Contraseña o email incorrecto/s")
                setShowAlert(true)
    
                setTimeout(()=>{ 
                    setShowAlert(false);
                },3000)
            }
        });
        localStorage.setItem("currentQuiz", "none")
    }
    if (!recover){
        return ( //Muestra login
            <div>
                 {showAlert &&
            <Alert message={message}/>
            }
                <div className='formContainer'>
                    <form onSubmit={sendLogin}>
                        <div><h5>Login</h5></div>
                        <div><input type="email" name='email' placeholder='Correo electrónico' required minLength="5" maxLength="40"></input>
                        </div>
                        <div> <input type="password" name='pass' required placeholder='Contraseña'minLength="4" maxLength="12"></input></div>
                        <div><button type="submit">Log in</button></div>
                    </form>
                    <p onClick={recoverPass}>¿Olvidaste tu contraseña? Recupérala aquí.</p>
                </div>
                <BackHome setDisplay={setDisplay}/>
            </div>
        )
    } else { return ( //Muestra el componente de recuperación de comtraseña 
        
        <RecoverPass setRecover={setRecover} setDisplay={setDisplay}/>
        )
       
    }
 
}
