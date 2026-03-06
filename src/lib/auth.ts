import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "ahmad@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email) return null;

                // Mocking user for now
                return {
                    id: "1",
                    name: "Ahmad Student",
                    email: credentials.email,
                    role: "STUDENT",
                } as any;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
};
