import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../service/firebaseConfig'
import Hotels from '../components/Hotels'
import InfoSection from '../components/InfoSection'
import Itinerary from '../components/Itinerary'

function ViewTrip() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)

  useEffect(() => {
    tripId && getTripData()
  }, [tripId])

  const getTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setTrip(docSnap.data())
      console.log('Trip data:', docSnap.data())
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {trip ? (
        <>
          <InfoSection trip={trip} />
          <Hotels trip={trip} />
          <Itinerary trip={trip} />
        </>
      ) : (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-gray-400 text-lg'>Loading trip details...</p>
        </div>
      )}
    </div>
  )
}

export default ViewTrip