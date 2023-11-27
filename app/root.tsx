import { cssBundleHref } from "@remix-run/css-bundle";
import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import styles from "~/tailwind.css";
import useMobileConsole from "~/utils/mobileConsole";
import {
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/utils/theme-provider";
import { getThemeSession } from "~/utils/theme.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const themeSession = await getThemeSession(request);

  return json({
    theme: themeSession.getTheme(),
  });
};

export function Document({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  useEffect(() => {
    useMobileConsole();
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body className={`${theme === "light" ? "latte" : "mocha"} bg-base text-text`}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <div id="script"></div>
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <Document>
        <Outlet />
      </Document>
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const data = useLoaderData<typeof loader>();
  if (isRouteErrorResponse(error)) {
    return (
      <ThemeProvider specifiedTheme={data.theme}>
        <Document title={`${error.status} ${error.statusText}`}>
          <div className="min-h-screen w-screen flex justify-center items-center">
            <div className="p-3 rounded-lg bg-surface-variant bg-opacity-20">
              <h1 className="text-4xl font-bold text-center text-error mb-5">
                {error.status} {error.statusText}
              </h1>
              <Link to="/" className="font-bold text-primary">
                Go Home
              </Link>
            </div>
          </div>
        </Document>
      </ThemeProvider>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <Document title="Uh-oh!">
        <div className="overflow-scroll">
          <h1>App Error</h1>
          <pre>{errorMessage}</pre>
        </div>
      </Document>
    </ThemeProvider>
  );
}
