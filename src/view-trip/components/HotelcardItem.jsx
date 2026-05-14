import React, { useState, useEffect } from 'react'

function HotelCardItem({ hotel }) {
  const name = hotel?.hotelName || hotel?.hotel_name
  const address = hotel?.hotelAddress || hotel?.hotelAddress || hotel?.address
  const price = hotel?.priceRange || hotel?.price_per_night_range || hotel?.price
  const rating = hotel?.rating
  const description = hotel?.description

  useEffect(() => {
    if (!name) return
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.thumbnail?.source) setImgSrc(data.thumbnail.source)
        else setImgSrc(`https://picsum.photos/seed/${encodeURIComponent(name)}/400/300`)
      })
      .catch(() => setImgSrc(`https://picsum.photos/seed/${encodeURIComponent(name)}/400/300`))
  }, [name])

  const openInMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`, '_blank')
  }

  return (
    <div className='hover:scale-105 transition-all cursor-pointer rounded-xl border shadow-sm overflow-hidden' onClick={openInMaps}>
      <img
        src={imgSrc || `https://picsum.photos/seed/${encodeURIComponent(name)}/400/300`}
        onError={(e) => { e.target.src = 'https://picsum.photos/seed/hotel/400/300' }}
        className='h-[150px] md:h-[180px] w-full object-cover'
        alt={name}
      />
      <div className='p-2 md:p-3 flex flex-col gap-1'>
        <h2 className='font-semibold text-xs md:text-sm line-clamp-1'>{name}</h2>
        <h2 className='text-xs text-gray-500 line-clamp-1'>📍 {address}</h2>
        {description && <p className='text-xs text-gray-400 line-clamp-2'>{description}</p>}
        {price && <h2 className='text-xs md:text-sm font-medium'>💰 {price}/night</h2>}
        {rating && <h2 className='text-xs text-yellow-500'>⭐ {rating}</h2>}
      </div>
    </div>
  )
}

export default HotelCardItem