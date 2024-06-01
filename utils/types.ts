import { number, object, string } from "zod"

import { z } from 'zod';

export const ProgramSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  duration: z.number().positive('Duration must be a positive number'),
  description: z.string().min(5, 'Description is required'),
  videoUrl: z.string().url('Invalid URL'),
  channelId: z.number().min(1, 'Channel is required'),
  typeId: z.number().min(1, 'Type is required'),
  categoryId: z.number().min(1, 'Category is required'),
});

export type ProgramSchemaType = z.infer<typeof ProgramSchema>;


 
export const signUpSchema = object({
  username: string({ required_error: "Username is required" })
      .min(1, "Username is required"),

  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const ChannelSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
})


export type SearchParams = {
   channelId? : number,
   typeId?: number,
   categoryId?:number

}

export interface MovieSchema {
  id: number,
  title: string;
  duration: number;
  description: string;
  channelId: number;
  typeId: number;
  categoryId: number;
  videoUrl: string;
  imageUrl: string | null;
}