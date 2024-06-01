'use server'

import prisma from "../../lib/db";
import { signUpSchema } from "../types";

interface UserSchema {
    email: string;
    role: string | null;
    username: string;
    password: string;
}

async function getUser(email:string) {
 try {
         const user: UserSchema | null = await prisma.user.findUnique({
                    where: {
                 email: email
                    }
                })
                if (user === null) {
                    throw new Error("User not found.");
                }
                return user
 }   
 catch (error) {
        throw new Error("User not found.")
}
}

export default getUser;