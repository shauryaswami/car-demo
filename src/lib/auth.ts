import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const admin = await prisma.admin.findUnique({
                    where: { email: credentials.email },
                });

                if (!admin) {
                    return null;
                }

                // In a real app, use bcrypt or argon2 to compare hashed passwords
                // For this demo, we'll assume the seed stores a plain password or we compare directly
                // WARNING: IN PRODUCTION, ALWAYS HASH PASSWORDS
                if (admin.password !== credentials.password) {
                    return null;
                }

                return {
                    id: admin.id,
                    email: admin.email,
                    name: "Admin",
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
