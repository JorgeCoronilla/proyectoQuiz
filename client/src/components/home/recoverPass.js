import React, {useState} from 'react'
import { defaultFetch } from '../../helpers/defaultFetch';
import { useNavigate } from 'react-router-dom'
import { Alert } from '../modals/alert';
export const RecoverPass = ({setRecover}) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(false);
  const recover = async e => {
      e.preventDefault();
      var userEmail = { email: e.target.email.value };
      const res = await defaultFetch("http://localhost:3001/recover-pass", "POST", userEmail);
      if (res.mensaje) { 
        setMessage("Correo enviado correctamente " + e.target.email.value)
        setShowAlert(true)
        setTimeout(()=>{ 
            setShowAlert(false);
            navigate("/");
            setRecover(false);
        },3000)
        
        } 
      
  }

  return (
      <div>
        {showAlert &&
            <Alert message={message}/>
            }
          <div className='register-container'>
            
              <form onSubmit={recover}>
                  <h5>Ingresa el email que usaste para registrarte</h5>
                  <h6>Te enviaremos un correo con las instrucciones para cambiar tu contraseña</h6>
                  
                  <input type="email" required name="email" minLength="4" maxLength="12" ></input>
              
                 <button type='submit'>Enviar</button>
              
              </form>
             
          </div>
      </div>
  )
}