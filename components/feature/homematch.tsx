import { Schedule } from "@/types/types";
import { HomeComponent } from "./homecomponent";
import { Skeleton } from "../ui/skeleton";

export default function HomeMatches({ Schedules }: { Schedules: Schedule[] }) {
  return (
    <div className="bg-[#242322] flex flex-col rounded-tr-lg rounded-tl-lg p-2 w-full h-full gap-6 overflow-y-auto">
      {Schedules.map((schedule, index) => (
        <HomeComponent key={index} schedule={schedule}></HomeComponent>
      ))}
    </div>
  );
}

export function HomeMatchesSkeleton() {
  return (
    <Skeleton className="rounded-tr-lg rounded-tl-lg p-2 w-full h-full"></Skeleton>
  );
}
