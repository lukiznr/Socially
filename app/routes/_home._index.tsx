import { authenticator } from "~/services/auth.server";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, { failureRedirect: "/login" });
}
export default function Index() {
  return (
    <>
      <div>
        <img src="/logo.svg" alt="Connectify Logo" />
      </div>
    </>
  );
}
