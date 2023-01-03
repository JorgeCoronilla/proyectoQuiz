import React from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import { useNavigate } from 'react-router-dom'
export const RecoverPass = ({setRecover}) => {
  const navigate = useNavigate();
  const recover = async e => {
      e.preventDefault();
      var userEmail = { email: e.target.email.value };
      const res = await defaultFetch("http://localhost:3001/recover-pass", "POST", userEmail);
      if (res.mensaje) { 
          setRecover(false);
        } else {
          //Mensaje de error
        }
      
  }

  return (
      <div>
          <div className='register-container'>
            
              <form onSubmit={recover}>
                  <h5>Ingresa el email que usaste para registrarte</h5>
                  <h6>Te enviaremos un correo con las instrucciones para cambiar tu contraseña</h6>
                  
                  <input type="email" required name="email"></input>
              
                 <button type='submit'>Enviar</button>
              
              </form>
             
          </div>
      </div>
  )
}