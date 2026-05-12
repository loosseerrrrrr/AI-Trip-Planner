import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../service/firebaseConfig'

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
      console.log(docSnap.data())
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <h2 className='font-bold text-2xl'>Trip Details</h2>
      {trip && (
        <div className='mt-5'>
          <h3 className='font-bold text-xl'>
            {trip.userSelection?.location?.properties?.formatted}
          </h3>
          <p>{trip.userSelection?.noOfDays} Days</p>
          <p>{trip.userSelection?.budget} Budget</p>
          <p>{trip.userSelection?.traveller}</p>
        </div>
      )}
    </div>
  )
}

export default ViewTrip