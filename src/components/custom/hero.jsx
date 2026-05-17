import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className=' flex flex-col items-center mx-56 gap-9 '>
      <h1
      className=' font-extrabold text-[30px] text-center mt-16 '
      ><span className='text-[#040D5A]'>The World is Wide. We'll Help You Navigate It.</span>
      <br></br> AI companion turns every trip into a perfectly curated adventure</h1>
      <p className=' text-xl text-[#040D5A] text-center'>The ultimate travel synergy: Your curiosity meets our infinite intelligence.</p>
        <Link to={'/create-trip'}>
          <Button>Get Started, It's Free</Button> 
        </Link>
    </div>
  )
}

export default Hero
