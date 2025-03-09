"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {Schedule} from "@/types/types";
import {zodiacSignsAcronym} from "@/types/constant";
import {Separator} from "@/components/ui/separator";

interface  TeamScoreProps{
    team_name : string;
    score?:  number|null
}
export default function DayResultContainer() {
    return (
        <div className="flex flex-col gap-2 w-full text-white font-bold justify-center items-center">
            <p className="self-start">Today</p>
            <GameResultCard
                id={1}
                match_date={new Date()}
                team1_name="Leo"
                team2_name="Capricorn"
                team1_id={1}
                team2_id={10}
                category="Basketball"
                status="Ongoing"
                created_on={new Date()}
                updated_on={new Date()}
            />
        </div>
    );
}


function GameResultCard(props: Schedule) {
    // useEffect(() => {
    //     // Simulating match status changes over time
    //     const timer = setTimeout(() => setStatus("Live"), 3000); // After 3 sec -> Live
    //     const endTimer = setTimeout(() => setStatus("Finished"), 10000); // After 10 sec -> Finished
    //
    //     return () => {
    //         clearTimeout(timer);
    //         clearTimeout(endTimer);
    //     };
    // }, []);
    const matchDateTime = props.match_date.toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).replace(',', ''); // Removes the comma for cleaner formatting

    return (
        <div key={props.id} className="bg-mocha p-5 w-full flex flex-col justify-center items-center gap-2">
            <motion.p
                key={props.status}
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.8}}
                transition={{duration: 0.5}}
                className={`px-3 py-1 rounded text-white font-semibold ${
                    props.status === "Ongoing" ? "bg-red-500 animate-pulse" : "bg-gray-700"

                }`}
            >
                {props.status}
            </motion.p>
            <p className='text-md text-white font-bold self-center h-full'>{props.category}</p>
            <div className="bg-mocha p-5 w-full flex justify-center items-center gap-5">
                {/* Left Team */}
                <TeamScoreLeft team_name={props.team1_name} score={props.score_team1}/>

                <div className='flex flex-col items-center justify-center'>
                    <p className="font-bold ">VS</p>
                    <Separator/>
                    <p className=" text-xs whitespace-nowrap text-center font-medium self-end">{matchDateTime}</p>
                </div>

                {/* Right Team */}
                <TeamScoreRight team_name={props.team2_name} score={props.score_team2}/>
            </div>
        </div>
    );
}

function TeamScoreLeft({team_name, score}: TeamScoreProps) {
    const [showName, setShowName] = useState(false);

    return (
        <div className="flex items-center gap-5">
            <div className="relative flex flex-col items-center gap-2">
                <Image
                    src={`/team_logo/${team_name}.png`}
                    width={60}
                    height={60}
                    className="rounded-full cursor-pointer"
                    alt={team_name}
                    onClick={() => setShowName(!showName)}
                />
                <AnimatePresence>
                    {showName && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-12 bg-gray-800 text-white text-xs px-2 py-1 rounded"
                        >
                            {team_name}
                        </motion.span>
                    )}
                </AnimatePresence>
                <p>{zodiacSignsAcronym[team_name]}</p>
            </div>
            <p className="text-2xl text-center">{score}</p>
        </div>
    );
}

function TeamScoreRight({team_name, score }: TeamScoreProps) {
    const [showName, setShowName] = useState(false);
    return (
        <div className="flex items-center gap-5">
            <p className="text-2xl text-center">{score}</p>
            <div className="relative flex flex-col items-center gap-2">
                <Image
                    src={`/team_logo/${team_name}.png`}
                    width={60}
                    height={60}
                    className="rounded-full cursor-pointer"
                    alt={team_name}
                    onClick={() => setShowName(!showName)}
                />
                <AnimatePresence>
                    {showName && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-12 bg-gray-800 text-white text-xs px-2 py-1 rounded"
                        >
                            {team_name}
                        </motion.span>
                    )}
                </AnimatePresence>
                <p>{zodiacSignsAcronym[team_name]}</p>
            </div>
        </div>
    );
}