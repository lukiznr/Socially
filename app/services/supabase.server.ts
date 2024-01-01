import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import type {
  Database,
  TablesInsert,
  TablesUpdate,
} from "./supabase.types.server";
import { singleton } from "./singleton.server";

type Picture = {
  url: string;
};

type Post = {
  userId: string;
  markdown?: boolean;
  draft?: boolean;
  content?: string;
  picture?: Picture[];
};

const supabaseUrl = process.env.SUPABASE_PROJECT_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const db = singleton("supabase", () => supabase);

export async function getOrCreateUser(
  email: string,
  data: TablesInsert<"User">
) {
  const { data: user } = await db
    .from("User")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) {
    const { data: newUser } = await db
      .from("User")
      .insert({ ...data, id: uuid() })
      .select("*")
      .single();
    return newUser;
  }

  return user;
}

export async function getUserById(id: string) {
  const { data } = await supabase
    .from("User")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export async function updateUser(
  id: string,
  bio?: string,
  name?: string,
  userName?: string
) {
  const { data } = await db
    .from("User")
    .update({ bio, name, userName })
    .eq(id, id)
    .select("*")
    .single();
  return data;
}

export async function createPost(data: Post) {
  if (!data.content || !data.picture) {
    throw "Minimal harus ada 1";
  }

  const { data: newPost, error } = await db.from("post").insert([
    {
      userId: data.userId,
      content: data.content,
      markdown: data.markdown,
      draft: data.draft,
    },
  ]);

  if (error) {
    throw error;
  }

  const picture = data.picture;

  const { data: newPictures, error: pictureError } = await db
    .from("picture")
    .insert([...picture]);

  if (pictureError) {
    throw pictureError;
  }
  
  const { data: updatedPost, error: updateError } = await db
    .from("post")
    .update({ pictureId: newPictures.map((picture) => picture.id) })
    .match({ id: newPost.id });

  if (updateError) {
    throw updateError;
  }

  return updatedPost;
}
