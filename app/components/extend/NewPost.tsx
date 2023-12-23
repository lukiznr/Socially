import { Form } from "@remix-run/react";
export default function NewPost() {
  return (
    <>
      <Form
        encType="multipart/form-data"
        method="post"
        className="mx-auto max-w-md"
      >
        <input
          className="mb-4 w-full border p-2"
          type="file"
          name="files[]"
          placeholder="Picture URL"
          multiple={true}
        />
        <textarea
          className="mb-4 w-full border p-2"
          name="content"
          placeholder="Content"
        ></textarea>
        <label className="mb-4 flex items-center">
          <input
            className="mr-2"
            type="checkbox"
            name="markdown"
            value="true"
          />
          <span>Use Markdown</span>
        </label>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </>
  );
}
