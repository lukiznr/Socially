import { getAllPost } from "~/services/db.server";

export let loader = async () => {
  const data = await getAllPost();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
