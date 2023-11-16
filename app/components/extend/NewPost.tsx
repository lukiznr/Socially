import { Form } from "@remix-run/react";
export default function NewPost() {
  return (
    <>
      <Form
        encType="multipart/form-data"
        method="post"
        className="max-w-md mx-auto"
      >
        <input
          className="border p-2 w-full mb-4"
          type="file"
          name="files[]"
          placeholder="Picture URL"
          multiple={true}
        />
        <textarea
          className="border p-2 w-full mb-4"
          name="content"
          placeholder="Content"
        ></textarea>
        <label className="flex items-center mb-4">
          <input
            className="mr-2"
            type="checkbox"
            name="markdown"
            value="true"
          />
          <span>Use Markdown</span>
        </label>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </>
  );
}
