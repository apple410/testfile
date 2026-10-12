import { auth } from "@/auth";
import { taskmodel } from "@/models/taskmodel";
import { NextResponse } from "next/server";



export async function GET(params) {
    try {

        const session = await auth();

        if(!session?.user){
            return NextResponse.json({
                success:false,
                message:"Unauthorized"
            },{
                status:400
            })
        }

        const id = session?.user?.id;

        const dataTask = await taskmodel.findById(id);

        if(!dataTask || dataTask.length == 0){
            return NextResponse.json({
                success:false,
                message:"No Task available"
            },{
                status:404
            })
        }

        return NextResponse.json({
            success:true,
            message:"Data received",
            dataTask
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
