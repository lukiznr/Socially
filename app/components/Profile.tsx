import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import React from "react";
import Button from "./button";
import Card from "./card";
import Avatar from "./avatar";
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
  return (
    <Card>
      <div className="flex">
        <Avatar size="lg" name={name} src={picture}/>
        <div className="ml-4 flex-1">
          <h2 className="mb-1 text-xl font-bold">{name}</h2>
          <p className="mb-1">@{userName}</p>
          <p className="mb-1">{email}</p>
          {bio && <p className="">{bio}</p>}
          <div>
            <Button>Edit Profile</Button>
            <Button>
              <Link to="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
