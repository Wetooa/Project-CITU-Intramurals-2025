"use client";

import {format} from "date-fns";
import {CalendarIcon, Clock, Gamepad, MapPin, Swords} from "lucide-react";

import {Card, CardContent, CardFooter, CardHeader,} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {Schedule} from "@/types/types";
import Image from "next/image";

export function GameResultCardContainer({
                                            id,
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
    const formattedDate = matchDate
        ? format(new Date(matchDate), "MMM dd, yyyy")
        : "TBD";
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-green-950 text-green-400 dark:bg-green-950 dark:text-green-400";
            case "Scheduled":
                return "bg-blue-950 text-blue-400 dark:bg-blue-950 dark:text-blue-400";
            case "Ongoing":
                return "bg-red-950  animate-pulse text-red-400 dark:bg-red-950 dark:text-red-400";
            case "cancelled":
                return "bg-gray-800 text-gray-400 dark:bg-gray-900 dark:text-gray-400";
            default:
                return "bg-gray-800 text-gray-400 dark:bg-gray-900 dark:text-gray-400";
        }
    };

    return (
        <Card key={id}
              className="overflow-hidden transition-all hover:shadow-md border-maroon bg-eerie_black text-gray-200">
            <CardHeader className="p-4 pb-2">
                <Badge
                    variant="outline"
                    className="w-full justify-center text-center font-medium text-sm capitalize border-gray-700 text-gray-300"
                >
                    {category}
                </Badge>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid grid-cols-7 items-center gap-2 py-2">
                    <div className="col-span-3 flex items-center  justify-center gap-2">
                        <Image
                            src={`/team_logo/${team1Id}.png`}
                            width={50}
                            height={50}
                            className="rounded-full min-w-12 cursor-pointer lg:hover:scale-110"
                            alt={team1Id || ""}
                        />
                        <p className="font-semibold text-gray-200 break-words truncate">
                            {team1Id}
                        </p>
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <div
                            className="flex items-center justify-center rounded-md bg-maroon px-3 text-center py-1 text-sm font-bold ">
                            {status === "Scheduled" ? (
                                "vs"
                            ) : (
                                <>
                                    <p
                                        className={`${scoreTeam1 != null && scoreTeam2 && scoreTeam1 > scoreTeam2 ? "text-white" : "text-gray-400"}`}
                                    >
                                        {scoreTeam1}{" "}
                                    </p>
                                    <p>{" -"}</p>
                                    <p
                                        className={`${scoreTeam1 != null && scoreTeam2 && scoreTeam1 < scoreTeam2 ? "text-white" : "text-gray-400"}`}
                                    >
                                        {scoreTeam2}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-span-3 flex items-center justify-center gap-2">
                        <p className="font-semibold text-gray-200 break-words">{team2Id}</p>
                        <Image
                            src={`/team_logo/${team2Id}.png`}
                            width={50}
                            height={50}
                            className="rounded-full min-w-12 cursor-pointer lg:hover:scale-110"
                            alt={team2Id || ""}
                        />
                    </div>
                </div>

                <Separator className="my-3 bg-gray-500"/>

                <div
                    className="grid grid-cols-1 gap-2 text-sm text-gray-400  sm:flex sm:items-center sm:justify-between sm:px-4">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4"/>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4"/>
                        <span>{matchTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {!isNaN(Number(game)) ? (
                            <span>Game {Number(game)}</span>
                        ) : (
                            <span>{game}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4"/>
                        <span>{venue}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t border-b-maroon bg-night_black p-2 text-xs text-gray-500">
                <div className="flex w-full items-center justify-between">
                    <span>Round: {round}</span>
                    <Badge className={cn("capitalize", getStatusColor(status))}>
                        {status}
                    </Badge>
                </div>
            </CardFooter>
        </Card>
    );
}
