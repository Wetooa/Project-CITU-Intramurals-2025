import {Schedule} from "@/types/types";
import {Skeleton} from "../ui/skeleton";
import {HomeComponent, HomeComponentSkeleton} from "./homecomponent";
import NoMatchFound from "@/components/shared/no-match-found";
import {CalendarDays, Clock} from 'lucide-react';

export default function HomeMatches({schedule}: { schedule: Schedule[] }) {
    if (schedule.length === 0) return <NoMatchFound/>;

    return (
        <div className="bg-[#1A1918] rounded-lg w-full h-full">
            <div className="space-y-4 max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-250px)] overflow-y-auto p-4">
                {schedule.map((schedule, index) => (
                    <HomeComponent key={index} schedule={schedule}/>
                ))}
            </div>

            <div
                className="flex items-center justify-between p-4 text-sm text-white/60 border-t border-white/5 bg-[#242322] rounded-b-lg">
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4"/>
                    <span>Showing matches for today</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4"/>
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
}

export function HomeMatchesSkeleton() {
    return (
        <div className="bg-[#1A1918] rounded-lg w-full h-full">
            <div className="space-y-4 max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-250px)] overflow-y-auto p-4">
                <HomeComponentSkeleton/>
                <HomeComponentSkeleton/>
                <HomeComponentSkeleton/>
                <HomeComponentSkeleton/>
            </div>

            <div
                className="flex items-center justify-between p-4 text-sm text-white/60 border-t border-white/5 bg-[#242322] rounded-b-lg">
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4"/>
                    <span>Loading matches...</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4"/>
                    <span>Please wait</span>
                </div>
            </div>
        </div>
    );
}
