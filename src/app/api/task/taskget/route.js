import { auth } from "@/auth";
import { taskmodel } from "@/models/taskmodel";
import { NextResponse } from "next/server";



export async function POST(req,params) {
    try {

        const {title,description} = await req.json();

        if(!title || !description){
            return NextResponse.json({
                success:false,
                message:"Fill the Form"
            },{
                status:400
            })
        }

        const session = await auth();

        if(!session?.user){
            return NextResponse.json({
                success:false,
                message:"Unauthorized"
            },{
                status:400
            })
        }

        await taskmodel.create({
            Owner:session?.user?.id,
            title,
            description
        })

        return NextResponse.json({
            success:true,
            message:"Task Added successfully"
        },{
            status:200
        })



    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success:false,
            message:"Internal server error"
        },{
            status:500
        })
    }
}
