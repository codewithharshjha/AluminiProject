import prisma from "@/db. config";
import { sendOtpEmail } from "@/lib/nodemailer";
import { generateOtp } from "@/lib/otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const {name ,email,batch,phone,password}=await request.json() 
    const otp=generateOtp()
    try {
     const useralreadyexits=await prisma.user.findUnique({
        where:{
            email:email
        }
     })
     if(useralreadyexits){
        return NextResponse.json({status:404,message:"User already exits"})
     }
await sendOtpEmail(email,otp)
await prisma.tempUser.create({
    data:{
        name,
          email,
          password,
          batch,
          phone,
          otp,
    }
})
return NextResponse.json({status:200,message:"Otp Sent to email"})
    } catch (error) {
     return NextResponse.json({stauts:500,message:"faile to register user"}) 
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
        const alumini=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(alumini){
            return NextResponse.json({status:200})
        }
        else return NextResponse.json(({status:400,message:'you are not alumini'}))
    } catch (error) {
        return NextResponse.json({stauts:500,message:error})  
    }
}