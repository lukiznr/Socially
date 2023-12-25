import type { LoaderFunctionArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, useFetcher, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect } from "react";
import Spinner from "~/components/spinner";
import { UserPost } from "~/components/UserPost";
import { authenticator } from "~/services/auth.server";
import { getAllPost } from "~/services/db.server";
export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });
  const post = getAllPost();
  return defer({ post });
}
export default function Index() {
  const { post } = useLoaderData<typeof loader>();

  const fetch = useFetcher();
  useEffect(() => {
    fetch.load("/api");
  }, []);

  const userData = { name: "luki", userName: "luki", picture: "test" };
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Await resolve={post}>
          {(post) =>
            post.map((data, index) => (
              <div key={index}>
                <UserPost
                  id={data.id}
                  userId={data.userId}
                  createdAt={data.createdAt}
                  content={data.content}
                  Picture={data.Picture}
                  user={userData}
                />
              </div>
            ))
          }
        </Await>
      </Suspense>
    </>
  );
}
