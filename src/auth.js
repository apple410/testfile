

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { mongoConnect } from "./lib/mongodbConnect";
import { usermodel } from "./models/userModel";
import bcrypt from "bcryptjs";


export const { auth ,handlers,signIn,signOut } = NextAuth({
    providers:[
        Google,
        Credentials({
            name:"credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"email"
                },
                password:{
                    label:"Password",
                    type:"password"
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Please enter both email and password");
                }

                await mongoConnect();

                const user = await usermodel.findOne({ email: credentials.email })
                if(!user){
                    throw new Error("No user found with this email");
                }
                if(!user.password){
                    throw new Error("This account signs in using Google or GitHub.");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,user.password
                )
                if(!isPasswordCorrect){
                    throw new Error("Invalid password")
                }

                return{
                    id:user._id.toString(),
                    username:user.username,
                    email:user.email
                }


            }
        })
    ],
    session:{
        strategy:"jwt"
    },
    callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await mongoConnect();

        let existingUser = await usermodel.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await usermodel.create({
            username: user.email?.split("@")[0],
            email: user.email,
          });
        }
        user.id = existingUser._id.toString();
      }

      return true;
    },

    // Passes user ID and role down into the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Plucks variables from JWT token and renders them readable on frontend session contexts
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
})
