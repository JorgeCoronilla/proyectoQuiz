import React from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import { Link } from 'react-router-dom';

export const SignIn = () => {
    const sigInSub = async e => {
        e.preventDefault();
        var userEmail = { email: e.target.email.value };
        const res = await defaultFetch("http://localhost:3001/signin", "POST", userEmail);
        console.log(res);
        if (res) { 
            //navigate("/login")
          } else {
            //Mensaje de error
          }
        
    }

    return (
        <div>
            <div className='registro'>
                <form onSubmit={sigInSub}>
                    <h6>Regístrate para obtener tu cuenta</h6>
                    <p>A continuación confirme su correo electrónico para finalizar el registro.</p>
                    <input type="email" placeholder="email" required name="email"></input>
                    <br />
                    <input type="checkbox" name="newsletter" />
                    <p>Sí, deseo recibir noticias y ofertas de ApuShop acerca de productos, eventos, etc.</p>
                    <button type='submit'>Registrarse</button>
                </form>
                <Link to='/login'>¿Ya tiene una cuenta? Iniciar sesión</Link>
            </div>
        </div>
    )
}