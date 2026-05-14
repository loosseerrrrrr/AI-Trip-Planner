import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function Itinerary({ trip }) {
  const itinerary = trip?.tripData?.itinerary

  if (!itinerary) return null

  // handle both array and object formats from AI
  const days = Array.isArray(itinerary)
    ? itinerary
    : Object.entries(itinerary).map(([key, value]) => ({
        day: key,
        ...value
      }))

  return (
    <div className='mt-8'>
      <h2 className='font-bold text-2xl text-[#040D5A]'>🗺️ Day by Day Itinerary</h2>
      <div className='flex flex-col gap-8 mt-5'>
        {days.map((dayPlan, index) => (
          <div key={index}>
            <h2 className='font-bold text-lg mb-3 text-[#040D5A]'>
              📅 Day {dayPlan?.day || index + 1}
              {dayPlan?.theme && <span className='font-normal text-gray-500 text-sm ml-2'>— {dayPlan.theme}</span>}
            </h2>
            <div className='flex flex-col gap-3'>
              {(dayPlan?.plan || dayPlan?.places || []).map((place, i) => (
                <PlaceCardItem key={i} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Itinerary