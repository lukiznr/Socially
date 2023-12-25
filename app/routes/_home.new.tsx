import type { ActionFunctionArgs, UploadHandler } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { uploadImage } from "~/services/file.server";
import { createPost } from "~/services/db.server";
import { authenticator } from "~/services/auth.server";
import NewPost from "~/components/NewPost";

export let action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const userId = user.id;
  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "files[]") {
        return undefined;
      }

      const uploadedImage = await uploadImage(data);
      if (!uploadedImage) {
        return undefined;
      }
      return uploadedImage.secure_url;
    },

    createMemoryUploadHandler()
  );
  const formData = await parseMultipartFormData(request, uploadHandler);
  const pictureList = formData.getAll("files[]");
  const content = formData.get("content") as string;
  const markdown = formData.get("markdown") ? true : false;
  const picture: { url: string }[] = [];
  pictureList.map((data) => {
    picture.push({ url: data.toString() });
  });

  const post = await createPost({ userId, content, markdown, picture });
  if (!post) {
    return json({ error: "Error bjir", post: null });
  }
  return json({ error: null, post });
};

export default function New() {
  const data = useActionData<typeof action>();
  return (
    <>
      <NewPost />
      {data?.error && <h2 className="text-red-500">{data.error}</h2>}
      <pre>{data?.post && JSON.stringify(data.post, null, 2)}</pre>
    </>
  );
}
