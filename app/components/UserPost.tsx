import type { FC } from "react";
import type { UserPostType } from "~/types/Post";
import Card from "./card";
const UserPost: FC<UserPostType> = ({
  id,
  userId,
  user,
  createdAt,
  Picture,
  content,
}) => {
  return (
    <>
      <Card>
        <div className="w-full h-48">
          {user.picture && (
            <img
              src={user.picture}
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="text-xl font-bold">{user.name}</div>
          <div className="text-gray-500">@{user.userName}</div>
        </div>
        {/*Picture &&
          Picture.map((data) => (
            <img
              src={data.url}
              alt="Post"
              className="mt-4 w-full rounded-lg object-cover h-48"
            />
          ))*/}
        {Picture && (
          <div className="grid grid-cols-3 gap-4">
            {Picture.map((photo, index) => (
              <div key={index} className="relative aspect-w-1 aspect-h-1">
                <img
                  src={photo.url}
                  alt={`Photo ${index + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
        {content && <p className="mt-4 text-sm">{content}</p>}
      </Card>
    </>
  );
};

export { UserPost };
