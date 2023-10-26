import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";
import { AtSymbolIcon } from "@heroicons/react/24/solid";

export let loader = async ({ request }: LoaderFunctionArgs) => {
  authenticator.isAuthenticated(request, { successRedirect: "/profile" });
  let session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return json({
    magicLinkSent: session.has("auth:magiclink"),
    magicLinkEmail: session.get("auth:email"),
  });
};

export let action = async ({ request }: ActionFunctionArgs) => {
  await authenticator.authenticate("email-link", request, {
    successRedirect: "/login",
    failureRedirect: "/login",
  });
};

export default function LoginPage() {
  let { magicLinkSent, magicLinkEmail } = useLoaderData<typeof loader>();

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
          <Form action="/login" method="post">
            {magicLinkSent ? (
              <p>
                Successfully sent magic link{" "}
                {magicLinkEmail ? `to ${magicLinkEmail}` : ""}
              </p>
            ) : (
              <>
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  <AtSymbolIcon className="w-4 h-4 inline-block mr-2" />
                  Enter your email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="people@example.com"
                  required
                />
                <p className="mb-2">
                  We'll email you a magic code for a password-free registration.
                </p>
                <button
                  className="interactive-bg-primary font-bold py-3 w-full rounded focus:outline-none focus:shadow-outline mb-4"
                >
                  Continue
                </button>
              </>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}
