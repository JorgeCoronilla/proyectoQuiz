import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { defaultFetch } from '../../helpers/defaultFetch';
export const ChangePass = () => {
  const [warning, setWarning] = useState(false);
  const { token } = useParams();
  //const navigate = useNavigate();

  const newPass = async e => {
    e.preventDefault();

    if (e.target.pass.value === e.target.confirmPass.value) {

      var newUser = {
        jwt: token,
        password_: e.target.pass.value
      }

      const res = await defaultFetch("http://localhost:3001/change-pass", "PUT", newUser)
      console.log(res)
      if (res) {
        //navigate("/login")
      } else {
        //Mensaje de error
      }

    } else {
      setWarning(true);
    }
  }


  return (
    <div><div>Su email ha sido verificado.
    ¡Gracias!
    <div className='registro'>
      <form onSubmit={newPass}>
        <br />
        <p>Contraseña</p>
        <input type="password" name='pass' required></input>
        <br />
        <p>Confirma contraseña</p>
        <input type="password" name='confirmPass' required></input>
        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
    </div>
  )
}
