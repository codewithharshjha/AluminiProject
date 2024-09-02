

import { CustomErrorReporter } from "@/app/validation/CustomErrorReport";
import { EventFormSchema } from "@/app/validation/EventSchema";
import prisma from "@/db. config";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function POST(request:NextRequest){
    try {
        const body = await request.json()
        console.log(body)
        console.log("is it body",body)
        vine.errorReporter=()=>new CustomErrorReporter()
       const validator=vine.compile(EventFormSchema)
       const payload =validator.validate(body)
       const Event=await prisma.event.create({
      data:{
        name:(await payload).name,
       
        description:(await payload).description,
       imageUrl:(await payload).imageUrl,
       location:(await payload).location,
       date:(await payload).date
        
        
        
    
      }
       })
    
     return NextResponse.json({status:200,messsage:"Event created successfully"}
    
     )
    }  catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error)
            return NextResponse.json({ status: 400, errors: error.messages });
        } else {
            // Handle other types of errors if needed
            console.error("Unexpected error:", error);
            return NextResponse.json({ status: 500, message: "Internal Server Error" });
        }
    }
 
}
export async function GET(request:NextRequest){

    try {
        
        const events= await prisma.event.findMany()
      
        return NextResponse.json({status:200,events})
    } catch (error) {

        return NextResponse.json({stauts:500,message:error})
    }
}