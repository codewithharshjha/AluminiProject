import prisma from "@/db. config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const {email,otp}=await request.json()
    try {
     const user=await prisma.tempUser.findUnique({
        where:{email}
     })   
     if(user  && user.otp===otp){
        await prisma.user.create({
            data:{
                name: user.name,
                email: user.email,
                password: user.password,
                batch: user.batch,
                phone: user.phone,
            }
        })
        await prisma.tempUser.delete({
            where:{email}
        })
     }
     else {
       return NextResponse.json({status:400,message:"Invalid otp"});
      }
     return NextResponse.json({status:200,message:"OTP verified ,register user"})
    } catch (error) {
        return NextResponse.json({status:500,message:"Failed to verify otp"})
    }
}