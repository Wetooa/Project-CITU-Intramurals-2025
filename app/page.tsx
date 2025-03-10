"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { teams, games } from "@/types/constant";
import { HomeRanking } from "@/components/feature/homeranking";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [selectCategory, setSelectedCategory] = useState("BASKETBALL");
  const [filter, setFilter] = useState("ONGOING");
  return (
    <div className="flex pl-12 pr-12 gap-6 w-full h-screen overflow-hidden">
      <div className="h-screen w-[400px] flex  p-6  pl-10  justify-start bg-phantom_ash flex-col">
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
              className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
                selectCategory === game.toUpperCase()
                  ? "text-red-500"
                  : "text-gray-200"
              }`}
              onClick={() => setSelectedCategory(game.toUpperCase())}
            >
              {game.toUpperCase()}
            </p>
          ))}
        </div>
        <p className="text-2xl font-bold self-start mt-10">ESPORTS</p>
        <div className="mt-5 flex flex-col gap-2">
          {games.slice(8).map((game, index) => (
            <p
              key={index}
              className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
                selectCategory === game.toUpperCase()
                  ? "text-red-500"
                  : "text-gray-200"
              }`}
              onClick={() => setSelectedCategory(game.toUpperCase())}
            >
              {game.toUpperCase()}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-1/2 gap-4 h-full">
        <div className="bg-[#242322] rounded-br-lg rounded-bl-lg w-full flex justify-between items-center p-6 h-32">
          <span className="text-5xl font-bold">MATCH TODAY</span>
          <Select defaultValue="ONGOING" onValueChange={setFilter}>
            <SelectTrigger className="border-0 bg-[#302F2E] h-16 w-[180px] text-xl font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#582424] font-bold text-lg text-white">
              <SelectGroup>
                <SelectItem value="ONGOING">ONGOING</SelectItem>
                <SelectItem value="FINISHED">FINISHED</SelectItem>
                <SelectItem value="LATER">LATER</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
