import { authenticator } from "~/services/auth.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, Await } from "@remix-run/react";
import { useEffect, Suspense } from "react";
import { getAllPost } from "~/services/db.server";
import { defer } from "@remix-run/node";
import Loader from "~/components/basic/Loader";
import { UserPost } from "~/components/extend/UserPost";
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
      <div></div>
      <Suspense fallback={<Loader />}>
        <Await resolve={post}>
          {(post) =>
            post.map((data, index) => (
              <div key={index}>
                <UserPost
                  id={data.id}
                  userId={data.userId}
                  createdAt={data.createdAt}
                  content={data.content}
                  picture={data.picture}
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
