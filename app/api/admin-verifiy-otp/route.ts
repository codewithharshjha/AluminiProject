import prisma from "@/db. config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const {email,otp}=await request.json()
    try {
     const user=await prisma.adminTempUser.findUnique({
        where:{email}
     })   
     if(user  && user.otp===otp){
        await prisma.adminUser.create({
            data:{
                name: user.name,
                email: user.email,
                password: user.password,
              
                phone: user.phone,
            }
        })
        await prisma.adminTempUser.delete({
            where:{email}
        })
     }
     else {
       return NextResponse.json({status:400,message:"Invalid otp"});
      }
     return NextResponse.json({status:200,message:"OTP verified ,register admin"})
    } catch (error) {
        return NextResponse.json({status:500,message:"Failed to verify otp"})
    }
}