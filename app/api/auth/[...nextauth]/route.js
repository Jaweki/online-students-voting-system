import User from '@/models/userSchema';
import { connectToDB } from '@/utils/database';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "voting-system",
            name: "Online Voting System",
            credentials: {
                credentialId: {label: "Login Credentials", type: "text", placeholder: "use your either a (student Id or Admins Id) or your email"},
                password: {label: "Password", type: "text", placeholder: "i.e., 8-digit password"},
            }, 
            authorize: async(credentials) => { 
                try {
                    const DBConnected = await connectToDB();

                    if (!DBConnected) {
                        throw new Error("Failed to connect to DB!");
                    } else if (DBConnected) {
                        const query1 = { userId: credentials?.credentialId } 
                        const query2 = { email: credentials?.credentialId }
                        try {

                            const result = await User.findOne({ 
                                $or: [
                                    query1,
                                    query2
                                ]
                            });

                            if (!result) {
                                const message = "Not a user registered in the system!";
                                throw new Error(message);
                            }
                            console.log("User found in db as: ", result);

                            const comparePassword = bcrypt.compare(credentials?.password, result.password)

                            if (!comparePassword) {
                                const message = "Bad password! " + credentials?.password;
                                console.log(message);
                                throw new Error(message);
                            }

                            console.log("User authenticated successfully as: ", result);
                            return result;
                        } catch (error) {
                            console.log("Error occurred while authenticating user: ", error);
                            return null;
                        }

                    }
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 1 * 1 * 60 * 60,
    },

    callbacks: {
        jwt: async({ token, user }) => {
            if (user) {
                token.userId = user.userId;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.avatar = user.avatar
            }

            return token
        },
        session: async({ session, token }) => {
            if (token && session) {
                session.user.userId  = token.userId;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.avatar = token.avatar;
            }

            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };