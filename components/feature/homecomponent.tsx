import { teamLogos } from "@/types/constant";
import { Schedule } from "@/types/types";
import Image from "next/image";

export function HomeComponent({ schedule }: { schedule: Schedule }) {
  return (
    <div className="w-full h-28 bg-[#302F2E] rounded-md border-white border border-opacity-5 flex flex-col">
      <div className="w-full h-full  grid grid-cols-7  justify-evenly p-6">
        <div className="w-full h-full flex items-center justify-left">
          <span className="text-2xl font-bold align-middle text-left">
            {schedule.matchTime}
          </span>
        </div>
        <div className="col-span-5  grid grid-cols-5 items-center justify-around w-full h-full">
          <div className="flex col-start-2 items-center justify-end  mr-2 gap-2">
            <span className="text-xl font-bold">{schedule.team1Id}</span>
            <Image
              src={teamLogos[schedule.team1Id]}
              width={50}
              height={510}
              alt="team 1 logo"
            ></Image>
          </div>

          <div className="w-full h-full flex items-center justify-center">
            <span className="text-lg col-start-3 items-center text-[#CCCCCC] font-bold text-opacity-25">
              {schedule.scoreTeam1 == "" ? "0" : schedule.scoreTeam1}{" "}
              <span className="text-opacity-50">/</span>{" "}
              {schedule.scoreTeam2 == "" ? "0" : schedule.scoreTeam2}
            </span>
          </div>

          <div className="flex items-center justify-start gap-2">
            <Image
              src={teamLogos[schedule.team2Id]}
              width={50}
              height={510}
              alt="team 1 logo"
            ></Image>
            <span className="text-xl font-bold">{schedule.team2Id}</span>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-right">
          <span className="w-full text-sm font-bold text-right">
            {schedule.category}
          </span>
        </div>
      </div>

      <div className="w-full h-1/2 bg-[#2B2A29]  flex items-center justify-around">
        <span className="text-sm text-[#CCCCCC] text-opacity-50 font-bold">
          Game 1 - Finals
        </span>
        <span className="text-sm text-[#CCCCCC] text-opacity-50 font-bold">
          Venue
        </span>
      </div>
    </div>
  );
}
