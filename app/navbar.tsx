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
      ></img>

      <div className="flex h-full w-1/2 align-middle gap-16 justify-end pr-12">
        <NavLink path="home"></NavLink>
        <NavLink path="SCHEDULE"></NavLink>
        <NavLink path="LEADERBOARD"></NavLink>
        <NavLink path="BRACKET"></NavLink>
      </div>
    </nav>
  );
}

function NavLink({ path }: { path: string }) {
  var pathname = usePathname();

  pathname = pathname.replace("/", "");

  //   alert(pathname);

  if (
    pathname == path.toLowerCase() ||
    (path.toUpperCase() == "HOME" && pathname === "/")
  ) {
    return (
      <a className="font-bold text-center border-b-8 border-[#FF4747]">
        {path.toUpperCase()}
      </a>
    );
  } else {
    return (
      <Link
        className="font-bold hover:cursor-pointer  hover:text-[#FF4747]"
        href={path.toLowerCase()}
      >
        {path.toUpperCase()}
      </Link>
    );
  }
}
