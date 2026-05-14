import React from 'react'

function PlaceCardItem({ place }) {
  const query = place?.placeName?.split(' ').slice(0, 3).join(' ')

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`
    window.open(url, '_blank')
  }

  return (
    <div className='flex gap-4 p-3 border rounded-xl hover:shadow-md transition-all cursor-pointer bg-white'
      onClick={openInMaps}>
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(place?.placeName)}/200/200`}
        className='w-[120px] h-[100px] rounded-xl object-cover flex-shrink-0'
        alt={place?.placeName}
      />
      <div className='flex flex-col gap-1 flex-1'>
        <h2 className='font-semibold text-sm text-[#040D5A]'>{place?.placeName}</h2>
        <p className='text-xs text-gray-500 line-clamp-2'>{place?.placeDetails}</p>
        <h2 className='text-xs font-medium'>🎟️ {place?.ticketPricing}</h2>
        <h2 className='text-xs text-gray-500'>⏱️ {place?.timeTravel}</h2>
      </div>
      <div className='flex items-end'>
        <span className='text-2xl'>📍</span>
      </div>
    </div>
  )
}

export default PlaceCardItem