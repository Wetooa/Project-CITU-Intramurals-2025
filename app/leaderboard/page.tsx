"use client";
import type { Leaderboard } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Trophy,
  Medal,
  TrendingUp,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface LeaderboardContextType {
  dataLB: Leaderboard[] | undefined;
  isLoadingLB: boolean;
  isErrorLB: boolean;
  fetchLeaderboard: (category: string) => Promise<Leaderboard[]>;
}

const fetchLeaderboardHighlights = async () => {
  const response = await fetch("/api/leaderboard/highlights");

  if (!response.ok) {
    throw new Error(
      `Error fetching leaderboard highlights: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return {
    bestMover: data.bestMover,
    biggestWinner: data.biggestWinner,
    biggestLoser: data.biggestLoser,
  };
};

export default function LeaderBoardScreen() {
  const [selectedSport, setSelectedSport] = useState<string>("Overall");
  const [selectedGender, setSelectedGender] = useState<string>("(Men)");
  const [isSportSelected, setIsSportsSelected] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] =
    useState<Record<string, Leaderboard[]>>();
  const [isLoadingLB, setIsLoadingLB] = useState<boolean>(true);
  const [isErrorLB, setIsErrorLB] = useState<boolean>(false);

  const filterLeaderboard = (
    leaderboard: Record<string, Leaderboard[]> | undefined,
    sport: string,
    gender?: string
  ) => {
    if (!leaderboard) return;

    const isGenderful = hasGender();
    const params = gender && isGenderful ? `${sport} ${gender}` : `${sport}`;

    return leaderboard[params];
  };

  const renderedLeaderboard = useMemo(
    () => filterLeaderboard(leaderboardData, selectedSport, selectedGender),
    [leaderboardData, selectedSport, selectedGender]
  );

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("/api/leaderboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data = await response.json();

        if (data) {
          setLeaderboardData(data.leaderboard);
          setIsLoadingLB(false);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setIsErrorLB(true);
        return null;
      }
    };

    if (!leaderboardData) {
      fetchLeaderboardData();
    }
  }, [leaderboardData]);

  function hasGender() {
    return (
      isSportSelected &&
      !(
        selectedSport === "Basketball 3x3" || selectedSport === "Basketball 5x5"
      )
    );
  }

  const {
    data: dataHL,
    isLoading: isLoadingHL,
    isError: isErrorHL,
  } = useQuery({
    queryKey: ["leaderboardHighlights"],
    queryFn: fetchLeaderboardHighlights,
  });

  function handleSportChange(sportSelected: string) {
    setSelectedSport(sportSelected);
    setIsSportsSelected(Sports.some((sport) => sport.value === sportSelected));
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // animation variants for individual items
  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { duration: 0.4 },
      },
    },
  };

  const Sports = [
    { value: "Basketball 3x3", label: "BASKETBALL 3x3" },
    { value: "Basketball 5x5", label: "BASKETBALL 5x5" },
    { value: "Volleyball", label: "VOLLEYBALL" },
    { value: "Badminton", label: "BADMINTON" },
    { value: "Futsal", label: "FUTSAL" },
    { value: "Table Tennis", label: "TABLE TENNIS" },
    { value: "Chess", label: "CHESS" },
    { value: "Scrabble", label: "SCRABBLE" },
    { value: "Sepak Takraw", label: "SEPAK TAKRAW" },
  ];
  const Esports = [
    { value: "Valorant", label: "VALORANT" },
    { value: "CODM", label: "CODM" },
    { value: "MLBB", label: "MOBILE LEGENDS" },
    { value: "Tekken 8", label: "TEKKEN 8" },
    { value: "Marvel Rivals", label: "MARVEL RIVALS" },
    { value: "Dota 2", label: "DOTA 2" },
  ];

  const Genders = [
    { value: "(Men)", label: "MEN" },
    { value: "(Women)", label: "WOMEN" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white">
      {/* Header Section */}
      <div className="w-full px-5 pt-10 pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left lg:px-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          LEADERBOARD
        </h1>
      </div>

      {/* Highlights Section */}
      <div className="text-center mb-20">
        <h2 className="text-3xl lg:text-7xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#FFDB58] to-[#FFC107] animate-pulse">
          HIGHLIGHTS
        </h2>

        {isLoadingHL && (
          <div className="flex flex-col lg:flex-row md:flex-wrap justify-center gap-7 lg:px-20 mb-14 mt-20">
            <Skeleton className="min-h-80 rounded-3xl min-w-64" />
            <Skeleton className="min-h-80 rounded-3xl min-w-64" />
            <Skeleton className="min-h-80 rounded-3xl min-w-64" />
          </div>
        )}

        {isErrorHL && (
          <div className="text-red-500 p-4 rounded-lg bg-red-100/10">
            <h1>Error loading highlights</h1>
          </div>
        )}

        {dataHL && (
          <motion.div
            className="flex flex-col md:flex-row md:flex-wrap justify-center gap-10 lg:px-20 mt-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Biggest Winner Card */}
            <motion.div
              className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
              variants={itemVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                <Image
                  className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-yellow-400 shadow-lg shadow-yellow-400/20"
                  src={`/team_logo/${dataHL.biggestWinner.teamId}.png`}
                  alt="Team image of the Best Winner"
                  width={160}
                  height={160}
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-2 shadow-lg">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="relative">
                <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap text-sm font-bold pt-1 px-6 text-white bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                  Biggest Winner Today
                </p>
                <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-yellow-500/20 py-8 min-w-64 shadow-lg">
                  <p className="font-bold text-3xl text-yellow-400">
                    {dataHL.biggestWinner.teamId}
                  </p>
                  <p className="flex items-center justify-center gap-1 text-green-400">
                    <ChevronUp className="w-4 h-4" />
                    {dataHL.biggestWinner.points.wins} Wins
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Biggest Loser Card */}
            <motion.div
              className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
              variants={itemVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                <Image
                  className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-red-500 shadow-lg shadow-red-500/20"
                  src={`/team_logo/${dataHL.biggestLoser.teamId}.png`}
                  alt="Team image of the Best Loser"
                  width={160}
                  height={160}
                />
                <div className="absolute -top-4 -right-4 bg-red-500 rounded-full p-2 shadow-lg">
                  <ChevronDown className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="relative">
                <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                  Most Losses Today
                </p>
                <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-red-500/20 py-8 min-w-64 shadow-lg">
                  <p className="font-bold text-3xl text-red-400">
                    {dataHL.biggestLoser.teamId}
                  </p>
                  <p className="flex items-center justify-center gap-1 text-red-400">
                    <ChevronDown className="w-4 h-4" />
                    {dataHL.biggestLoser.points.losses} Losses
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Biggest Mover Card */}
            <motion.div
              className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
              variants={itemVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                <Image
                  className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-purple-500 shadow-lg shadow-purple-500/20"
                  src={`/team_logo/${dataHL.bestMover[0]}.png`}
                  alt="Team image of the Best Mover"
                  width={160}
                  height={160}
                />
                <div className="absolute -top-4 -right-4 bg-purple-500 rounded-full p-2 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="relative">
                <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                  Biggest Mover
                </p>
                <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-purple-500/20 py-8 min-w-64 shadow-lg">
                  <p className="font-bold text-3xl text-purple-400">
                    {dataHL.bestMover[0]}
                  </p>
                  <p className="flex items-center justify-center gap-1 text-purple-400">
                    <TrendingUp className="w-4 h-4" />#{dataHL.bestMover[1][0]}{" "}
                    → #{dataHL.bestMover[1][1]}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Rankings Section */}
      <div className="flex flex-col text-white gap-3 mb-20 px-5 lg:px-10">
        {/* Mobile Filters */}
        <div className="flex flex-col justify-center items-center mt-10 gap-5 lg:hidden">
          <Button
            variant="link"
            className={`text-3xl font-bold transition-colors duration-300 ${
              selectedSport === "Overall"
                ? "text-[#FF4747] underline decoration-2 underline-offset-8"
                : "hover:text-[#FF4747]/70"
            }`}
            onClick={() => handleSportChange("Overall")}
          >
            Overall
          </Button>
          <div className="flex flex-row justify-between gap-5">
            <Select onValueChange={(value) => handleSportChange(value)}>
              <SelectTrigger
                className={`${
                  isSportSelected ? "w-[240px]" : "w-[400px]"
                } px-3 bg-[#2a2a2a] border-[#3a3a3a] focus:ring-[#FF4747] focus:ring-opacity-50`}
              >
                <SelectValue placeholder="Select A Sport" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                <SelectGroup>
                  <SelectLabel className="text-[#FF4747]">SPORTS</SelectLabel>
                  {Sports.map((sport) => (
                    <SelectItem key={sport.value} value={sport.value}>
                      {sport.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-[#FF4747]">ESPORTS</SelectLabel>
                  {Esports.map((sport) => (
                    <SelectItem key={sport.value} value={sport.value}>
                      {sport.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {hasGender() && (
              <Select onValueChange={(value) => setSelectedGender(value)}>
                <SelectTrigger className="w-[240px] px-5 bg-[#2a2a2a] border-[#3a3a3a] focus:ring-[#FF4747] focus:ring-opacity-50">
                  <SelectValue placeholder="Men" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <SelectGroup>
                    <SelectLabel className="text-[#FF4747]">Gender</SelectLabel>
                    {Genders.map((gender) => (
                      <SelectItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="flex w-full flex-row lg:gap-5 h-fit mt-10">
          {/* Desktop Sidebar */}
          <div className="lg:flex flex-col w-1/4 gap-5 items-start pl-10 hidden">
            <Button
              variant="link"
              className={`text-4xl font-bold transition-colors duration-300 ${
                selectedSport === "Overall"
                  ? "text-[#FF4747] underline decoration-2 underline-offset-8"
                  : "hover:text-[#FF4747]/70"
              }`}
              onClick={() => handleSportChange("Overall")}
            >
              OVERALL
            </Button>
            <p className="text-5xl lg:text-3xl xl:text-5xl font-bold pl-4 mt-7 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              SPORTS
            </p>

            <div className="flex flex-col gap-2 items-start">
              {Sports.map((sport) => (
                <Button
                  variant="link"
                  key={sport.value}
                  value={sport.value}
                  className={`xl:text-2xl md:text-xl transition-colors duration-300 ${
                    selectedSport === sport.value
                      ? "text-[#FF4747] underline decoration-2 underline-offset-4"
                      : "hover:text-[#FF4747]/70"
                  }`}
                  onClick={() => handleSportChange(sport.value)}
                >
                  {sport.label}
                </Button>
              ))}
            </div>
            <p className="text-5xl lg:text-3xl xl:text-5xl font-bold pl-4 mt-7 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ESPORTS
            </p>
            <div className="flex flex-col gap-2 items-start">
              {Esports.map((sport) => (
                <Button
                  variant="link"
                  key={sport.value}
                  value={sport.value}
                  className={`xl:text-2xl md:text-xl transition-colors duration-300 ${
                    selectedSport === sport.value
                      ? "text-[#FF4747] underline decoration-2 underline-offset-4"
                      : "hover:text-[#FF4747]/70"
                  }`}
                  onClick={() => handleSportChange(sport.value)}
                >
                  {sport.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full h-fit lg:sticky lg:top-36 bg-gradient-to-br from-[#242322] to-[#1a1a1a] rounded-3xl py-7 px-4 shadow-xl border border-gray-800/50">
            <div className="flex flex-col lg:flex-row items-center mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-[#FF4747]" />
                <h3 className="font-bold text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Team Rankings
                </h3>
              </div>
              {hasGender() && (
                <div className="ml-auto hidden lg:flex gap-2">
                  {Genders.map((gender) => (
                    <Button
                      variant="outline"
                      value={gender.value}
                      key={gender.value}
                      className={`font-bold transition-colors duration-300 ${
                        selectedGender === gender.value
                          ? "bg-[#FF4747] text-white border-[#FF4747]"
                          : "bg-transparent hover:bg-[#FF4747]/10 hover:text-[#FF4747] border-gray-700"
                      }`}
                      onClick={() => setSelectedGender(gender.value)}
                    >
                      {gender.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-800/50">
              <Table>
                <TableHeader className="bg-gradient-to-r from-[#393837] to-[#2a2a2a]">
                  <TableRow className="border-b-0 hover:bg-transparent">
                    <TableHead className="w-16 text-white font-bold text-lg">
                      Rank
                    </TableHead>
                    <TableHead className="text-white font-bold text-lg">
                      Team
                    </TableHead>
                    <TableHead className="text-right text-white font-bold text-lg">
                      Wins
                    </TableHead>
                    <TableHead className="text-right w-20 lg:w-24 md:pr-10 text-white font-bold text-lg">
                      Losses
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingLB &&
                    Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <TableRow
                          key={i}
                          className="border-b border-gray-800/30"
                        >
                          <TableCell>
                            <Skeleton className="h-6 w-8" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-[150px]" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-6 w-8 ml-auto" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-6 w-8 ml-auto" />
                          </TableCell>
                        </TableRow>
                      ))}
                  {isErrorLB && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-red-500 py-8"
                      >
                        Error fetching leaderboard data
                      </TableCell>
                    </TableRow>
                  )}
                  {renderedLeaderboard &&
                    renderedLeaderboard
                      .sort(
                        (a: Leaderboard, b: Leaderboard) =>
                          Number(b.points.wins) - Number(a.points.wins)
                      )
                      .map((item: Leaderboard, index: number) => (
                        <TableRow
                          key={item.teamId}
                          className={`
                            border-b border-gray-800/30 hover:bg-gray-800/10 transition-colors duration-200
                            ${
                              index === 0
                                ? "bg-gradient-to-r from-yellow-300/10 to-yellow-500/5 hover:from-yellow-300/15 hover:to-yellow-500/10"
                                : index === 1
                                ? "bg-gradient-to-r from-gray-300/10 to-gray-400/5 hover:from-gray-300/15 hover:to-gray-400/10"
                                : index === 2
                                ? "bg-gradient-to-r from-yellow-700/10 to-yellow-900/5 hover:from-yellow-700/15 hover:to-yellow-900/10"
                                : ""
                            }
                          `}
                        >
                          <TableCell className="font-medium text-xl">
                            {index === 0 ? (
                              <div className="flex items-center gap-1">
                                <Trophy className="w-5 h-5 text-yellow-400" />
                                <span className="text-yellow-400">1</span>
                              </div>
                            ) : index === 1 ? (
                              <div className="flex items-center gap-1">
                                <Medal className="w-5 h-5 text-gray-300" />
                                <span className="text-gray-300">2</span>
                              </div>
                            ) : index === 2 ? (
                              <div className="flex items-center gap-1">
                                <Medal className="w-5 h-5 text-yellow-700" />
                                <span className="text-yellow-700">3</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">{index + 1}</span>
                            )}
                          </TableCell>
                          <TableCell className="text-left font-medium">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                                <Image
                                  src={`/team_logo/${item.teamId}.png`}
                                  alt={item.teamId}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/placeholder.svg?height=32&width=32";
                                  }}
                                />
                              </div>
                              {item.teamId}
                            </div>
                          </TableCell>
                          <TableCell className="text-right pr-3 lg:pr-7">
                            <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-md font-medium">
                              {item.points.wins}
                            </span>
                          </TableCell>
                          <TableCell className="text-right pr-6 lg:pr-14">
                            <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-md font-medium">
                              {item.points.losses}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>

            {/* Empty state */}
            {renderedLeaderboard &&
              renderedLeaderboard.length === 0 &&
              !isLoadingLB && (
                <div className="text-center py-10 text-gray-400">
                  <p>No teams found for the selected category</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
