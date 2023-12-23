import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button, ButtonGroup } from "~/components/basic/Button";
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
    <div className="bg-surface-variant container mt-4 flex rounded-lg p-4 shadow-md">
      {picture ? (
        <img src={picture} alt={name} className={profileClassName} />
      ) : (
        <div>
          <UserIcon className={profileClassName} />
        </div>
      )}
      <div className="ml-4 flex-1">
        <h2 className="mb-1 text-xl font-bold">{name}</h2>
        <p className="mb-1">@{userName}</p>
        {bio && <p className="">{bio}</p>}
        <ButtonGroup>
          <Button>Edit Profile</Button>
          <Button>Logout</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default UserProfile;
