"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export function NavBar() {
  return (
    <nav className="w-full h-16 bg-mocha   flex align-middle justify-between  shadow-[0px_9px_0px_0px_rgba(46,_45,_44,_0.1)] p-4 box-border">
      <Image
        className="h-auto max-w-full"
        src="/thetechnologian_logo.png"
        alt="The Technologian Logo"
        width={164}
        height={31}
      />

      <div className="flex h-full w-1/2 items-center gap-16  text-white justify-end pr-12">
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
      className="relative font-bold text-center transition-all duration-300"
      href={path.toLowerCase() === "home" ? "/" : `/${path.toLowerCase()}`}
    >
      <span className={isActive ? "text-[#FF4747]" : "hover:text-[#FF4747]"}>
        {path.toUpperCase()}
      </span>

      <motion.div
        className="absolute bottom-[-8px] left-0 h-[4px] bg-[#FF4747]"
        initial={{ width: 0, opacity: 0 }}
        animate={isActive ? { width: "100%", opacity: 1 } : {}}
        whileHover={{ width: "100%", opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </Link>
  );
}
