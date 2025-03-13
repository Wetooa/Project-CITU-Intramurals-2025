import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Skeleton} from "../ui/skeleton";
import {Trophy, Medal, Award, ChevronRight} from 'lucide-react';

export function HomeRanking({
                                first,
                                second,
                                third,
                            }: {
    first: string;
    second: string;
    third: string;
}) {
    return (
        <div className="md:flex flex-col w-1/5 h-full hidden">
            <div className="bg-[#242322] rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                    <Trophy className="h-5 w-5 text-yellow-500"/>
                    <h2 className="text-xl font-bold text-white">Departmental Rankings</h2>
                </div>

                <div className="space-y-4">
                    <div
                        className="flex items-center p-4 bg-[#302F2E] rounded-lg border-l-4 border-yellow-500 transition-transform duration-300 hover:translate-x-1">
                        <div className="mr-3">
                            <Trophy className="h-5 w-5 text-yellow-500"/>
                        </div>
                        <div className="flex-1">
                            <div className="text-xs text-white/60 uppercase">First Place</div>
                            <div className="text-lg font-bold text-white">{first}</div>
                        </div>
                    </div>

                    <div
                        className="flex items-center p-4 bg-[#302F2E] rounded-lg border-l-4 border-gray-400 transition-transform duration-300 hover:translate-x-1">
                        <div className="mr-3">
                            <Medal className="h-5 w-5 text-gray-400"/>
                        </div>
                        <div className="flex-1">
                            <div className="text-xs text-white/60 uppercase">Second Place</div>
                            <div className="text-lg font-bold text-white">{second}</div>
                        </div>
                    </div>

                    <div
                        className="flex items-center p-4 bg-[#302F2E] rounded-lg border-l-4 border-amber-700 transition-transform duration-300 hover:translate-x-1">
                        <div className="mr-3">
                            <Award className="h-5 w-5 text-amber-700"/>
                        </div>
                        <div className="flex-1">
                            <div className="text-xs text-white/60 uppercase">Third Place</div>
                            <div className="text-lg font-bold text-white">{third}</div>
                        </div>
                    </div>
                </div>

                <Link
                    href="/leaderboard"
                    className="flex items-center justify-center gap-1 mt-6 py-2 w-full bg-[#3A2222] hover:bg-[#4A2222] transition-colors duration-200 rounded-md text-white font-medium"
                >
                    View Full Rankings <ChevronRight className="h-4 w-4"/>
                </Link>
            </div>
        </div>
    );
}

export function HomeRankingSkeleton() {
    return (
        <div className="md:flex flex-col w-1/5 h-full hidden">
            <div className="bg-[#242322] rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                    <Trophy className="h-5 w-5 text-yellow-500"/>
                    <h2 className="text-xl font-bold text-white">Departmental Rankings</h2>
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-20 w-full bg-[#302F2E] rounded-lg"/>
                    <Skeleton className="h-20 w-full bg-[#302F2E] rounded-lg"/>
                    <Skeleton className="h-20 w-full bg-[#302F2E] rounded-lg"/>
                </div>

                <Link
                    href="/leaderboard"
                    className="flex items-center justify-center gap-1 mt-6 py-2 w-full bg-[#3A2222] hover:bg-[#4A2222] transition-colors duration-200 rounded-md text-white font-medium"
                >
                    View Full Rankings <ChevronRight className="h-4 w-4"/>
                </Link>
            </div>
        </div>
    );
}
