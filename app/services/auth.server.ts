import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GoogleStrategy } from "remix-auth-google";
import { GitHubStrategy } from "remix-auth-github";

type User = {
  id: string;
  name: string;
  email: string;
  picture?: "string";
};

const url =
  process.env.NODE_ENV === "development"
    ? "10.106.75.49:3000"
    : "connectify.luki.my.id";

const callback = `http${
  process.env.NODE_ENV === "development" ? "" : "s"
}:${url}/auth`;

export let authenticator = new Authenticator<User>(sessionStorage);

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${callback}/google/callback`,
  },
  async ({ profile }) => {
    const user = {
      name: profile._json.name,
      email: profile._json.email,
      picture: profile._json.picture,
    };
    console.log(user);
    return { id: "233", email: "wow", name: "wow" };
  }
);

let gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: `${callback}/github/callback`,
  },
  async ({ profile }) => {
    const user = {
      name: profile._json.name,
      email: profile._json.email,
      picture: profile._json.avatar_url,
    };
    console.log(user);
    return { id: "233", email: "wow", name: "wow" };
  }
);

authenticator.use(googleStrategy);
authenticator.use(gitHubStrategy);
