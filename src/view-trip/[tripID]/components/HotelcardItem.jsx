import React from 'react'

function HotelCardItem({ hotel }) {
  const query = hotel?.hotelName?.split(' ').slice(0, 3).join(' ')

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ' ' + hotel?.hotelAddress)}`
    window.open(url, '_blank')
  }

  return (
    <div className='hover:scale-105 transition-all cursor-pointer rounded-xl border shadow-sm overflow-hidden'
      onClick={openInMaps}>
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(hotel?.hotelName)}/400/300`}
        className='h-[180px] w-full object-cover'
        alt={hotel?.hotelName}
      />
      <div className='p-3 flex flex-col gap-1'>
        <h2 className='font-semibold text-sm'>{hotel?.hotelName}</h2>
        <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
        <h2 className='text-sm font-medium'>💰 {hotel?.price}</h2>
        <h2 className='text-xs text-yellow-500'>⭐ {hotel?.rating}</h2>
      </div>
    </div>
  )
}

export default HotelCardItem