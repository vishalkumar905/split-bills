import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Group from "@/lib/modals/group";
import { withErrorHandler } from "@/middleware/error-handler";
import { composeMiddlewares } from "@/middleware/compose-middlewares";
import User from "@/lib/modals/user";

const getHandler = async (request: Request) => {
  await connectDB();
  const groups = await Group.find().populate('members');

  // await addUserToGroup();

  return NextResponse.json(groups, { status: 200 });
};

const postHandler = async (request: Request) => {
  await connectDB();

  const body = await request.json();
  const newGroup = new Group(body);
  await newGroup.save();

  return NextResponse.json(
    {
      message: "Group is created",
      group: newGroup,
    },
    { status: 200 }
  );
};

const addUserToGroup = async () => {
  const [user] = await User.find();
  const [group] = await Group.find();

  if (!user || !group) {
    throw new Error('User or Group not found');
  }

  // // Add the group to the user's groups
  // user.groups.push(group._id);
  // await user.save();

  // Add the user to the group's members
  group.members.push(user._id);
  await group.save();

  console.log({ user, group })
};

// Apply middlewares
export const GET = composeMiddlewares(withErrorHandler)(getHandler);
export const POST = composeMiddlewares(withErrorHandler)(postHandler);
