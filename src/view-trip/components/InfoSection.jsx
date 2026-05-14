import React, { useState, useEffect } from 'react'

function InfoSection({ trip }) {
  const location = trip?.userSelection?.location?.properties?.formatted || 'Your Destination'
  const city = location.split(',')[0].trim()
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    if (!city) return
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.originalimage?.source) setImgSrc(data.originalimage.source)
        else if (data?.thumbnail?.source) setImgSrc(data.thumbnail.source)
        else setImgSrc(`https://picsum.photos/seed/${encodeURIComponent(city)}/1600/600`)
      })
      .catch(() => setImgSrc(`https://picsum.photos/seed/${encodeURIComponent(city)}/1600/600`))
  }, [city])

  return (
    <div>
      <div className='relative w-full h-[220px] md:h-[340px] rounded-2xl overflow-hidden'>
        <img
          src={imgSrc || `https://picsum.photos/seed/${encodeURIComponent(city)}/1600/600`}
          onError={(e) => { e.target.src = 'https://picsum.photos/seed/travel/1600/600' }}
          className='w-full h-full object-cover'
          alt={location}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>
        <div className='absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white'>
          <h2 className='font-bold text-xl md:text-3xl drop-shadow-lg'>{location}</h2>
        </div>
      </div>
      <div className='flex flex-wrap gap-3 mt-4'>
        <span className='bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs md:text-sm font-medium'>
          📅 {trip?.userSelection?.noOfDays} Days
        </span>
        <span className='bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs md:text-sm font-medium'>
          💰 {trip?.userSelection?.budget} Budget
        </span>
        <span className='bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs md:text-sm font-medium'>
          👥 {trip?.userSelection?.traveller}
        </span>
      </div>
    </div>
  )
}

export default InfoSection