import { usermodel } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mongoConnect } from "@/lib/mongodbConnect";

export async function POST(req) {
  try {
    await mongoConnect();
    const { username, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Required field is needed",
        },
        {
          status: 400,
        },
      );
    }
    const user = await usermodel.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exist",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usermodel.create({
      username,
      email,
      password:hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {

    console.log(error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
