"use client";

import HomeMatches, {
  HomeMatchesSkeleton,
} from "@/components/feature/homematch";
import {
  HomeRanking,
  HomeRankingSkeleton,
} from "@/components/feature/homeranking";
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
import { getDateToday } from "@/lib/utils";
import { GAMES } from "@/types/constant";
import { Leaderboard, Schedule } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

async function getSchedule() {
  const response = await fetch(`/api/schedule/`, {
    cache: "reload",
    next: { revalidate: 300 },
  });
  const result = await response.json();
  return result.schedule as Schedule[];
}

async function getRanking() {
  const response = await fetch(`/api/leaderboard/`, {
    cache: "reload",
    next: { revalidate: 300 },
  });
  const result = await response.json();
  return result.leaderboard as Record<string, Leaderboard[]>;
}

export default function Home() {
  const date = getDateToday();
  const [selectedSport, setSelectedSport] = useState("Basketball 3x3");
  const [filter, setFilter] = useState("Ongoing");

  const { data: rankingData, isLoading: isLoadingRanking } = useQuery({
    queryKey: ["ranking"],
    queryFn: () => getRanking(),
  });

  const { data: schedulesData, isLoading: isLoadingSched } = useQuery({
    queryKey: ["schedule"],
    queryFn: () => getSchedule(),
  });

  const [ranking, setRanking] = useState<Leaderboard[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    if (!rankingData) return;

    setRanking(rankingData[selectedSport]);
  }, [rankingData, selectedSport]);

  useEffect(() => {
    if (!schedulesData) return;
    setSchedule(
      schedulesData.filter((sched) => {
        return (
          sched.category === selectedSport &&
          sched.matchDate === date &&
          sched.status === filter
        );
      }),
    );
  }, [date, filter, schedulesData, selectedSport]);

  return (
    <div className="flex md:pl-12 md:pr-12 pl-6 pr-6 gap-6 w-full h-full ">
      <div className="h-full w-[400px] md:flex  p-6  pl-10  justify-start bg-phantom_ash flex-col hidden mb-6 overflow-y-auto">
        <Image
          src="/citu_intrams.svg"
          width={250}
          height={50}
          alt="intrams logo"
        ></Image>

        <p className="text-2xl font-bold self-start mt-10">SPORTS</p>
        <div className="mt-5 flex flex-col gap-2">
          {GAMES.slice(0, 16).map((game, index) => (
            <p
              key={index}
              className={`text-xl  cursor-pointer hover:scale-105 transition-all font-bold ${
                selectedSport === game ? "text-red-500" : "text-gray-200"
              }`}
              onClick={() => setSelectedSport(game)}
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
                selectedSport === game ? "text-red-500" : "text-gray-200"
              }`}
              onClick={() => setSelectedSport(game)}
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

          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="border-0 bg-[#302F2E] h-16 md:w-48 w-1/3 md:text-xl md:hidden text-sm font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#582424] font-bold text-lg text-white">
              <SelectGroup>
                <SelectLabel className="text-lg font-bold">SPORTS</SelectLabel>
                {GAMES.slice(0, 16).map((game, index) => (
                  <SelectItem key={index} value={game}>
                    {game.toUpperCase()}
                  </SelectItem>
                ))}

                <SelectSeparator className="bg-white"></SelectSeparator>

                <SelectLabel className="text-lg font-bold">ESPORTS</SelectLabel>
                {GAMES.slice(16).map((game, index) => (
                  <SelectItem key={index} value={game}>
                    {game}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="border-0 bg-[#302F2E] h-16 md:w-48 w-1/3  md:text-xl text-sm  font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#582424] font-bold text-lg text-white">
              <SelectGroup>
                <SelectItem value="Ongoing">ONGOING</SelectItem>
                <SelectItem value="Completed">FINISHED</SelectItem>
                <SelectItem value="Scheduled">LATER</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <span className="self-center md:hidden md:text-5xl text-md font-bold">
          MATCH TODAY
        </span>

        {isLoadingSched ? (
          <HomeMatchesSkeleton />
        ) : (
          <HomeMatches schedule={schedule} />
        )}
      </div>

      {isLoadingRanking || ranking.length === 0 ? (
        <HomeRankingSkeleton />
      ) : (
        <HomeRanking
          first={ranking[0].teamId}
          second={ranking[1].teamId}
          third={ranking[2].teamId}
        ></HomeRanking>
      )}
    </div>
  );
}
