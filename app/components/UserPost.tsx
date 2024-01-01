import type { FC } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import type { UserPostType } from "~/types/Post";
import Card from "./card";
import Button from "./button";
import Avatar from "./avatar";
const UserPost: FC<UserPostType> = ({
  id,
  userId,
  author,
  createdAt,
  Picture,
  content,
}) => {
  return (
    <>
      <Card>
        <div className="w-full flex mb-2 justify-between items-center">
          <Avatar name={author.name} src={author.picture} size="md"/>
          <div className="flex-1 ml-2">
            <div className="text-lg font-bold">{author.name}</div>
            <div className="text-gray-500">@{author.userName}</div>
          </div>
          <Button>
            <Bars3Icon className="h-6 w-6" />
          </Button>
        </div>

        {Picture && <ImageSlider images={Picture} />}
        {content && (
          <p className="mt-2 text-sm">
            <p className="text-surface-700 dark:text-surface-300">
              {new Date(createdAt).toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            {content}
          </p>
        )}
      </Card>
    </>
  );
};

export function ImageSlider({ images }: { images: { url: string }[] }) {
  return (
    <div className="w-full">
      <div
        className="w-full flex flex-row overflow-x-scroll snap-x snap-mandatory
  [&::-webkit-scrollbar]:w-3
  [&::-webkit-scrollbar-track]:rounded-b-full
  [&::-webkit-scrollbar-track]:bg-surface-200
  [&::-webkit-scrollbar-thumb]:rounded-b-full
  [&::-webkit-scrollbar-thumb]:bg-primary-300
  dark:[&::-webkit-scrollbar-track]:bg-surface-700
  dark:[&::-webkit-scrollbar-thumb]:bg-primary-800"
      >
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="w-full aspect-square flex-shrink-0 snap-start rounded-t-lg bg-white"
            >
              <img
                src={image.url}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { UserPost };
