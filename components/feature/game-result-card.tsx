"use client";

import {motion, AnimatePresence} from "framer-motion";
import {Schedule} from "@/types/types";
import {Skeleton} from "@/components/ui/skeleton";
import {GameResultCardContainer} from "@/components/feature/game-result-container";
import {NoMatchFoundWithoutBackground} from "@/components/shared/no-match-found";

interface ScheduleProps {
    schedule: Schedule[];
    isLoading?: boolean;
}

export default function DayResultContainer({
                                               schedule,
                                               isLoading,
                                           }: ScheduleProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 w-full text-white">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex flex-col gap-4 w-full">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-48 bg-gray-800"/>
                            <Skeleton className="h-5 w-40 bg-gray-800"/>
                        </div>
                        {[...Array(2)].map((_, matchIndex) => (
                            <Skeleton key={matchIndex} className="h-56 w-full rounded-xl bg-gray-800"/>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    if (schedule == undefined || schedule.length === 0) {
        return <NoMatchFoundWithoutBackground/>;
    }

    // Group matches by matchDate
    const groupedMatches: Record<string, Schedule[]> = schedule.reduce(
        (acc, match) => {
            const dateKey = new Date(match.matchDate).toISOString().split("T")[0]; // YYYY-MM-DD format

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(match);
            return acc;
        },
        {} as Record<string, Schedule[]>,
    );

    return (
        <AnimatePresence>
            <motion.div
                className="flex flex-col gap-8 w-full text-white"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                {Object.entries(groupedMatches).map(([date, matches], index) => {
                    const formattedDate = new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    });

                    const dayName = new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                    });

                    return (
                        <motion.div
                            key={`${date}-${index}`}
                            className="flex flex-col gap-4 w-full"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.25, 0.1, 0.25, 1.0]
                            }}
                        >
                            {/* Date Header */}
                            <div className="relative pl-4 border-l-4 border-maroon">
                                <h2 className="text-2xl font-bold text-white">{formattedDate}</h2>
                                <p className="text-gray-400 font-medium">{dayName}</p>
                            </div>

                            {/* Matches for this date */}
                            <div className="space-y-4">
                                {matches.map((match, idx) => (
                                    <motion.div
                                        key={match.id}
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{
                                            duration: 0.3,
                                            delay: idx * 0.05 + 0.2,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <GameResultCardContainer
                                            id={match.id}
                                            matchDate={match.matchDate}
                                            team1Id={match.team1Id}
                                            team2Id={match.team2Id}
                                            scoreTeam1={match.scoreTeam1}
                                            scoreTeam2={match.scoreTeam2}
                                            category={match.category}
                                            status={match.status}
                                            createdOn={match.createdOn}
                                            updatedOn={match.updatedOn}
                                            round={match.round}
                                            venue={match.venue}
                                            matchTime={match.matchTime}
                                            game={match.game}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </AnimatePresence>
    );
}
