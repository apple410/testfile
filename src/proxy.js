import { NextResponse } from "next/server";
import { auth } from "./auth";


export const proxy = auth(async (req) => {
    const isloggedIn = !!req.auth;
    const {pathname} = req.nextUrl;


    if((pathname.startsWith("/home")
        || pathname.startsWith("/addtask")) && !isloggedIn){
        return NextResponse.redirect(new URL("/login",req.url));
    }

    if(isloggedIn && (pathname.startsWith("/login")  || pathname.startsWith("/register"))){
        return NextResponse.redirect(new URL("/home",req.url));
    }

});



export const config ={
    matcher:[
        "/login",
        "/register",
        "/home",
        "/addtask"
    ]
}
