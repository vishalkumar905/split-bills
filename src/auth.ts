import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import connectDB from "./lib/db";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }: any) {

      

      console.log({ user, account });

      if (account?.provider === 'google') {
        await connectDB();

        return false
      }

      return false
    }
  }
})