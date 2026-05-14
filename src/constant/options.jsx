export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🧑‍🤝‍🧑',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏠',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people: '5 to 10 People'
    },
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💴',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me the response STRICTLY in this JSON format with these EXACT key names: { "hotelOptions": [ { "hotelName": "", "hotelAddress": "", "priceRange": "", "hotelImageURL": "", "geoCoordinates": { "latitude": 0, "longitude": 0 }, "rating": 0, "description": "" } ], "itinerary": [ { "day": 1, "theme": "", "plan": [ { "placeName": "", "placeDetails": "", "placeImageUrl": "", "geoCoordinates": { "latitude": 0, "longitude": 0 }, "ticketPricing": "", "timeToSpend": "" } ] } ] }'