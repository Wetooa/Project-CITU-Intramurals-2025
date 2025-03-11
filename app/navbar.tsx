"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full  h-16 pl-10 pr-10 bg-mocha flex justify-between items-center shadow-[0px_9px_0px_0px_rgba(46,_45,_44,_0.1)] p-4 box-border">
      {/* Logo */}

      <Image
        className="h-auto cursor-pointer max-w-full"
        src="/thetechnologian_logo.svg"
        height={10}
        width={180}
        alt="image description"
        onClick={() => redirect("/")}
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex h-full w-1/2 items-center gap-16 text-white justify-end pr-12">
        <NavLink path="home" />
        <NavLink path="schedule" />
        <NavLink path="leaderboard" />
        <NavLink path="bracket" />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 overflow-x-auto z-50 left-0 w-full bg-mocha text-white flex flex-col items-center gap-4 py-4 shadow-lg md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <NavLink path="home" onClick={() => setIsOpen(false)} />
            <NavLink path="schedule" onClick={() => setIsOpen(false)} />
            <NavLink path="leaderboard" onClick={() => setIsOpen(false)} />
            <NavLink path="bracket" onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ path, onClick }: { path: string; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive =
    pathname === `/${path.toLowerCase()}` ||
    (path.toLowerCase() === "home" && pathname === "/");

  return (
    <Link
      className="relative font-bold text-center transition-all duration-300"
      href={path.toLowerCase() === "home" ? "/" : `/${path.toLowerCase()}`}
      onClick={onClick}
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
