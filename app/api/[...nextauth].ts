import { GS } from "@/db/db";
import { AdminUser } from "@/types/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const data = await GS.getSheetData("adminUser");
        const rows = await data.getRows<AdminUser>();

        const user = rows.find(
          (row) =>
            row.get("username") === credentials.username &&
            row.get("password") === credentials.password,
        );

        if (user) {
          return {
            id: user.get("id"),
            username: credentials.username,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
