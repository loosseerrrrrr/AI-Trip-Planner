import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../service/firebaseConfig'
import { useNavigate } from 'react-router-dom'

function MyTrips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }
    getUserTrips()
  }, [])

  const getUserTrips = async () => {
    const q = query(
      collection(db, 'AITrips'),
      where('userEmail', '==', user?.email)
    )
    const snapshot = await getDocs(q)
    const tripList = snapshot.docs.map(doc => doc.data())
    setTrips(tripList)
    setLoading(false)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl text-[#040D5A]'>My Trips 🗺️</h2>
      <p className='text-gray-500 mt-1'>All your AI generated trips in one place</p>

      {loading ? (
        <div className='flex items-center justify-center h-[50vh]'>
          <p className='text-gray-400'>Loading your trips...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-[50vh] gap-4'>
          <p className='text-gray-400 text-lg'>No trips found!</p>
          <button
            onClick={() => navigate('/Create-trip')}
            className='bg-[#040D5A] text-white px-6 py-2 rounded-full hover:opacity-90 transition-all'
          >
            Create Your First Trip ✈️
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-8'>
          {trips.map((trip, index) => (
            <TripCard key={index} trip={trip} />
          ))}
        </div>
      )}
    </div>
  )
}

function TripCard({ trip }) {
  const navigate = useNavigate()
  const location = trip?.userSelection?.location?.properties?.formatted || 'Unknown'
  const city = location.split(',')[0].trim()

  return (
    <div
      className='border rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:scale-105'
      onClick={() => navigate(`/view-trip/${trip?.id}`)}
    >
      <img
        src={`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`}
        onError={(e) => { e.target.src = `https://picsum.photos/seed/${encodeURIComponent(city)}/400/300` }}
        className='h-[180px] w-full object-cover'
        alt={location}
      />
      <div className='p-3'>
        <h2 className='font-semibold text-sm md:text-base line-clamp-1'>{location}</h2>
        <p className='text-xs text-gray-500 mt-1'>
          📅 {trip?.userSelection?.noOfDays} Days · 💰 {trip?.userSelection?.budget} · 👥 {trip?.userSelection?.traveller}
        </p>
      </div>
    </div>
  )
}

export default MyTrips