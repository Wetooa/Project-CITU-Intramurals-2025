"use client";
// import Image from "next/image";
// import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CustomizedSelect from "@/components/shared/customized-select";
import { TEAMS, GAMES, teamLogos } from "@/types/constant";
import { Matches } from "@/types/types";

export default function BracketScreen() {
  const [selectedBracket, setSelectedBracket] = useState("Basketball 3x3");

  useEffect(() => {
    console.log(selectedBracket);
  }, [selectedBracket]);

  // return (
  //   <div className="p-6 flex flex-col items-center justify-center w-screen h-screen">
  //     <span className="md:text-4xl text-xl font-bold align-middle text-center">
  //       There are no bracket matches scheduled for today. Round-robin matches
  //       are still in progress.
  //     </span>
  //     <motion.div
  //       animate={{ y: [0, -5, 0] }} // Moves up and down
  //       transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  //     >
  //       <Image
  //         src="/IMG_5077.PNG"
  //         width={500}
  //         height={800}
  //         alt="404 leo"
  //       ></Image>
  //     </motion.div>
  //   </div>
  // );

  return (
    <div className="flex items-center pl-12 pr-12 md:flex-row flex-col gap-6 md:gap-0 h-screen w-full ">
      <div className="md:hidden">
        <CustomizedSelect
          title={"Brackets"}
          options={TEAMS.map((team) => ({
            label: team,
            value: team,
          }))}
          value={selectedBracket}
          onChange={(value) => setSelectedBracket(value)}
        />
      </div>
      <div className="h-screen w-[400px] md:flex  p-6  pl-10  justify-start bg-phantom_ash flex-col hidden mb-6 mt-6 overflow-y-auto">
        <p className="text-6xl font-bold self-start ">BRACKET</p>

        <p className="text-2xl font-bold self-start mt-10">SPORTS</p>
        <div className="mt-5 flex flex-col gap-2">
          {GAMES.slice(0, 16).map((game, index) => (
            <p
              key={index}
              className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
                selectedBracket === game ? "text-red-500" : "text-gray-200"
              }`}
              onClick={() => setSelectedBracket(game)}
            >
              {game.toUpperCase()}
            </p>
          ))}
        </div>
        <p className="text-2xl font-bold self-start mt-10">ESPORTS</p>
        <div className="mt-5 flex flex-col gap-2">
          {GAMES.slice(16).map((game, index) => (
            <p
              key={index}
              className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
                selectedBracket === game ? "text-red-500" : "text-gray-200"
              }`}
              onClick={() => setSelectedBracket(game)}
            >
              {game.toUpperCase()}
            </p>
          ))}
        </div>
      </div>
      <div className=" md:w-[2000px] w-full overflow-x-auto h-full flex justify-center items-center">
        <BracketGenerator matches={tournamentMatches}></BracketGenerator>
      </div>
    </div>
  );
}

