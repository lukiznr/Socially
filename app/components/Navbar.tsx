import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "@remix-run/react";
import type { FC } from "react";
import Avatar from "./avatar";
import Button from "./button";
type navbar = {
  avatar?: string;
};

const NavBar: FC<navbar> = ({ avatar }) => {
  const baseClass = "flex flex-col items-center";
  return (
    <div className="fixed bottom-0 left-0 flex flex-col w-full">
     <div>
        <Button className="rounded-full">
          <PlusIcon className="w-6 h-6 rounded-full" />
        </Button>
      </div>
      <div className="bg-surface-100 dark:bg-surface-900 fixed bottom-0 left-0 flex w-full justify-around py-2 border-t-2 border-t-surface-300 dark:border-t-surface-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${baseClass} text-primary-500`
              : `${baseClass} text-surface-950 dark:text-surface-50`
          }
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? `${baseClass} text-primary-500`
              : `${baseClass} text-surface-950 dark:text-surface-50`
          }
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          <span className="text-xs">Chat</span>
        </NavLink>
        <NavLink
          to="/new"
          className={({ isActive }) =>
            isActive
              ? `${baseClass} text-primary-500`
              : `${baseClass} text-surface-950 dark:text-surface-50`
          }
        >
          <PlusIcon className="h-6 w-6" />
          <span className="text-xs">New</span>
        </NavLink>
        <NavLink
          to="/notif"
          className={({ isActive }) =>
            isActive
              ? `${baseClass} text-primary-500`
              : `${baseClass} text-surface-950 dark:text-surface-50`
          }
        >
          <BellIcon className="h-6 w-6" />
          <span className="text-xs">Notification</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${baseClass} text-primary-500`
              : `${baseClass} text-surface-950 dark:text-surface-50`
          }
        >
          <Avatar src={avatar} name="Your Profile" size="sm" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
