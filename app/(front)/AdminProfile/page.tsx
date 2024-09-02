"use client"
import Loader from '@/app/components/Loader'
import { useWaitForEmail } from '@/app/hook/useWaitForEmail'
import { useToast } from '@/components/ui/use-toast'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function page() {
  const{user}=useUser()
 
const email=user?.primaryEmailAddress?.emailAddress
  const[loading,setLoading]=useState<boolean>(false)
const [aluminiInfo,setAluminiInfo]=useState<AluminiProfileBackend>({
  name:"",
  lastname:"",
  email:"",
  profession:"",
  imageUrl:"",
  id:0,
  bio:""
})
const[userexits,setUserExits]=useState<boolean>(false)
const [userEmail, setUserEmail] = useState<string | null>(null);
const {toast}=useToast()



const getalumininfo=async(email:string)=>{


  if (!email) {
   
     return;
  }
  try {
    setLoading(true)
  await axios.get("/api/createprofile",{params:{email}}).then((res)=>{
    
    const response=res.data
console.log("this is response",response.AdminInfo)
    setLoading(false)
    if(response.status==200){
      console.log(response)
      setAluminiInfo(response.AdminInfo)
      toast({
        title:"Profile data fetch"
      })
      setUserExits(true)

    }
    else if(response.status==404){
      toast({
        title:`${response.message}`,
        variant:"destructive"
      })
     setUserExits(false)
    }
  })
  } catch (error) {
    console.log(error)
  }
  
}

useWaitForEmail(email => {
  setUserEmail(email);
  getalumininfo(email); // Call the function when email is available
});

console.log(aluminiInfo);

  return loading ?(<Loader/>): (
    <div>
      <div className="flex h-screen items-center justify-center px-10">
  <div className="w-full sm:w-1/2  bg-white shadow-xl rounded-3xl">
    <div className="mt-10 flex justify-center mb-5 ">
      <Image src={aluminiInfo ? aluminiInfo.imageUrl: user? user.imageUrl:"/book1.jpg"} className="rounded-full" alt="" height={200}width={200} />
    </div>
    <div className="flex justify-center px-5 ">
      <div className="border-b-2 border-gray-500 ">{aluminiInfo?.name}</div>
      <div className="border-b-2 border-gray-500">{aluminiInfo?.lastname}</div>
    </div>
    <div className="flex justify-center px-5 ">
      <div className="border-b-2 border-gray-500 font-bold text-xl text-violet-600 ">{aluminiInfo?.profession}</div>
      
    </div>
    <div className="flex justify-center text-center p-5">
      <p>{aluminiInfo?.bio}</p>
    </div>
    <div className="flex justify-center gap-4 p-5">
      <Link href="/CreateProfile">
      <button className="py-3 bg-indigo-500 font-semibold text-white w-48 rounded-xl hover:bg-indigo-600">{userexits ?("Edit Profilee"):("Create Post")}</button>
      </Link>
      <Link href={'/CreatePost'}>
      <button className="py-3 bg-pink-500 font-semibold text-white w-48 rounded-xl hover:bg-pink-600">Create-Post</button>
      </Link>
   
    </div>
  </div>
</div>
    </div>
  )
}

export default page
