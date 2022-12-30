import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserDash } from '../components/admin/dash/userDash'
import { Error404 } from '../components/Error404'
import { ChangePass } from '../components/home/changePass'
import { Register } from '../components/home/register'
import { Welcome } from '../components/home/welcome'

export const AppRoutes = () => {
  return (
    <div>
      <Routes>

        {/*Inicio y registro*/}
        <Route path="/" element={<Welcome/>} />
        <Route path="/register/:token" element={<Register/>} />
        <Route path="/change-pass/:token" element={<ChangePass/>} />
        
        {/*Error 404*/}
        <Route path="*" element={<Error404/>} />

        {/*User dash*/}
        <Route path="/dash" element={<UserDash/>} />
        {/*Quizz for guests*/}
        {/*Quizz for user*/}

      </Routes>
    </div>
  )
}
