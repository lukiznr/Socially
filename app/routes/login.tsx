import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { getSession, commitSession } from "~/services/session.server";

export let loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/profile",
  });
  const cookie = await getSession(request.headers.get("cookie"));
  const authEmail = cookie.get("auth:email");
  const authError = cookie.get(authenticator.sessionErrorKey);
  return json({ authEmail, authError } as const, {
    headers: {
      "set-cookie": await commitSession(cookie),
    },
  });
};

export let action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const currentPath = url.pathname;

  await authenticator.authenticate("TOTP", request, {
    successRedirect: "/verify",
    failureRedirect: currentPath,
  });
};

export default function LoginPage() {
  const { authEmail, authError } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <>
      <div className="bg-[#1381D4]">
        <img src="/logo.svg" alt="Connectify Logo" />
      </div>
      <div className="flex justify-center items-center h-[75vh]">
        <div className="bg-surface-variant shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-bold mb-3 text-center">
            Log in or
            <br />
            Create an account.
          </h2>
          <p className="mb-4 text-lg">
            Quickly get started by using your existing accounts.
          </p>
          <div className="flex flex-col gap-3 mb-2">
            <Form action="/auth/google" method="post">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded w-full flex items-center justify-center">
                <img
                  className="bg-white rounded-full p-0.5"
                  src="/Google_Logo.svg"
                  alt="Google Logo"
                />
                <p className="ml-3">Continue with Google</p>
              </button>
            </Form>
            <Form action="/auth/github" method="post">
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 rounded w-full flex items-center justify-center">
                <img
                  className="bg-white rounded-full p-0.5"
                  src="/Github_Logo.svg"
                  alt="Github Logo"
                />
                <p className="ml-3">Continue with Github</p>
              </button>
            </Form>
          </div>
          <div className="mb-2 flex items-center justify-center">
            <div className="flex-1 border-b border-gray-300"></div>
            <span className="mx-2 text-gray-400">or</span>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
          {/* Email Form */}
          <Form
            method="POST"
            autoComplete="off"
            className="flex w-full flex-col gap-2"
          >
            <div className="flex flex-col">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={authEmail ? authEmail : ""}
                placeholder="name@example.com"
                className="h-11 rounded-md border-2 border-primary bg-transparent px-4 text-base font-semibold placeholder:font-normal placeholder:text-gray-400"
                required
              />
            </div>
            <p className="mb-2">
              We'll email you a magic code for a password-free registration.
            </p>
            <button
              type="submit"
              className="clickable flex h-10 items-center justify-center rounded-md bg-primary disabled:bg-gray-700"
              disabled={navigation.state !== "idle" ? true : false}
            >
              <span className="text-sm font-semibold">Continue with Email</span>
            </button>
          </Form>

          {!authEmail && authError && (
            <span className="font-semibold text-red-400">
              {authError.message}
            </span>
          )}

          <p className="text-center text-xs leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="clickable underline">Terms of Service</span>
          </p>
        </div>
      </div>
    </>
  );
}
