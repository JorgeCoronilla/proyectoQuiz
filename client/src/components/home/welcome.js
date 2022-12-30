import React, { useState, useEffect } from 'react'
import { Login } from './login';
import { SignIn } from './SignIn'
import { PinEnter } from './pinEnter';
import { LinkContainer } from './linkContainer';
import { Logo } from '../logo';

export const Welcome = () => {

    const [display, setDisplay] = useState("main");
    useEffect(() => { setDisplay("main") }, [])

    return (
        <div>
            <Logo />

            {display === "main" &&
                <div>
                    <PinEnter setDisplay={setDisplay} />
                    <LinkContainer setDisplay={setDisplay} />
                </div>
            }

            {display === "login" && <Login setDisplay={setDisplay} />}
            {display === "signin" && <SignIn setDisplay={setDisplay} />}
        </div>
    )
}
/*
 if (display === "login") {
        return(<Login/>)
    } 

    if (display === "signin") {
        return(<SignIn/>)
    } */