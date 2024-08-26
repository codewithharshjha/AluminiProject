import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'
import { HamIcon, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function AfterLoginHeader() {
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
                  <a href="">Collections</a>
                </li>
                <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                  <a href="">Contact</a>
                </li>
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
    <Link href="/Job">
    
 <span>CreateJob</span>
    </Link>
  </SheetContent>
</Sheet>

        </Button>
          
        </div>
    </header>
  )
}

export default AfterLoginHeader
