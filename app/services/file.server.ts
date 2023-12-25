import { writeAsyncIterableToWritable } from "@remix-run/node";
import cloudinary from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
});

async function uploadImage(data: AsyncIterable<Uint8Array>) {
  const uploadPromise = new Promise<UploadApiResponse | undefined>(
    async (resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "socially",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );

  return uploadPromise;
}

//console.log("configs", cloudinary.v2.config());
export { uploadImage };
