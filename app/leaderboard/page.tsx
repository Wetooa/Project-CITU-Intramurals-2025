"use client";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Leaderboard } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Medal,
    Mic,
    Music4,
    TrendingUp,
    Trophy,
    Users,
    Volume2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    bestSports: data.bestSports,
    bestESports: data.bestESports,
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
  const [activeHighlight, setActiveHighlight] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filterLeaderboard = (
    leaderboard: Record<string, Leaderboard[]> | undefined,
    sport: string,
    gender?: string,
  ) => {
    if (!leaderboard) return;

    const isGenderful = hasGender();
    const params = gender && isGenderful ? `${sport} ${gender}` : `${sport}`;

    return leaderboard[params];
  };

  const renderedLeaderboard = filterLeaderboard(
    leaderboardData,
    selectedSport,
    selectedGender,
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

  // Handle carousel scroll events to update active highlight
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;

      const scrollPosition = carouselRef.current.scrollLeft;
      const itemWidth = carouselRef.current.offsetWidth;
      const newActiveIndex = Math.round(scrollPosition / itemWidth);

      if (newActiveIndex !== activeHighlight) {
        setActiveHighlight(newActiveIndex);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [activeHighlight]);

  // Function to scroll to a specific highlight
  const scrollToHighlight = (index: number) => {
    if (!carouselRef.current) return;

    const itemWidth = carouselRef.current.offsetWidth;
    carouselRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
    setActiveHighlight(index);
  };

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
    { value: "DOTA 2", label: "DOTA 2" },
  ];

  const Genders = [
    { value: "(Men)", label: "MEN" },
    { value: "(Women)", label: "WOMEN" },
  ];

  // Function to get appropriate icon for each sport
  const getSportIcon = (sportName: string) => {
    const iconClass = "mr-3 h-5 w-5";

    switch (sportName) {
      case "Basketball 3x3":
      case "Basketball 5x5":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M4.93 4.93c4.08 4.08 6.1 9.4 6.1 14.14M19.07 4.93c-4.08 4.08-6.1 9.4-6.1 14.14" />
            <path d="M2 12h20M12 2v20" />
          </svg>
        );

      case "Volleyball":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a8.5 8.5 0 0 0 8.5 8.5" />
            <path d="M12 2a8.5 8.5 0 0 1 0 17" />
            <path d="M12 2a8.5 8.5 0 0 1-8.5 8.5" />
            <path d="M15.5 19.5A8.5 8.5 0 0 1 12 2" />
          </svg>
        );

      case "Badminton":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.7 2.3a2.43 2.43 0 0 0-3.4 0L2.3 10.3a2.43 2.43 0 0 0 0 3.4l8 8a2.43 2.43 0 0 0 3.4 0l8-8a2.43 2.43 0 0 0 0-3.4Z" />
            <path d="m19 5-7 7" />
            <path d="M12 12 5 19" />
          </svg>
        );

      case "Futsal":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a4.2 4.2 0 0 1 4 4" />
            <path d="M12 22a4.2 4.2 0 0 0 4-4" />
            <path d="M12 22a4.2 4.2 0 0 1-4-4" />
            <path d="M12 2a4.2 4.2 0 0 0-4 4" />
            <path d="m6.3 17.7 3.4-3.4" />
            <path d="m14.3 9.7 3.4-3.4" />
            <path d="m6.3 6.3 3.4 3.4" />
            <path d="m14.3 14.3 3.4 3.4" />
          </svg>
        );

      case "Table Tennis":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
            <path d="M15 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            <path d="m16 9-3.5 3.5" />
            <path d="M4 14a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
            <path d="m6 14 3.5-3.5" />
          </svg>
        );

      case "Chess":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 16v-5a2 2 0 0 1 4 0v5" />
            <path d="M10 16h4" />
            <path d="M2 16h2" />
            <path d="M14 16h8" />
            <path d="M18 16v-5a2 2 0 0 0-4 0v5" />
            <path d="M10 11V9a2 2 0 0 1 4 0v2" />
            <path d="M8 8v1" />
            <path d="M16 8v1" />
            <path d="M9 6.2A6 6 0 0 1 12 6a6 6 0 0 1 3 .2" />
            <path d="M12 16v4" />
            <path d="M22 22H2" />
          </svg>
        );

      case "Scrabble":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 20h10" />
            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
          </svg>
        );

      case "Sepak Takraw":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a4.2 4.2 0 0 1 4 4" />
            <path d="M12 22a4.2 4.2 0 0 0 4-4" />
            <path d="M12 22a4.2 4.2 0 0 1-4-4" />
            <path d="M12 2a4.2 4.2 0 0 0-4 4" />
          </svg>
        );

      // Esports icons
      case "Valorant":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            <path d="M8 7v10" />
            <path d="M12 7v10" />
            <path d="M17 11h-2" />
            <path d="M17 15h-2" />
            <path d="M16 7v10" />
          </svg>
        );

      case "CODM":
      case "MLBB":
      case "Tekken 8":
      case "Marvel Rivals":
      case "Dota 2":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 11h4" />
            <path d="M8 9v4" />
            <path d="M15 12h.01" />
            <path d="M18 10h.01" />
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
          </svg>
        );

      default:
        return <Trophy className={iconClass} />;
    }
  };

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
          <>
            {/* Desktop View - Carousel */}
            <motion.div
              className="hidden lg:block px-20 mt-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex gap-10"
                  animate={{ x: ["0%", "-45%"] }}
                  transition={{
                    x: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      duration: 30, // Slower speed (60 seconds to complete one cycle)
                      ease: "linear",
                    },
                  }}
                  style={{ width: "200%" }} // Double width to allow for looping
                >
                  {/* First set of cards */}
                  <div className="flex gap-10">
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
                        <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white whitespace-nowrap bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
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
                        <p className="absolute top-[-1rem] left-1/2 whitespace-nowrap transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
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
                        <p className="absolute top-[-1rem] left-1/2 whitespace-nowrap transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                          Biggest Mover
                        </p>
                        <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-purple-500/20 py-8 min-w-64 shadow-lg">
                          <p className="font-bold text-3xl text-purple-400">
                            {dataHL.bestMover[0]}
                          </p>
                          <p className="flex items-center justify-center gap-1 text-purple-400">
                            <TrendingUp className="w-4 h-4" />#
                            {dataHL.bestMover[1][0]} → #{dataHL.bestMover[1][1]}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* BEST SPORTS TEAM */}
                    <motion.div
                      className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
                      variants={itemVariants}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                        <Image
                          className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-blue-500 shadow-lg shadow-blue-500/20"
                          src={`/team_logo/${dataHL.bestSports.teamId}.png`}
                          alt="Team image of the Best Sports Team"
                          width={160}
                          height={160}
                        />
                        <div className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2 shadow-lg">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="absolute top-[-1rem] whitespace-nowrap left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                          Best Sports Team
                        </p>
                        <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-blue-500/20 py-8 min-w-64 shadow-lg">
                          <p className="font-bold text-3xl text-blue-400">
                            {dataHL.bestSports.teamId}
                          </p>
                          <p className="flex items-center justify-center gap-1 text-blue-400">
                            <Trophy className="w-4 h-4" />
                            {dataHL.bestSports.points.wins} Wins
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* BEST ESPORTS TEAM */}
                    <motion.div
                      className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
                      variants={itemVariants}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                        <Image
                          className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-green-500 shadow-lg shadow-green-500/20"
                          src={`/team_logo/${dataHL.bestESports.teamId}.png`}
                          alt="Team image of the Best ESports Team"
                          width={160}
                          height={160}
                        />
                        <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-2 shadow-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 11h4" />
                            <path d="M8 9v4" />
                            <path d="M15 12h.01" />
                            <path d="M18 10h.01" />
                            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
                          </svg>
                        </div>
                      </div>
                      <div className="relative">
                        <p className="absolute top-[-1rem] left-1/2 whitespace-nowrap transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                          Best Esports Team
                        </p>
                        <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-green-500/20 py-8 min-w-64 shadow-lg">
                          <p className="font-bold text-3xl text-green-400">
                            {dataHL.bestESports.teamId}
                          </p>
                          <p className="flex items-center justify-center gap-1 text-green-400">
                            <Trophy className="w-4 h-4" />
                            {dataHL.bestESports.points.wins} Wins
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Second set of cards (duplicate for infinite loop) */}
                  <div className="flex gap-10">
                    {/* Vocal Solo Champion Card */}
                    <motion.div
                      className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
                      variants={itemVariants}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                        <Image
                          className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-pink-500 shadow-lg shadow-pink-500/20"
                          src={`/team_logo/Capricorn.png`}
                          alt="Team image of the Vocal Solo Champion"
                          width={160}
                          height={160}
                        />
                        <div className="absolute -top-4 -right-4 bg-pink-500 rounded-full p-2 shadow-lg">
                          <Mic className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="absolute top-[-1rem] left-1/2 whitespace-nowrap transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                          Vocal Solo Champion
                        </p>
                        <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-pink-500/20 py-8 min-w-64 shadow-lg">
                          <p className="font-bold text-3xl text-pink-400">
                            Capricorn
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Vocal Duet Champion Card */}
                    <motion.div
                      className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
                      variants={itemVariants}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                        <Image
                          className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-cyan-500 shadow-lg shadow-cyan-500/20"
                          src={`/team_logo/Capricorn.png`}
                          alt="Team image of the Vocal Duet Champion"
                          width={160}
                          height={160}
                        />
                        <div className="absolute -top-4 -right-4 bg-cyan-500 rounded-full p-2 shadow-lg">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="absolute top-[-1rem] left-1/2 whitespace-nowrap transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                          Vocal Duet Champion
                        </p>
                        <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-cyan-500/20 py-8 min-w-64 shadow-lg">
                          <p className="font-bold text-3xl text-cyan-400">
                            Capricorn
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Dance Palabas Champion Card */}
                    <motion.div
                      className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
                      variants={itemVariants}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                        <Image
                          className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-orange-500 shadow-lg shadow-orange-500/20"
                          src={`/team_logo/Capricorn.png`}
                          alt="Team image of the Dance Palabas Champion"
                          width={160}
                          height={160}
                        />
                        <div className="absolute -top-4 -right-4 bg-orange-500 rounded-full p-2 shadow-lg">
                          <Music4 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="absolute top-[-1rem] left-1/2 whitespace-nowrap transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                          Dance Palabas Champion
                        </p>
                        <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-orange-500/20 py-8 min-w-64 shadow-lg">
                          <p className="font-bold text-3xl text-orange-400">
                            Capricorn
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Bench Yelling Champion Card */}
                    <motion.div
                      className="flex flex-col gap-5 pt-5 rounded-3xl min-w-64 items-center"
                      variants={itemVariants}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                        <Image
                          className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-amber-500 shadow-lg shadow-amber-500/20"
                          src={`/team_logo/Capricorn.png`}
                          alt="Team image of the Bench Yelling Champion"
                          width={160}
                          height={160}
                        />
                        <div className="absolute -top-4 -right-4 bg-amber-500 rounded-full p-2 shadow-lg">
                          <Volume2 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="absolute top-[-1rem] left-1/2 whitespace-nowrap transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                          Bench Yelling Champion
                        </p>
                        <div className="rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-amber-500/20 py-8 min-w-64 shadow-lg">
                          <p className="font-bold text-3xl text-amber-400">
                            Capricorn
                          </p>
                        </div>
                      </div>
                    </motion.div>

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
                        <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white whitespace-nowrap bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
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
                        <p className="absolute top-[-1rem] left-1/2 whitespace-nowrap transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
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
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile/Tablet View - Carousel */}
            <div className="lg:hidden relative mt-20 px-4">
              {/* Carousel Container */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {/* Biggest Winner Card */}
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
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
                      <p className="absolute top-[-1rem] left-1/2 transform whitespace-nowrap -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                        Biggest Winner Today
                      </p>
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-yellow-500/20 py-8 shadow-lg">
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
                </div>

                {/* Biggest Loser Card */}
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
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
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-red-500/20 py-8 shadow-lg">
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
                </div>

                {/* Biggest Mover Card */}
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
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
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-purple-500/20 py-8 shadow-lg">
                        <p className="font-bold text-3xl text-purple-400">
                          {dataHL.bestMover[0]}
                        </p>
                        <p className="flex items-center justify-center gap-1 text-purple-400">
                          <TrendingUp className="w-4 h-4" />#
                          {dataHL.bestMover[1][0]} → #{dataHL.bestMover[1][1]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Best Sports Team Card */}
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                      <Image
                        className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-blue-500 shadow-lg shadow-blue-500/20"
                        src={`/team_logo/${dataHL.bestSports.teamId}.png`}
                        alt="Team image of the Best Sports Team"
                        width={160}
                        height={160}
                      />
                      <div className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2 shadow-lg">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="relative">
                      <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg whitespace-nowrap">
                        Best Sports Team
                      </p>
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-blue-500/20 py-8 shadow-lg">
                        <p className="font-bold text-3xl text-blue-400">
                          {dataHL.bestSports.teamId}
                        </p>
                        <p className="flex items-center justify-center gap-1 text-blue-400">
                          <Trophy className="w-4 h-4" />
                          {dataHL.bestSports.points.wins} Wins
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Best ESports Team Card */}
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                      <Image
                        className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-green-500 shadow-lg shadow-green-500/20"
                        src={`/team_logo/${dataHL.bestESports.teamId}.png`}
                        alt="Team image of the Best ESports Team"
                        width={160}
                        height={160}
                      />
                      <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-2 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 11h4" />
                          <path d="M8 9v4" />
                          <path d="M15 12h.01" />
                          <path d="M18 10h.01" />
                          <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg whitespace-nowrap">
                        Best E-sports Team
                      </p>
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-green-500/20 py-8 shadow-lg">
                        <p className="font-bold text-3xl text-green-400">
                          {dataHL.bestESports.teamId}
                        </p>
                        <p className="flex items-center justify-center gap-1 text-green-400">
                          <Trophy className="w-4 h-4" />
                          {dataHL.bestESports.points.wins} Wins
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* VOCAL SOLO */}
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                      <Image
                        className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-green-500 shadow-lg shadow-green-500/20"
                        src={`/team_logo/Capricorn.png`}
                        alt="Team image of the Best Mover"
                        width={160}
                        height={160}
                      />
                      <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-2 shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="relative">
                      <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                        Vocal Solo Champion
                      </p>
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-green-500/20 py-8 shadow-lg">
                        <p className="font-bold text-3xl text-green-400">
                          Capricorn
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* VOCAL DUET */}
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                      <Image
                        className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-blue-500 shadow-lg shadow-blue-500/20"
                        src={`/team_logo/Capricorn.png`}
                        alt="Team image of the Best Mover"
                        width={160}
                        height={160}
                      />
                      <div className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2 shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="relative">
                      <p className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center font-bold pt-1 px-6 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-48 h-10 flex items-center justify-center shadow-lg">
                        Vocal Duet Champion
                      </p>
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-blue-500/20 py-8 shadow-lg">
                        <p className="font-bold text-3xl text-blue-400">
                          Capricorn
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                      <Image
                        className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-purple-500 shadow-lg shadow-purple-500/20"
                        src={`/team_logo/Capricorn.png`}
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
                        Dance Palabas Champion
                      </p>
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-purple-500/20 py-8 shadow-lg">
                        <p className="font-bold text-3xl text-purple-400">
                          Capricorn
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="flex-shrink-0 w-full snap-center px-4">
                  <motion.div
                    className="flex flex-col gap-5 pt-5 rounded-3xl items-center mx-auto max-w-xs"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                      <Image
                        className="rounded-full w-40 h-40 object-cover hover:scale-110 transition-all duration-300 mb-5 border-4 border-purple-500 shadow-lg shadow-purple-500/20"
                        src={`/team_logo/Capricorn.png`}
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
                        Bench Yelling Champion
                      </p>
                      <div className="rounded-xl bg-gradient-to-br w-72 from-[#2a2a2a] to-[#1a1a1a] border border-purple-500/20 py-8 shadow-lg">
                        <p className="font-bold text-3xl text-purple-400">
                          Capricorn
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  scrollToHighlight(Math.max(0, activeHighlight - 1))
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm z-10"
                aria-label="Previous highlight"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={() =>
                  scrollToHighlight(Math.min(8, activeHighlight + 1))
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm z-10"
                aria-label="Next highlight"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <button
                    key={index}
                    onClick={() => scrollToHighlight(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeHighlight === index
                        ? "w-8 bg-[#FF4747]"
                        : "w-2.5 bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to highlight ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Rankings Section */}
      <div className="flex flex-col text-white gap-3 mb-20 px-5 lg:px-10">
        {/* Mobile Filters */}
        <div className="flex flex-col justify-center items-center mt-10 gap-5 lg:hidden">
          <Button
            variant="ghost"
            className={`text-2xl font-bold px-6 py-3 rounded-xl transition-all duration-300 ${
              selectedSport === "Overall"
                ? "bg-gradient-to-r from-[#FF4747]/20 to-[#FF4747]/5 text-[#FF4747]"
                : "hover:bg-[#FF4747]/10 hover:text-[#FF4747]"
            }`}
            onClick={() => handleSportChange("Overall")}
          >
            <Trophy className="mr-2 h-5 w-5" />
            Overall
          </Button>
          <div className="flex flex-col sm:flex-row justify-between gap-3 w-full max-w-md">
            <Select onValueChange={(value) => handleSportChange(value)}>
              <SelectTrigger
                className={`
                  w-full sm:w-[240px] h-12 px-4
                  bg-gradient-to-br from-[#2a2a2a] to-[#222222]
                  border-[#3a3a3a] hover:border-[#FF4747]/50
                  focus:ring-[#FF4747] focus:ring-opacity-50
                  rounded-xl shadow-md transition-all duration-300
                  text-white font-medium
                `}
              >
                <div className="flex items-center gap-2">
                  {selectedSport !== "Overall" && getSportIcon(selectedSport)}
                  <SelectValue placeholder="Select Sport" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-[#3a3a3a] rounded-xl shadow-xl p-1 animate-in fade-in-80 zoom-in-95">
                <SelectGroup>
                  <SelectLabel className="text-[#FF4747] font-bold px-3 py-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    SPORTS
                  </SelectLabel>
                  {Sports.map((sport) => (
                    <SelectItem
                      key={sport.value}
                      value={sport.value}
                      className="rounded-lg my-1 focus:bg-[#FF4747]/20 focus:text-[#FF4747] data-[selected]:bg-[#FF4747]/20 data-[selected]:text-[#FF4747]"
                    >
                      <div className="flex items-center gap-2">
                        {getSportIcon(sport.value)}
                        {sport.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-[#FF4747] font-bold px-3 py-2 mt-2 flex items-center gap-2 border-t border-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 11h4" />
                      <path d="M8 9v4" />
                      <path d="M15 12h.01" />
                      <path d="M18 10h.01" />
                      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
                    </svg>
                    ESPORTS
                  </SelectLabel>
                  {Esports.map((sport) => (
                    <SelectItem
                      key={sport.value}
                      value={sport.value}
                      className="rounded-lg my-1 focus:bg-[#FF4747]/20 focus:text-[#FF4747] data-[selected]:bg-[#FF4747]/20 data-[selected]:text-[#FF4747]"
                    >
                      <div className="flex items-center gap-2">
                        {getSportIcon(sport.value)}
                        {sport.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {hasGender() && (
              <Select onValueChange={(value) => setSelectedGender(value)}>
                <SelectTrigger
                  className={`
                    w-full sm:w-[240px] h-12 px-4
                    bg-gradient-to-br from-[#2a2a2a] to-[#222222]
                    border-[#3a3a3a] hover:border-[#FF4747]/50
                    focus:ring-[#FF4747] focus:ring-opacity-50
                    rounded-xl shadow-md transition-all duration-300
                    text-white font-medium
                  `}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {selectedGender === "(Men)" ? (
                        <path d="M10 21v-4a2 2 0 1 1 4 0v4M4 16v-4a6 6 0 1 1 12 0v4" />
                      ) : (
                        <path d="M12 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM12 14l-2-2 2-2 2 2-2 2Z" />
                      )}
                    </svg>
                    <SelectValue placeholder="Select Gender" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-[#3a3a3a] rounded-xl shadow-xl p-1 animate-in fade-in-80 zoom-in-95">
                  <SelectGroup>
                    <SelectLabel className="text-[#FF4747] font-bold px-3 py-2 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3a6 6 0 0 0-6 6c0 2.14 1.25 4.27 2.42 6.12 1.6 2.54 3.58 4.88 3.58 4.88s1.97-2.34 3.58-4.88c1.17-1.85 2.42-3.98 2.42-6.12a6 6 0 0 0-6-6Z" />
                      </svg>
                      GENDER
                    </SelectLabel>
                    {Genders.map((gender) => (
                      <SelectItem
                        key={gender.value}
                        value={gender.value}
                        className="rounded-lg my-1 focus:bg-[#FF4747]/20 focus:text-[#FF4747] data-[selected]:bg-[#FF4747]/20 data-[selected]:text-[#FF4747]"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {gender.value === "(Men)" ? (
                              <path d="M10 21v-4a2 2 0 1 1 4 0v4M4 16v-4a6 6 0 1 1 12 0v4" />
                            ) : (
                              <path d="M12 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM12 14l-2-2 2-2 2 2-2 2Z" />
                            )}
                          </svg>
                          {gender.label}
                        </div>
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
          <div className="lg:flex flex-col w-1/4 gap-2 hidden">
            <div className="sticky top-36 bg-gradient-to-br from-[#1e1e1e] to-[#121212] rounded-2xl p-6 border border-gray-800/30 shadow-lg">
              <Button
                variant="ghost"
                className={`w-full justify-start text-2xl font-bold mb-4 rounded-xl h-14 transition-all duration-300 ${
                  selectedSport === "Overall"
                    ? "bg-gradient-to-r from-[#FF4747]/20 to-[#FF4747]/5 text-[#FF4747] border-l-4 border-[#FF4747] pl-4"
                    : "hover:bg-[#FF4747]/10 hover:text-[#FF4747] pl-2"
                }`}
                onClick={() => handleSportChange("Overall")}
              >
                <Trophy
                  className={`mr-3 h-6 w-6 ${
                    selectedSport === "Overall"
                      ? "text-[#FF4747]"
                      : "text-gray-400"
                  }`}
                />
                OVERALL
              </Button>

              <div className="space-y-6">
                {/* Sports Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <div className="h-1 w-1 rounded-full bg-[#FF4747]"></div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                      SPORTS
                    </h3>
                  </div>

                  <div className="space-y-1">
                    {Sports.map((sport) => (
                      <Button
                        variant="ghost"
                        key={sport.value}
                        value={sport.value}
                        className={`w-full justify-start rounded-lg transition-all duration-300 ${
                          selectedSport === sport.value
                            ? "bg-gradient-to-r from-[#FF4747]/20 to-[#FF4747]/5 text-[#FF4747] border-l-4 border-[#FF4747] pl-4"
                            : "hover:bg-[#FF4747]/10 hover:text-[#FF4747] text-gray-300 pl-2"
                        }`}
                        onClick={() => handleSportChange(sport.value)}
                      >
                        {getSportIcon(sport.value)}
                        {sport.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Esports Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <div className="h-1 w-1 rounded-full bg-[#FF4747]"></div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                      ESPORTS
                    </h3>
                  </div>

                  <div className="space-y-1">
                    {Esports.map((sport) => (
                      <Button
                        variant="ghost"
                        key={sport.value}
                        value={sport.value}
                        className={`w-full justify-start rounded-lg transition-all duration-300 ${
                          selectedSport === sport.value
                            ? "bg-gradient-to-r from-[#FF4747]/20 to-[#FF4747]/5 text-[#FF4747] border-l-4 border-[#FF4747] pl-4"
                            : "hover:bg-[#FF4747]/10 hover:text-[#FF4747] text-gray-300 pl-2"
                        }`}
                        onClick={() => handleSportChange(sport.value)}
                      >
                        {getSportIcon(sport.value)}
                        {sport.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
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
                      className={`font-bold transition-all duration-300 rounded-xl ${
                        selectedGender === gender.value
                          ? "bg-gradient-to-r from-[#FF4747] to-[#FF2222] text-white border-[#FF4747] shadow-md shadow-[#FF4747]/20"
                          : "bg-gradient-to-br from-[#2a2a2a] to-[#222222] hover:bg-[#FF4747]/10 hover:text-[#FF4747] border-gray-700"
                      }`}
                      onClick={() => setSelectedGender(gender.value)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {gender.value === "(Men)" ? (
                          <path d="M10 21v-4a2 2 0 1 1 4 0v4M4 16v-4a6 6 0 1 1 12 0v4" />
                        ) : (
                          <path d="M12 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM12 14l-2-2 2-2 2 2-2 2Z" />
                        )}
                      </svg>
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
                          Number(b.points.wins) - Number(a.points.wins),
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
