import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import connectDB from "./lib/db";
import User from '@/lib/modals/user';
 
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn(data) {
      console.log(data);
      try {
        await connectDB(); // Ensure database connection is established
        
        if (data.account?.provider === 'google') {
          const { email, name } = data.user;
    
          // Check if user already exists
          let user = await User.findOne({ email });
          if (!user) {
            // Create a new user
            user = await User.create({ first_name: name, email, password: "logged-in-through-gmail", });
            console.log("New user created:", user);
          } else {
            console.log("Existing user found:", user);
          }
    
          return user; // Successful sign-in
        }
        return false;
      } catch (error) {
        console.error("Error in signIn callback:", error);
      }

      return true;
    },

    async session({ session }: any) {
      const user = await User.findOne({ email: session.user.email });

      console.log({ user })

      session.user.id = user._id;

      return session;
    }
  }
})