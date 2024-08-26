"use client"
import React, { useEffect, useState } from 'react'
import { ExpandableCardDemo } from '../components/ExpandleCardDemo'
import axios from 'axios'
import { toast, useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import JobListCard from '../components/JobListCard'

function page() {
    const [AllJob,setAllJob]=useState<JobForm[]>([])
    const {toast}=useToast()
    const[loading,setLoading]=useState<boolean>(false)
    const findAllJob=()=>{
    
            setLoading(true)
            axios.get("/api/JobForm").then((res)=>{
    
                const response=res.data
                console.log('this is response',response)
                if(response.status==200){
        setLoading(false)
        setAllJob(response.AllJobs)
                }
                if(response.status==400){
                    setLoading(false)
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                      })
                }
            }) 
        
        
    }
   useEffect(()=>{
    findAllJob()
   },[])
   console.log("this is all jobs",AllJob)
   console.log(typeof AllJob)
  return (
    <div className='  '>
        <div className=' flex justify-center gap-5 items-center bg-white rounded-3xl ml-2 mt-5 shadow-lg shadow-gray-300/50 '>
        <div className=' p-8 flex gap-5'>
        <Input className='' placeholder='Search Role'/>
          <Input className='' placeholder='Search Role'/>
          <Input className='' placeholder='Search Role'/>
        </div>
         <div>

          <Search width={50} height={50}/>
         </div>
        </div>

  <h1  className='   text-3xl text-center mt-10'> Available Jobs For Everybody</h1>
<div className=' mt-10 text-center'>
  <span className=' text-orange-400'>
  Post a job to tell us about your project. We'll quickly match you with the right <br /> freelancers.
  </span>
</div>
<div className=' flex gap-10'>
  
<div className=' flex flex-col space-y-5 space-x-10'>
<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700  mx-10  shadow-gray-600/50">
<h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Date Posted</h5>
<div className="flex items-baseline text-gray-900 dark:text-white gap-2">

<span className="text-5xl font-extrabold tracking-tight">Latest</span>
<span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">Job</span>
</div>
<ul role="list" className="space-y-5 my-7">
<li className="flex items-center">

<span className="text-base font-normal  text-gray-500 dark:text-gray-400 ms-3">Last-Hour</span>
<Input type='checkbox'className=' w-36'  />
</li>
<li className="flex">
<span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Last-1Hour</span>
<Input type='checkbox'className=' w-32'  />
</li>
<li className="flex">
<span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Last-1Day</span>
<Input type='checkbox'className=' w-36'  />
</li>
<li className="flex  decoration-gray-500">
<span className="text-base font-normal leading-tight text-gray-500 ms-3">Last-Week</span>
<Input type='checkbox'className=' w-36'  />
</li>
<li className="flex  decoration-gray-500">
<span className="text-base font-normal leading-tight text-gray-500 ms-3">Last-Month</span>
<Input type='checkbox'className=' w-36'  />
</li>

</ul>
<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
</div>
<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700  mx-10  shadow-gray-600/50">
<h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Categories</h5>
<div className="flex items-baseline text-gray-900 dark:text-white gap-2">

<span className="text-5xl font-extrabold tracking-tight">Different</span>
<span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">Options</span>
</div>
<ul role="list" className="space-y-5 my-7">
<li className="flex items-center">

<span className="text-base font-normal  text-gray-500 dark:text-gray-400 ms-3">IT</span>
<Input type='checkbox'className=' 'style={{width:"1300px"}}  />
</li>
<li className="flex">
<span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Finance</span>
<Input type='checkbox'className=' w-48'  />
</li>
<li className="flex">
<span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Digital-Marketing</span>
<Input type='checkbox'className=' w-14'  />
</li>
<li className="flex  decoration-gray-500">
<span className="text-base font-normal leading-tight text-gray-500 ms-3">Electrical</span>
<Input type='checkbox'className=' w-44'  />
</li>
<li className="flex  decoration-gray-500">
<span className="text-base font-normal leading-tight text-gray-500 ms-3">Mechanical</span>
<Input type='checkbox'className=' w-36'  />
</li>

</ul>
<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose category</button>
</div>
</div>


  <div>
  {AllJob && AllJob.length >0 && AllJob.map((item,index)=>(
<JobListCard key={index} JobInfo={item}/>
  ))}
 

  </div>

</div>
    </div>
  )
}

export default page
