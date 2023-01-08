import React, { useEffect, useState } from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import { Link } from 'react-router-dom';
import { BackHome } from './backHome';
import { useNavigate } from 'react-router-dom'
import { Alert } from '../modals/alert';

export const SignIn = ({setDisplay}) => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(false);

    const sigInSub = async e => {
        e.preventDefault();
        var userEmail = { email: e.target.email.value };
        const res = await defaultFetch("http://localhost:3001/signin", "POST", userEmail);
        if (res) { 
            setMessage("Correo enviado correctamente")
            setShowAlert(true)

            setTimeout(()=>{ 
                setShowAlert(false);
                navigate("/")
            },3000)
           
          } else {
            setMessage("Perdona, algo ha salido mal, vuelve a intentarlo")
            setShowAlert(true)

            setTimeout(()=>{ 
                setShowAlert(false);
            },3000)
          }
    
    const alert = () => {

    }
    }

    return (
        <div>
            {showAlert &&
            <Alert message={message}/>
            }
            <div className='formContainer'>
                <form onSubmit={sigInSub}>
                    <h5>Regístrate para obtener tu cuenta</h5>
                    <p>A continuación confirme su correo electrónico para finalizar el registro.</p>
                    <input type="email" placeholder="email" required name="email" minLength="5" maxLength="40"></input>
                    <div>
                    <input type="checkbox" className='checkbox' name="newsletter" />
                    <p className='checkbox'>Sí, deseo recibir noticias y ofertas de ApuShop acerca de productos, eventos, etc.</p></div>
                    <br/>
                    <button type='submit'>Registrarse</button>
                </form>
                <Link to='/'>¿Ya tiene una cuenta? Iniciar sesión</Link>
            </div>
        </div>
    )
}
//<BackHome setDisplay={setDisplay}/>