"use client";
import React, { useEffect, useState } from "react";
import CustomizedSelect from "@/components/shared/customized-select";
import { GAMES, TEAMS } from "@/types/constant";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BracketScreen() {
  const [selectBracket, setSelectedBracket] = useState("Basketball (Men)");

  useEffect(() => {
    console.log(selectBracket);
  }, [selectBracket]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <span className="text-4xl font-bold align-middle text-center">
        There are no bracket matches scheduled for today. Round-robin matches
        are still in progress.
      </span>
      <motion.div
        animate={{ y: [0, -5, 0] }} // Moves up and down
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/IMG_5077.PNG"
          width={500}
          height={800}
          alt="404 leo"
        ></Image>
      </motion.div>
    </div>
  );

  // return (
  //   <div className="flex items-center pl-12 pr-12 h-screen w-full ">
  //     <div className="md:hidden">
  //       <CustomizedSelect
  //         title={"Brackets"}
  //         options={TEAMS.map((team) => ({
  //           label: team,
  //           value: team,
  //         }))}
  //         value={selectBracket}
  //         onChange={(value) => setSelectedBracket(value)}
  //       />
  //     </div>
  //     <div className="h-screen w-[400px] md:flex  p-6  pl-10  justify-start bg-phantom_ash flex-col hidden mb-6 mt-6 overflow-y-auto">
  //       <p className="text-6xl font-bold self-start ">BRACKET</p>

  //       <p className="text-2xl font-bold self-start mt-10">SPORTS</p>
  //       <div className="mt-5 flex flex-col gap-2">
  //         {GAMES.slice(0, 16).map((game, index) => (
  //           <p
  //             key={index}
  //             className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
  //               selectBracket === game ? "text-red-500" : "text-gray-200"
  //             }`}
  //             onClick={() => setSelectedBracket(game)}
  //           >
  //             {game.toUpperCase()}
  //           </p>
  //         ))}
  //       </div>
  //       <p className="text-2xl font-bold self-start mt-10">ESPORTS</p>
  //       <div className="mt-5 flex flex-col gap-2">
  //         {GAMES.slice(16).map((game, index) => (
  //           <p
  //             key={index}
  //             className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
  //               selectBracket === game ? "text-red-500" : "text-gray-200"
  //             }`}
  //             onClick={() => setSelectedBracket(game)}
  //           >
  //             {game.toUpperCase()}
  //           </p>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
}
