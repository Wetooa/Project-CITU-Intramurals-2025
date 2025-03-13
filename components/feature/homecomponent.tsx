import { cn } from "@/lib/utils";
import { zodiacSignsAcronym } from "@/types/constant";
import type { Schedule } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { TeamLogo } from "./team-logo";

export function HomeComponent({ schedule }: { schedule: Schedule }) {
  const getStatusColor = () => {
    switch (schedule.status) {
      case "Ongoing":
        return "bg-green-500";
      case "Completed":
        return "bg-blue-500";
      case "Scheduled":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  const getWinnerStyle = (team: string) => {
    if (schedule.status !== "Completed") return "";
    return schedule.winner === team
      ? "text-green-500 font-bold"
      : "text-opacity-60";
  };

  return (
    <div className="w-full bg-[#302F2E] rounded-lg border-white/5 border shadow-md hover:shadow-lg transition-all duration-300 hover:border-white/10 overflow-hidden">
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-2 h-full"
          style={{ backgroundColor: getStatusColor() }}
        ></div>

        <div className="w-full grid grid-cols-7 items-center p-5 pl-6">
          <div className="w-full flex items-center md:col-span-1 col-span-2 justify-left">
            <span className="md:text-xl text-base font-bold text-left">
              {schedule.matchTime}
            </span>
          </div>

          <div className="md:col-span-5 col-start-4 col-span-3 grid-cols-3 grid md:grid-cols-5 md:col-start-2 justify-around w-full items-center">
            <div className="flex md:col-start-2 items-center justify-end mr-2 gap-2">
              <span
                className={cn(
                  "md:text-base hidden md:block font-bold",
                  getWinnerStyle("team1"),
                )}
              >
                {schedule.team1Id}
              </span>
              <span
                className={cn(
                  "md:hidden text-base font-bold",
                  getWinnerStyle("team1"),
                )}
              >
                {zodiacSignsAcronym[schedule.team1Id as string]}
              </span>
              <TeamLogo
                teamId={schedule.team1Id}
                showWinner={schedule.status === "Completed"}
                isWinner={schedule.winner === "team1"}
              />
            </div>

            <div className="w-full h-full flex items-center justify-center">
              <span className="md:text-xl text-lg font-bold">
                <span
                  className={
                    schedule.winner === "team1" ? "text-green-500" : ""
                  }
                >
                  {!schedule.scoreTeam1 ? "0" : schedule.scoreTeam1}
                </span>{" "}
                <span className="text-white/50">-</span>{" "}
                <span
                  className={
                    schedule.winner === "team2" ? "text-green-500" : ""
                  }
                >
                  {!schedule.scoreTeam2 ? "0" : schedule.scoreTeam2}
                </span>
              </span>
            </div>

            <div className="flex items-center justify-start gap-2">
              <TeamLogo
                teamId={schedule.team2Id}
                showWinner={schedule.status === "Completed"}
                isWinner={schedule.winner === "team2"}
              />
              <span
                className={cn(
                  "md:text-base hidden md:block font-bold",
                  getWinnerStyle("team2"),
                )}
              >
                {schedule.team2Id}
              </span>
              <span
                className={cn(
                  "md:text-base md:hidden font-bold",
                  getWinnerStyle("team2"),
                )}
              >
                {zodiacSignsAcronym[schedule.team2Id as string]}
              </span>
            </div>
          </div>

          <div className="w-full h-full items-center justify-right md:flex hidden">
            <span className="w-full md:text-sm text-xs font-bold text-right text-white/80">
              {schedule.category}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#242322] py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70 font-medium">
            Game {schedule.game}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/30"></span>
          <span className="text-sm text-white/70 font-medium md:hidden">
            {schedule.category}
          </span>
        </div>
        <span className="text-sm text-white/70 font-medium">
          {schedule.venue}
        </span>
      </div>
    </div>
  );
}

export function HomeComponentSkeleton() {
  return (
    <div className="w-full bg-[#302F2E] rounded-lg border-white/5 border shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-16 bg-[#242322]" />
          <div className="flex-1 flex justify-center items-center gap-4">
            <div className="flex items-center gap-2 justify-end">
              <Skeleton className="h-4 w-20 bg-[#242322] hidden md:block" />
              <Skeleton className="h-10 w-10 rounded-full bg-[#242322]" />
            </div>
            <Skeleton className="h-6 w-16 bg-[#242322]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full bg-[#242322]" />
              <Skeleton className="h-4 w-20 bg-[#242322] hidden md:block" />
            </div>
          </div>
          <Skeleton className="h-4 w-24 bg-[#242322] hidden md:block" />
        </div>
      </div>
      <div className="w-full bg-[#242322] py-3 px-4 flex items-center justify-between">
        <Skeleton className="h-4 w-20 bg-[#302F2E]" />
        <Skeleton className="h-4 w-24 bg-[#302F2E]" />
      </div>
    </div>
  );
}
