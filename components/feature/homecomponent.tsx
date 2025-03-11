import { teamLogos, zodiacSignsAcronym } from "@/types/constant";
import { Schedule } from "@/types/types";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export function HomeComponent({ schedule }: { schedule: Schedule }) {
  return (
    <div className="w-full h-28 bg-[#302F2E] rounded-md border-white border border-opacity-5 flex flex-col">
      <div className="w-full h-4/5  grid grid-cols-7  justify-evenly p-6">
        <div className="w-full h-full flex items-center md:col-span-1 col-span-2 justify-left">
          <span className="md:text-2xl text-md font-bold align-middle text-left">
            {schedule.matchTime}
          </span>
        </div>
        <div className="md:col-span-5 col-start-4 col-span-3 grid-cols-3 grid md:grid-cols-5 md:col-start-2 items-center justify-around w-full h-full">
          <div className="flex md:col-start-2 items-center justify-end  mr-2 gap-2">
            <span className="md:text-xl hidden md:block text-sm md:font-bold">
              {schedule.team1Id}
            </span>
            <span className="md:hidden text-xl font-bold md:font-bold">
              {zodiacSignsAcronym[schedule.team1Id as string]}
            </span>
            <Image
              src={teamLogos[schedule.team1Id as string]}
              width={50}
              height={50}
              alt="team 1 logo"
            ></Image>
          </div>

          <div className="w-full h-full flex items-center justify-center">
            <span className="md:text-lg text-xs col-start-4 md:col-start-3 items-center text-[#CCCCCC] font-bold text-opacity-25">
              <span
                className={
                  schedule.winner == "team1"
                    ? "text-green-500"
                    : "text-opacity-25"
                }
              >
                {!schedule.scoreTeam1 ? "0" : schedule.scoreTeam1}
              </span>{" "}
              <span className="text-opacity-50">/</span>{" "}
              <span
                className={
                  schedule.winner == "team2"
                    ? "text-green-500"
                    : "text-opacity-25"
                }
              >
                {!schedule.scoreTeam2 ? "0" : schedule.scoreTeam2}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-start gap-2">
            <Image
              src={teamLogos[schedule.team2Id as string]}
              width={50}
              height={50}
              alt="team 1 logo"
            ></Image>
            <span className="md:text-xl hidden md:block text-sm md:font-bold">
              {schedule.team2Id}
            </span>
            <span className="md:text-xl md:hidden font-bold text-xl md:font-bold">
              {zodiacSignsAcronym[schedule.team2Id as string]}
            </span>
          </div>
        </div>

        <div className="w-full h-full items-center justify-right md:flex hidden">
          <span className="w-full md:text-sm text-xs font-bold text-right">
            {schedule.category}
          </span>
        </div>
      </div>

      <div className="w-full h-1/5 bg-[#2B2A29] rounded-b-md  flex items-center justify-around">
        <span className="text-sm text-[#CCCCCC] text-opacity-50 font-bold hidden md:block">
          Game {schedule.game} - Round {schedule.round}
        </span>
        <span className="text-sm text-[#CCCCCC] text-opacity-50  md:hidden">
          Game {schedule.game} - Round {schedule.round} • {schedule.category} •{" "}
          {schedule.venue}
        </span>
        <span className="text-sm text-[#CCCCCC] text-opacity-50 font-bold hidden md:block">
          {schedule.venue}
        </span>
      </div>
    </div>
  );
}

export function HomeComponentSkeleton() {
  return (
    <Skeleton className="w-full h-28 rounded-md border-white border border-opacity-5"></Skeleton>
  );
}
