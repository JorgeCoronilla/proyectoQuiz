import React from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import { Link } from 'react-router-dom';
import { BackHome } from './backHome';

export const SignIn = ({setDisplay}) => {
    const sigInSub = async e => {
        e.preventDefault();
        var userEmail = { email: e.target.email.value };
        const res = await defaultFetch("http://localhost:3001/signin", "POST", userEmail);
        if (res) { 
            console.log(res.mensaje)
            //navigate("/login")
          } else {
            //Mensaje de error
          }
        
    }

    return (
        <div>
            <div className='formContainer'>
                <form onSubmit={sigInSub}>
                    <h5>Regístrate para obtener tu cuenta</h5>
                    <p>A continuación confirme su correo electrónico para finalizar el registro.</p>
                    <input type="email" placeholder="email" required name="email"></input>
                    <div>
                    <input type="checkbox" className='checkbox' name="newsletter" />
                    <p className='checkbox'>Sí, deseo recibir noticias y ofertas de ApuShop acerca de productos, eventos, etc.</p></div>
                    <br/>
                    <button type='submit'>Registrarse</button>
                </form>
                <Link to='/login'>¿Ya tiene una cuenta? Iniciar sesión</Link>
            </div>
            <BackHome setDisplay={setDisplay}/>
        </div>
    )
}