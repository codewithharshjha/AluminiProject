"use client"
import { Button } from '@/components/ui/button'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { HamIcon, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

 function AfterLoginHeader() {
  const [admin,setAdmin]=useState<boolean>(false)
  const[alumini,setAlumini]=useState<boolean>(false)
  const{user}=useUser()

  const email=user?.primaryEmailAddress?.emailAddress
  const isAdmin=()=>{
    
  
    axios.get('/api/registeradmin',{
      params:{email}
    }).then((res)=>{

        const response=res.data
        console.log('this is response',response)
        if(response.status==200){
setAdmin(true)
        }
        
    }) 


}
const isAlumini=()=>{
    
  
  axios.get('/api/register',{
    params:{email}
  }).then((res)=>{

      const response=res.data
      console.log('this is response',response)
      if(response.status==200){
setAlumini(true)
      }
      
  }) 


}
useEffect(()=>{
isAdmin()
isAlumini()
},[])
  return (

    <header className="header top-0  shadow-md flex items-center justify-between px-8 py-02 bg-black  ">
      
      
            
            <img src={'/logo.svg'}alt='logo'/>
           

    
    
        <nav className="nav font-semibold text-lg">
            <ul className="flex items-center text-white">
                <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                  <Link href="/">Dashboard</Link>
                </li>
                <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                  <Link href="/AllJob">Job</Link>
                </li>
                <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                  <Link href="/AllEvent">Event</Link>
                </li>
                <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                  <a href="">Contact</a>
                </li>
                {admin && (
                  <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                  <Link href="/AdminFeature">Admin</Link>
                </li> 
                )}
                      {alumini && (
                  <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                  <Link href="/AluminiFeature">Alumini</Link>
                </li> 
                )}
            </ul>
        </nav>
    
     
        <div className="w-3/12 flex justify-end gap-3">
        <Button asChild>

            <SignOutButton/>
        </Button>
        <Button>
        <Sheet>
  <SheetTrigger>
    <Menu/>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>All Admin Features</SheetTitle>
      
    </SheetHeader>
    <div className=' flex flex-col space-y-10'>
    { admin && (
      <Link href="/Job">
  
      <span className=' bg-blue-600  w-16 p-2 rounded-lg text-black'>CreateJob</span>
         </Link> 
    )}
   
       <Link href="/RegisterAlumini">
       
       <span className=' bg-blue-600  w-24 p-2 rounded-lg text-black'>Alumini-Register</span>
          </Link>
     
          <Link href="/AdminRegistration">
       {
       !admin &&(
<span className=' bg-blue-600  w-24 p-2 rounded-lg text-black'>Admin-Registration</span>
       ) 
       }
       
          </Link>
    </div>
   
  </SheetContent>
</Sheet>

        </Button>
        {alumini ? (
          <Link href={'/AdminProfile'}>
          <Avatar>
         <AvatarImage src="https://github.com/shadcn.png" />
         <AvatarFallback>CN</AvatarFallback>
       </Avatar>
          </Link>
         
        
        ):(

          <UserButton/>
        )}
        </div>
    </header>
  )
}

export default AfterLoginHeader
