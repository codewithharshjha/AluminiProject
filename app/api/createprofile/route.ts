
import { CreateAluminiSchema } from "@/app/validation/AluminiEdit"
import { CustomErrorReporter } from "@/app/validation/CustomErrorReport"
import prisma from "@/db. config"
import vine, { errors } from "@vinejs/vine"
import { stat } from "fs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request:NextRequest){
    try {
        const body = await request.json()
       
      
     
       
        vine.errorReporter=()=>new CustomErrorReporter()
       const validator=vine.compile(CreateAluminiSchema)
       const payload =validator.validate(body)
const profilealreadyexits=await prisma.createAluminiProfile.findUnique({
    where:{
        email:(await payload).email
    }
})
if(profilealreadyexits){
   const editedprofile=await prisma.createAluminiProfile.update({
    where:{
        email:(await payload).email
    },
    data: {
        ...((await payload).name ? { name: (await payload).name } : {}),
        ...((await payload).lastname ? { lastname: (await payload).lastname } : {}),
        ...((await payload).profession ? { profession: (await payload).profession } : {}),
        ...((await payload).imageUrl ? { imageUrl: (await payload).imageUrl } : {}),
        ...((await payload).bio ? { bio: (await payload).bio } : {}),
    }
   }) 
   return NextResponse.json({status:200,message:"Profile Updated Successfullly",editedprofile})
}
      const Createdprofile=await prisma.createAluminiProfile.create({
        data:{
            name:(await payload).name,
            lastname:(await payload).lastname,
            profession:(await payload).profession,
            imageUrl:(await payload).imageUrl,
            email:(await payload).email,
            bio:(await payload).bio
            
           
        }
      })
    
     return NextResponse.json({status:200,messsage:"Profile Edited successfully" ,Createdprofile}
    
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
        const url=new URL(request.url)

        const email=url.searchParams.get("email")
       
        if(!email){
            return NextResponse.json({status:404,message:"Email not found"})
        }
        const AdminInfo=await prisma.createAluminiProfile.findUnique({
            where:{
                email:email!
            }
            

        })
        if(AdminInfo){
            return NextResponse.json({status:200,AdminInfo})

        }
        else{
            return NextResponse.json({status:404,message:"Create Admin"})
        }

    } catch (error) {
        console.error("Unexpected error:", error);
            return NextResponse.json({ status: 500, message: error });  
    }
}