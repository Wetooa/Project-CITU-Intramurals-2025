"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  return (
      <nav className="w-full h-16 flex align-middle justify-between bg-[#262524] shadow-[0px_9px_0px_0px_rgba(46,_45,_44,_0.1)] p-4 box-border">
        <img
            className="h-auto max-w-full"
            src="./thetechnologian_logo.png"
            alt="image description"
        />

        <div className="flex h-full w-1/2 items-center gap-16 justify-end pr-12">
          <NavLink path="home" />
          <NavLink path="schedule" />
          <NavLink path="leaderboard" />
          <NavLink path="bracket" />
        </div>
      </nav>
  );
}

function NavLink({ path }: { path: string }) {
  const pathname = usePathname();

  const isActive =
      pathname === `/${path.toLowerCase()}` ||
      (path.toLowerCase() === "home" && pathname === "/");

  return (
      <Link
          className={`font-bold text-center relative transition-all duration-300 ${
              isActive ? "text-[#FF4747]" : "hover:text-[#FF4747]"
          }`}
          href={path.toLowerCase() === "home" ? "/" : `/${path.toLowerCase()}`}
      >
        {path.toUpperCase()}
        <span
            className={`absolute bottom-[-8px] left-0 w-full h-[4px] transition-all duration-300 ${
                isActive ? "bg-[#FF4747]" : "hover:bg-[#FF4747] opacity-0 hover:opacity-100"
            }`}
        />
      </Link>
  );
}
