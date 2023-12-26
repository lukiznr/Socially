import { useState, type FC } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import type { UserPostType } from "~/types/Post";
import Card from "./card";
import Button from "./button";
const UserPost: FC<UserPostType> = ({
  id,
  userId,
  author,
  createdAt,
  Picture,
  content,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  let nextImage, prevImage, imageCount;
  if (Picture) {
    imageCount = Picture.length;
    nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Picture.length);
    };

    prevImage = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + Picture.length) % Picture.length
      );
    };
  }
  return (
    <>
      <Card>
        <div className="w-full p-2 flex justify-between items-center">
          {author.picture && (
            <img
              src={author.picture}
              alt="User"
              className="h-11 w-11 rounded-full object-cover"
            />
          )}
          <div className="flex-1 ml-2">
            <div className="text-lg font-bold">{author.name}</div>
            <div className="text-gray-500">@{author.userName}</div>
          </div>
          <Button>
            <Bars3Icon className="h-6 w-6" />
          </Button>
        </div>

        {Picture?.length == 0 ? (
          <img src={Picture[0].url} alt="memek" />
        ) : (
          <div className="relative">
            <button
              onClick={prevImage}
              className="mr-2 absolute left-0 top-0 bottom-0"
            >
              &lt;
            </button>
            <div className="w-full aspect-square overflow-hidden">
              <div
                className="flex flex-nowrap overflow-x-auto transition-transform duration-300 ease-in-out h-full w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Picture?.map((image, index) => (
                  <div key={index} className="w-full h-full">
                    <img
                      src={image.url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={nextImage}
              className="ml-2 absolute right-0 top-0 bottom-0"
            >
              &gt;
            </button>
          </div>
        )}
        {content && (
          <p className="mt-4 text-sm">
            <p>{createdAt}</p>
            {content}
          </p>
        )}
      </Card>
    </>
  );
};

export { UserPost };
