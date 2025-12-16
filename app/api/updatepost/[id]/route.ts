import { NextResponse } from "next/server";
import { Post } from "@/models/Post";
import { connectDB } from "@/lib/mongodb";
import { revalidatePath } from 'next/cache';
