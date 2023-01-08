import React from 'react'

export const NavbarQuizzes = ({setDisplay}) => {

    const account = () => { setDisplay("account") }
    const menu = () => { setDisplay("main") }
    
  return (
    <div className='navbarHome'>
    <div className='linkNavbar1'><h6 onClick={account} className='navLink1'>Account</h6></div>
    <div className='linkNavbar2'><h6 onClick={menu}className='navLink2'>Menu</h6></div>
  </div>
  )
}
