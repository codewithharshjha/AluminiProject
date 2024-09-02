"use client"
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast, useToast } from 'react-toastify';

function page() {
  const {user}=useUser()
  console.log('this is user data',user?.primaryEmailAddress?.emailAddress)
    const[adminInfo,setAdminInfo]=useState<AdminInfo>({
        name:"",
        phone:"",
        password:"",
        email:""
    })
    const router=useRouter()
    const [otp, setOtp] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    
    const handleRegister=async(e:React.FormEvent)=>{
      e.preventDefault()
      try {
        await axios.post("/api/registeradmin",adminInfo).then((res)=>{
          const response=res.data
          if(response.status==200){

            setStep(2)
          }
          else if(response.status==404){
            toast.error("User Already exits ",{
              position: "top-right",
              className:" bg-red-500"
            })
          }
        })

      } catch (error) {
        console.error('Registration error:', error); 
      }
    }
    const handleVerifyOtp = async () => {
      try {
        await axios.post('/api/admin-verifiy-otp', { email: adminInfo.email, otp });
        // setStep(3); // Move to final registration step
        router.push("/")
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    };
    
  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
    <div className="grid md:grid-cols-2 items-center gap-8 h-full">
      <div className="max-md:order-1 p-4">
        <img src="https://readymadeui.com/signin-image.webp" className="lg:max-w-[85%] w-full h-full object-contain block mx-auto" alt="login-image" />
      </div>

      <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
        <form className="max-w-lg w-full mx-auto" onSubmit={step === 1 ? handleRegister : (e) => e.preventDefault()}>
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-yellow-400">Create an account as a Admin</h3>
          </div>

          {step === 1 && (
            <>
              <div>
                <label className="text-white text-xs block mb-2">Full Name</label>
                <div className="relative flex items-center">
                  <Input name="name" type="text" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter name" onChange={(e) => setAdminInfo({ ...adminInfo, name: e.target.value })} />
                </div>
              </div>
              <div className="mt-8">
                <label className="text-white text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <Input name="email" type="text" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter email"onChange={(e) => setAdminInfo({ ...adminInfo, email: e.target.value })} />
                </div>
              </div>
              <div className="mt-8">
                <label className="text-white text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <Input name="password" type="password" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter password"onChange={(e) => setAdminInfo({ ...adminInfo, password: e.target.value })} />
                </div>
              </div>
              <div className="mt-8">
                <label className="text-white text-xs block mb-2">Phone</label>
                <div className="relative flex items-center">
                  <Input name="batch" type="text" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter Phone Number"onChange={(e) => setAdminInfo({ ...adminInfo, phone: e.target.value })}/>
                </div>
              </div>
           

              <div className="flex items-center mt-8">
                <Input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
                <label htmlFor="remember-me" className="text-white ml-3 block text-sm">
                  I accept the <a href="javascript:void(0);" className="text-yellow-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
                </label>
              </div>

              <div className="mt-12">
                <button type="submit" className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none">
                  Register as Admin
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-white text-xs block mb-2">Enter OTP</label>
                <div className="relative flex items-center">
                  <Input name="otp" type="text" required className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
                </div>
              </div>

              <div className="mt-12">
                <button type="button" onClick={handleVerifyOtp} className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none">
                  Verify OTP
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center">
              <h2 className="text-2xl text-yellow-400">Registration Complete!</h2>
              <p className="mt-4 text-white">You have successfully registered. <Link href="/loginadmin" className="text-yellow-400 font-semibold hover:underline">Login here</Link></p>
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
   
  )
}

export default page
