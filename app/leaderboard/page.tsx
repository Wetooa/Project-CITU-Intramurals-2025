// import GameFiltersSchedule from "@/components/feature/game-filters";
"use client";
import { Leaderboard } from "@/types/types";
import { Button } from "@/components/ui/button";
import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

interface LeaderboardContextType {
  dataLB: Leaderboard[] | undefined;
  isLoadingLB: boolean;
  isErrorLB: boolean;
  fetchLeaderboard: (category: string) => Promise<Leaderboard[]>;
}

const fetchLeaderboard = async (category?: string) => {
  const url = category
    ? `/api/leaderboard?category=${category}`
    : "/api/leaderboard";
  console.log("The url being used: ", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error fetching leaderboard: ${response.status} ${response.statusText}`,
    );
  }

  const dataLB = await response.json();
  return dataLB.leaderboard;
};

const fetchLeaderboardHighlights = async () => {
  const response = await fetch("/api/leaderboard/highlights");

  if (!response.ok) {
    throw new Error(
      `Error fetching leaderboard highlights: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return {
    bestMover: data.bestMover,
    biggestWinner: data.biggestWinner,
    biggestLoser: data.biggestLoser,
  };
};

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(
  undefined,
);

export default function LeaderBoardScreen() {
  const [selectedSport, setSelectedSport] = useState<string>("Overall");
  const [selectedGender, setSelectedGender] = useState<string>("(men)");
  const [isSportSelected, setIsSportsSelected] = useState<boolean>(false);
  const {
    data: dataLB,
    isLoading: isLoadingLB,
    isError: isErrorLB,
  } = useQuery({
    queryKey: ["leaderboard", selectedSport, selectedGender],
    queryFn: () => {
      const isSportSelected = Sports.some(
        (sport) => sport.value === selectedSport,
      );
      return isSportSelected
        ? fetchLeaderboard(selectedSport + " " + selectedGender)
        : fetchLeaderboard(selectedSport);
    },
  });

  const {
    data: dataHL,
    isLoading: isLoadingHL,
    isError: isErrorHL,
  } = useQuery({
    queryKey: ["leaderboardHighlights"],
    queryFn: fetchLeaderboardHighlights,
  });

  console.log("Data i will be changing: ", dataHL);

  function handleSportChange(sportSelected: string) {
    const isSelected = Sports.some((sport) => sport.value === sportSelected);
    setSelectedSport(sportSelected);
    setIsSportsSelected(isSelected);
  }

  const Sports = [
    { value: "Basketball", label: "BASKETBALL" },
    { value: "Volleyball", label: "VOLLEYBALL" },
    { value: "Badminton", label: "BADMINTON" },
    { value: "Futsal", label: "FUTSAL" },
    { value: "Table Tennis", label: "TABLE TENNIS" },
    { value: "Chess", label: "CHESS" },
    { value: "Scrable", label: "SCRABLE" },
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

  const highlightStyle =
    "flex flex-col gap-5  pt-5 rounded-3xl min-w-64 items-center ";
  const highlightTitle =
    "absolute top-[-1rem]  left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 lg:px-10 " +
    "lg:px-2 text-black bg-white border-2 border-white rounded-full w-48 h-10 whitespace-nowrap overflow-hidden";
  const highlightTeam =
    "rounded-xl bg-[#FF212140] lg:h-32 bottom-0 py-8 min-w-64 ";
  const highlightImage =
    "rounded-full w-40 h-40 object-cover lg:mb-5 flex justify-center items-center";

  return (
    <LeaderboardContext.Provider
      value={{ dataLB, isLoadingLB, isErrorLB, fetchLeaderboard }}
    >
      <div className="w-full  h-full flex  flex-col justify-center items-center px-5p ">
        <div className="w-full text-center lg:text-left">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-14 text-white font-bold pt-10">
            LEADERBOARD
          </p>
        </div>
        <div className="text-center text-white ">
          <p className=" pb-20p lg:py-10 text-2xl lg:text-4xl font-bold mb-24 lg:mb-14">
            Highlights
          </p>

          {isLoadingHL && (
            <div
              className="flex flex-col lg:flex-row md:flex-wrap min-h-full justify-center  
              gap-7 lg:px-20 max-h-[35rem] mb-14"
            >
              <Skeleton className="min-h-80 rounded-3xl min-w-64" />
              <Skeleton className="min-h-80 rounded-3xl min-w-64" />
              <Skeleton className="min-h-80 rounded-3xl min-w-64" />
            </div>
          )}
          {isErrorHL && <h1>Error was found</h1>}
          {dataHL && (
            <div
              className="flex flex-col lg:flex-row md:flex-wrap min-h-full justify-center  
             gap-10 lg:px-20 max-h-[35rem] mx-72"
            >
              <div className={`${highlightStyle}`}>
                <Image
                  className={`${highlightImage}`}
                  src={`/team_logo/${dataHL.biggestWinner.teamId}.png`}
                  alt="Team image of the Best Winner"
                  width={160}
                  height={160}
                />
                <div className="relative">
                  <p className={`${highlightTitle}`}>Biggest Winner Today</p>
                  <div className={`${highlightTeam}`}>
                    <p className="font-bold text-xl">
                      {dataHL.biggestWinner.teamId}
                    </p>
                    <p>{dataHL.biggestWinner.points} Wins</p>
                  </div>
                </div>
              </div>
              <div className={`${highlightStyle}`}>
                <Image
                  className={`${highlightImage}`}
                  src={`/team_logo/${dataHL.biggestLoser.teamId}.png`}
                  alt="Team image of the Best Loser"
                  width={160}
                  height={160}
                />
                <div className="relative">
                  <p className={`${highlightTitle}`}>Most Losses Today</p>
                  <div className={`${highlightTeam}`}>
                    <p className="font-bold text-xl">
                      {dataHL.biggestLoser.teamId}
                    </p>
                    <p>{dataHL.biggestLoser.points} Losses </p>
                  </div>
                </div>
              </div>
              <div className={`${highlightStyle}`}>
                <Image
                  className={`${highlightImage}`}
                  src={`/team_logo/${dataHL.bestMover[0]}.png`}
                  alt="Team image of the Best Mover"
                  width={160}
                  height={160}
                />
                <div className="relative">
                  <p className={`${highlightTitle}`}>Biggest Mover</p>
                  <div className={`${highlightTeam}`}>
                    <p className="font-bold text-xl">{dataHL.bestMover[0]}</p>
                    <p>
                      #{dataHL.bestMover[1][0]} → #{dataHL.bestMover[1][1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col text-white gap-3 text-center mt-60 px-10">
        <div className="flex flex-col justify-center items-center mt-10 gap-5 lg:hidden">
          <Button
            variant="link"
            className={`text-3xl font-bold ${
              selectedSport === "Overall" ? "text-[#FF4747]" : ""
            }`}
            onClick={() => handleSportChange("Overall")}
          >
            OverAll
          </Button>
          <div className="flex flex-row justify-between gap-5">
            <Select onValueChange={(value) => handleSportChange(value)}>
              <SelectTrigger
                className={` ${isSportSelected ? "w-[280px]" : ""} px-3`}
              >
                <SelectValue placeholder="Select A Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sports</SelectLabel>
                  {Sports.map((sport) => (
                    <SelectItem key={sport.value} value={sport.value}>
                      {sport.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Esports</SelectLabel>
                  {Esports.map((sport) => (
                    <SelectItem key={sport.value} value={sport.value}>
                      {sport.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {isSportSelected && (
              <Select onValueChange={(value) => setSelectedGender(value)}>
                <SelectTrigger className="lg:w-[280px] px-5">
                  <SelectValue placeholder="Men" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
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
        <div className="flex w-full flex-row lg:gap-5 lg:px-10">
          <div className="lg:flex flex-col w-1/4 gap-5 items-start pl-10 hidden">
            <Button
              variant="link"
              className={`text-4xl font-bold ${
                selectedSport === "Overall" ? "text-[#FF4747]" : ""
              }`}
              onClick={() => handleSportChange("Overall")}
            >
              Overall
            </Button>
            <p className="text-4xl font-bold pl-5">Sports</p>
            {Sports.map((sport) => (
              <Button
                variant="link"
                key={sport.value}
                value={sport.value}
                className={`text-2xl font-bold ${
                  selectedSport === sport.value ? "text-[#FF4747]" : ""
                }`}
                onClick={() => handleSportChange(sport.value)}
              >
                {sport.label}
              </Button>
            ))}
            <p className="text-4xl font-bold pl-5 mt-7">Esports</p>
            {Esports.map((sport) => (
              <Button
                variant="link"
                key={sport.value}
                value={sport.value}
                className={`text-2xl font-bold ${
                  selectedSport === sport.value ? "text-[#FF4747]" : ""
                }`}
                onClick={() => handleSportChange(sport.value)}
              >
                {sport.label}
              </Button>
            ))}
          </div>
          <div className="w-full px-0 bg-[#242322] rounded-3xl py-7">
            <div className="block lg:flex lg:flex-row ">
              <p className="font-bold pb-5 lg:text-left lg:text-3xl lg:pl-5">
                Team Rankings
              </p>
              {isSportSelected && (
                <div className="ml-auto hidden lg:flex">
                  {Genders.map((gender) => (
                    <Button
                      variant="link"
                      value={gender.value}
                      key={gender.value}
                      className={`text-2xl font-bold ${
                        selectedGender === gender.value ? "text-[#FF4747]" : ""
                      }`}
                      onClick={() => setSelectedGender(gender.value)}
                    >
                      {gender.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <Table>
              <TableHeader className="text-lg lg:text-2xl font-bold bg-[#393837]">
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-right lg:pr-10">
                    Win/Loss
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingLB && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Skeleton className="h-4 w-[250px]" />
                    </TableCell>
                  </TableRow>
                )}
                {isErrorLB && (
                  <TableRow>
                    <TableCell colSpan={3}>Error fetching dataLB</TableCell>
                  </TableRow>
                )}
                {dataLB &&
                  dataLB
                    .sort(
                      (a: Leaderboard, b: Leaderboard) =>
                        Number(b.points) - Number(a.points),
                    )
                    .map((item: Leaderboard, index: number) => (
                      <TableRow key={item.teamId}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-left">
                          {item.teamId}
                        </TableCell>
                        <TableCell className="text-right pr-10">
                          {item.points}
                        </TableCell>
                      </TableRow>
                    ))}
                <TableRow className="h-96"></TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </LeaderboardContext.Provider>
  );
}
