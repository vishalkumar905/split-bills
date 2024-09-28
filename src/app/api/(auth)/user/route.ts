import { NextResponse } from 'next/server'
 
import connectDB from '@/lib/db'
import User from '@/lib/modals/user';
import { withErrorHandler } from '@/middleware/error-handler';
import { composeMiddlewares } from '@/middleware/compose-middlewares';

 
const getHandler = async (request: Request) => {
  await connectDB();
  const users = await User.find();
  return new NextResponse(JSON.stringify(users), { status: 200 });
}

const postHandler = async (request: Request) => {
  await connectDB();
  
  const body = await request.json();
  const newUser = new User(body);
  await newUser.save();

  return new NextResponse(JSON.stringify({
    message: 'User is created',
    user: newUser
  }), { status: 200 });
}

// Apply middlewares
export const GET = composeMiddlewares(withErrorHandler)(getHandler);
export const POST = composeMiddlewares(withErrorHandler)(postHandler);