import { CustomErrorReporter } from "@/app/validation/CustomErrorReport";
import { JobFormSchema } from "@/app/validation/JobFormSchema";
import prisma from "@/db. config";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const body=await request.json()
        
       vine.errorReporter=()=>new CustomErrorReporter()
       const validator=vine.compile(JobFormSchema)
       const payload=validator.validate(body)
       const JobCreated=await prisma.job.create({
        data:{
            jobtitle:(await payload).jobtitle,
            jobdescription:(await payload).jobdescription,
            joblocation:(await payload).joblocation,
            package:(await payload).package,
          
            companyname:(await payload).companyname,
            jobrole:(await payload).jobrole,
    
        }
       })  
       return NextResponse.json({status:200,message:"Job Created Successfully"})
    } catch (error) {
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
        const AllJobs=await prisma.job.findMany()
       
        return NextResponse.json({status:200,AllJobs})
    } catch (error) {
        return NextResponse.json({status:400,message:error})
    }
}