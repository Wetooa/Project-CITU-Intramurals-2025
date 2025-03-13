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
import type { Leaderboard, Schedule } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronRight, Menu, Trophy } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    queryKey: ["ranking home"],
    queryFn: () => getRanking(),
  });

  const { data: schedulesData, isLoading: isLoadingSched } = useQuery({
    queryKey: ["schedule home"],
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
      })
    );
  }, [date, filter, schedulesData, selectedSport]);

  return (
    <div className="flex flex-col min-h-screen bg-[#1A1918]">
      {/* Header for mobile */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#242322] border-b border-white/10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-[#242322] border-r border-white/10 p-0"
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="p-6 border-b border-white/10">
                <Image
                  src="/citu_intrams.svg"
                  width={180}
                  height={40}
                  alt="intrams logo"
                  className="mb-4"
                />
              </div>

              <div className="p-6">
                <p className="text-xl font-bold text-white mb-4">SPORTS</p>
                <div className="space-y-3">
                  {GAMES.slice(0, 16).map((game, index) => (
                    <p
                      key={index}
                      className={cn(
                        "text-base cursor-pointer transition-all duration-200 font-bold",
                        selectedSport === game
                          ? "text-red-500"
                          : "text-gray-300 hover:text-white"
                      )}
                      onClick={() => setSelectedSport(game)}
                    >
                      {game.toUpperCase()}
                    </p>
                  ))}
                </div>

                <p className="text-xl font-bold text-white mt-8 mb-4">
                  ESPORTS
                </p>
                <div className="space-y-3">
                  {GAMES.slice(16).map((game, index) => (
                    <p
                      key={index}
                      className={cn(
                        "text-base cursor-pointer transition-all duration-200 font-bold",
                        selectedSport === game
                          ? "text-red-500"
                          : "text-gray-300 hover:text-white"
                      )}
                      onClick={() => setSelectedSport(game)}
                    >
                      {game.toUpperCase()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Image
          src="/citu_intrams.svg"
          width={150}
          height={30}
          alt="intrams logo"
        />

        <Button variant="ghost" size="icon" className="text-white opacity-0">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex flex-1 md:px-12 px-4 gap-6 w-full">
        {/* Sidebar - Desktop only */}
        <div className="h-full w-[300px] md:flex p-6 justify-start bg-[#242322] flex-col hidden overflow-y-auto rounded-bl-lg rounded-br-lg shadow-xl">
          <Image
            src="/citu_intrams.svg"
            width={200}
            height={50}
            alt="intrams logo"
            className="mb-8"
          />

          <p className="text-xl font-bold text-white mb-4">SPORTS</p>
          <div className="space-y-3">
            {GAMES.slice(0, 16).map((game, index) => (
              <p
                key={index}
                className={cn(
                  "text-base cursor-pointer transition-all duration-200 font-bold",
                  selectedSport === game
                    ? "text-red-500"
                    : "text-gray-300 hover:text-white"
                )}
                onClick={() => setSelectedSport(game)}
              >
                {game.toUpperCase()}
              </p>
            ))}
          </div>

          <p className="text-xl font-bold text-white mt-8 mb-4">ESPORTS</p>
          <div className="space-y-3">
            {GAMES.slice(16).map((game, index) => (
              <p
                key={index}
                className={cn(
                  "text-base cursor-pointer transition-all duration-200 font-bold",
                  selectedSport === game
                    ? "text-red-500"
                    : "text-gray-300 hover:text-white"
                )}
                onClick={() => setSelectedSport(game)}
              >
                {game.toUpperCase()}
              </p>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:w-1/2 w-full gap-6 py-6">
          <div className="bg-gradient-to-r from-[#3A2222] to-[#242322] rounded-lg w-full flex gap-2 justify-between items-center p-6 shadow-lg">
            <div className="flex flex-col">
              <h1 className="md:text-4xl text-2xl font-bold text-white mb-1">
                MATCH TODAY
              </h1>
              <p className="text-gray-400 md:block hidden">
                {date} • {selectedSport}
              </p>
            </div>

            <div className="flex gap-3">
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="border-0 bg-[#302F2E] h-12 md:w-48 w-[120px] hidden xl:flex md:text-base text-sm font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#582424] font-bold text-base text-white">
                  <SelectGroup>
                    <SelectLabel className="text-base font-bold">
                      SPORTS
                    </SelectLabel>
                    {GAMES.slice(0, 16).map((game, index) => (
                      <SelectItem key={index} value={game}>
                        {game.toUpperCase()}
                      </SelectItem>
                    ))}

                    <SelectSeparator className="bg-white/20"></SelectSeparator>

                    <SelectLabel className="text-base font-bold">
                      ESPORTS
                    </SelectLabel>
                    {GAMES.slice(16).map((game, index) => (
                      <SelectItem key={index} value={game}>
                        {game}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="border-0 bg-[#302F2E] h-12 md:w-40 w-[120px] md:text-base text-sm font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#582424] font-bold text-base text-white">
                  <SelectGroup>
                    <SelectItem value="Ongoing">ONGOING</SelectItem>
                    <SelectItem value="Completed">FINISHED</SelectItem>
                    <SelectItem value="Scheduled">LATER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoadingSched ? (
            <HomeMatchesSkeleton />
          ) : (
            <HomeMatches schedule={schedule} />
          )}

          {/* Mobile Rankings */}
          <div className="md:hidden mt-4 mb-8">
            <div className="bg-[#242322] rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-xl font-bold text-white">Top Rankings</h2>
                </div>
                <Button
                  variant="link"
                  className="text-blue-400 p-0 h-auto flex items-center gap-1"
                  asChild
                >
                  <a href="/leaderboard">
                    View All <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              {isLoadingRanking || ranking.length === 0 ? (
                <div className="space-y-4">
                  <div className="h-12 bg-[#302F2E] rounded-md animate-pulse"></div>
                  <div className="h-12 bg-[#302F2E] rounded-md animate-pulse"></div>
                  <div className="h-12 bg-[#302F2E] rounded-md animate-pulse"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-[#302F2E] rounded-md">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black mr-3">
                      1
                    </div>
                    <span className="font-bold text-white">
                      {ranking[0].teamId}
                    </span>
                  </div>
                  <div className="flex items-center p-3 bg-[#302F2E] rounded-md">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-black mr-3">
                      2
                    </div>
                    <span className="font-bold text-white">
                      {ranking[1].teamId}
                    </span>
                  </div>
                  <div className="flex items-center p-3 bg-[#302F2E] rounded-md">
                    <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center font-bold text-black mr-3">
                      3
                    </div>
                    <span className="font-bold text-white">
                      {ranking[2].teamId}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Rankings */}
        {isLoadingRanking || ranking.length === 0 ? (
          <HomeRankingSkeleton />
        ) : (
          <HomeRanking
            first={ranking[0].teamId}
            second={ranking[1].teamId}
            third={ranking[2].teamId}
          />
        )}
      </div>
    </div>
  );
}
