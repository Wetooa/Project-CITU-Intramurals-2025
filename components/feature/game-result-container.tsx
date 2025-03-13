"use client"

import {format} from "date-fns"
import {CalendarIcon, Clock, MapPin, Trophy} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {cn} from "@/lib/utils"
import type {Schedule} from "@/types/types"
import Image from "next/image"
import {motion} from "framer-motion"

export function GameResultCardContainer({
                                            matchDate,
                                            team1Id,
                                            team2Id,
                                            game,
                                            scoreTeam1,
                                            scoreTeam2,
                                            category,
                                            status,
                                            round,
                                            venue,
                                            matchTime,
                                        }: Schedule) {
    const formattedDate = matchDate ? format(new Date(matchDate), "MMM dd, yyyy") : "TBD"

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-green-950/60 text-green-400 border-green-700"
            case "Scheduled":
                return "bg-blue-950/60 text-blue-400 border-blue-700"
            case "Ongoing":
                return "bg-red-950/60 text-red-400 border-red-700"
            case "cancelled":
                return "bg-gray-800/60 text-gray-400 border-gray-600"
            default:
                return "bg-gray-800/60 text-gray-400 border-gray-600"
        }
    }

    const isTeam1Winner = scoreTeam1 != null && scoreTeam2 != null && scoreTeam1 > scoreTeam2
    const isTeam2Winner = scoreTeam1 != null && scoreTeam2 != null && scoreTeam1 < scoreTeam2
    const isTie = scoreTeam1 != null && scoreTeam2 != null && scoreTeam1 === scoreTeam2

    return (
        <Card
            className="overflow-hidden border-maroon bg-gradient-to-br from-eerie_black to-[#121212] shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <Badge
                    variant="outline"
                    className="px-3 py-1 text-center font-medium text-sm capitalize text-gray-300 border-maroon"
                >
                    {category}
                </Badge>
                <Badge className={cn("capitalize", getStatusColor(status))}>
                    {status === "Ongoing" && (
                        <motion.span
                            animate={{opacity: [0.5, 1, 0.5]}}
                            transition={{duration: 2, repeat: Number.POSITIVE_INFINITY}}
                            className="mr-1.5 h-2 w-2 rounded-full bg-red-500 inline-block"
                        />
                    )}
                    {status}
                </Badge>
            </CardHeader>

            <CardContent className="p-4">
                <div className="grid grid-cols-7 items-center gap-4 py-3">
                    <div className="col-span-3 flex flex-col items-center justify-center gap-3">
                        <div className="relative">
                            <motion.div
                                whileHover={{scale: 1.05}}
                                transition={{type: "spring", stiffness: 400, damping: 10}}
                                className="relative"
                            >
                                {/* Winner highlight effect */}
                                {isTeam1Winner && status === "Completed" && (
                                    <motion.div
                                        initial={{opacity: 0, scale: 1.2}}
                                        animate={{
                                            opacity: [0.4, 0.7, 0.4],
                                            scale: [1, 1.05, 1],
                                            boxShadow: [
                                                "0 0 10px 2px rgba(34, 197, 94, 0.3)",
                                                "0 0 20px 4px rgba(34, 197, 94, 0.5)",
                                                "0 0 10px 2px rgba(34, 197, 94, 0.3)",
                                            ],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute inset-0 rounded-full bg-green-500/20 z-0"
                                    />
                                )}

                                {/* Team logo container */}
                                <div
                                    className={cn(
                                        "relative z-10 rounded-full overflow-hidden",
                                        isTeam1Winner && status === "Completed"
                                            ? "ring-4 ring-green-500 ring-offset-2 ring-offset-black/80"
                                            : "border-2 border-gray-700/50",
                                    )}
                                >
                                    <Image
                                        src={`/team_logo/${team1Id}.png`}
                                        width={70}
                                        height={70}
                                        className="rounded-full object-cover"
                                        alt={team1Id || ""}
                                    />
                                </div>

                                {/* Trophy badge */}
                                {isTeam1Winner && status === "Completed" && (
                                    <motion.div
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2, type: "spring"}}
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-1.5 shadow-lg border-2 border-black z-20"
                                    >
                                        <Trophy className="h-3.5 w-3.5 text-black"/>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                        <p
                            className={cn(
                                "font-semibold text-center transition-colors",
                                isTeam1Winner && status === "Completed" ? "text-green-400" : "text-gray-200",
                            )}
                        >
                            {team1Id}
                        </p>
                    </div>

                    <div className="col-span-1 flex flex-col items-center justify-center">
                        {status === "Scheduled" ? (
                            <div className="bg-maroon rounded-md px-4 py-2 font-bold text-white">VS</div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-maroon/80 to-maroon rounded-md px-4 py-2 min-w-16 text-center">
                  <span
                      className={cn(
                          "text-xl font-bold",
                          isTeam1Winner ? "text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]" : "text-gray-300",
                      )}
                  >
                    {scoreTeam1}
                  </span>
                                    <span className="text-gray-400">-</span>
                                    <span
                                        className={cn(
                                            "text-xl font-bold",
                                            isTeam2Winner ? "text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]" : "text-gray-300",
                                        )}
                                    >
                    {scoreTeam2}
                  </span>
                                </div>
                                {isTie && (
                                    <motion.span
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        className="text-xs mt-1 text-yellow-500 font-medium bg-yellow-950/30 px-2 py-0.5 rounded-full"
                                    >
                                        TIE
                                    </motion.span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="col-span-3 flex flex-col items-center justify-center gap-3">
                        <div className="relative">
                            <motion.div
                                whileHover={{scale: 1.05}}
                                transition={{type: "spring", stiffness: 400, damping: 10}}
                                className="relative"
                            >
                                {/* Winner highlight effect */}
                                {isTeam2Winner && status === "Completed" && (
                                    <motion.div
                                        initial={{opacity: 0, scale: 1.2}}
                                        animate={{
                                            opacity: [0.4, 0.7, 0.4],
                                            scale: [1, 1.05, 1],
                                            boxShadow: [
                                                "0 0 10px 2px rgba(34, 197, 94, 0.3)",
                                                "0 0 20px 4px rgba(34, 197, 94, 0.5)",
                                                "0 0 10px 2px rgba(34, 197, 94, 0.3)",
                                            ],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute inset-0 rounded-full bg-green-500/20 z-0"
                                    />
                                )}

                                {/* Team logo container */}
                                <div
                                    className={cn(
                                        "relative z-10 rounded-full overflow-hidden",
                                        isTeam2Winner && status === "Completed"
                                            ? "ring-4 ring-green-500 ring-offset-2 ring-offset-black/80"
                                            : "border-2 border-gray-700/50",
                                    )}
                                >
                                    <Image
                                        src={`/team_logo/${team2Id}.png`}
                                        width={70}
                                        height={70}
                                        className="rounded-full object-cover"
                                        alt={team2Id || ""}
                                    />
                                </div>

                                {/* Trophy badge */}
                                {isTeam2Winner && status === "Completed" && (
                                    <motion.div
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.2, type: "spring"}}
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-1.5 shadow-lg border-2 border-black z-20"
                                    >
                                        <Trophy className="h-3.5 w-3.5 text-black"/>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                        <p
                            className={cn(
                                "font-semibold text-center transition-colors",
                                isTeam2Winner && status === "Completed" ? "text-green-400" : "text-gray-200",
                            )}
                        >
                            {team2Id}
                        </p>
                    </div>
                </div>

                <Separator className="my-4 bg-gray-700/50"/>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-maroon"/>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-maroon"/>
                        <span>{matchTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-maroon/20 rounded-full border border-maroon/30">
              {!isNaN(Number(game)) ? `Game ${Number(game)}` : game}
            </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-maroon"/>
                        <span className="truncate">{venue}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="border-t border-maroon/30 bg-night_black/80 p-3 text-xs text-gray-500">
                <div className="w-full">
                    <span>Round: {round}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

