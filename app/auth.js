import NextAuth from "next-auth";
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from "./_lib/data-service";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })],
  callbacks: {
    authorized: ({ auth, request }) => {
      return Boolean(auth?.user)
    },
    signIn: async ({ user, account, profile }) => {
      const isExistsGuest = await getGuest(user.email);
      if (!isExistsGuest) await createGuest({
        email: user.email,
        fullName: user.name
      });
      return true
    },
    session: async ({ session, user }) => {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
})