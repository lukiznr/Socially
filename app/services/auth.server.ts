import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GoogleStrategy } from "remix-auth-google";
import { GitHubStrategy } from "remix-auth-github";
import { TOTPStrategy } from "remix-auth-totp";
import { findOrCreateUser } from "./db.server";
import { generateFromEmail } from "unique-username-generator";
import { sendAuthEmail } from "./email.server";
import { db } from "./db.server";
import type { User } from "@prisma/client";
import type { GitHubProfile } from "remix-auth-github";
import type { GoogleProfile } from "remix-auth-google";

type UserData = {
  name: string;
  username: string;
  email: string;
  picture?: string;
};

export let authenticator = new Authenticator<User>(sessionStorage);

let secret = process.env.SECRET as string;

let url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://connectify.luki.my.id";

function view(data: GitHubProfile | GoogleProfile) {
  console.log(JSON.stringify(data, null, 2));
}

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${url}/auth/google/callback`,
    },
    async ({ profile }) => {
      const data: UserData = {
        name: profile._json.name,
        username: generateFromEmail(profile._json.email),
        email: profile._json.email,
        picture: profile._json.picture,
      };
      view(profile);
      const user = await findOrCreateUser(data);
      return user;
    }
  )
);

authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: `${url}/auth/github/callback`,
    },
    async ({ profile }) => {
      const data: UserData = {
        name: profile._json.name,
        username: generateFromEmail(profile._json.email),
        email: profile._json.email,
        picture: profile._json.avatar_url,
      };
      view(profile);
      const user = await findOrCreateUser(data);
      return user;
    }
  )
);

authenticator.use(
  new TOTPStrategy(
    {
      secret: secret,
      magicLinkGeneration: { callbackPath: "/magic-link" },

      storeTOTP: async (data) => {
        await db.totp.create({ data });
      },
      sendTOTP: async ({ email, code, magicLink }) => {
        await sendAuthEmail({ email, code, magicLink });
      },
      handleTOTP: async (hash, data) => {
        const totp = await db.totp.findUnique({ where: { hash } });
        if (data) {
          return await db.totp.update({
            where: { hash },
            data: { ...data },
          });
        }
        return totp;
      },
    },
    async ({ email }) => {
      let user = await db.user.findUnique({ where: { email } });
      let userData = {
        name: generateFromEmail(email),
        userName: generateFromEmail(email),
        email,
      };
      if (!user) {
        user = await db.user.create({ data: userData });
      }
      return user;
    }
  )
);
