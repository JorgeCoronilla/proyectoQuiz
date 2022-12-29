import React, {useState} from 'react'
import { NavbarHome } from './NavbarHome'
import {Login} from './login'

export const Welcome = () => {
    const [display, setDisplay] = useState("welcome");
    const loginLink = () => {
        setDisplay("login")
    }

    const signinLink = () => {
        setDisplay("signin")
    }
    if (display === "login") {
        return(<Login/>)
    } 

    if (display === "signin") {
        return(<Signin/>)
    } 
    return (
        <div>
            <h1 className='logo'>Quizzo</h1>
            <div className='pinContainer'>
                <input className='pinInput' placeholder='PIN de juego'></input>
                <button className='pinButton'>Comenzar</button>
            </div>
            <div className='linkContainer'>
                <h6 className='login' onClick={loginLink}>Log in</h6>
                <h6 className='signin' onClick={signinLink}>Sig in</h6>
            </div>
        </div>
    )
}
