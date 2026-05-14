import React from 'react'

function InfoSection({ trip }) {
  const location = trip?.userSelection?.location?.properties?.formatted || 'Your Destination'

  return (
    <div>
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(location)}/1600/400`}
        className='w-full h-[340px] object-cover rounded-xl'
        alt={location}
      />
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-3xl text-[#040D5A]'>{location}</h2>
        <div className='flex gap-5 mt-2'>
          <span className='bg-gray-100 px-4 py-1 rounded-full text-gray-600 text-sm font-medium'>
            📅 {trip?.userSelection?.noOfDays} Day{trip?.userSelection?.noOfDays > 1 ? 's' : ''}
          </span>
          <span className='bg-gray-100 px-4 py-1 rounded-full text-gray-600 text-sm font-medium'>
            💰 {trip?.userSelection?.budget} Budget
          </span>
          <span className='bg-gray-100 px-4 py-1 rounded-full text-gray-600 text-sm font-medium'>
            👥 {trip?.userSelection?.traveller}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InfoSection