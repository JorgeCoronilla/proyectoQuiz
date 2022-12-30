import React from 'react'

export const BackHome = ({setDisplay}) => {
    const backHome = () => { setDisplay("main") }
  return (
    <div> <div className='linkContainer'>
    <h6 className='login' onClick={backHome}>Volver</h6>
</div></div>
  )
}
