"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { teams, games } from "@/types/constant";
import { HomeRanking } from "@/components/feature/homeranking";

export default function Home() {
  const [selectBracket, setSelectedBracket] = useState("");
  return (
    <div className="flex pl-12 pr-12 gap-6 w-full h-screen">
      <div className="h-screen w-[400px] z-50 flex  p-6  pl-10  justify-start bg-phantom_ash te flex-col">
        <Image
          src="/citu_intrams.svg"
          width={250}
          height={50}
          alt="intrams logo"
        ></Image>
        <p className="text-2xl font-bold self-start mt-10">SPORTS</p>
        <div className="mt-5 flex flex-col gap-2">
          {games.slice(0, 8).map((game, index) => (
            <p
              key={index}
              className="text-xl text-gray-200 cursor-pointer hover:scale-105 transition-all font-bold "
              onClick={() => setSelectedBracket(game.toUpperCase())}
            >
              {game.toUpperCase()}
            </p>
          ))}
          <p className="text-2xl font-bold self-start mt-10">ESPORTS</p>
          {games.slice(7).map((game, index) => (
            <p
              key={index}
              className="text-xl text-gray-200 cursor-pointer hover:scale-105 transition-all font-bold "
              onClick={() => setSelectedBracket(game.toUpperCase())}
            >
              {game.toUpperCase()}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-1/2 gap-4 h-full">
        <div className="bg-[#242322] rounded-br-lg rounded-bl-lg w-full flex items-center p-6 h-32">
          <span className="text-5xl font-bold">MATCH TODAY</span>
        </div>
        <div className="bg-[#242322] rounded-tr-lg rounded-tl-lg p-2 w-full h-full"></div>
      </div>

      <HomeRanking
        first="Department A"
        second="Department B"
        third="Department C"
      />
    </div>
  );
}
