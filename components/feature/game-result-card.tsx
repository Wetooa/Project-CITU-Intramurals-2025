"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const zodiacSigns: Record<string, string> = {
    Aries: "AR",
    Taurus: "TA",
    Gemini: "GE",
    Cancer: "CA",
    Leo: "LE",
    Virgo: "VI",
    Libra: "LI",
    Scorpio: "SC",
    Sagittarius: "SG",
    Capricorn: "CP",
    Aquarius: "AQ",
    Pisces: "PI"
};

export default function DayResultContainer() {
    return (
        <div className="flex flex-col gap-2 w-full text-white font-bold justify-center items-center">
            <p className="self-start">Today</p>
            <GameResultCard />
        </div>
    );
}

interface TeamScoreProps {
    name: string;
    score: number;
}

function GameResultCard() {
    const [status, setStatus] = useState("Live"); // Initial status

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

    return (
        <div className="bg-mocha p-5 w-full flex flex-col justify-center items-center gap-2">
            <motion.p
                key={status}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className={`px-3 py-1 rounded text-white font-semibold ${
                    status === "Live" ? "bg-red-500 animate-pulse" : "bg-gray-700"
                }`}
            >
                {status}
            </motion.p>
            <div className="bg-mocha p-5 w-full flex justify-center items-center gap-5">
                {/* Left Team */}
                <TeamScoreLeft name="Aries" score={1} />

                <div className='flex flex-col items-center justify-center'>
                    <p className='text-sm text-gray-500 font-light self-start h-full'>BASKETBALL</p>
                    <p className="font-medium">VS</p>
                    <p className="font-medium">3:00 PM</p>
                </div>

                {/* Right Team */}
                <TeamScoreRight name="Capricorn" score={3} />
            </div>
        </div>
    );
}

function TeamScoreLeft({ name, score }: TeamScoreProps) {
    const [showName, setShowName] = useState(false);

    return (
        <div className="flex items-center gap-5">
            <div className="relative flex flex-col items-center gap-2">
                <Image
                    src="/globe.svg"
                    width={20}
                    height={30}
                    className="rounded-full cursor-pointer"
                    alt={name}
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
                            {name}
                        </motion.span>
                    )}
                </AnimatePresence>
                <p>{zodiacSigns[name]}</p>
            </div>
            <p className="text-2xl text-center">{score}</p>
        </div>
    );
}

function TeamScoreRight({ name, score }: TeamScoreProps) {
    const [showName, setShowName] = useState(false);
    return (
        <div className="flex items-center gap-5">
            <p className="text-2xl text-center">{score}</p>
            <div className="relative flex flex-col items-center gap-2">
                <Image
                    src="/globe.svg"
                    width={20}
                    height={30}
                    className="rounded-full cursor-pointer"
                    alt={name}
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
                            {name}
                        </motion.span>
                    )}
                </AnimatePresence>
                <p>{zodiacSigns[name]}</p>
            </div>
        </div>
    );
}