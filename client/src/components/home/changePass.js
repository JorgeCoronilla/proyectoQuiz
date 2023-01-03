import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { defaultFetch } from '../../helpers/defaultFetch';
import { Logo } from '../logo';
export const ChangePass = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const newPass = async e => {
    e.preventDefault();

    if (e.target.pass.value === e.target.confirmPass.value) {

      var newUser = {
        jwt: token,
        password_: e.target.pass.value
      }

      const res = await defaultFetch("http://localhost:3001/change-pass", "post", newUser)
      console.log(res)
      if (res) {
        navigate("/")
      } else {
        //Mensaje de error
      }

    } 
  }


  return (
    <div><Logo/>
    <div className='register-container'><div>
      <h5>Su email ha sido verificado.</h5>
    <h6>¡Gracias!</h6>
    <div className='recoverPass'>
      <form onSubmit={newPass}>
       
        <h4>Nueva contraseña</h4>
        <input type="password" name='pass' required></input>
        
        <h4>Confirma contraseña</h4>
        <input type="password" name='confirmPass' required></input>
       
        <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
    </div>
    </div>
  )
}
