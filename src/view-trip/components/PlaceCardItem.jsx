import React, { useState, useEffect } from 'react'

function PlaceCardItem({ place }) {
  const name = place?.placeName || place?.place_name
  const details = place?.placeDetails || place?.place_details || place?.details
  const ticket = place?.ticketPricing || place?.ticket_pricing || place?.ticket_pricing_INR
  const time = place?.timeToSpend || place?.timeTravel || place?.time_spent || place?.travelTime || place?.time_to_spend
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    if (!name) return
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.thumbnail?.source) setImgSrc(data.thumbnail.source)
        else setImgSrc(`https://picsum.photos/seed/${encodeURIComponent(name)}/200/200`)
      })
      .catch(() => setImgSrc(`https://picsum.photos/seed/${encodeURIComponent(name)}/200/200`))
  }, [name])

  const openInMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`, '_blank')
  }

  return (
    <div className='flex gap-3 p-3 border rounded-xl hover:shadow-md transition-all cursor-pointer bg-white' onClick={openInMaps}>
      <img
        src={imgSrc || `https://picsum.photos/seed/${encodeURIComponent(name)}/200/200`}
        onError={(e) => { e.target.src = 'https://picsum.photos/seed/place/200/200' }}
        className='w-[100px] h-[100px] md:w-[130px] md:h-[110px] rounded-xl object-cover flex-shrink-0'
        alt={name}
      />
      <div className='flex flex-col gap-1 flex-1 min-w-0'>
        <h2 className='font-semibold text-xs md:text-sm text-[#040D5A] line-clamp-1'>{name}</h2>
        <p className='text-xs text-gray-500 line-clamp-2'>{details}</p>
        {ticket && <h2 className='text-xs font-medium'>🎟️ {ticket}</h2>}
        {time && <h2 className='text-xs text-gray-500'>⏱️ {time}</h2>}
      </div>
      <div className='flex items-end pb-1 flex-shrink-0'>
        <span className='text-xl'>📍</span>
      </div>
    </div>
  )
}

export default PlaceCardItem