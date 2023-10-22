import {
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import type { FC } from "react";

type navbar = {
  location: string;
  avatar?: string;
};

const NavBar: FC<navbar> = ({ location, avatar }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-2">
      <a
        href="#"
        className={`flex flex-col items-center ${
          location === "home" ? "text-blue-500" : "text-white"
        }`}
      >
        <HomeIcon className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </a>
      <a
        href="#"
        className={`flex flex-col items-center ${
          location === "chat" ? "text-blue-500" : "text-white"
        }`}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
        <span className="text-xs">Chat</span>
      </a>
      <a
        href="#"
        className={`flex flex-col items-center ${
          location === "new" ? "text-blue-500" : "text-white"
        }`}
      >
        <PlusIcon className="w-6 h-6" />
        <span className="text-xs">New</span>
      </a>
      <a
        href="#"
        className={`flex flex-col items-center ${
          location === "notif" ? "text-blue-500" : "text-white"
        }`}
      >
        <BellIcon className="w-6 h-6" />
        <span className="text-xs">Notification</span>
      </a>
      <a
        href="#"
        className={`flex flex-col items-center ${
          location === "user" ? "text-blue-500" : "text-white"
        }`}
      >
        {avatar ? (
          <img className="w-6 h-6 rounded-full" src={avatar} />
        ) : (
          <UserIcon className="w-6 h-6" />
        )}
        <span className="text-xs">User</span>
      </a>
    </div>
  );
};

export default NavBar
