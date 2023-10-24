import {
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import type { FC } from "react";

type navbar = {
  location: string;
  avatar?: string;
};

const NavBar: FC<navbar> = ({ location, avatar }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-surface-variant flex justify-around py-2">
      <Link
        to="/"
        className={`flex flex-col items-center ${
          location === "/" ? "text-primary" : "text-white"
        }`}
      >
        <HomeIcon className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        to="/chat"
        className={`flex flex-col items-center ${
          location === "/chat" ? "text-primary" : "text-white"
        }`}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
        <span className="text-xs">Chat</span>
      </Link>
      <Link
        to="/new"
        className={`flex flex-col items-center ${
          location === "/new" ? "text-primary" : "text-white"
        }`}
      >
        <PlusIcon className="w-6 h-6" />
        <span className="text-xs">New</span>
      </Link>
      <Link
        to="/notif"
        className={`flex flex-col items-center ${
          location === "/notif" ? "text-primary" : "text-white"
        }`}
      >
        <BellIcon className="w-6 h-6" />
        <span className="text-xs">Notification</span>
      </Link>
      <Link
        to="/profile"
        className={`flex flex-col items-center ${
          location === "/profile" ? "text-primary" : "text-white"
        }`}
      >
        {avatar ? (
          <img className="w-6 h-6 rounded-full" src={avatar} />
        ) : (
          <UserIcon className="w-6 h-6" />
        )}
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  );
};

export default NavBar;
