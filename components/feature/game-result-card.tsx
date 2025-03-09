"use client";

import {useState} from "react";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import {Schedule} from "@/types/types";
import {zodiacSignsAcronym} from "@/types/constant";
import {Separator} from "@/components/ui/separator";

interface TeamScoreProps {
    team_name: string,
    score?: number | null,
    position: "left" | "right",
    scoreStatus: string
}

export default function DayResultContainer() {
    return (
        <div className="flex flex-col gap-2 lg:w-[880px] text-white font-bold justify-center items-center">
            <div className='self-start flex flex-col gap-0'>
                <p className='self-start text-2xl'>MAR 11, 2025</p>
                <p className="self-start font-medium text-gray-400">Monday</p>
            </div>
            <GameResultCard
                id="3"
                matchDate={new Date()}
                team1Id="1"
                team2Id="2"
                scoreTeam1={3}
                scoreTeam2={4}
                category="Basketball"
                status="Ongoing"
                createdOn={new Date()}
                updatedOn={new Date()}
            />
        </div>
    );
}

function GameResultCard(props: Schedule) {
    const matchDateTime = props.matchDate.toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).replace(",", "");
    const winStatus =
        props.scoreTeam1 == null || props.scoreTeam2 == null
            ? "Score_Not_Available"
            : props.scoreTeam1 > props.scoreTeam2
                ? "Team_1_Win"
                : "Team_2_Win";

    return (
        <div className="rounded-2xl bg-mocha p-5 w-full flex flex-col justify-center items-center gap-2">
            <motion.p
                key={props.status}
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.8}}
                transition={{duration: 0.5}}
                className={`px-3 py-1 rounded text-white font-semibold ${props.status === "Ongoing" ? "bg-red-500 animate-pulse" : "bg-gray-700"}`}
            >
                {props.status}
            </motion.p>
            <p className='text-md font-bold'>{props.category}</p>
            <div className="bg-mocha p-5 w-full flex justify-center items-center gap-5">
                <TeamScore team_name="Leo" score={2} position="left" scoreStatus={winStatus}/>
                <div className='flex flex-col items-center justify-center'>
                    <p className="font-bold">VS</p>
                    <Separator/>
                    <p className="text-xs whitespace-nowrap text-center font-medium">{matchDateTime}</p>
                </div>
                <TeamScore team_name="Capricorn" score={5} position="right" scoreStatus={winStatus}/>
            </div>
        </div>
    );
}

function TeamScore({team_name, score, position, scoreStatus}: TeamScoreProps) {
    const [showName, setShowName] = useState(false);

    return (
        <div className={`flex items-center gap-5  : ""}`}>
            {position === "right" &&
                <p className={`text-2xl text-center ${scoreStatus === "Team_1_Win" ? "animate-pulse text-green-400": "text-red-500"}`}>{score}</p>
            }

            <div className="relative flex flex-col items-center gap-2">
                <Image
                    src={`/team_logo/${team_name}.png`}
                    width={100}
                    height={100}
                    className="rounded-full cursor-pointer"
                    alt={team_name}
                    onClick={() => setShowName(!showName)}
                />

                <AnimatePresence>
                    {showName && (
                        <motion.span
                            initial={{opacity: 0, scale: 0.8, y: 10}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            exit={{opacity: 0, scale: 0.8, y: 10}}
                            transition={{duration: 0.3}}
                            className="absolute bottom-12 bg-gray-800 text-white text-xs px-2 py-1 rounded"
                        >
                            {team_name}
                        </motion.span>
                    )}
                </AnimatePresence>
                <p className='hidden lg:block'>{team_name}</p>
                <p className='block lg:hidden'>{zodiacSignsAcronym[team_name]}</p>
            </div>
            {position === "left" &&
                <p className={`text-2xl text-center ${scoreStatus === "Team_2_Win" ? "animate-pulse text-green-400" : "text-red-500"}`}>{score}</p>
            }
        </div>
    );
}
