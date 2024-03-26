"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
const Sidebar = () => {
  const pathName = usePathname();

  const { userId } = useAuth();
  return (
    <div className="border-r-[1px] w-[300px] h-screen">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 ">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName == link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
