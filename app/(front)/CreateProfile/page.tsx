"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
function page() {
    const{toast}=useToast()
    const[aluminiInfo,setAluminiInfo]=useState<AluminiProfile>({
        name:"",
        lastname:"",
        bio:"",
        profession:"",
        imageUrl:"",
        email:""
    })

 const router=useRouter()
    const[errors,setErrors]=useState()
    const [imageFile, setImageFile] = useState<File | null>(null); 
    const[loading,setLoading]=useState<boolean>(false)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };
  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      toast({
        title:"File not Selected",
        variant:"destructive"
      })
      throw new Error('No image file selected');
   
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    console.log(data)
    return data.url;
    
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true)
      let imageUrl =aluminiInfo?.imageUrl

      if (imageFile) {
        imageUrl = await uploadImage();
      }
axios.post("/api/createprofile",{...aluminiInfo,imageUrl }).then((res=>{
  setLoading(false)
  const response=res.data
  console.log(response)
  if (response.status == 400) {
    setErrors(response.errors);

    console.log(response.errors)
    toast({
      title: `${response.message}`,
     variant:"destructive"
      
    })
  
  } 
  else if (response.status == 200) {
    toast({
      title: `${response.message}`,
      description: "Friday, February 10, 2023 at 5:57 PM",
    })
 
setAluminiInfo({
  name: "",
  email:"",
   imageUrl:"",
  bio:"",
  profession:"",
  lastname:"",
  
})
router.push("/AdminProfile")
  }
}))   .catch((err) => {
  setLoading(false);
  console.log("The error is", err);
});

      // Submit form data
     


      // Handle success
      toast({
        title:'Event Created successfully!'
      });
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };
  return (
    <div>
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] justify-center">
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Bordered avatar"
                  />

                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="multiple_files"
                    >
                      Upload multiple files
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="multiple_files"
                      type="file"
                      multiple
                      onChange={handleImageChange}
                    />

                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Delete picture
                    </button>
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your first name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Your first name"
                        value={aluminiInfo.name}
                  
                        onChange={(e) => setAluminiInfo({ ...aluminiInfo, name: e.target.value })}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Your last name"
                        value={aluminiInfo.lastname}
                       
                        onChange={(e) => setAluminiInfo({ ...aluminiInfo, lastname: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your Email"
                      required
                      value={aluminiInfo.email}
                      onChange={(e) => setAluminiInfo({ ...aluminiInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Profession
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your profession"
                
                      value={aluminiInfo.profession}
                      onChange={(e) => setAluminiInfo({ ...aluminiInfo, profession: e.target.value })}
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Bio
                    </label>
                    <textarea
                      id="message"
                      name="bio"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Write your bio here..."
                      value={aluminiInfo.bio}
                      onChange={(e) => setAluminiInfo({ ...aluminiInfo, bio: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
  )
}

export default page
