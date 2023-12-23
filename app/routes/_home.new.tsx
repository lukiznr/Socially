import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import NewPost from "~/components/extend/NewPost";

export let action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const files = data;
  console.log(files);
  return redirect("/new");
};
export default function New() {
  return (
    <>
      <NewPost />
    </>
  );
}
