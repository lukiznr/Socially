import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
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
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export function Document({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const eruda = document.getElementById("eruda");
      if (!eruda) {
        const script = document.getElementById("script");
        const erudaScript = document.createElement("script");
        erudaScript.id = "eruda";
        erudaScript.src = "//cdn.jsdelivr.net/npm/eruda";
        script!.appendChild(erudaScript);
        erudaScript.onload = function () {
          const init = document.getElementById("init");
          if (!init) {
            const script = document.getElementById("script");
            const scriptEruda = document.createElement("script");
            scriptEruda.id = "init";
            scriptEruda.innerHTML = "eruda.init();";
            script!.appendChild(scriptEruda);
          }
        };
      }
    }
  }, []);
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="bg-background">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <div id="script"></div>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
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
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Uh-oh!">
      <div className="overflow-scroll">
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
