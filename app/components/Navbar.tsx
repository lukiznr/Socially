import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "@remix-run/react";
import type { FC } from "react";

type navbar = {
  avatar?: string;
};

const NavBar: FC<navbar> = ({ avatar }) => {
  const baseClass = "flex flex-col items-center";
  return (
    <div className="bg-surface-variant fixed bottom-0 left-0 flex w-full justify-around py-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${baseClass} text-primary` : `${baseClass} text-white`
        }
      >
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          isActive ? `${baseClass} text-primary` : `${baseClass} text-white`
        }
      >
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
        <span className="text-xs">Chat</span>
      </NavLink>
      <NavLink
        to="/new"
        className={({ isActive }) =>
          isActive ? `${baseClass} text-primary` : `${baseClass} text-white`
        }
      >
        <PlusIcon className="h-6 w-6" />
        <span className="text-xs">New</span>
      </NavLink>
      <NavLink
        to="/notif"
        className={({ isActive }) =>
          isActive ? `${baseClass} text-primary` : `${baseClass} text-white`
        }
      >
        <BellIcon className="h-6 w-6" />
        <span className="text-xs">Notification</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? `${baseClass} text-primary` : `${baseClass} text-white`
        }
      >
        {avatar ? (
          <img className="h-6 w-6 rounded-full" src={avatar} />
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
        <span className="text-xs">Profile</span>
      </NavLink>
    </div>
  );
};

export default NavBar;
