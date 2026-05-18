export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '✈',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: '🧑‍🤝‍🧑',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adventurers',
        icon: '🏠',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
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
        desc: 'Don\'t worry about cost',
        icon: '💸',
    },
]

export const AI_PROMPT = `Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me the response STRICTLY in this JSON format with these exact fields:

{
  "hotels": [
    {
      "hotelName": "Hotel Name",
      "hotelAddress": "Full Address",
      "price": "Price range per night",
      "imageUrl": "Hotel image URL",
      "rating": 4.5,
      "description": "Brief description"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 - Activity Title",
      "bestTime": "Morning/Afternoon/Evening",
      "places": [
        {
          "placeName": "Place Name",
          "placeDetails": "Details about the place",
          "placeImageUrl": "Image URL",
          "geoCoordinates": "40.7128, -74.0060",
          "ticketPricing": "Price if any",
          "visitingTime": "Time to spend"
        }
      ]
    }
  ]
}`