export const tournamentMatches = {
  rounds: [
    {
      roundId: "Round 1 - Round Robin",
      seeds: [
        {
          gameNo: 1,
          team1Name: "Virgo",
          team2Name: "Pisces",
          winner: "Virgo",
          team1Score: 21,
          team2Score: 18,
        },
        {
          gameNo: 2,
          team1Name: "Sagittarius",
          team2Name: "Capricorn",
          winner: "Capricorn",
          team1Score: 15,
          team2Score: 22,
        },
        {
          gameNo: 3,
          team1Name: "Libra",
          team2Name: "Scorpio",
          winner: "Libra",
          team1Score: 19,
          team2Score: 17,
        },
        {
          gameNo: 4,
          team1Name: "Taurus",
          team2Name: "Leo",
          winner: "Leo",
          team1Score: 16,
          team2Score: 20,
        },
      ],
    },
    {
      roundId: "Round 2 - Round Robin",
      seeds: [
        {
          gameNo: 5,
          team1Name: "Virgo",
          team2Name: "Sagittarius",
          winner: "Virgo",
          team1Score: 23,
          team2Score: 19,
        },
        {
          gameNo: 6,
          team1Name: "Pisces",
          team2Name: "Capricorn",
          winner: "Capricorn",
          team1Score: 14,
          team2Score: 21,
        },
        {
          gameNo: 7,
          team1Name: "Libra",
          team2Name: "Taurus",
          winner: "Libra",
          team1Score: 22,
          team2Score: 20,
        },
        {
          gameNo: 8,
          team1Name: "Scorpio",
          team2Name: "Leo",
          winner: "Leo",
          team1Score: 17,
          team2Score: 25,
        },
      ],
    },
    {
      roundId: "Round 3 - Semifinals",
      seeds: [
        {
          gameNo: 9,
          team1Name: "Virgo",
          team2Name: "Leo",
          winner: "Virgo",
          team1Score: 27,
          team2Score: 24,
        },
        {
          gameNo: 10,
          team1Name: "Capricorn",
          team2Name: "Libra",
          winner: "Capricorn",
          team1Score: 22,
          team2Score: 20,
        },
      ],
    },
    {
      roundId: "Round 4 - Finals",
      seeds: [
        {
          gameNo: 11,
          team1Name: "Virgo",
          team2Name: "Capricorn",
          winner: "Virgo",
          team1Score: 30,
          team2Score: 28,
        },
      ],
    },
    {
      roundId: "Round 4 - Third Place Match",
      seeds: [
        {
          gameNo: 12,
          team1Name: "Leo",
          team2Name: "Libra",
          winner: "Leo",
          team1Score: 25,
          team2Score: 23,
        },
      ],
    },
  ],
} as Matches;

export function BracketGeneratorRound({
  round,
}: {
  round: Matches["rounds"];
}) {}

export function BracketGenerator({ matches }: { matches: Matches }) {
  return (
    <div className="w-max  h-full overflow-x-auto overflow-y-auto gap-5 flex flex-nowrap pl-12 pr-12">
      {matches.rounds.map((round, index) => (
        <div className="flex flex-col w-fit h-full gap-5">
          <div className="bg-[#242322] rounded-sm w-full h-5 p-4 flex justify-center items-center">
            <span>{round.roundId}</span>
          </div>
          <div className="w-[300px] md:h-[1000px] h-[500px] md:gap-16 gap-8 flex items-center justify-center flex-col">
            {round.seeds.map((seed, index) => (
              <div className="bg-[#242322] w-full h-28 flex flex-col">
                <div
                  className={`w-full h-1/2 flex items-center justify-center ${
                    seed.winner == seed.team1Name
                      ? "border-green-400 border-4"
                      : ""
                  }`}
                >
                  <div className="w-1/3 h-full flex bg-[#302F2E] justify-center items-center">
                    <Image
                      width={50}
                      height={50}
                      src={teamLogos[seed.team1Name]}
                      alt={seed.team1Name}
                    ></Image>
                  </div>

                  <div className="font-bold  h-full w-full justify-center items-center flex text-xl">
                    {seed.team1Name}
                  </div>
                  <div className="w-1/3 font-bold h-full flex justify-center items-center">
                    {seed.team1Score}
                  </div>
                </div>
                <div
                  className={`w-full h-1/2 flex items-center justify-center ${
                    seed.winner == seed.team2Name
                      ? "border-green-400 border-4"
                      : ""
                  }`}
                >
                  <div className="w-1/3 h-full flex bg-[#302F2E] justify-center items-center">
                    <Image
                      width={50}
                      height={50}
                      src={teamLogos[seed.team2Name]}
                      alt={seed.team2Name}
                    ></Image>
                  </div>

                  <div className="font-bold h-full w-full justify-center items-center flex text-xl">
                    {seed.team2Name}
                  </div>
                  <div className="w-1/3 font-bold h-full flex justify-center items-center">
                    {seed.team2Score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
