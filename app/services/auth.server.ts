import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GoogleStrategy } from "remix-auth-google";
import { GitHubStrategy } from "remix-auth-github";
import { EmailLinkStrategy } from "remix-auth-email-link";
import { findOrCreateUser } from "./db.server";
import { generateFromEmail } from "unique-username-generator";
import { sendEmail } from "./email.server";
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

let secret = process.env.MAGIC_LINK_SECRET as string;

let url = process.env.NODE_ENV==="development"? "http://localhost:3000" : "https://connectify.luki.my.id"
function view(data: GitHubProfile | GoogleProfile) {
  console.log(JSON.stringify(data, null, 2));
}

let googleStrategy = new GoogleStrategy(
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
);

let gitHubStrategy = new GitHubStrategy(
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
);

let emailLinkStrategy = new EmailLinkStrategy(
  { sendEmail, secret, callbackURL: "/magic" },
  async ({
    email,
    form,
    magicLinkVerify,
  }: {
    email: string;
    form: FormData;
    magicLinkVerify: boolean;
  }) => {
    let data: UserData = {
      name: "Your Name",
      username: generateFromEmail(email, 3),
      email: email,
    };
    let user = await findOrCreateUser(data);
    return user;
  }
);

authenticator.use(googleStrategy);
authenticator.use(gitHubStrategy);
authenticator.use(emailLinkStrategy);
