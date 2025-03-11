"use client";

import {motion} from "framer-motion";
import {Schedule} from "@/types/types";
import {Skeleton} from "@/components/ui/skeleton";
import {GameResultCardContainer} from "@/components/feature/game-result-container";
import {NoMatchFoundWithoutBackground} from "@/components/shared/no-match-found";


interface ScheduleProps {
    schedule: Schedule[],
    isLoading?: boolean
}

export default function DayResultContainer({schedule, isLoading}: ScheduleProps) {
    if (isLoading) {
        return (
            <div
                className="flex flex-col gap-4 lg:w-[880px] w-[90%] text-white self-center font-bold justify-center items-center">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex flex-col gap-2 w-full">
                        <Skeleton className="h-6 w-40 lg:w-48"/>
                        <Skeleton className="h-4 w-32 lg:w-40"/>
                        {[...Array(2)].map((_, matchIndex) => (
                            <Skeleton key={matchIndex} className="h-48 w-full rounded-2xl "/>
                        ))}
                    </div>
                ))}
            </div>
        );
    }


    console.log("Schedule", schedule)
    if (schedule == undefined || schedule.length === 0) {
        return <NoMatchFoundWithoutBackground/>
    }
    // **Group matches by matchDate**
    const groupedMatches: Record<string, Schedule[]> = schedule.reduce((acc, match) => {
        const dateKey = new Date(match.matchDate).toISOString().split("T")[0]; // YYYY-MM-DD format

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(match);
        return acc;
    }, {} as Record<string, Schedule[]>);

    return (
        <motion.div
            className="flex flex-col gap-4 lg:w-[880px] text-white font-bold justify-center items-center"
            initial={{opacity: 0, y: 20}}  // Start with opacity 0 and move slightly down
            animate={{opacity: 1, y: 0}}   // Animate to full opacity and original position
            exit={{opacity: 0, y: -20}}    // Animate out by fading and moving up
            transition={{duration: 0.5, ease: "easeOut"}}  // Smooth transition
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
                    <div key={`${date}-${index}`} className="flex flex-col gap-2 w-full">
                        {/* Display Date Header */}
                        <div className='self-start flex flex-col gap-0'>
                            <p className='self-start text-2xl'>{formattedDate}</p>
                            <p className="self-start font-medium text-gray-400">{dayName}</p>
                        </div>

                        {/* Loop over matches for this date */}
                        {matches.map((match) => (
                            <GameResultCardContainer
                                key={match.id}
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
                            />
                        ))}
                    </div>
                );
            })}
        </motion.div>
    );
}

// function GameResultCard(props: Schedule) {
//
//     const winStatus =
//         props.scoreTeam1 == null || props.scoreTeam2 == null
//             ? "Score_Not_Available"
//             : props.scoreTeam1 > props.scoreTeam2
//                 ? "Team_1_Win"
//                 : "Team_2_Win";
//
//     return (
//         <div className="rounded-2xl bg-mocha p-5 w-full flex flex-col justify-center items-center gap-2">
//             <motion.p
//                 key={props.status}
//                 initial={{opacity: 0, scale: 0.8}}
//                 animate={{opacity: 1, scale: 1}}
//                 exit={{opacity: 0, scale: 0.8}}
//                 transition={{duration: 0.5}}
//                 className={`px-3 py-1 rounded-2xl text-white text-center w-52 font-semibold ${props.status === "Ongoing" ? "bg-red-500 animate-pulse" : "bg-gray-700"} ${props.status === "Completed" && "bg-green-500"}`}
//             >
//                 {props.status}
//             </motion.p>
//             <p className='text-md font-bold'>{props.category}</p>
//             <p className="font-bold lg:text-2xl">Game {props.round}</p>
//             <div className="bg-mocha p-5 w-full flex justify-center items-center gap-5">
//                 <TeamScore team_name={props.team1Id} score={props.scoreTeam1} position="left" scoreStatus={winStatus}/>
//                 <div className='flex flex-col items-center justify-center'>
//                     <p className="font-bold lg:text-2xl">VS</p>
//                     <Separator/>
//                     <p className="text-xs lg:text-xl whitespace-nowrap text-center font-medium text-gray-400">{props.matchDate}</p>
//                 </div>
//                 <TeamScore team_name={props.team2Id} score={props.scoreTeam2} position="right" scoreStatus={winStatus}/>
//             </div>
//         </div>
//     );
// }

// function TeamScore({team_name, score, position, scoreStatus}: TeamScoreProps) {
//     const [showName, setShowName] = useState(false);
//
//     return (
//         <div className={`flex items-center gap-5  : ""}`}>
//             {position === "right" &&
//                 <p className={`text-2xl lg:text-5xl text-center ${scoreStatus === "Team_2_Win" ? "animate-pulse text-green-400" : "text-red-500"}`}>{score}</p>
//             }
//
//             <div className="relative flex flex-col items-center gap-2">
//                 <Image
//                     src={`/team_logo/${team_name}.png`}
//                     width={100}
//                     height={100}
//                     className="rounded-full min-w-12 cursor-pointer lg:hover:scale-110"
//                     alt={team_name}
//                     onClick={() => setShowName(!showName)}
//                 />
//                 <AnimatePresence>
//                     {showName && (
//                         <motion.span
//                             initial={{opacity: 0, scale: 0.8, y: 10}}
//                             animate={{opacity: 1, scale: 1, y: 0}}
//                             exit={{opacity: 0, scale: 0.8, y: 10}}
//                             transition={{duration: 0.3}}
//                             className="absolute top-0 lg:hidden bg-gray-800 text-white text-xs px-2 py-1 rounded"
//                         >
//                             {team_name}
//                         </motion.span>
//                     )}
//                 </AnimatePresence>
//                 <p className='hidden lg:block'>{team_name}</p>
//                 <p className='block lg:hidden'>{zodiacSignsAcronym[team_name]}</p>
//             </div>
//             {position === "left" &&
//                 <p className={`text-2xl lg:text-5xl text-center ${scoreStatus === "Team_1_Win" ? "animate-pulse text-green-400" : "text-red-500"}`}>{score}</p>
//             }
//         </div>
//     );
// }
