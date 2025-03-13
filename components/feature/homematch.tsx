import { Schedule } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { HomeComponent, HomeComponentSkeleton } from "./homecomponent";
import NoMatchFound from "@/components/shared/no-match-found";

export default function HomeMatches({ schedule }: { schedule: Schedule[] }) {
  if (schedule.length === 0) return <NoMatchFound />;
  return (
    <div className="bg-[#242322] flex flex-col rounded-tr-lg rounded-tl-lg p-2 w-full h-full gap-6 overflow-y-auto">
      {schedule.map((schedule, index) => (
        <HomeComponent key={index} schedule={schedule}></HomeComponent>
      ))}
    </div>
  );
}

export function HomeMatchesSkeleton() {
  return (
    <Skeleton className="rounded-tr-lg rounded-tl-lg p-2 w-full h-screen gap-6 flex flex-col overflow-y-hidden">
      <HomeComponentSkeleton />
      <HomeComponentSkeleton />
      <HomeComponentSkeleton />
      <HomeComponentSkeleton />
      <HomeComponentSkeleton />
    </Skeleton>
  );
}
