import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: { Authorization: `Bearer ${tokenInfo.access_token}` }
      })
      const data = await res.json()
      localStorage.setItem('user', JSON.stringify(data))
      window.location.reload()
    },
    onError: (error) => console.log(error)
  })

  const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5 relative'>
      <img src='/logo.svg' className='cursor-pointer' onClick={() => navigate('/')} />
      <div>
        {user ? (
          <div className='relative'>
            <img
              src={user.picture}
              referrerPolicy='no-referrer'
              className='rounded-full w-9 h-9 cursor-pointer border-2 border-gray-200 hover:border-[#040D5A] transition-all'
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50 overflow-hidden'>
                <div className='px-4 py-3 border-b'>
                  <p className='text-sm font-semibold text-gray-800 truncate'>{user.name}</p>
                  <p className='text-xs text-gray-500 truncate'>{user.email}</p>
                </div>
                <div
                  className='px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2'
                  onClick={() => { setShowMenu(false); navigate('/my-trips') }}
                >
                  <span>🗺️</span>
                  <span className='text-sm text-gray-700'>My Trips</span>
                </div>
                <div
                  className='px-4 py-3 hover:bg-red-50 cursor-pointer flex items-center gap-2'
                  onClick={logout}
                >
                  <span>🚪</span>
                  <span className='text-sm text-red-500'>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={() => login()}>Sign In</Button>
        )}
      </div>
    </div>
  )
}

export default Header