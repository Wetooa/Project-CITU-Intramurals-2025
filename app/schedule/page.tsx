"use client";
import GameFiltersSchedule from "@/components/feature/game-filters";
import DayResultContainer from "@/components/feature/game-result-card";
import {Schedule} from "@/types/types";
import {useQuery} from "@tanstack/react-query";
import {createContext, useEffect, useState} from "react";

// Context Type
interface ScheduleContextType {
    data: Schedule[] | undefined;
    isLoading: boolean;
    isError: boolean;
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

export interface Filters {
    category?: string;
    matchDate?: string;
    team1Id?: string;
    team2Id?: string;
    venue?: string;
    gender?: string;
}

// Create Context
const ScheduleContext = createContext<ScheduleContextType | undefined>(
    undefined,
);

async function fetchSchedule(filters: Filters) {
    const queryParams = new URLSearchParams(filters as Record<string, string>);
    const response = await fetch(`/api/schedule/filter?${queryParams}`);
    console.log("fetching data");
    return response.json();
}

// export function useSchedule() {
//   const context = useContext(ScheduleContext);
//   if (!context) {
//     throw new Error("useSchedule must be used within a ScheduleProvider");
//   }
//   return context;
// }

export default function ScheduleScreen() {
    const [filters, setFilters] = useState<Filters>({
        category: "",
        matchDate: "",
        team1Id: "",
        team2Id: "",
        venue: "",
    });
    const {data, isLoading, isError} = useQuery({
        queryKey: ["schedule", JSON.stringify(filters)],
        queryFn: () => fetchSchedule(filters),
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        enabled: !!filters,
        refetchOnWindowFocus: false,
    });
    useEffect(() => {
        console.log("Data: ", data);
    }, [data]);
    return (
        <ScheduleContext.Provider
            value={{data, isLoading, isError, filters, setFilters}}
        >
            <div className="2xl:relative w-full h-full flex flex-col gap-5 justify-center items-center p-10">
                <p className=" xl:text-4xl xl: 2xl:absolute 2xl:left-10 2xl:top-20 text-white font-bold text-4xl 2xl:text-7xl">
                    Schedule
                </p>
                <GameFiltersSchedule filters={filters} setFilters={setFilters}/>
                <DayResultContainer
                    schedule={data ? data.schedule : []}
                    isLoading={isLoading}
                />
            </div>
        </ScheduleContext.Provider>
    );
}
