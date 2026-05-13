import React, { useEffect, useState } from 'react'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import { Input } from "@/components/ui/input"
import { SelectTravelesList, SelectBudgetOptions, AI_PROMPT } from '../constant/options'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { chatSession } from '../service/AIModal'
import { db } from '../service/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'

function CreateTrip() {
  const [formData, setFormData] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const onPlaceSelect = (value) => {
    handleInputChange('location', value)
  }

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: { Authorization: `Bearer ${tokenInfo.access_token}` }
      })
      const data = await res.json()
      localStorage.setItem('user', JSON.stringify(data))
      setOpenDialog(false)
      setTimeout(() => onGenerateTrip(data), 300)
    },
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async (loggedInUser = null) => {
    const user = loggedInUser || localStorage.getItem('user')

    if (!user) {
      setOpenDialog(true)
      return
    }

    if (!formData?.location || !formData?.budget ||
      !formData?.traveller || !formData?.noOfDays) {
      toast('Please fill all the details!')
      return
    }

    if (formData?.noOfDays > 30) {
      toast('Please enter trip days less than or equal to 30!')
      return
    }

    setLoading(true)
    toast('Generating your trip... Please wait!')

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.properties?.formatted)
      .replaceAll('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveller)
      .replace('{budget}', formData?.budget)

    console.log('Sending prompt to AI:', FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    const responseText = result?.response?.text()
    console.log('AI Response:', responseText)

    await saveTrip(responseText)
    setLoading(false)
  }

  const saveTrip = async (tripData) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    const cleanData = tripData.replace(/```json/g, '').replace(/```/g, '').trim()

    let parsed
    try {
      parsed = JSON.parse(cleanData)
    } catch (e) {
      console.error('Failed to parse AI response:', cleanData)
      toast('AI returned invalid data, please try again.')
      setLoading(false)
      return
    }

    await setDoc(doc(db, 'AITrips', docId), {
      userSelection: formData,
      tripData: parsed,
      userEmail: user?.email || 'guest',
      id: docId
    })

    toast('Trip saved!')
    navigate(`/view-trip/${docId}`)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl text-[#040D5A]'>Tell Us Your Travelling Preference 🌴🏕</h2>
      <p className='font-medium mt-3 text-[#13162f]'>Just provide some basic information, and our trip planner will generate a customised itinerary based on your preferences.</p>

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
          <Input
            placeholder="Ex.3"
            type="number"
            min="1"
            max="30"
            className="w-full"
            value={formData?.noOfDays || ''}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault()
            }}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div>
          <h2 className='text-xl my-5 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='font-semibold text-sm text-[#020D5A]'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-5 font-medium'>Who do you plan on travelling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveller', item.people)}
                className={`p-5 border rounded-lg cursor-pointer hover:shadow-lg
                  ${formData?.traveller == item.people && 'shadow-lg border-[#020D5A]'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='font-semibold text-sm text-[#020D5A]'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='my-10 justify-end flex'>
          <Button
            onClick={() => onGenerateTrip()}
            disabled={loading}
            className='text-center'
          >
            {loading ? 'Generating...' : 'Generate Trip'}
          </Button>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle className='flex justify-center'>
              <img src='/logo.svg' className='w-20' />
            </DialogTitle>
            <DialogDescription className='text-center'>
              <h2 className='font-bold text-lg text-black mt-4'>Sign In With Google</h2>
              <p className='text-gray-500 mt-2'>Sign in to the App with Google authentication securely</p>
              <Button className='w-full mt-5 flex gap-4 items-center justify-center'
                onClick={() => login()}>
                <img src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                  className='w-6 h-6' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip