import React from 'react'
import LoginPageComponent from '../components/LoginPageComponent'

export default function LoginPage({handleLogin}) {
  return (
    <div className='login-page'>
        <LoginPageComponent handleLogin ={handleLogin}/>
    </div>
  )
}
