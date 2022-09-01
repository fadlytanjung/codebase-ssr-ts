import NextAuth, {
  Session,
  SessionStrategy,
  User,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'next-auth/jwt';
import fetch from '@/utils/fetch';
import services from '@/configs/services';
import axios from '../../../lib/axios';

export interface AuthResponse {
  access_token: string;
  user: Record<string, string | unknown>
}

const nextAuthOptions = () => {
  return {
    providers: [
      CredentialsProvider({
        id: 'credentials',
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'codebase-ssr-ts',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: {
            label: 'email',
            type: 'email',
            placeholder: 'jsmith@example.com',
          },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(
          credentials: Record<'email' | 'password', string> | undefined
        ): Promise<Omit<User, 'id'> | { id?: string | undefined } | null> {
          const payload = {
            email: credentials?.email,
            password: credentials?.password
          };

          const response = await fetch({
            method: 'POST',
            url: services.LOGIN(),
            data: payload,
            headers: {
              'Content-Type': 'application/json',
            },
          }) as AuthResponse;
          if (response) {
            const user = { token: response.access_token, data: { ...response.user } };
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: '/login',
    },
    session: {
      strategy: 'jwt' as SessionStrategy,
      maxAge: 60 * 60,
    },
    jwt: {
      maxAge: 60 * 60,
    },
    callbacks: {
      async jwt({ token, user }: { token: JWT; user?: User }) {

        user && (token.accessToken = user.token);
        user && (token.user = user.data);
        return token;
      },

      async session({ session, token }: { session: Session; token: JWT }) {
        session.user = token.user as { id?: string, email: string };
        session.accessToken = token.accessToken;
        return session;
      },
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
  };
};

export const NextAuthInstance = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, nextAuthOptions());

export default NextAuthInstance;
