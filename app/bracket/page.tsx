"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import CustomizedSelect from "@/components/shared/customized-select";
// import { TEAMS, GAMES } from "@/types/constant";

export default function BracketScreen() {
  const [selectedBracket] = useState("Basketball (Men)");

  useEffect(() => {
    console.log(selectedBracket);
  }, [selectedBracket]);

  return (
    <div className="p-6 flex flex-col items-center justify-center w-screen h-screen">
      <span className="md:text-4xl text-xl font-bold align-middle text-center">
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
  //         value={selectedBracket}
  //         onChange={(value) => setSelectedBracket(value)}
  //       />
  //     </div>
  //     <div className="h-screen w-[400px] md:flex  p-6  pl-10  justify-start bg-phantom_ash flex-col hidden mb-6 mt-6 overflow-y-auto">
  //       <p className="text-6xl font-bold self-start ">BRACKET</p>
  //
  //       <p className="text-2xl font-bold self-start mt-10">SPORTS</p>
  //       <div className="mt-5 flex flex-col gap-2">
  //         {GAMES.slice(0, 16).map((game, index) => (
  //           <p
  //             key={index}
  //             className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
  //               selectedBracket === game ? "text-red-500" : "text-gray-200"
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
  //               selectedBracket === game ? "text-red-500" : "text-gray-200"
  //             }`}
  //             onClick={() => setSelectedBracket(game)}
  //           >
  //             {game.toUpperCase()}
  //           </p>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
}
