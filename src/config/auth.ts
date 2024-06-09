import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const Auth = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          hd: 'uny.ac.id',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return (profile?.email_verified && profile?.email?.endsWith('uny.ac.id')) as boolean;
      }

      return false;
    },
    jwt: async function jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          sub: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }

      return token;
    },
    session: async function session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub as string,
        email: token.email as string,
        name: token.name as string,
        image: token.image as string,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  basePath: '/auth',
});
