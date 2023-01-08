import React, { useEffect, useState } from 'react'
import { defaultFetch } from '../../../helpers/defaultFetch'
import Cookies from 'universal-cookie';
import { Logo } from '../../logo';
import { MainDash } from './mainDash';
import { Quizzes } from './quizzes/quizzes';
import { UserAccount } from './account/userAccount';
import { NavBarDash } from './navBarDash';

export const UserDash = () => {
    const [userOk, setUserOk] = useState();
    const [display, setDisplay] = useState("main");
    const [logo, setLogo] = useState(true);

    const cookies = new Cookies();
    var cookieCheck= cookies.get("session");
   
    
    useEffect(() => { 
     
        defaultFetch("http://localhost:3001/check", "POST", {token: cookieCheck })
        .then((res) => {
          if (res.mensaje) {setUserOk(true)} else {setUserOk(false)}
        })
    
     }, [])


     if (userOk){ return (
        <div>
             {display === "quizzes" && <NavBarDash setDisplay={setDisplay} />}
             {logo && <Logo/>}
            {display === "main" && <MainDash setDisplay={setDisplay} logo={logo} setLogo={setLogo} />}
            {display === "quizzes" && <Quizzes setDisplay={setDisplay} logo={logo} setLogo={setLogo}/>}
            {display === "account" && <UserAccount setDisplay={setDisplay} logo={logo} setLogo={setLogo}/>}
            </div>
      ) }
}
// 