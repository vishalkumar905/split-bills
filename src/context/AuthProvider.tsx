'use client';

import { SessionProvider } from "next-auth/react";

function AuthProvider({ children, session }: any) {
    return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthProvider;