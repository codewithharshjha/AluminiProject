import prisma from "@/db. config";
import { sendOtpPrincipalEmail } from "@/lib/nodemailer";

import { generateOtp } from "@/lib/otp";
import { useUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const {name ,email,phone,password}=await request.json() 
    console.log({name,email,password,phone})
    const otp=generateOtp()
    try {
        console.log("hello there")
     const useralreadyexits=await prisma.adminUser.findUnique({
        where:{
            email:email
        }
     })
     if(useralreadyexits){
        return NextResponse.json({status:404,message:"Admin already exits"})
     }
await sendOtpPrincipalEmail(email,otp)
console.log("yha tk phucha")
await prisma.adminTempUser.create({
    data:{
        name,
        password,
        phone,
        email,
        otp
    }
})
console.log("temp admin create hua kya")
return NextResponse.json({status:200,message:"Otp Sent to email"})
    } catch (error) {
     return NextResponse.json({stauts:500,message:"faile to register as admin"}) 
    }
}
export async function GET(request:NextRequest){
  
    try {
        const url=new URL(request.url)
        const email=url.searchParams.get("email")
        console.log(email)
        if (!email) {
            return NextResponse.json({ status: 400, message: "Email parameter is required" });
        }
        const admin=await prisma.adminUser.findUnique({
            where:{
                email
            }
        })
        if(admin){
            return NextResponse.json({status:200})
        }
        return NextResponse.json({status:400,message:'not an admin'})
    } catch (error) {
        return NextResponse.json({stauts:500,message:error})  
    }
}