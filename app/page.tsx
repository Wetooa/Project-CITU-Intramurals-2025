"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { teams, games, gender } from "@/types/constant";
import { HomeRanking } from "@/components/feature/homeranking";
import { HomeComponent } from "@/components/feature/homecomponent";
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

export default function Home() {
  const [selectSport, setSelectedSport] = useState("BASKETBALL");
  const [selectCategory, setSelectedCategory] = useState("MEN");
  const [filter, setFilter] = useState("ONGOING");
  return (
    <div className="flex md:pl-12 md:pr-12 pl-6 pr-6 gap-6 w-full h-screen ">
      <div className="h-screen w-[400px] md:flex  p-6  pl-10  justify-start bg-phantom_ash flex-col hidden mb-6">
        <Image
          src="/citu_intrams.svg"
          width={250}
          height={50}
          alt="intrams logo"
        ></Image>
        <p className="text-2xl font-bold self-start mt-10">CATEGORY</p>
        <div className="mt-5 flex flex-col gap-2">
          {gender.map((game, index) => (
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
        <p className="text-2xl font-bold self-start mt-10">SPORTS</p>
        <div className="mt-5 flex flex-col gap-2">
          {games.slice(0, 8).map((game, index) => (
            <p
              key={index}
              className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
                selectSport === game.toUpperCase()
                  ? "text-red-500"
                  : "text-gray-200"
              }`}
              onClick={() => setSelectedSport(game.toUpperCase())}
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
                selectSport === game.toUpperCase()
                  ? "text-red-500"
                  : "text-gray-200"
              }`}
              onClick={() => setSelectedSport(game.toUpperCase())}
            >
              {game.toUpperCase()}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:w-1/2 w-full gap-4 h-full">
        <div className="bg-[#242322] rounded-br-lg rounded-bl-lg w-full flex gap-2 justify-between items-center md:p-6 p-2 h-32">
          <span className="hidden md:block md:text-5xl text-md font-bold">
            MATCH TODAY
          </span>

          <Select defaultValue="MEN" onValueChange={setFilter}>
            <SelectTrigger className="border-0 bg-[#302F2E] h-16 md:w-48 w-1/3 md:text-xl text-sm md:hidden font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#582424] font-bold text-lg text-white">
              <SelectGroup>
                <SelectItem value="MEN">MEN</SelectItem>
                <SelectItem value="WOMEN">WOMEN</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="BASKETBALL" onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-0 bg-[#302F2E] h-16 md:w-48 w-1/3 md:text-xl md:hidden text-sm font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#582424] font-bold text-lg text-white">
              <SelectGroup>
                <SelectLabel className="text-lg font-bold">SPORTS</SelectLabel>
                <SelectItem value="BASKETBALL">BASKETBALL</SelectItem>
                <SelectItem value="VOLLEYBALL">VOLLEYBALL</SelectItem>
                <SelectItem value="BADMINTON">BADMINTON</SelectItem>
                <SelectItem value="TABLE_TENNIS">TABLE TENNIS</SelectItem>
                <SelectItem value="CHESS">CHESS</SelectItem>
                <SelectItem value="SCRABBLE">SCRABBLE</SelectItem>
                <SelectItem value="FUTSAL">FUTSAL</SelectItem>
                <SelectItem value="SEPAK_TAKRAW">SEPAK TAKRAW</SelectItem>
                <SelectSeparator></SelectSeparator>

                <SelectLabel className="text-lg font-bold">ESPORTS</SelectLabel>

                <SelectItem value="CODM">CODM</SelectItem>
                <SelectItem value="MLBB">MLBB</SelectItem>
                <SelectItem value="TEKKEN_8">TEKKEN 8</SelectItem>
                <SelectItem value="VALORANT">VALORANT</SelectItem>
                <SelectItem value="MARVEL_RIVALS">MARVEL RIVALS</SelectItem>
                <SelectItem value="DOTA_2">DOTA 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="ONGOING" onValueChange={setFilter}>
            <SelectTrigger className="border-0 bg-[#302F2E] h-16 md:w-48 w-1/3  md:text-xl text-sm  font-bold">
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
        <span className="self-center md:hidden md:text-5xl text-md font-bold">
          MATCH TODAY
        </span>
        <div className="bg-[#242322] rounded-tr-lg rounded-tl-lg p-2 w-full h-full">
          <HomeComponent></HomeComponent>
        </div>
      </div>

      <HomeRanking
        first="Department A"
        second="Department B"
        third="Department C"
      />
    </div>
  );
}
