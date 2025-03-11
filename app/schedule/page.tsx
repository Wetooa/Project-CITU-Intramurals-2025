"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GameFiltersSchedule from "@/components/feature/game-filters";
import GameResultCard from "@/components/feature/game-result-card";
import { Schedule } from "@/types/types";

// Context Type
interface ScheduleContextType {
  data: Schedule[] | undefined;
  isLoading: boolean;
  isError: boolean;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

interface Filters {
  game?: string;
  date?: string;
  team?: string;
  rivalTeam?: string;
}

// Create Context
const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

async function fetchSchedule(filters: Filters) {
  const queryParams = new URLSearchParams(filters as Record<string, string>);
  const response = await fetch(`/api/schedule?${queryParams}`);
  console.log("fetching data");
  return response.json();
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}

export default function ScheduleScreen() {
  const [filters, setFilters] = useState<Filters>({});
  const { data, isLoading, isError } = useQuery({
    queryKey: ["schedule", filters],
    queryFn: () => fetchSchedule(filters),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <ScheduleContext.Provider
      value={{ data, isLoading, isError, filters, setFilters }}
    >
      <div className="2xl:relative w-full h-full flex flex-col gap-5 justify-center items-center p-10">
        <p className=" xl:text-4xl xl: 2xl:absolute 2xl:left-10 2xl:top-20 text-white font-bold text-4xl 2xl:text-8xl">
          Schedule
        </p>
        <GameFiltersSchedule />
        <GameResultCard />
      </div>
    </ScheduleContext.Provider>
  );
  return (
    <ScheduleContext.Provider
      value={{ data, isLoading, isError, filters, setFilters }}
    >
      <div className="2xl:relative w-full h-full flex flex-col gap-5 justify-center items-center p-10">
        <p className=" xl:text-4xl xl: 2xl:absolute 2xl:left-10 2xl:top-20 text-white font-bold text-4xl 2xl:text-8xl">
          Schedule
        </p>
        <GameFiltersSchedule />
        <GameResultCard />
      </div>
    </ScheduleContext.Provider>
  );
}
