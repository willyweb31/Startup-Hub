import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user,
      profile,
    }: {
      user: { name: string; email?: string | null; image?: string | null };
      profile: { id: string; login: string; bio?: string | null };
    }) {
      const { name, email, image } = user;
      const { id, login, bio } = profile;
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: id,
          name: name,
          username: login,
          image: image,
          email: email,
          bio: bio || "",
        });
      }
      return true;
    },
    async jwt({
      token,
      account,
      profile,
    }: {
      token: Record<string, any>;
      account?: Record<string, any>;
      profile?: Record<string, any>;
    }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        if (user) {
          token.id = user?._id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      console.log(session,"session");
      return session;
    },
  },
});
