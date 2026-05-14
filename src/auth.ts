import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "./features/auth/Schema/login-schema";
import { login } from "./features/auth/apis/auth.apis";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const result = LoginFormSchema.safeParse({
          username: credentials?.username,
          password: credentials?.password,
        });
        if (!result.success) {
          throw new Error("Invalid credentials");
        }
        const data = await login(result.data);
        if (!data.status) {
          throw new Error(data.message);
        }

        console.log(data.payload.token);
        return {
          id: data.payload.user.id,
          user: data.payload.user,
          token: data.payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      if (trigger === "update" && session) {
        token.user = session?.user ?? token.user;
        token.token = session?.token ?? token.token;
      }
      
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
};
