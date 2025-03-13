"use client";
import GameFiltersSchedule from "@/components/feature/game-filters";
import DayResultContainer from "@/components/feature/game-result-card";
import {Schedule} from "@/types/types";
import {useQuery} from "@tanstack/react-query";
import {createContext, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {ArrowUpToLine} from "lucide-react";

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
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <Button
            className={`fixed bottom-6 h-12 w-12 md:h-auto md:w-auto md:bottom-12 md:right-12 right-6 text-xl rounded-full transition-opacity duration-300 animate-fade-in ${
                isVisible ? "opacity-100 pointer-events-auto " : "opacity-0 pointer-events-none"
            }`}
            onClick={scrollToTop}
        >
            <p className="hidden md:block font-medium text-xs   ">Scroll to Top</p>
            <ArrowUpToLine/>
        </Button>

    );
};

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
            <ScrollToTop/>
        </ScheduleContext.Provider>
    );
}
