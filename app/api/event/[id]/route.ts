import prisma from "@/db. config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest,{ params }: { params: { id: string } }){
    const { id } = params;
    try {
        const event=await prisma.event.findUnique({
            where:{
                id: Number(id),
            }
        })
     
        return NextResponse.json({status:200,event})
    } catch (error) {
        return NextResponse.json({status:500,message:error})
    }
  
}