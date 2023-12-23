import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import NavBar from "~/components/Navbar";
import { authenticator } from "~/services/auth.server";
import { Theme, Themed, useTheme } from "~/utils/theme-provider";

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

  const [, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );
  };
  return (
    <>
      <Outlet />
      <button onClick={toggleTheme}>Toggle</button>
      <Themed
        dark={<h1 className="dark-component">I'm only seen in dark mode</h1>}
        light={<h1 className="light-component">I'm only seen in light mode</h1>}
      />
      <NavBar avatar={avatar} />
    </>
  );
}
