import React from 'react'

export const RecoverPass = () => {
  const recover = async e => {
      e.preventDefault();
      var userEmail = { email: e.target.email.value };
      const res = await defaultFetch("http://localhost:3001/recover-pass", "POST", userEmail);
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
              <form onSubmit={recover}>
                  <h6>Ingresa el email que usaste para registrarte</h6>
                  <p>Te enviaremos un correo con las instrucciones para cambiar tu contraseña</p>
                  <input type="email" placeholder={email} required name="email"></input>
                  <br />
                 <button type='submit'>Enviar</button>
              </form>
          </div>
      </div>
  )
}