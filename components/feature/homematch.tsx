import { Schedule } from "@/types/types";
import { HomeComponent } from "./homecomponent";

export default function HomeMatches({ Schedules }: { Schedules: Schedule[] }) {
  return (
    <div className="bg-[#242322] flex flex-col rounded-tr-lg rounded-tl-lg p-2 w-full h-full gap-6 overflow-y-auto">
      {Schedules.map((schedule, index) => (
        <HomeComponent key={index} schedule={schedule}></HomeComponent>
      ))}
    </div>
  );
}
