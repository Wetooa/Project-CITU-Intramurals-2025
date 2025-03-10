import { Schedule } from "@/types/types";

export default function homecomponent(schedule: Schedule) {
  return (
    <div className="w-full h-28 bg-[#302F2E] rounded-md border-white border border-opacity-5 flex flex-col">
      <div className="w-full h-full flex items-center justify-evenly p-6">
        <span className="text-2xl font-bold">schedule.matchDate</span>

        <div className="flex items-center justify-evenly w-1/3 h-full">
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
            <span className="text-2xl font-bold">schedule.team1Id</span>
          </div>

          <span className="text-lg text-[#CCCCCC] font-bold text-opacity-25">
            {schedule.scoreTeam1 == null ? null : schedule.scoreTeam1}{" "}
            <span className="text-opacity-50">/</span>{" "}
            {schedule.scoreTeam2 == null ? null : schedule.scoreTeam2}
          </span>

          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
            <span className="text-2xl font-bold">schedule.team2Id</span>
          </div>
        </div>

        <span className="text-2xl font-bold">schedule.category</span>
      </div>

      <div className="w-full h-1/2 bg-[#2B2A29]  flex items-center justify-center">
        <span className="text-sm text-[#CCCCCC] text-opacity-50 font-bold">
          Game 1 - Finals
        </span>
      </div>
    </div>
  );
}
