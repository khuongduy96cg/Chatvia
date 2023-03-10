import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";
import { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from 'jsonwebtoken';
import { randomBytes, randomUUID } from "crypto";
import bcrypt from 'bcryptjs';
//import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import UserModel from "@/models/user_model";
import connectDB from "@/utils/mongoose";
import clientPromise from "@/utils/mongodb";
import { NEXTAUTH_TYPE, ROUTES } from "@/types/constant";

const authOptions: NextAuthOptions = {
    //adapter: MongoDBAdapter(clientPromise),
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: NEXTAUTH_TYPE.CREDENTIALS,
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials, req) => {
                // Add logic here to look up the user from the credentials supplied
                try {
                    await connectDB();
                    
                    const user = await UserModel.findOne({ username: credentials?.username }) as any;

                    //bcrypt.compareSync(credentials?.password as string, user.password)
                    if (user && credentials?.password === user.password) {
                        // Any object returned will be saved in `user` property of the JWT
                        console.log("user-----", user);
                        return {
                            id: JSON.stringify(user._id),
                            //name: user.name,
                            email: user.email,
                            //isAdmin: user.isAdmin,
                        }
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null
                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }
                } catch (error: any) {
                    console.log('======authorize error==============', error);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code"
            //     }
            // }
        }),
    ],
    callbacks: {
        async jwt({ token, account }: any) {
            // Persist the OAuth access_token to the token right after signin
            //console.log(account);
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        },
        async signIn({ user, account, profile, email, credentials }: any) {
            const isAllowedToSignIn = true
            if (account?.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@example.com")
            }
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async redirect({ url, baseUrl }) {
            //console.log(baseUrl)
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },

    },
    secret: process.env.JWT_SECRET_KEY as string,
    jwt: {
        // // The maximum age of the NextAuth.js issued JWT in seconds.
        // // Defaults to `session.maxAge`.
        // maxAge: 60 * 60 * 24 * 30,
        // // You can define your own encode/decode functions for signing and encryption
        // secret: 'HoafpMxCI5YMkGY/nOSH8arZq6MH5KNOaUB4+2ySRFI=',
        // encode: async ({ secret, token, maxAge }: JWTEncodeParams) => {
        //     if (!token) {
        //         throw new Error("No token provided.");
        //     }
        //     const encodedToken = jwt.sign(token, secret, {
        //         expiresIn: maxAge,
        //     });
        //     return encodedToken;
        // },
        // decode: async ({ secret, token }: JWTDecodeParams) => {
        //     if (!token) {
        //         throw new Error("No token provided.");
        //     }
        //     const decodedToken = jwt.verify(token, secret);
        //     return decodedToken as JWT;
        // },
    },
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        //strategy: "database",

        strategy: 'jwt',

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            const sessionToken = randomUUID?.() ?? randomBytes(32).toString("hex");
            console.log("sessionToken====", sessionToken);
            return sessionToken;
        }
    },
    pages: {
        signIn: ROUTES.LOGIN,
        //signOut: '/auth/signout',
        //error: '/auth/error', // Error code passed in query string as ?error=
        //verifyRequest: '/auth/verify-request', // (used for check email message)
        //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    events: {
        // async signIn(message) { /* on successful sign in */ },
        // async signOut(message) { /* on signout */ },
        // async createUser(message) { /* user created */ },
        // async updateUser(message) { /* user updated - e.g. their email was verified */ },
        // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
        // async session(message) { /* session is active */ },
    },
    logger: {
        error(code, metadata) {
            //log.error(code, metadata)
        },
        warn(code) {
            //log.warn(code)
        },
        debug(code, metadata) {
            //log.debug(code, metadata)
        }
    },
    // Enable debug messages in the console if you are having problems
    debug: true,
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);