import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function Header() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error)
      localStorage.removeItem('user')
      return null
    }
  })
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
          headers: { Authorization: `Bearer ${tokenInfo.access_token}` }
        })
        
        if (!res.ok) {
          throw new Error(`Failed to fetch user info: ${res.status}`)
        }
        
        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        toast('Login successful!')
        window.location.reload()
      } catch (error) {
        console.error('Login error:', error)
        toast('Login failed. Please try again.')
      }
    },
    onError: (error) => {
      console.error('Google login error:', error)
      toast('Google sign-in failed. Please try again.')
    }
  })

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    toast('Logged out successfully!')
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
              alt='User profile'
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
