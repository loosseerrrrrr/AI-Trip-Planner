import React, { useEffect, useState } from 'react'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import { Input } from "@/components/ui/input"
import { SelectTravelesList, SelectBudgetOptions, AI_PROMPT } from '../constant/options'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { chatSession } from '../service/AIModal'

function CreateTrip() {
  const [place, setPlace] = useState(null)

  const [formData, setFormData] = useState({})

  const handleInputChange = (name, value) => {
  setFormData({
    ...formData,
    [name]: value
  })
  console.log(formData)
  }

  const onPlaceSelect = (value) => {
  handleInputChange('location', value)
  }

  useEffect(()=>{
  console.log(formData);
  },[formData])

  const onGenerateTrip = async () => {
  if (!formData?.location || !formData?.budget || !formData?.traveller || !formData?.noOfDays) {
    toast('Please fill all the details!')
    return
  }

  if (formData?.noOfDays > 30) {
    toast('Please enter trip days less than or equal to 30!')
    return
  }

  const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.properties?.formatted)
    .replaceAll('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveller)
    .replace('{budget}', formData?.budget)

  console.log(FINAL_PROMPT)

  const result = await chatSession.sendMessage(FINAL_PROMPT)
  console.log(result?.response?.text())
}

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl text-[#040D5A]'>
        Tell Us Your Travelling Preference🏕️🌴
      </h2>
      <p className='font-medium mt-3 text-[#13162f]'>Just provide some basic information, and our trip planner will generate a customised itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-2 font-medium'>What is your destination?</h2>
          <GeoapifyContext apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Search destination..."
              type="city"
              placeSelect={onPlaceSelect}
            />
          </GeoapifyContext>
        </div>
        <div>
           <h2 className='text-xl my-2 font-medium'>How many days are you planning your trip?</h2>
                {  
                <Input placeholder="Ex.3" type="Number" min="1" className="w-full" 
                onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                />}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-5 font-medium'>What is your Budget?</h2>
        <div className=' grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index} 
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.budget == item.title && 'shadow-lg border-[#020D5A]'}`}>
              <h2 className=' text-4xl'>{item.icon}</h2>
              <h2 className=' font-bold text-lg'>{item.title}</h2>
              <h2 className=' font-semibold text-sm text-[#020D5A]'>{item.desc}</h2>
              </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-5 font-medium'>who do you plan on travelling with on your next adventure?</h2>
        <div className=' grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item,index)=>(
            <div key={index} 
            onClick={()=> handleInputChange('traveller',item.people)}
            className={` p-5 border rounded-lg cursor-pointer hover:shadow-lg
              ${formData?.traveller==item.people && 'shadow-lg border-[#020D5A]'}`}>
              <h2 className=' text-4xl'>{item.icon}</h2>
              <h2 className=' font-bold text-lg'>{item.title}</h2>
              <h2 className=' font-semibold text-sm text-[#020D5A]'>{item.desc}</h2>
              </div>
          ))}
        </div>
      </div>
      <div className=' my-10 justify-end flex'>
       <Button onClick={onGenerateTrip} className='text-center'>Generate Trip</Button>
        </div> 
    </div>

  )
}

export default CreateTrip