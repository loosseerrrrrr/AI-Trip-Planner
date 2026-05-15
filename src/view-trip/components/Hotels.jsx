import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {

  const hotels =
    trip?.tripData?.hotel_options ||
    trip?.tripData?.hotelOptions ||
    trip?.tripData?.hotels || []

  const location =
    trip?.userSelection?.location?.properties?.formatted || ''

  const searchMoreHotels = () => {
    const url = `https://www.google.com/travel/hotels/search?q=hotels+in+${encodeURIComponent(location)}`
    window.open(url, '_blank')
  }

  return (
    <div className='mt-7'>

      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>
          Hotel Recommendations 🏨
        </h2>

        <button
          onClick={searchMoreHotels}
          className='text-xs md:text-sm text-[#040D5A] border border-[#040D5A] px-3 py-1 rounded-full hover:bg-[#040D5A] hover:text-white transition-all'
        >
          🔍 Search More Hotels
        </button>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
        {hotels.map((hotel, index) => (
          <HotelCardItem
            key={index}
            hotel={hotel}
          />
        ))}
      </div>

    </div>
  )
}

export default Hotels