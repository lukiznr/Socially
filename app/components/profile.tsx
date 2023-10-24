import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

type UserProfileProps = {
  name: string;
  userName: string;
  email: string;
  picture?: string | null;
  bio?: string | null;
};

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  userName,
  email,
  picture,
  bio,
}) => {
  let profileClassName =
    "w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary";
  return (
    <div className="container mt-4 p-4 bg-surface-variant rounded-lg shadow-md flex">
      {picture ? (
        <img src={picture} alt={name} className={profileClassName} />
      ) : (
        <div>
          <UserIcon className={profileClassName} />
        </div>
      )}
      <div className="flex-1 ml-4">
        <h2 className="text-xl font-bold mb-1">{name}</h2>
        <p className="mb-1">@{userName}</p>
        {bio && <p className="">{bio}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
