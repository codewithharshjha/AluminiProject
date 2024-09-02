"use client"
import React, { useEffect, useState } from 'react'
import { HeroParallaxDemo } from '../../components/HeroParallaxDemo'
import Link from 'next/link'
import Image from 'next/image'
import { FocusCardsDemo } from '../../components/FocusCardDemo'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'


function page() {
  const[allevent,setAllEvent]=useState<RegisterEventBackend[]>([])
  const[loading,setLoading]=useState<boolean>(false)
  const{toast}=useToast()
  const getAllEvent=async()=>{
    try {
      setLoading(true)
    await axios.get("/api/event").then((res)=>{
      
      const response=res.data
      setLoading(false)
      if(response.status==200){
        setAllEvent(response.events)
        toast({
          title:"All Event Fetch"
        })

      }
      else if(response.status==400){
        alert('There is some issue ')
        console.log('error',`${response.message}`)
      }
    })
    } catch (error) {
      console.log(error)
    }
    
  }
  console.log(allevent)
  useEffect(()=>{
    getAllEvent()
  },[])
  return (
    <div>
      <HeroParallaxDemo/>
      <div className=' flex  mt-36 justify-evenly  '>
        <div className='bg-gray-50 rounded-3xl p-16 flex flex-col space-y-8 items-center'>
        <Image
          src={'/Venue.png'}
          height="150"
          width="200"
          className=" rounded-3xl object-cover"
          alt='logo'
          unoptimized
        /> 
         <h1 className=' font-bold text-2xl'>Venue</h1>
        </div>
     
        <div  className='bg-gray-50 rounded-3xl p-16 flex flex-col space-y-8 items-center'>
        
        <Image
          src={'/transport.png'}
          height="150"
          width="200"
          className=" rounded-3xl object-cover"
          alt='logo'
          unoptimized
        /> 
         <h1 className=' font-bold text-2xl'>Transport</h1>
        </div>
       
        
      
        <div  className='bg-gray-50 rounded-3xl p-16 flex flex-col space-y-8 items-center'>
        <Image
          src={'/Accomodation.png'}
          height="150"
          width="200"
          className=" rounded-3xl object-cover"
          alt='logo'
          unoptimized
        /> 
        <h1 className=' font-bold text-2xl'>Accomodation</h1>
        </div>
      </div>
      <div className=' mt-20 flex flex-col '>
        <h1 className=' text-4xl font-bold text-center'>All Events</h1>
        <span className=' mt-5  text-center text-orange-900'>Welcome to the dedicated to building remarkable Schedule!</span>
        <div className=' mt-10'>

        <FocusCardsDemo AllEvent={allevent}/>
        </div>
      </div>
    </div>
  )
}

export default page
