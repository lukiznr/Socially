import type { FC } from "react";
import type { UserPostType } from "~/types/Post";
import Card from "../basic/Card";

const UserPost: FC<UserPostType> = ({
  id,
  userId,
  user,
  createdAt,
  picture,
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
              className="h-full w-full rounded-full object-cover"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="text-xl font-bold">{user.name}</div>
          <div className="text-gray-500">@{user.userName}</div>
        </div>
        {picture && (
          <img
            src={picture}
            alt="Post"
            className="mt-4 w-full rounded-lg object-cover h-48"
          />
        )}
        {content && <p className="mt-4 text-sm">{content}</p>}
      </Card>
    </>
  );
};

export { UserPost };
