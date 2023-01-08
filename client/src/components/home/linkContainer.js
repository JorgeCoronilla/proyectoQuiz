import React from 'react'

export const LinkContainer = ({setDisplay}) => {
    const loginLink = () => { setDisplay("login") }
    const signinLink = () => { setDisplay("signin") }
    return (
        <div>
            <div className='linkContainer'>
                <h6 className='login' onClick={loginLink}>Log in</h6>
                <h6 className='signin' onClick={signinLink}>Sign in</h6>
            </div>
        </div>
    )
}
