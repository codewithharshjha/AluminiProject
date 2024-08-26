import { Button } from '@/components/ui/button'
import React from 'react'
interface JobListCardProps {
    JobInfo: JobForm; // Define props interface
  }
function JobListCard({ JobInfo }: JobListCardProps) {
    console.log(JobInfo)
  return (
    <div className=" mx-auto mt-24 p-5 "style={{width:"1000px"}}>
    <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">

        <div className="relative w-32 h-32 flex-shrink-0">
            <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src="https://via.placeholder.com/150"/>
        </div>

        <div className="flex flex-col gap-2 py-2">

            <p className="text-xl font-bold">{JobInfo.jobtitle}</p>
    <div className=' flex space-x-28'>
    <p className="text-gray-500">
                {JobInfo.jobdescription},
               
            </p> 
            <Button className=''>Apply</Button>
    </div>
           

            <span className="flex items-center justify-start text-gray-500">
             
              {JobInfo.companyname}
            </span>

        </div>

    </div>

</div>
  )
}

export default JobListCard
