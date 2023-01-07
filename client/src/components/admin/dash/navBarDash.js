import React from 'react'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'


export const NavBarDash = () => {


    const cookies = new Cookies();
    const navigate = useNavigate();

    const logout = () => {
        cookies.remove('session', { path: '/' });
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <div>
                <div className='navbarHome'>
                    <div className='linkNavbar2'><h6 onClick={logout} >Salir</h6></div>
                </div>
            </div>
        </div>
    )
}
