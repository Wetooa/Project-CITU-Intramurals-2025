"use client";
import GameFiltersSchedule from "@/components/feature/game-filters";
import DayResultContainer from "@/components/feature/game-result-card";
import { Button } from "@/components/ui/button";
import type { Schedule } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpToLine } from "lucide-react";
import { useEffect, useState } from "react";

export interface Filters {
  category: string;
  matchDate: string;
  team1Id: string;
  team2Id: string;
  venue: string;
  gender: string;
}

async function fetchSchedule() {
  const response = await fetch(`/api/schedule`);
  return response.json();
}

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      variant="secondary"
      className={`fixed bottom-6 h-12 w-12 md:h-auto md:w-auto md:bottom-12 md:right-12 right-6 rounded-full shadow-lg transition-all duration-300 ${
        isVisible
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-10"
      }`}
      onClick={scrollToTop}
    >
      <p className="hidden md:block font-medium text-xs mr-2">Scroll to Top</p>
      <ArrowUpToLine className="h-5 w-5" />
    </Button>
  );
};

export default function ScheduleScreen() {
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    matchDate: "all",
    team1Id: "all",
    team2Id: "all",
    venue: "all",
    gender: "all",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["schedule schedule"],
    queryFn: () => fetchSchedule(),
  });

  const [schedule, setSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    if (!data || !data?.schedule) return;

    const filteredSchedule = (data?.schedule as Schedule[]).filter((row) => {
      return (
        (filters.category === "all" || filters.category === row.category) &&
        (filters.matchDate === "all" || filters.matchDate === row.matchDate) &&
        (filters.team1Id === "all" || row.team1Id?.includes(filters.team1Id)) &&
        (filters.team2Id === "all" || row.team1Id?.includes(filters.team1Id)) &&
        (filters.venue === "all" || filters.venue === row.venue)
      );
    });

    setSchedule(filteredSchedule);
  }, [filters, data]);

  useEffect(() => {
    console.log("Data: ", data);
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12 relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 md:mb-12 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">
            Schedule
          </span>
        </h1>

        <div className="space-y-8 max-w-6xl mx-auto">
          <GameFiltersSchedule
            filters={filters}
            setFiltersAction={setFilters}
          />
          <DayResultContainer schedule={schedule} isLoading={isLoading} />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
