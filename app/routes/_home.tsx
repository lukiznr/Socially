import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import NavBar from "~/components/Navbar";
import { authenticator } from "~/services/auth.server";

export let loader = async ({ request }: LoaderFunctionArgs) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json(user!.picture);
};

export default function HomeLayout() {
  const data = useLoaderData<typeof loader>();
  let avatar: string | undefined;
  if (data !== null) {
    avatar = data;
  }

  return (
    <>
      <Outlet />
      <NavBar avatar={avatar} />
    </>
  );
}
