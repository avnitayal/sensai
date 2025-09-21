import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) return null;

  try {
    // ✅ First check if user already exists by Clerk ID
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // ✅ Then check if any user already exists with the same email
    const userEmail = user.emailAddresses[0].emailAddress;
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (existingUserByEmail) {
      // If same email exists, return the existing user instead of creating a new one
      return existingUserByEmail;
    }

    // ✅ If both checks fail, safely create new user
    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: userEmail,
      },
    });

    return newUser;
  } catch (error) {
    console.error("checkUser error:", error.message);
    return null;
  }
};
