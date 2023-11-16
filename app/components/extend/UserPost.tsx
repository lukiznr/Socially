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
            className="w-full h-full rounded-full object-cover"
          />
        )}
      </div>
      <div className="mt-4">
        <div className="font-bold text-xl">{user.name}</div>
        <div className="text-gray-500">@{user.userName}</div>
      </div>
      {picture && (
        <img
          src={picture}
          alt="Post"
          className="mt-4 w-full h-48 object-cover rounded-lg"
        />
      )}
      {content && <p className="mt-4 text-sm">{content}</p>}

      </Card>
    </>
  );
};

export { UserPost };
