import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        { headers: { Authorization: `Bearer ${tokenInfo.access_token}` } }
      )
      localStorage.setItem('user', JSON.stringify(userInfo.data))
      window.location.reload()
    },
    onError: (error) => console.log(error)
  })

  return (
    <div className='p-2 shadow-sm flex justify-between items-center'>
      <img src='/logo.svg' />
      <div>
       {user ? (
              <img
                src={user.picture}
                className='rounded-full w-9 h-9'
                referrerPolicy="no-referrer"  // 👈 add this — fixes Google image CORS/expiry issues
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ) : (
              <Button onClick={() => login()}>Sign In</Button>
            )}
      </div>
    </div>
  )
}

export default Header