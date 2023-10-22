import { Form } from "@remix-run/react";
import { AtSymbolIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  return (
    <>
      <div className="bg-[#1381D4]">
        <img src="/logo.svg" alt="Connectify Logo" />
      </div>
      <div className="flex justify-center items-center h-[75vh]">
        <div className="bg-surface-variant shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">
            Log in to your account.
            <br />
            Or sign up for an account.
          </h2>
          <Form method="post">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                <AtSymbolIcon className="w-4 h-4 inline-block mr-2" />
                Email address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="hello@luki.my.id"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="interactive-bg-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Email a login link
              </button>
            </div>
          </Form>
          <div className="mb-2 flex items-center justify-center">
            <div className="flex-1 border-b border-gray-300"></div>
            <span className="mx-2 text-gray-400">or</span>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
          <div className="flex flex-col gap-3">
            <Form action="/auth/google" method="post">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Sign in with Google
              </button>
            </Form>
            <Form action="/auth/github" method="post">
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                Sign in with Github
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
