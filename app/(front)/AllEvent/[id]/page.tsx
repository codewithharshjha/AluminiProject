"use client";
import EventCard from '@/app/components/EventCard';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
  const { id } = useParams(); 
  const[event,setEvent]=useState<RegisterEventBackend>({
    name:"",
    date:"",
    description:"",
    id:0,
    imageUrl:"",
    location:""
  })
  const[loading,setLoading]=useState<boolean>(false)
  const findevent=async()=>{
    setLoading(true)
    await axios.get(`/api/event/${id}`).then((res)=>{
      setLoading(false)
      const response=res.data
      if(response.status==200){
        setEvent(response.event)

      }
    })
  }

  useEffect(()=>{
    findevent()
  },[])
console.log('this is id  event',event)
  return (
    <>
    
   <EventCard event={event}/>
    </>
  );
}

export default Page;
