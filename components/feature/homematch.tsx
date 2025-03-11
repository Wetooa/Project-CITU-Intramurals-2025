import { Schedule } from "@/types/types";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { HomeComponent, HomeComponentSkeleton } from "./homecomponent";

export default function HomeMatches({ Schedules }: { Schedules: Schedule[] }) {
  if (!Schedules)
    return (
      <div className="bg-[#242322] flex flex-col rounded-tr-lg rounded-tl-lg p-2 w-full h-full gap-6 overflow-y-auto justify-center items-center">
        <Image
          src="/leo_not_found.PNG"
          width={300}
          height={300}
          alt="Leo 404"
        />
        <span className="font-bold text-lg">NO MATCHES FOUND</span>
      </div>
    );
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
    <Skeleton className="rounded-tr-lg rounded-tl-lg p-2 w-full h-screen gap-6 flex flex-col overflow-y-hidden">
      <HomeComponentSkeleton />
      <HomeComponentSkeleton />
      <HomeComponentSkeleton />
      <HomeComponentSkeleton />
      <HomeComponentSkeleton />
    </Skeleton>
  );
}
