"use client";
import React, { useEffect, useState } from "react";
import CustomizedSelect from "@/components/shared/customized-select";
import { TEAMS, GAMES } from "@/types/constant";

export default function BracketScreen() {
  const [selectBracket, setSelectedBracket] = useState("");
  useEffect(() => {
    console.log(selectBracket);
  }, [selectBracket]);
  return (
    <>
      <div className="flex items-center justify-start mt-10 md:mt-0 ">
        <div className="md:hidden">
          <CustomizedSelect
            title={"Brackets"}
            options={TEAMS}
            value={selectBracket}
            onChange={(value) => setSelectedBracket(value)}
          ></CustomizedSelect>
        </div>
        <div className="h-screen w-[400px] z-50 flex  p-5  pl-10  justify-start bg-phantom_ash te flex-col">
          <p className="text-6xl font-bold self-start mb-10  cursor-pointer hover:animate-pulse">
            BRACKET
          </p>
          <p className="text-2xl font-bold self-start mt-10">SPORTS</p>
          <div className="mt-5 flex flex-col gap-2">
            {GAMES.slice(0, 7).map((game, index) => (
              <p
                key={index}
                className="text-xl text-gray-200 cursor-pointer hover:scale-105 transition-all font-bold "
                onClick={() => setSelectedBracket(game.toUpperCase())}
              >
                {game.toUpperCase()}
              </p>
            ))}
            <p className="text-2xl font-bold self-start mt-10">ESPORTS</p>
            {GAMES.slice(7).map((game, index) => (
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
      </div>
    </>
  );
}
