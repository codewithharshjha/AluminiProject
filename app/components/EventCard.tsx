import { Label } from '@/components/ui/label'
import React from 'react'
interface EventListProps{
    event:RegisterEventBackend
}
function EventCard({event}:EventListProps) {
  return (
    <>
    <article className="mx-2 my-10 max-w-screen-lg rounded-md border border-gray-100 text-gray-700 shadow-md md:mx-auto">
  <div className="flex flex-col md:flex-row">
    <div className="p-5 md:w-4/6 md:p-8">
      <span className="rounded-md bg-orange-400 px-2 py-1 text-xs uppercase text-white">Event</span>
      <p className="mt-2 text-xl font-black md:mt-6 md:text-4xl">{event?.name}</p>
      <p className="mt-3 text-gray-600">{event?.description}</p>
    
      <p className="mt-3 text-gray-600">{event?.location}</p>
      <p className="mt-3 text-gray-600">{event?.date}</p>

     
    </div>
    <div className="mx-auto hidden items-center px-5 md:flex md:p-8">
      <img className="rounded-md shadow-lg" src={event?.imageUrl} alt="Shop image" />
    </div>
  </div>
</article>
  
    </>
  )
}

export default EventCard
